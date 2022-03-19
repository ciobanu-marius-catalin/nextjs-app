import _ from "lodash";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown, faCaretUp } from "@fortawesome/free-solid-svg-icons";
import classnames from "classnames";
import { SORT_ORDER_VALUES } from "./config";

function TableColumnTitle(props) {
  let { columnName } = props;

  return (
    <th className="crud-table__header-cell">
      {_.capitalize(columnName)}
      <TableColumnTitleSortControls {...props} />
    </th>
  );
}

function TableColumnTitleSortControls({
  columnName = "",
  sortableColumns = [],
  setCurrentSortedColumn = _.noop,
  currentSortedColumn = {},
}) {
  let canSort = sortableColumns.includes(columnName);
  if (!canSort) {
    return null;
  }

  const currentColumnIsSorted = currentSortedColumn?.value === columnName;
  const upControlIsActive =
    currentColumnIsSorted &&
    currentSortedColumn?.order === SORT_ORDER_VALUES.ASC;
  const downControlIsActive =
    currentColumnIsSorted &&
    currentSortedColumn?.order === SORT_ORDER_VALUES.DESC;

  const onSort = (order, isActive) => () => {
    setCurrentSortedColumn({
      value: columnName,
      order,
    });
  };

  return (
    <div className="crud-table__header-cell__sort-controls">
      {!upControlIsActive && (
        <FontAwesomeIcon
          icon={faCaretUp}
          onClick={onSort(SORT_ORDER_VALUES.ASC)}
        />
      )}
      {!downControlIsActive && (
        <FontAwesomeIcon
          icon={faCaretDown}
          onClick={onSort(SORT_ORDER_VALUES.DESC)}
        />
      )}
    </div>
  );
}

export { TableColumnTitle };
