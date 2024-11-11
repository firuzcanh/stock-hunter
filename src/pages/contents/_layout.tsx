import { Link } from "@/router";
import { Outlet } from "react-router-dom";

import { Brand, Layout } from "@/components";
import { Flex, Separator } from "@radix-ui/themes";

import PanelAIProvider from "@/widgets/PanelAIProvider/PanelAIProvider";
import PanelContents from "@/widgets/PanelContents/PanelContents";
import PanelGenerate from "@/widgets/PanelGenerate/PanelGenerate";
import PanelMedia from "@/widgets/PanelMedia/PanelMedia";
import PanelOptions from "@/widgets/PanelOptions/PanelOptions";
import PanelPlatform from "@/widgets/PanelPlatform/PanelPlatform";

const ContentLayout: React.FC = () => {
  return (
    <Layout.Root>
      <Layout.Sidebar>
        {/* Brand */}
        <Flex align="center" justify="between" className="h-[59px] px-4">
          <Link to="/" className="flex items-center text-foreground">
            <Brand className="w-36 h-auto" />
          </Link>
        </Flex>

        <Separator size="4" />

        {/* Generate Content */}
        <PanelGenerate />
        <Separator size="4" />

        {/* Import Media */}
        <PanelMedia />
        <Separator size="4" />

        {/* Contents List */}
        <PanelContents />
      </Layout.Sidebar>

      <Outlet />

      <Layout.Sidebar>
        {/* Choose Platform */}
        <PanelPlatform />
        <Separator size="4" />

        {/* Choose AI Provider & Model */}
        <PanelAIProvider />
        <Separator size="4" />

        {/* Options */}
        <PanelOptions />
        <Separator size="4" />
      </Layout.Sidebar>
    </Layout.Root>
  );
};

export default ContentLayout;
