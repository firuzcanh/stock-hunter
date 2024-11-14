import { useDropzone } from "react-dropzone";
import { useSelector } from "react-redux";
import { twMerge } from "tailwind-merge";

import { Services } from "@/services";
import { useAppDispatch } from "@/store";
import { MediaActions, MediaSelectors } from "@/store/features/media.slice";

import {
  Badge,
  Button,
  Callout,
  Grid,
  Separator,
  Text,
} from "@radix-ui/themes";
import { InfoIcon } from "lucide-react";
import { Accordion, Empty, Layout } from "@/components";
import { SvgEmpty } from "@/components/illustrations";

import MediaUploadButton from "@/widgets/MediaUploadButton/MediaUploadButton";
import MediaCardItem from "@/widgets/MediaCardItem/MediaCardItem";

const MediaPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const medias = useSelector(MediaSelectors.selectMatchedsWithContents);

  const hasMatchedMedias = medias?.matched?.length > 0;
  const hasUnmatchedMedias = medias?.unmatched?.length > 0;

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: handleDrop,
    noClick: true,
  });

  async function handleDrop(files: File[]) {
    const data = await Services.Media.convertMultipleFileToMediaJSON(files);
    dispatch(MediaActions.upsertMany(data));
  }

  const handleBindMediasToContents = () => {
    dispatch(MediaActions.syncWithContents());
  };

  return (
    <Layout.Content
      className={twMerge(isDragActive && "bg-blue-100")}
      {...getRootProps()}
    >
      <Layout.Header>
        <Layout.Title>Media manager</Layout.Title>

        <Layout.HeaderSlot side="right">
          <MediaUploadButton dropZoneState={{ getInputProps }} />
        </Layout.HeaderSlot>
      </Layout.Header>

      {(hasMatchedMedias || hasUnmatchedMedias) && (
        <div className="px-6 py-6">
          <Accordion.Root
            type="multiple"
            defaultValue={["non-matched", "matched"]}
            className="-mx-3"
          >
            {/* Start Non Matched Images */}
            {hasUnmatchedMedias && (
              <Accordion.Item value="non-matched">
                <Accordion.Trigger>
                  <Text>
                    Non matched{" "}
                    <Badge ml="1" color="red">
                      {medias?.unmatched?.length}
                    </Badge>
                  </Text>
                </Accordion.Trigger>

                <Accordion.Content>
                  {/* Start Alert */}
                  <Callout.Root variant="surface">
                    <Callout.Icon>
                      <InfoIcon size="24" />
                    </Callout.Icon>
                    <Callout.Text weight="bold">
                      Would you like to bind images to contents below?
                    </Callout.Text>
                    <Callout.Text>
                      You can bind contents for unmatched images by adding stock
                      id. Just click <b>Bind images to contents</b> button after
                      adding stock ids
                    </Callout.Text>
                    <div className="mt-1">
                      <Button
                        color="green"
                        variant="solid"
                        onClick={handleBindMediasToContents}
                      >
                        Bind images to contents
                      </Button>
                    </div>
                  </Callout.Root>
                  {/* End Alert */}

                  <Grid columns="4" gap="4" mt="4">
                    {medias.unmatched.map((media) => {
                      return <MediaCardItem key={media.id} media={media} />;
                    })}
                  </Grid>
                </Accordion.Content>
              </Accordion.Item>
            )}
            {/* End Non Matched Images */}

            {hasUnmatchedMedias && (
              <div className="px-3" children={<Separator my="4" size="4" />} />
            )}

            {/* Start Matched Images */}
            {hasMatchedMedias && (
              <Accordion.Item value="matched">
                <Accordion.Trigger>
                  <Text>
                    Matched <Badge ml="1">{medias.matched.length}</Badge>
                  </Text>
                </Accordion.Trigger>

                <Accordion.Content>
                  <Grid columns="4" gap="4">
                    {medias.matched.map((media) => {
                      return <MediaCardItem key={media.id} media={media} />;
                    })}
                  </Grid>
                </Accordion.Content>
              </Accordion.Item>
            )}
            {/* End Matched Images */}
          </Accordion.Root>
        </div>
      )}

      {!(hasMatchedMedias || hasUnmatchedMedias) && (
        <div className="flex-1 flex flex-col justify-center container max-w-screen-sm mb-10">
          <Empty.Root>
            <Empty.Icon children={<SvgEmpty />} />
            <Empty.Title>No any media found</Empty.Title>
            <Empty.Description>
              Drag and drop images here or choose them by clicking choose files
              button
            </Empty.Description>
          </Empty.Root>
        </div>
      )}
    </Layout.Content>
  );
};

export default MediaPage;
