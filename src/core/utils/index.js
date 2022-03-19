function removeDuplicateSlashes(content = "") {
  return content.replace(/([^:]\/)\/+/g, "$1");
}

export { removeDuplicateSlashes };
