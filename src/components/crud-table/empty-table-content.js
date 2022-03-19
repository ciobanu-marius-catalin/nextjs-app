import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMeh } from "@fortawesome/free-solid-svg-icons";

function EmptyTableContent({ columnNames }) {
  return (
    <tbody>
      <tr>
        <td
          className="crud-table__empty-column"
          colSpan={columnNames.length + 2}
        >
          <div className="crud-table__empty-column__content">
            <FontAwesomeIcon icon={faMeh} />
            <span>No results found</span>
          </div>
        </td>
      </tr>
    </tbody>
  );
}

export { EmptyTableContent };
