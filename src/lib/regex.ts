function tagsToArrayTags(tags: string) {
  const arrayTags: string[] = tags.match(/#[^\s]+/g);
  return arrayTags;
}

const regex = {
  tagsToArrayTags,
};
export default regex;
