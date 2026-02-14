import { Table } from "../Table";

export interface DataTableTableProps extends Table.ContentProps {}

export const DataTableTable = (props: DataTableTableProps) => {
  return <Table.Content {...props} />;
};
