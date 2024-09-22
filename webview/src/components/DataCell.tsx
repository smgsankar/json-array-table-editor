import { useRef, useEffect, useState, memo } from "react";
import { updateCellContent } from "../utils/factory";
import throttle from "lodash.throttle";

type Props = {
  datum: string;
  header: string;
  rowIndex: number;
};

function BareDataCell({ datum, header, rowIndex }: Props) {
  const ref = useRef<HTMLTextAreaElement>(null);

  const updateContentToDocument = (value: string) => {
    updateCellContent(rowIndex, header, value);
  };

  const throttledUpdate = useRef(
    throttle(updateContentToDocument, 1000)
  ).current;

  const onChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = event.target;
    throttledUpdate(value);
  };

  useEffect(() => {
    if (!ref.current || document.activeElement === ref.current) return;
    ref.current.value = datum;
  }, [datum]);

  return (
    <td className="cell">
      <textarea ref={ref} onChange={onChange} />
    </td>
  );
}

export const DataCell = memo(BareDataCell);
