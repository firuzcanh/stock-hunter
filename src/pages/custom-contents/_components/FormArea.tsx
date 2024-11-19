import { useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";

import toast from "react-hot-toast";
import { parseJsonFromText } from "@/utils/functions";

import { Services } from "@/services";
import { useAppDispatch, useAppSelector } from "@/store";
import { CustomContentActions } from "@/store/features/custom-content";

import {
  Button,
  Card,
  Flex,
  Grid,
  IconButton,
  Select,
  Text,
  TextField,
  Tooltip,
} from "@radix-ui/themes";
import { LockIcon, PlusIcon, UnlockIcon, XIcon } from "lucide-react";

type FormType = {
  category: string;
};

const FormArea: React.FC = () => {
  const dispatch = useAppDispatch();
  const inputs = useAppSelector((state) => state.customContent.inputs);

  const form = useForm<FormType>({
    defaultValues: {
      category: "",
    },
  });

  const handleAppendInput = () => {
    dispatch(CustomContentActions.appendInput());
  };

  const handleChangeInput = (index: number, value: string) => {
    dispatch(CustomContentActions.updateInput({ index, changes: { value } }));
  };

  const handleToggleLockInput = (index: number, is_locked: boolean) => {
    dispatch(
      CustomContentActions.updateInput({ index, changes: { is_locked } })
    );
  };

  const handleRemoveInput = (index: number) => {
    dispatch(CustomContentActions.removeOneInput(index));
  };

  const [isLoadingSubmit, setIsLoadingSubmit] = useState(false);
  const handleSubmit: SubmitHandler<FormType> = async ({ category }) => {
    try {
      setIsLoadingSubmit(true);
      const inputsAsMessage = inputs?.map((i) => i.value).join(" ");
      const message = `
I'm using midjurney to create images. I need creative prompts and titles.
I will give you input with the main idea of what I need. You should create:
1. A detailed prompt for midjourney
2. A title (100-200 characters, capturing the key essence)
3. 30 relevant keywords

Response should be a JSON array of objects:
[{
  "prompt": "detailed midjourney prompt",
  "title": "shorter but descriptive title (min: 100 characters)",
  "keywords": "comma-separated keywords"
}]
Create 5 items. Return only the JSON array.      
  
Input: ${inputsAsMessage}
  `;

      const response = await Services.AI.completions(message);

      if (!response.status) return response.error;

      const json = parseJsonFromText(response.data.text)?.map(
        (content: any) => ({
          ...content,
          category,
        })
      );

      dispatch(CustomContentActions.appendManyContent(json));
      dispatch(CustomContentActions.clearUnlockedInputs());
    } catch (error: any) {
      const message = error.message || "Something went wrong. Try again.";
      toast.error(message);
    } finally {
      setIsLoadingSubmit(false);
    }
  };

  return (
    <Card size="3">
      <Text as="div" size="2" weight="medium" mb="4">
        Enter your keyword, title or prompt
      </Text>

      {/* Create Prompts */}
      <Flex asChild direction="column" gap="3">
        <form onSubmit={form.handleSubmit(handleSubmit)}>
          <Grid columns="3" gap="3">
            {/* Fields */}
            {inputs?.map((input, index) => {
              return (
                <TextField.Root
                  key={index}
                  value={input.value}
                  placeholder="Enter title here"
                  className="group"
                  readOnly={input.is_locked || isLoadingSubmit}
                  onChange={(e) => handleChangeInput(index, e.target.value)}
                >
                  <TextField.Slot
                    side="right"
                    gap="2"
                    className="hidden group-hover:flex"
                  >
                    <IconButton
                      type="button"
                      size="1"
                      color="gray"
                      variant="surface"
                      aria-label="Lock"
                      onClick={() =>
                        handleToggleLockInput(index, !input.is_locked)
                      }
                    >
                      {input.is_locked ? (
                        <LockIcon size="14" />
                      ) : (
                        <UnlockIcon size="14" />
                      )}
                    </IconButton>

                    <IconButton
                      type="button"
                      size="1"
                      color="red"
                      variant="solid"
                      aria-label="Remove"
                      disabled={input.is_locked}
                      onClick={() => handleRemoveInput(index)}
                    >
                      <XIcon size="14" />
                    </IconButton>
                  </TextField.Slot>
                </TextField.Root>
              );
            })}

            {/* Add new */}
            <Tooltip content="Add new input">
              <IconButton
                type="button"
                color="gray"
                variant="surface"
                aria-label="Add new input"
                onClick={handleAppendInput}
              >
                <PlusIcon size="16" />
              </IconButton>
            </Tooltip>
          </Grid>

          <Flex align="center" gap="2">
            <Button type="submit" loading={isLoadingSubmit}>
              Create prompts
            </Button>

            <Controller
              control={form.control}
              name="category"
              render={({ field }) => (
                <Select.Root value={field.value} onValueChange={field.onChange}>
                  <Select.Trigger placeholder="Category" />

                  <Select.Content>
                    {Services.AdobeStock.getCategories().map((category) => (
                      <Select.Item
                        key={category.value}
                        value={`${category.value}`}
                      >
                        {category.label}
                      </Select.Item>
                    ))}
                  </Select.Content>
                </Select.Root>
              )}
            />
          </Flex>
        </form>
      </Flex>
    </Card>
  );
};

export default FormArea;
