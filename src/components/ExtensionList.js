
import React from 'react';

function ExtensionList({ extensions, onEdit, onDelete }) {
  if (extensions.length === 0) {
    return (
      <div className="table-container">
        <div className="no-extensions">
          No extensions found. Add some extensions to get started!
        </div>
      </div>
    );
  }

  return (
    <div className="table-container">
      <table className="extensions-table">
        <thead>
          <tr>
            <th>Floor Name</th>
            <th>Department Name</th>
            <th>Person Name</th>
            <th>Extension Number</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {extensions.map(extension => (
            <tr key={extension.id}>
              <td>{extension.floorName}</td>
              <td>{extension.departmentName}</td>
              <td>{extension.personName}</td>
              <td>{extension.extensionNumber}</td>
              <td>
                <div className="actions">
                  <button
                    className="btn btn-primary btn-small"
                    onClick={() => onEdit(extension)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-danger btn-small"
                    onClick={() => onDelete(extension.id)}
                  >
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ExtensionList;
