import { Flex } from "@radix-ui/themes";
import { Layout } from "@/components";

import FormArea from "./_components/FormArea";
import TableArea from "./_components/TableArea";

const CustomContentsPage: React.FC = () => {
  return (
    <Layout.Content className="border-l-0">
      <Layout.Header>
        <Layout.Title>Custom Contents</Layout.Title>
      </Layout.Header>

      <Flex direction="column" gap="6" className="p-6">
        <FormArea />

        <TableArea />
      </Flex>
    </Layout.Content>
  );
};

export default CustomContentsPage;
