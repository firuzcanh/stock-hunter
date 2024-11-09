import { Button, Flex, TextField } from "@radix-ui/themes";
import { SubmitHandler, useForm } from "react-hook-form";
import { Panel } from "@/components";

type PanelGenerateForm = {
  text: string;
};

const PanelGenerate: React.FC = () => {
  const form = useForm<PanelGenerateForm>();

  const handleSubmit: SubmitHandler<PanelGenerateForm> = (values) => {
    console.log(">>", values);
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
              {...form.register("text")}
            >
              <TextField.Slot side="right" className="-mr-1.5">
                <Button size="1">Submit</Button>
              </TextField.Slot>
            </TextField.Root>
          </Flex>
        </form>
      </Panel.Content>
    </Panel.Root>
  );
};

export default PanelGenerate;
