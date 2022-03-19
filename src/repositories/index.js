import { useMethods } from "./utils";
import { getRoute } from "@/core";

function useRepository(resourceName) {
  let url = getRoute(`/${resourceName}`);
  const repository = useMethods(url);
  return repository;
}

export { useRepository };
