import { Pagination } from "react-bootstrap";
import _ from "lodash";

//the api does not provide a way to determine the number of items fetched so i hardcoded the value
function CrudPagination({
  page,
  elementsPerPage,
  onChangePage = _.noop,
  maxNumberOfPages = 100,
}) {
  let numberOfPages = Math.ceil(maxNumberOfPages / elementsPerPage);
  let items = [];
  for (let number = 1; number <= numberOfPages; number++) {
    items.push(
      <Pagination.Item
        onClick={() => onChangePage(number)}
        key={number}
        active={number === page}
      >
        {number}
      </Pagination.Item>
    );
  }

  return <Pagination>{items}</Pagination>;
}

export { CrudPagination };
