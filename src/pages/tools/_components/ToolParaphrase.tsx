import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

import { Services } from "@/services";

import toast from "react-hot-toast";
import { Button, DataList, Flex, Separator, TextArea } from "@radix-ui/themes";
import { Copy, Marker } from "@/components";

type ToolParaphraseFormType = {
  title: string;
};

const ToolParaphrase: React.FC = () => {
  const form = useForm<ToolParaphraseFormType>({
    defaultValues: {
      title: "",
    },
  });

  const [history, setHistory] = useState<string[]>([]);
  const [isLoading, setLoading] = useState<boolean>(false);

  const handleSubmit: SubmitHandler<ToolParaphraseFormType> = async ({
    title,
  }) => {
    try {
      if (!title) return;
      setLoading(true);

      const response = await Services.AI.paraphrase(title);
      const titleParaphrased = response?.data?.text;

      setHistory((prev) => [titleParaphrased, ...prev]);
      form.reset({ title: "" });
    } catch (error: any) {
      toast.error(error?.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Flex direction="column" gap="5">
      <Flex asChild direction="column" align="start" gap="3">
        <form onSubmit={form.handleSubmit(handleSubmit)}>
          <TextArea
            placeholder="Enter title here"
            className="w-full"
            {...form.register("title")}
          />
          <Button loading={isLoading}>Paraphrase</Button>
        </form>
      </Flex>

      {history?.length ? (
        <>
          <Separator size="4" />

          <DataList.Root>
            {history?.map((value, index) => (
              <DataList.Item key={index}>
                <DataList.Label>
                  <Copy.Slot value={value}>
                    <Marker className="ring-highlight hover:bg-highlight">
                      {value}
                    </Marker>
                  </Copy.Slot>
                </DataList.Label>
              </DataList.Item>
            ))}
          </DataList.Root>
        </>
      ) : null}
    </Flex>
  );
};

export default ToolParaphrase;
