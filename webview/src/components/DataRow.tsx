import { memo } from "react";
import { DataCell } from "./DataCell";
import { IndexCell } from "./IndexCell";

type Props = {
  rowIndex: number;
  headers: string[];
  rowData: Record<string, string>;
};

function BareDataRow({ rowIndex, headers, rowData }: Props) {
  return (
    <tr key={rowIndex}>
      <IndexCell index={rowIndex + 1} />
      {headers.map((header) => (
        <DataCell
          key={`${header}_${rowIndex}`}
          datum={rowData[header]}
          rowIndex={rowIndex}
          header={header}
        />
      ))}
    </tr>
  );
}

export const DataRow = memo(BareDataRow, (prev, next) => {
  return (
    prev.rowIndex === next.rowIndex &&
    prev.headers === next.headers &&
    JSON.stringify(prev.rowData) === JSON.stringify(next.rowData)
  );
});
