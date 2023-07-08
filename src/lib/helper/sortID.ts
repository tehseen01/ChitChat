export const sortID = (firstID: string, secondID: string) => {
  const comparison = firstID.localeCompare(secondID);

  if (comparison < 0) {
    return `${firstID}-${secondID}`;
  }

  if (comparison > 0) {
    return `${secondID}-${firstID}`;
  }

  return `${firstID}-${secondID}`;
};
