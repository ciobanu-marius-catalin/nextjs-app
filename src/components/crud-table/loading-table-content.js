function LoadingTableContent({ columnNames }) {
  return (
    <tbody>
      <tr>
        <td
          className="crud-table__loading-column"
          colSpan={columnNames.length + 2}
        >
          <div className="crud-table__loading-column__content">
            <span>Loading...</span>
          </div>
        </td>
      </tr>
    </tbody>
  );
}

export { LoadingTableContent };
