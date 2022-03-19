import { CrudTable } from "@/components";

function CardPage() {
  return (
    <CrudTable
      resourceName="posts"
      columnNames={["title"]}
      sortableColumns={["title"]}
      label={"Posts"}
      routeBaseUrl={"/cards"}
    />
  );
}

export default CardPage;
