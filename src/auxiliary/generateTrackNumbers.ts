const generateTrackNumbers = (length: number): string[] => {
  return [
    "All",
    ...Array.from({ length }, (_, index) => (index + 1).toString()),
  ];
};

export default generateTrackNumbers;
