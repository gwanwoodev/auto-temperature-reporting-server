import fetch from "isomorphic-unfetch";

export const randomNumber = () => {
  return Math.floor(Math.random() * 6 + 3);
};

export const cusRequest = async ({ URL, headers, body, method }: any) => {
  let response = await fetch(URL, {
    method,
    body,
    headers,
  });

  return response.json();
};