import { forwardRef } from "react";
import { useDropzone } from "react-dropzone";

import { Button } from "@radix-ui/themes";
import { UploadIcon } from "lucide-react";

const MediaUploadButton = forwardRef<
  React.ComponentRef<typeof Button>,
  React.ComponentProps<typeof Button>
>((props, ref) => {
  const { getInputProps } = useDropzone({
    onDrop: handleDrop,
    noClick: true,
  });

  async function handleDrop(files: File[]) {
    console.log(files);
  }

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
