import { useCallback } from "react";
import { Link } from "@/router";
import { Outlet, useSearchParams } from "react-router-dom";

import { Brand, Layout } from "@/components";
import { Flex } from "@radix-ui/themes";

import PanelFolders from "@/widgets/PanelFolders/PanelFolders";
import PanelGenerate from "@/widgets/PanelGenerate/PanelGenerate";

import { ContentDrawerContext } from "./_components/drawer-context";
import ContentDetail from "./_components/ContentDetail";

const Divider = () => <div className="h-px bg-divider" />;

const ContentLayout: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const selectedId = searchParams.get("item");

  const open = useCallback(
    (id: string) => {
      setSearchParams(
        (prev) => {
          const next = new URLSearchParams(prev);
          next.set("item", id);
          return next;
        },
        { replace: true }
      );
    },
    [setSearchParams]
  );

  const close = useCallback(() => {
    setSearchParams(
      (prev) => {
        const next = new URLSearchParams(prev);
        next.delete("item");
        return next;
      },
      { replace: true }
    );
  }, [setSearchParams]);

  return (
    <ContentDrawerContext.Provider value={{ selectedId, open, close }}>
      <Layout.Root>
        <Layout.Sidebar>
          {/* Brand */}
          <Flex align="center" justify="between" className="h-[59px] px-4">
            <Link to="/" className="flex items-center text-foreground">
              <Brand className="w-36 h-auto" />
            </Link>
          </Flex>

          <Divider />

          {/* Generate Content */}
          <PanelGenerate />
          <Divider />

          {/* Folder Management */}
          <PanelFolders />
        </Layout.Sidebar>

        <Outlet />

        {/* Detail Drawer */}
        {selectedId ? (
          <Layout.Sidebar
            key={selectedId}
            className="w-[440px] border-l border-divider animate-drawer-in"
          >
            <ContentDetail contentId={selectedId} onClose={close} />
          </Layout.Sidebar>
        ) : null}
      </Layout.Root>
    </ContentDrawerContext.Provider>
  );
};

export default ContentLayout;
