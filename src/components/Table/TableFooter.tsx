import { useContext } from "react";
import { TableContext } from "./context";
import { Button, Flex, Select, Separator, Text } from "@radix-ui/themes";
import { ArrowLeftIcon, ArrowRightIcon } from "lucide-react";

const limitOptions = [20, 50, 100, 500];

const TableFooter: React.FC = () => {
  const { table } = useContext(TableContext);
  const { pageSize, pageIndex } = table.getState().pagination;
  const pageNumber = pageIndex + 1;
  const totalRecords = table.getCoreRowModel().rows.length;

  return (
    <Flex mt="4" gap="4" justify="between" align="center">
      <Flex gap="3" align="center">
        <Select.Root value={`${pageSize}`}>
          <Select.Trigger placeholder="Show" />

          <Select.Content>
            {limitOptions.map((option) => (
              <Select.Item value={`${option}`} key={option}>
                {option}
              </Select.Item>
            ))}
          </Select.Content>
        </Select.Root>

        <Separator orientation="vertical" size="4" mx="1" className="h-4" />

        <Text size="2" color="gray">
          Total rows: {totalRecords}
        </Text>
      </Flex>

      <Flex gap="3" align="center">
        <Text size="2" color="gray">
          Page: {pageNumber}
        </Text>

        <Separator orientation="vertical" size="4" mx="1" className="h-4" />

        <Button
          color="gray"
          variant="soft"
          disabled={!table.getCanPreviousPage()}
          onClick={() => table.previousPage()}
        >
          <ArrowLeftIcon size="16" />
        </Button>

        <Button
          color="gray"
          variant="soft"
          disabled={!table.getCanNextPage()}
          onClick={() => table.nextPage()}
        >
          <ArrowRightIcon size="16" />
        </Button>
      </Flex>
    </Flex>
  );
};

export default TableFooter;
