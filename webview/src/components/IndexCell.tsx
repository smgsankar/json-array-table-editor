import { type MouseEvent, type KeyboardEvent, useRef } from "react";
import { deleteRow } from "../utils/factory";

type Props = {
  index: number;
};

export function IndexCell({ index }: Props) {
  const ref = useRef<HTMLTableCellElement>(null);

  const onClick = () => {
    ref.current?.focus();
  };

  const onKeyDown = (e: KeyboardEvent<HTMLTableCellElement>) => {
    if (e.key === "Delete") {
      deleteRow(index);
    }
  };

  return (
    <td
      tabIndex={0}
      onClick={onClick}
      onKeyDown={onKeyDown}
      className="cell index-cell resize resize-y"
    >
      {index + 1}
    </td>
  );
}
