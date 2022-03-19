import { Button, ButtonGroup, Form } from "react-bootstrap";
import Link from "next/link";

function TableContent({
  checkedItems = [],
  data = [],
  columnNames = [],
  onShow,
  onDelete,
  onSelect,
}) {
  return (
    <tbody>
      {data.map((item) => {
        return (
          <tr key={item.id}>
            <td className="crud-table__select-row">
              <input
                type="checkbox"
                checked={checkedItems.includes(item.id)}
                onChange={() => onSelect(item.id)}
              />
            </td>
            {columnNames.map((columnName, index) => (
              <td key={item?.[columnName] + index}>{item?.[columnName]}</td>
            ))}
            <td className="crud-table__action-row">
              <Button variant="primary" onClick={() => onShow(item.id)}>
                Show
              </Button>
              <Button variant="danger" onClick={() => onDelete(item.id)}>
                Delete
              </Button>
            </td>
          </tr>
        );
      })}
    </tbody>
  );
}

export { TableContent };
