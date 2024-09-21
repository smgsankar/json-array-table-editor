type Props = {
  index: number;
};

export function IndexCell({ index }: Props) {
  return (
    <td tabIndex={0} className="cell index-cell resize resize-y">
      {index}
    </td>
  );
}
