export default async function fetcher(url: string, cookie: string) {
  return fetch(url, {
    cache: "no-store",
    headers: {
      "Authorization": "Bearer " + cookie
    },
  }).then((res) => res.json());
}
