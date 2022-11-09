import {
  getArticleIndex,
  getArticlesByCategory,
  sum,
  send,
  renderCSV,
} from "src/content-stats";

export default send("text/csv", async () => {
  const articles = await getArticleIndex();
  const stats = sum(getArticlesByCategory(articles));
  return renderCSV(stats);
});
