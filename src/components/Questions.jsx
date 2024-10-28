/**
 * Filters the data based on rating and verdict and returns a set
 * of unique URLs for each contest problem.
 *
 * @param {Object} QuestionsOfFirst - The main object of objects to filter.
 * @param {number} rating - The rating value to filter items by.
 * @returns {Set} - A set containing unique URLs in the format:
 *                  "https://codeforces.com/contest/{contestId}/problem/{index}"
 */
function getUniqueContestUrls(QuestionsOfFirst, rating) {
  const filteredData = Object.fromEntries(
    Object.entries(QuestionsOfFirst).filter(
      ([key, item]) =>
        item.problem.rating === Number(rating) && item.verdict === "OK"
    )
  );
  const uniqueUrls = new Set();

  for (const key in filteredData) {
    if (filteredData.hasOwnProperty(key)) {
      const contestId = filteredData[key].problem.contestId;
      const index = filteredData[key].problem.index;

      // Construct the URL
      const url = `https://codeforces.com/contest/${contestId}/problem/${index}`;

      // Convert the tag array to a string
      const tagsString = filteredData[key].problem.tags.join(",");
      // Create the unique key
      const uniqueKey = `${url}::${filteredData[key].problem.name}::${contestId}::${index}::${tagsString}`;

      // Add the unique key to the set
      uniqueUrls.add(uniqueKey);
    }
  }

  return uniqueUrls;
}

// Export the function for use in other files
export default getUniqueContestUrls;
