// export async function fetchJson(url) {
//   const response = await fetch(url);

//   if (!response.ok) {
//     throw new Error(`API request failed with status ${response.status}`);
//   }

//   const contentType = response.headers.get("content-type") ?? "";
//   if (!contentType.includes("application/json") && !contentType.includes("+json")) {
//     throw new Error("API returned a non-JSON response");
//   }

//   return response.json();
// }