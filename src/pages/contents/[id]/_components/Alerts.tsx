import { ContentType } from "@/types/content.type";
import { Callout } from "@radix-ui/themes";

const Alerts: React.FC<{ content: ContentType }> = ({ content }) => {
  if (content.isEditorial) {
    return (
      <Callout.Root color="red">
        <Callout.Text weight="bold">Attention!</Callout.Text>
        <Callout.Text>It's editorial use only content.</Callout.Text>
      </Callout.Root>
    );
  }

  return null;
};

export default Alerts;
