import { forwardRef } from "react";
import { DropzoneState } from "react-dropzone";

import { Button } from "@radix-ui/themes";
import { UploadIcon } from "lucide-react";

const MediaUploadButton = forwardRef<
  React.ComponentRef<typeof Button>,
  React.ComponentProps<typeof Button> & {
    dropZoneState: { getInputProps: DropzoneState["getInputProps"] };
  }
>(({ dropZoneState, ...props }, ref) => {
  const { getInputProps } = dropZoneState || {};

  return (
    <label>
      <input type="file" {...getInputProps()} />
      <Button ref={ref} asChild size="3" variant="ghost" {...props}>
        <div>
          <UploadIcon size="16" /> Choose Files
        </div>
      </Button>
    </label>
  );
});
MediaUploadButton.displayName = "MediaUploadButton";

export default MediaUploadButton;
