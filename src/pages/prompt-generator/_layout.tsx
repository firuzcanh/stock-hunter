import { Outlet } from "react-router-dom";

import { Separator } from "@radix-ui/themes";
import { Layout } from "@/components";

import PanelAIProvider from "@/widgets/PanelAIProvider/PanelAIProvider";
import PanelExport from "@/widgets/PanelExport/PanelExport";

const PromptGeneratorLayout: React.FC = () => {
  return (
    <Layout.Root>
      <Outlet />

      <Layout.Sidebar>
        <PanelAIProvider />
        <Separator size="4" />

        <PanelExport />
        <Separator size="4" />
      </Layout.Sidebar>
    </Layout.Root>
  );
};

export default PromptGeneratorLayout;
