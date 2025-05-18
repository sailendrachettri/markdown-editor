export default function getReadingTime(wordsCount) {
  const wordsPerMinute = 200;
  const time = Math.ceil(wordsCount / wordsPerMinute);
  return time < 1 ? "0 min read" : `${time} min${time > 1 ? 's' : ''}`;
}