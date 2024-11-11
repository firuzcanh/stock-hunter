import type { ContentType } from "@/types/content.type";

import { useMemo, useState } from "react";
import { Link, useModals } from "@/router";
import { useAppDispatch, useAppSelector } from "@/store";
import { format } from "date-fns";

import {
  ContentActions,
  ContentSelectors,
} from "@/store/features/content.slice";

import { createColumnHelper, RowSelectionState } from "@tanstack/react-table";
import {
  Badge,
  Button,
  DropdownMenu,
  Flex,
  IconButton,
  Select,
  Text,
} from "@radix-ui/themes";
import {
  ChevronDownIcon,
  CoffeeIcon,
  EyeIcon,
  TrashIcon,
  EraserIcon,
} from "lucide-react";
import { Confirm, Layout, Table } from "@/components";

import { CONTENT_STATUSES } from "@/constants/data";

const ContentsPage: React.FC = () => {
  const modals = useModals();
  const dispatch = useAppDispatch();

  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});

  const contents = useAppSelector((state) =>
    ContentSelectors.selectAll(state.content)
  );
  const selectedContents = useMemo(
    () => contents?.filter((_, index) => rowSelection[index]),
    [contents, rowSelection]
  );

  const selectedContentIDs = useMemo(
    () => selectedContents?.map((content) => content.id),
    [selectedContents]
  );

  const columnHelper = createColumnHelper<ContentType>();
  const columns = [
    columnHelper.display({
      id: "select",
      header: ({ table }) => {
        return (
          <input
            type="checkbox"
            checked={table.getIsAllRowsSelected()}
            onChange={table.getToggleAllRowsSelectedHandler()}
          />
        );
      },
      cell: ({ row }) => (
        <input
          type="checkbox"
          {...{
            checked: row.getIsSelected(),
            disabled: !row.getCanSelect(),
            onChange: row.getToggleSelectedHandler(),
          }}
        />
      ),
    }),

    columnHelper.accessor("title", {
      header: "Title",
      cell: ({ row }) => (
        <Link
          to="/contents/:id"
          params={{ id: row.original.id }}
          className="inline-block hover:underline"
        >
          {row.original.title}
        </Link>
      ),
    }),
    columnHelper.accessor("stockId", {
      header: "Stock ID",
      cell: ({ row }) => (
        <a
          href={`https://www.shutterstock.com/image-photo/${row.original.stockId}`}
          target="_blank"
          rel="nofollow noreferrel"
          className="inline-block hover:underline"
        >
          {row.original.stockId}
        </a>
      ),
    }),
    columnHelper.accessor("status", {
      header: "Status",
      cell: ({ getValue }) => {
        const status = CONTENT_STATUSES[getValue()] || CONTENT_STATUSES.TODO;
        return <Badge color={status.color as any}>{status.label}</Badge>;
      },
    }),
    columnHelper.accessor("createdAt", {
      header: "Created",
      cell: ({ getValue }) => (
        <Text wrap="nowrap">
          {getValue() ? format(getValue(), "dd MMM yyyy") : "-"}
        </Text>
      ),
    }),
    columnHelper.display({
      id: "actions",
      header: "Actions",
      cell: ({ row }) => (
        <Flex align="center" gap="2">
          <IconButton
            asChild
            color="gray"
            variant="soft"
            size="1"
            aria-label="View"
          >
            <Link to="/contents/:id" params={{ id: row.original.id }}>
              <EyeIcon size="14" />
            </Link>
          </IconButton>

          <IconButton
            color="red"
            variant="soft"
            size="1"
            aria-label="Delete"
            onClick={() => handleDelete(row.original.id)}
          >
            <TrashIcon size="14" />
          </IconButton>
        </Flex>
      ),
    }),
  ];

  const handleDelete = (id: string) => {
    dispatch(ContentActions.removeOne(id));
  };

  const handleDeleteMany = () => {
    dispatch(ContentActions.removeMany(selectedContentIDs));
  };

  const handleChangeStatus = (status: any | null) => {
    setRowSelection({});
    dispatch(
      ContentActions.updateMany(
        selectedContents?.map((content) => ({ ...content, status: status }))
      )
    );
  };

  return (
    <Layout.Content>
      <Layout.Header>
        <Layout.Title>Panel</Layout.Title>

        <Layout.HeaderSlot side="right">
          <Button
            size="1"
            color="red"
            onClick={() => modals.open("/modals/reset")}
          >
            <EraserIcon size="14" />
            Hard Reset
          </Button>

          <Button
            size="1"
            color="brown"
            onClick={() => modals.open("/modals/coffee")}
          >
            <CoffeeIcon size="14" /> Buy coffee
          </Button>
        </Layout.HeaderSlot>
      </Layout.Header>

      <div className="flex-1 flex flex-col p-6">
        <Table.Root
          columns={columns}
          data={contents}
          state={{
            rowSelection,
          }}
          listeners={{ onRowSelectionChange: setRowSelection }}
        >
          <Table.Header
            startContent={
              <DropdownMenu.Root>
                <DropdownMenu.Trigger>
                  <Button color="gray" variant="surface">
                    <Text>
                      Status: <Text className="font-semibold">All</Text>
                    </Text>
                    <ChevronDownIcon size="16" />
                  </Button>
                </DropdownMenu.Trigger>

                <DropdownMenu.Content>
                  <DropdownMenu.Item>All</DropdownMenu.Item>
                  <DropdownMenu.Item>Todo</DropdownMenu.Item>
                  <DropdownMenu.Item>Done</DropdownMenu.Item>
                </DropdownMenu.Content>
              </DropdownMenu.Root>
            }
            endContent={
              selectedContentIDs?.length ? (
                <>
                  <Confirm
                    description="You'll lost all data after clear them"
                    onConfirm={handleDeleteMany}
                  >
                    <IconButton color="red" variant="soft">
                      <TrashIcon className="w-4" />
                    </IconButton>
                  </Confirm>

                  <Select.Root onValueChange={handleChangeStatus}>
                    <Select.Trigger placeholder="Select Status" />

                    <Select.Content>
                      {Object.values(CONTENT_STATUSES).map((status) => {
                        return (
                          <Select.Item key={status.value} value={status.value}>
                            {status.label}
                          </Select.Item>
                        );
                      })}
                    </Select.Content>
                  </Select.Root>
                </>
              ) : null
            }
          />
          <Table.Body className="flex-1" />
        </Table.Root>
      </div>
    </Layout.Content>
  );
};

export default ContentsPage;
