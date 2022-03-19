import { CrudItemElement } from "./item";
import { Row } from "react-bootstrap";
import { useGetData } from "../../core";
import { useMemo } from "react";
import { useRepository } from "@/repositories";
import { useGetSelectedIds } from "./use-get-selected-ids";

function CrudItem({ columnNames = [], resourceName }) {
  const itemsIds = useGetSelectedIds();
  const repository = useRepository(resourceName);

  let params = useMemo(() => {
    return {
      ids: itemsIds,
    };
  }, [itemsIds]);

  const { data, isLoading } = useGetData({
    columnNames,
    repository,
    extraOptions: params,
  });
  //TODO add loading placeholder
  return (
    <Row>
      {data.map((item) => {
        return <CrudItemElement key={item.id} item={item} />;
      })}
    </Row>
  );
}

export { CrudItem };
