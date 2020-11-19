module.exports = async ({ apiKey, query, variables = {} } = {}) => {
  const endpoint = "http://localhost:4000/graphql";
  // const endpoint = "https://service.jamcomments.com/graphql";

  const response = await fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": apiKey
    },
    body: JSON.stringify({ query, variables })
  });

  return await response.json();
};
