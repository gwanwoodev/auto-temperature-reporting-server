import fetch from "isomorphic-unfetch";

export const randomMinutes = () => {
    return Math.floor(Math.random()*3);
}

export const cusRequest = async ({URL, headers, body, method}) => {
    let response = await fetch(URL, {
        method,
        body,
        headers
    });

    return response.json();
}