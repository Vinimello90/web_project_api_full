const BASE_URL = import.meta.env.VITE_API_BASE_URL;

function checkResponse(res) {
  return res.ok ? res.json() : Promise.reject(res);
}

export function getCurrentUser(token) {
  return fetch(`${BASE_URL}/users/me`, {
    method: "GET",
    headers: {
      Accept: "aplication/json",
      "Content-type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  }).then((res) => checkResponse(res));
}

export function register(data) {
  return fetch(`${BASE_URL}/signup`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  }).then((res) => checkResponse(res));
}

export function authorize(data) {
  return fetch(`${BASE_URL}/signin`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  }).then((res) => checkResponse(res));
}
