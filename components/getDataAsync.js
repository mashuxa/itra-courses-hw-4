export default async function (url) {
  const response = await fetch(url);
  return await response.json();
};