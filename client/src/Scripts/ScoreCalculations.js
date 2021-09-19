exports.compareArrays = (userTags, schoolTags) => {
  const intersection = userTags.filter((tag) => schoolTags.includes(tag));
  console.log(intersection.length);
  return intersection;
};
