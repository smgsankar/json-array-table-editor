import { HeaderCell } from "./HeaderCell";
import { HeaderIndexCell } from "./HeaderIndexCell";

type Props = {
  headers: string[];
};

export function TableHeader({ headers }: Props) {
  return (
    <thead>
      <tr>
        <HeaderIndexCell />
        {headers.map((header) => (
          <HeaderCell key={header} header={header} />
        ))}
      </tr>
    </thead>
  );
}
