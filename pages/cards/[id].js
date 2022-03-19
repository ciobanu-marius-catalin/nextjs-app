import { CrudItem } from "@/components";

function Item() {
  return (
    <CrudItem
      resourceName="posts"
      columnNames={["title", "body"]}
      routeBaseUrl={"/cards"}
    />
  );
}

export default Item;
