import { CONFIG } from "@/env";
import { removeDuplicateSlashes } from "@/core";

function getRoute(path) {
  return removeDuplicateSlashes(`${CONFIG.API_ROOT_URL}/${path}`);
}

export { getRoute };
