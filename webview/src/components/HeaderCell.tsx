type Props = {
  header: string;
};

export function HeaderCell({ header }: Props) {
  return (
    <th tabIndex={0} className="cell index-cell resize resize-x">
      {header}
    </th>
  );
}
