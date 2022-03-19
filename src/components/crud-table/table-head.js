import { TableColumnTitle } from "./table-column-title";

function TableHead({
  columnNames,
  allItemsAreChecked,
  onSelectAll,
  sortableColumns,
  currentSortedColumn,
  setCurrentSortedColumn,
}) {
  return (
    <thead>
      <tr>
        <th>
          <div className="crud-table__th-inner">
            <input
              type="checkbox"
              checked={allItemsAreChecked}
              onChange={onSelectAll}
            />
            <span>Select</span>
          </div>
        </th>
        {columnNames.map((column) => (
          <TableColumnTitle
            key={column}
            columnName={column}
            sortableColumns={sortableColumns}
            currentSortedColumn={currentSortedColumn}
            setCurrentSortedColumn={setCurrentSortedColumn}
          />
        ))}
        <th>Actions</th>
      </tr>
    </thead>
  );
}

export { TableHead };
