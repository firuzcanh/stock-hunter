import { Controller, useForm } from "react-hook-form";

import {
  Button,
  Flex,
  Progress,
  Text,
  TextArea,
  TextField,
} from "@radix-ui/themes";

import { shuffleArray } from "@/utils/functions";

const ToolShuffleKeywords: React.FC = () => {
  const form = useForm({
    defaultValues: {
      keywords: "",
      offset: 8,
    },
  });

  const keywords = form.watch("keywords");
  const keywordsLength = keywords?.split(",").length || 1;
  const keywordsPercent = +((keywordsLength / 49) * 100).toFixed(0);

  const handleShuffleKeywords = () => {
    const offset = form.getValues("offset");
    let keywords: string | string[] = form.getValues("keywords");

    const filteredKeywords = keywords
      .split(",")
      .filter(Boolean)
      .map((keyword) => keyword.trim());

    keywords = shuffleArray(filteredKeywords, offset);
    keywords = keywords.join(", ");

    form.setValue("keywords", keywords);
  };

  return (
    <Flex direction="column" align="start" gap="3">
      <Controller
        control={form.control}
        name="keywords"
        render={({ field }) => {
          return (
            <TextArea
              placeholder="Enter keywords and separate them by using comma"
              size="3"
              className="w-full"
              value={field.value}
              onChange={field.onChange}
            />
          );
        }}
      />

      <Flex align="center" justify="between" wrap="wrap" className="w-full">
        <Flex gap="4" align="center">
          <Button size="3" onClick={handleShuffleKeywords}>
            Shuffle Keywords
          </Button>

          <Flex align="center" gap="3" className="w-[140px]">
            <Progress
              value={keywordsPercent}
              color={keywordsPercent > 100 ? "red" : "green"}
              size="3"
            />
            <Text size="2" color="gray" weight="medium">
              {keywordsLength}/49
            </Text>
          </Flex>
        </Flex>

        <Flex>
          <Controller
            control={form.control}
            name="offset"
            defaultValue={8}
            render={({ field }) => {
              return (
                <TextField.Root
                  type="number"
                  placeholder="0"
                  size="3"
                  value={field.value}
                  onChange={(e) => field.onChange(+e.target.value)}
                >
                  <TextField.Slot>Offset</TextField.Slot>
                </TextField.Root>
              );
            }}
          />
        </Flex>
      </Flex>
    </Flex>
  );
};

export default ToolShuffleKeywords;
