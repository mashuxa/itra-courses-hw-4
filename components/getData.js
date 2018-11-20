export default function (url) {
  const request = fetch(url).then(response => response.json().then(json => console.log(json)));
};