import { useState } from "react";
import { useNavigate } from "@/router";
import { SubmitHandler, useForm } from "react-hook-form";
import { useAppDispatch } from "@/store";

import { toast } from "react-hot-toast";

import { Services } from "@/services";
import { ContentActions } from "@/store/features/content.slice";

import { Button, Flex, TextField } from "@radix-ui/themes";
import { Panel } from "@/components";

type PanelGenerateForm = {
  text: string;
};

const PanelGenerate: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const form = useForm<PanelGenerateForm>();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit: SubmitHandler<PanelGenerateForm> = async (values) => {
    try {
      setIsLoading(true);

      const json = Services.Stock.parseJSON(values.text);
      const contentJson = await Services.Stock.convertToContentJSON(json);

      dispatch(ContentActions.upsertOne(contentJson));

      form.reset({ text: "" });
      navigate("/contents/:id", { params: { id: contentJson.id } });
    } catch (error: any) {
      toast.dismiss();
      toast.error(error?.message || "Something went wrong.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Panel.Root>
      <Panel.Header>
        <Panel.Title>Generate</Panel.Title>
      </Panel.Header>

      <Panel.Content>
        <form onSubmit={form.handleSubmit(handleSubmit)}>
          <Flex direction="column" gap="3">
            <TextField.Root
              placeholder="Enter JSON"
              size="3"
              autoComplete="off"
              {...form.register("text")}
            >
              <TextField.Slot side="right" className="-mr-1.5">
                <Button size="1" loading={isLoading}>
                  Submit
                </Button>
              </TextField.Slot>
            </TextField.Root>
          </Flex>
        </form>
      </Panel.Content>
    </Panel.Root>
  );
};

export default PanelGenerate;
