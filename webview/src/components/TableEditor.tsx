import { DataRow } from "./DataRow";
import { TableHeader } from "./TableHeader";
import "./table.css";

type Props = {
  data: Record<string, string>[];
  headers: string[];
};

export function TableEditor({ data, headers }: Props) {
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
            />
          ))}
        </tbody>
      </table>
    </main>
  );
}
