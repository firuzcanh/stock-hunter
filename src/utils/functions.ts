export function shuffleArray(array: any[], offset: number = 0): any[] {
  const newArray = [...array];
  const hasOffset = array.length >= offset;

  // Shuffle the first x items amongst themselves
  if (offset && hasOffset) {
    for (let i = 0; i < offset; i++) {
      const j = Math.floor(Math.random() * (offset - i)) + i;
      [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
  }

  // Shuffle the rest of the items randomly
  const startNumber = hasOffset ? offset : 0;
  for (let i = startNumber; i < newArray.length - 1; i++) {
    const j = Math.floor(Math.random() * (newArray.length - i)) + i;
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }

  return newArray;
}
