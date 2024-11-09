import { Table } from "@radix-ui/themes";

const TableArea: React.FC = () => {
  return (
    <Table.Root variant="surface">
      <Table.Header>
        <Table.Row>
          <Table.ColumnHeaderCell>Title</Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell>Keywords</Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell>Category</Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell>Filename</Table.ColumnHeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        <Table.Row>
          <Table.Cell>Some Title</Table.Cell>
          <Table.Cell>Some Keywords</Table.Cell>
          <Table.Cell>Some Category</Table.Cell>
          <Table.Cell>Some Filename</Table.Cell>
        </Table.Row>
      </Table.Body>
    </Table.Root>
  );
};

export default TableArea;
