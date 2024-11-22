export function shuffleArray(array: any[], offset: number = 0): any[] {
  // Input validation
  if (offset < 0) {
    throw new Error("Offset must be non-negative");
  }

  const result = [...array];
  const effectiveOffset = Math.min(offset - 1, array.length - 1);

  // Shuffle first part (0 to offset)
  for (let i = 0; i <= effectiveOffset; i++) {
    const randomIndex =
      Math.floor(Math.random() * (effectiveOffset + 1 - i)) + i;
    [result[i], result[randomIndex]] = [result[randomIndex], result[i]];
  }

  // Shuffle second part (offset+1 to end)
  for (let i = effectiveOffset + 1; i < array.length; i++) {
    const randomIndex = Math.floor(Math.random() * (array.length - i)) + i;
    [result[i], result[randomIndex]] = [result[randomIndex], result[i]];
  }

  return result;
}

export async function getResizedImageDataUrl(
  file: Blob | MediaSource,
  {
    width,
    height,
    quality = 0.8,
  }: { width?: number; height?: number; quality?: number } = {}
): Promise<string | null> {
  return new Promise<string | null>((resolve, reject) => {
    const image = new Image();
    image.src = URL.createObjectURL(file);

    image.onload = () => {
      const { width: imageWidth, height: imageHeight } = image;
      const canvas = document.createElement("canvas");
      let ctx: CanvasRenderingContext2D | null = null;

      if (width && height) {
        canvas.width = width;
        canvas.height = height;
      } else if (width) {
        canvas.width = width;
        canvas.height = Math.floor((imageHeight * width) / imageWidth);
      } else if (height) {
        canvas.width = Math.floor((imageWidth * height) / imageHeight);
        canvas.height = height;
      } else {
        canvas.width = imageWidth;
        canvas.height = imageHeight;
      }

      ctx = canvas.getContext("2d");

      if (!ctx) {
        reject("Canvas context could not be created.");
        return;
      }

      ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
      const dataUrl = canvas.toDataURL("image/jpeg", quality);
      resolve(dataUrl);
    };

    image.onerror = () => {
      reject("Image could not be loaded.");
    };
  });
}

export function parseJsonFromText(text: string = "") {
  try {
    const jsonAsText = text.replace(/```json\n|\n```/g, "").trim();
    return JSON.parse(jsonAsText);
  } catch {
    const jsonAsText = text
      .replace(/(\w+):/g, '"$1":') // Add quotes to keys
      .replace(/: "([^"]+)"/g, ': "$1"') // Fix double quotes
      .replace(/: '([^']+)'/g, ': "$1"'); // Convert single to double quotes

    return JSON.parse(jsonAsText);
  }
}
