import { useRef, KeyboardEvent } from "react";
import { deleteColumn } from "../utils/factory";

type Props = {
  header: string;
};

export function HeaderCell({ header }: Props) {
  const ref = useRef<HTMLTableCellElement>(null);

  const onClick = () => {
    ref.current?.focus();
  };

  const onKeyDown = (e: KeyboardEvent<HTMLTableCellElement>) => {
    if (e.key === "Delete" || e.key === "Backspace") {
      deleteColumn(header);
    }
  };

  return (
    <th
      tabIndex={0}
      onClick={onClick}
      onKeyDown={onKeyDown}
      className="cell index-cell resize resize-x"
    >
      {header}
    </th>
  );
}
