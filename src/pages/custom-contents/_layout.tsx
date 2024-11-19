import { Outlet } from "react-router-dom";

import { Separator } from "@radix-ui/themes";
import { Layout } from "@/components";

import PanelAIProvider from "@/widgets/PanelAIProvider/PanelAIProvider";
import PanelExportCustomContents from "@/widgets/PanelExportCustomContents/PanelExportCustomContents";

const CustomContentsLayout: React.FC = () => {
  return (
    <Layout.Root>
      <Outlet />

      <Layout.Sidebar>
        <PanelAIProvider />
        <Separator size="4" />

        <PanelExportCustomContents />
        <Separator size="4" />
      </Layout.Sidebar>
    </Layout.Root>
  );
};

export default CustomContentsLayout;
