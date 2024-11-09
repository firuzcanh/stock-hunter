import { Link } from "@/router";

import { Button, Separator } from "@radix-ui/themes";
import { Brand, Empty, Layout, Panel } from "@/components";
import { SvgEmpty } from "@/components/illustrations";

import PanelContents from "@/widgets/PanelContents/PanelContents";

const ErrorNotFoundPage: React.FC = () => {
  return (
    <Layout.Root>
      <Layout.Sidebar>
        <Panel.Root className="justify-center h-[59px] py-0">
          <Link to="/" className="flex items-center text-foreground">
            <Brand className="w-36 h-auto" />
          </Link>
        </Panel.Root>

        <Separator size="4" />

        <PanelContents />
      </Layout.Sidebar>

      <Layout.Content className="justify-center items-center">
        {/*  */}
        <Empty.Root className="w-full mb-10">
          <Empty.Icon children={<SvgEmpty />} />
          <Empty.Title className="text-6xl">404</Empty.Title>
          <Empty.Description>Page or content not found</Empty.Description>
          <Button asChild mt="3" color="gray" variant="surface">
            <Link to="/">Go back to contents</Link>
          </Button>
        </Empty.Root>
        {/*  */}
      </Layout.Content>

      <Layout.Sidebar />
    </Layout.Root>
  );
};

export default ErrorNotFoundPage;
