import { Link } from "@/router";

import { Brand, Layout } from "@/components";

import PanelAIProvider from "@/widgets/PanelAIProvider/PanelAIProvider";
import PanelAppearance from "@/widgets/PanelAppearance/PanelAppearance";
import PanelOptions from "@/widgets/PanelOptions/PanelOptions";
import PanelPlatform from "@/widgets/PanelPlatform/PanelPlatform";

const SettingsPage: React.FC = () => {
  return (
    <Layout.Root>
      <Layout.Content>
        <Layout.Header>
          <Link to="/" className="flex items-center text-foreground mr-4">
            <Brand className="w-32 h-auto" />
          </Link>
          <Layout.Title>Settings</Layout.Title>
        </Layout.Header>

        <div className="flex-1 overflow-y-auto p-8">
          <div className="max-w-2xl mx-auto rounded-m3-xl border border-border bg-panel shadow-m3-1 divide-y divide-border overflow-hidden">
            {/* Appearance */}
            <PanelAppearance />

            {/* Choose Platform */}
            <PanelPlatform />

            {/* Choose AI Provider & Model */}
            <PanelAIProvider />

            {/* Options */}
            <PanelOptions />
          </div>
        </div>
      </Layout.Content>
    </Layout.Root>
  );
};

export default SettingsPage;
