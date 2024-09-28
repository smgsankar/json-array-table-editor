import { useEffect } from "react";
import { addColumn } from "../utils/factory";

export function AddColumnForm() {
  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    const columnName = formData.get("columnName") as string;
    const defaultValue = formData.get("defaultColumnValue") as string;
    addColumn(columnName, defaultValue);
    form.reset();
  };

  useEffect(() => {
    const columnNameInput = document.querySelector(
      'input[name="columnName"]'
    ) as HTMLInputElement;
    columnNameInput.addEventListener("change", (e) => {
      const input = e.target as HTMLInputElement;
      input.setCustomValidity("");
      if (!input.value.trim()) {
        input.setCustomValidity("Invalid name for JSON key");
      }
    });
  }, []);

  return (
    <form onSubmit={onSubmit}>
      <div className="formItem">
        <label htmlFor="columnName">Column Name:</label>
        <input
          required
          name="columnName"
          type="text"
          placeholder="Enter column name"
        />
      </div>
      <div className="formItem">
        <label htmlFor="defaultColumnValue">Default Value:</label>
        <input
          name="defaultColumnValue"
          type="text"
          placeholder="Enter default value"
        />
      </div>
      <button type="submit">Add Column</button>
    </form>
  );
}
