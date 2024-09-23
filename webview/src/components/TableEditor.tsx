import { addRow } from "../utils/factory";
import { getForceUpdateHeader } from "../utils/helpers";
import { TableHeader } from "./TableHeader";
import { DataState } from "../utils/store";
import { DataRow } from "./DataRow";
import "./table.css";

type Props = {
  state: DataState;
};

export function TableEditor({ state }: Props) {
  const { headers, data, forceUpdate } = state;
  return (
    <main>
      <table>
        <TableHeader headers={headers} />
        <tbody>
          {data.map((row, index) => (
            <DataRow
              key={index}
              rowData={row}
              rowIndex={index}
              headers={headers}
              forceUpdateHeader={getForceUpdateHeader(index, forceUpdate)}
            />
          ))}
        </tbody>
      </table>
      <button type="button" onClick={addRow}>
        Add Row
      </button>
    </main>
  );
}
