import {
  getArticleIndex,
  getArticlesByAuthor,
  sum,
  send,
  renderCSV,
} from "src/content-stats";

export default send("text/csv", async () => {
  const articles = await getArticleIndex();
  const stats = sum(getArticlesByAuthor(articles));
  return renderCSV(stats);
});
