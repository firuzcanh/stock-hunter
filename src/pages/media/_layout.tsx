import { Link } from "@/router";
import { Outlet } from "react-router-dom";

import { Brand, Layout, Panel } from "@/components";
import { Separator } from "@radix-ui/themes";

import PanelContents from "@/widgets/PanelContents/PanelContents";
import PanelExport from "@/widgets/PanelExport/PanelExport";

const MediaLayout: React.FC = () => {
  return (
    <Layout.Root>
      <Layout.Sidebar>
        {/* Brand */}
        <Panel.Root className="justify-center h-[59px] py-0">
          <Link to="/" className="flex items-center text-foreground">
            <Brand className="w-36 h-auto" />
          </Link>
        </Panel.Root>
        <Separator size="4" />

        {/* Contents List */}
        <PanelContents />
      </Layout.Sidebar>

      <Outlet />

      <Layout.Sidebar>
        {/* Export */}
        <PanelExport />
        <Separator size="4" />
      </Layout.Sidebar>
    </Layout.Root>
  );
};

export default MediaLayout;
