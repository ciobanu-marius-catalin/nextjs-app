import { Pagination } from "@/components";
import { Alert, Button, Table } from "react-bootstrap";
import { useState, useCallback, useMemo } from "react";
import _ from "lodash";
import { LoadingTableContent } from "./loading-table-content";
import { EmptyTableContent } from "./empty-table-content";
import { TableContent } from "./table-content";
import { useEffect } from "react";
import { useRepository } from "@/repositories";
import { useGetData } from "@/core";
import { CrudPagination } from "./crud-pagination";
import { useRouter } from "next/router";
import { TableHead } from "./table-head";
import { SORT_ORDER_VALUES } from "./config";

function CrudTable({
  columnNames = [],
  resourceName,
  routeBaseUrl = "/",
  label = "",
  sortableColumns = [],
  elementsPerPage = 20,
}) {
  const [page, setPage] = useState(1);
  const [error, setError] = useState(false);
  const [checkedItems, setCheckedItems] = useState([]);
  const [currentSortedColumn, setCurrentSortedColumn] = useState({
    value: null,
    order: SORT_ORDER_VALUES.ASC,
  });
  const repository = useRepository(resourceName);
  const router = useRouter();

  const extraOptions = useMemo(() => {
    if (!currentSortedColumn?.value) {
      return null;
    }
    return {
      sort: currentSortedColumn,
    };
  }, [currentSortedColumn]);

  const { data, isLoading, fetchData } = useGetData({
    page,
    elementsPerPage,
    columnNames,
    error,
    setError,
    repository,
    extraOptions,
  });

  const onSelect = (id) => {
    let newCheckedItems = _.cloneDeep(checkedItems);
    let isChecked = newCheckedItems.includes(id);
    if (!isChecked) {
      newCheckedItems.push(id);
    } else {
      newCheckedItems = newCheckedItems.filter((checkedId) => checkedId !== id);
    }

    setCheckedItems(newCheckedItems);
  };

  const onDelete = useCallback(
    async (id) => {
      try {
        await repository.remove(id);
        fetchData();
      } catch (e) {
        console.error(e);
        setError(e);
      }
    },
    [repository, fetchData]
  );

  useEffect(() => {
    if (!_.isEmpty(checkedItems)) {
      setCheckedItems([]);
    }
  }, [page]);

  const onShow = (id) => {
    router.push({ pathname: `${routeBaseUrl}/[id]`, query: { id: id } });
  };

  const allItemsAreChecked = useMemo(() => {
    let allIds = data.map((item) => item.id);
    let checkedItemsClone = _.cloneDeep(checkedItems);
    _.sortBy(checkedItemsClone);
    _.sortBy(allIds);
    const allItemsAreChecked = _.isEqual(checkedItemsClone, allIds);
    return allItemsAreChecked;
  }, [checkedItems, data]);

  const onSelectAll = useCallback(() => {
    if (allItemsAreChecked) {
      setCheckedItems([]);
    } else {
      let ids = data.map((item) => item.id);
      _.sortBy(ids);
      setCheckedItems(ids);
    }
  }, [allItemsAreChecked, setCheckedItems, data]);

  const onSelectChecked = () => {
    let ids = JSON.stringify(checkedItems);
    router.push({ pathname: `${routeBaseUrl}/[id]`, query: { id: ids } });
  };
  let Content;

  if (isLoading) {
    Content = LoadingTableContent;
  } else if (_.isEmpty(data)) {
    Content = EmptyTableContent;
  } else {
    Content = TableContent;
  }
  return (
    <div className="crud-table__outer">
      {label && <h1 className="crud-table__label">Posts</h1>}

      {error && (
        <Alert className="w-100" variant="danger">
          Something went wrong, please try again later
        </Alert>
      )}

      <Table className="crud-table" striped bordered hover>
        <TableHead
          columnNames={columnNames}
          allItemsAreChecked={allItemsAreChecked}
          onSelectAll={onSelectAll}
          sortableColumns={sortableColumns}
          currentSortedColumn={currentSortedColumn}
          setCurrentSortedColumn={setCurrentSortedColumn}
        />
        <Content
          data={data}
          columnNames={columnNames}
          onSelect={onSelect}
          onDelete={onDelete}
          onShow={onShow}
          checkedItems={checkedItems}
        />
      </Table>
      <CrudPagination
        page={page}
        elementsPerPage={elementsPerPage}
        onChangePage={setPage}
      />
      <div className="crud-table__selection-counter">
        * Currently there are{" "}
        <strong>
          {checkedItems.length} {label.toLowerCase()}{" "}
        </strong>
        selected
      </div>
      <div className="crud-table__select-all-button">
        <Button variant="primary" onClick={onSelectChecked}>
          Show selected {label.toLowerCase()}
        </Button>
      </div>
    </div>
  );
}

export { CrudTable };
