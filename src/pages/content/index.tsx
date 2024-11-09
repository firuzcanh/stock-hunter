import { useModals } from "@/router";

import {
  Badge,
  Button,
  DropdownMenu,
  Flex,
  IconButton,
  Table,
  Text,
} from "@radix-ui/themes";
import {
  ChevronDownIcon,
  CoffeeIcon,
  EyeIcon,
  TrashIcon,
  EraserIcon,
} from "lucide-react";
import { Layout } from "@/components";

const ContentPage: React.FC = () => {
  const modals = useModals();

  return (
    <Layout.Content>
      <Layout.Header>
        <Layout.Title>Panel</Layout.Title>
        <Layout.HeaderSlot side="right">
          <Button
            size="1"
            color="red"
            variant="surface"
            onClick={() => modals.open("/modals/reset")}
          >
            <EraserIcon size="14" />
            Hard Reset
          </Button>

          <Button size="1" color="brown" onClick={() => modals.open("/coffee")}>
            <CoffeeIcon size="14" /> Buy coffee
          </Button>
        </Layout.HeaderSlot>
      </Layout.Header>

      <div className="p-6">
        <Flex mb="4">
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
        </Flex>

        <Table.Root variant="surface">
          <Table.Header>
            <Table.Row>
              <Table.ColumnHeaderCell>Original Title</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell>Stock ID</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell>Status</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell>Date</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell>Actions</Table.ColumnHeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            <Table.Row align="center">
              <Table.RowHeaderCell>
                Hand showing credit card, or card, or business card or voucher,
                isolated on white background, template, mock-up
              </Table.RowHeaderCell>
              <Table.Cell>2508063909</Table.Cell>
              <Table.Cell>
                <Badge color="blue" variant="surface">
                  Todo
                </Badge>
              </Table.Cell>
              <Table.Cell>
                <Text wrap="nowrap">08 Nov 2024</Text>
              </Table.Cell>
              <Table.Cell>
                <Flex align="center" gap="2">
                  <IconButton
                    color="gray"
                    variant="surface"
                    size="1"
                    aria-label="View"
                  >
                    <EyeIcon size="14" />
                  </IconButton>
                  <IconButton
                    color="red"
                    variant="surface"
                    size="1"
                    aria-label="Delete"
                  >
                    <TrashIcon size="14" />
                  </IconButton>
                </Flex>
              </Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table.Root>
      </div>
    </Layout.Content>
  );
};

export default ContentPage;
