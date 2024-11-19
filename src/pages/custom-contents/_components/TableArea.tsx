import { CustomContentType } from "@/types/custom-content.type";

import { useMemo, useState } from "react";
import { differenceInMilliseconds } from "date-fns";

import { useAppDispatch, useAppSelector } from "@/store";
import {
  CustomContentActions,
  CustomContentSelectors,
} from "@/store/features/custom-content";
import { Services } from "@/services";

import { Badge, Box, Button } from "@radix-ui/themes";
import { createColumnHelper, RowSelectionState } from "@tanstack/react-table";
import { TrashIcon } from "lucide-react";

import { Copy, Empty, Table } from "@/components";
import TableHeader from "@/components/Table/TableHeader";

const TableArea: React.FC = () => {
  const dispatch = useAppDispatch();

  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});

  const _contents = useAppSelector((state) => state.customContent.contents);
  const medias = useAppSelector(CustomContentSelectors.selectMatchedMedias);

  const contents = useMemo(() => {
    const newContents = structuredClone(_contents || []);
    newContents?.sort((a, b) =>
      differenceInMilliseconds(b.createdAt!, a.createdAt!)
    );
    return newContents;
  }, [_contents]);

  const selectedContents = useMemo(
    () => contents?.filter((_, index) => rowSelection[index]),
    [contents, rowSelection]
  );

  const columnHelper = createColumnHelper<CustomContentType>();
  const columns = [
    columnHelper.display({
      id: "select",
      size: 0,
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

    columnHelper.accessor("prompt", {
      header: "Prompt",
      size: 300,
      cell: ({ getValue, row }) => (
        <Copy.Slot value={`${getValue()} ID_${row.original.id}`}>
          <span>{getValue()}</span>
        </Copy.Slot>
      ),
    }),
    columnHelper.accessor("title", {
      header: "Title",
      cell: ({ getValue, row }) => (
        <Copy.Slot value={`${getValue()} ID_${row.original.id}`}>
          <span>{getValue()}</span>
        </Copy.Slot>
      ),
    }),
    columnHelper.accessor("keywords", {
      header: "Keywords",
      cell: ({ getValue }) => (
        <Copy.Slot value={`${getValue()}`}>
          <span>{getValue()}</span>
        </Copy.Slot>
      ),
    }),
    columnHelper.accessor("category", {
      header: "Category",
      size: 10,
      cell: ({ getValue }) => {
        const category = Services.AdobeStock.getCategoryById(+getValue());
        return <Badge>{category?.label || "---"}</Badge>;
      },
    }),

    columnHelper.display({
      id: "medias",
      header: "Medias",
      size: 10,
      cell: ({ row }) => {
        const contentMedias = medias?.filter(
          (media) => media.contentId === row.original.id
        );
        const matchedSize = contentMedias?.length || 0;

        return (
          <Badge color={!matchedSize ? "gray" : "green"}>
            {matchedSize ? `Matched with ${matchedSize} media` : "Not matched"}
          </Badge>
        );
      },
    }),
  ];

  const handleDeleteSelecteds = () => {
    selectedContents?.forEach((content) => {
      dispatch(CustomContentActions.removeOneContent(content.id!));
    });
    setRowSelection({});
  };

  if (!contents?.length) {
    return (
      <Empty.Root className="mt-10">
        <Empty.Title>Boşdur</Empty.Title>
        <Empty.Description>
          Hər hansı bir content əlavə edilməyib
        </Empty.Description>
      </Empty.Root>
    );
  }

  return (
    <Box>
      <Table.Root
        columns={columns}
        data={contents}
        state={{ rowSelection }}
        listeners={{ onRowSelectionChange: setRowSelection }}
      >
        <TableHeader
          endContent={
            selectedContents?.length > 0 ? (
              <Button color="red" onClick={handleDeleteSelecteds}>
                <TrashIcon size="16" />
                Sil
              </Button>
            ) : null
          }
        />

        <Table.Body />
      </Table.Root>
    </Box>
  );
};

export default TableArea;
