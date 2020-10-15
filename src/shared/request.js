module.exports = async ({ apiKey, query, variables = {} } = {}) => {
  const response = await fetch("https://service.jamcomments.com/graphql", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": apiKey
    },
    body: JSON.stringify({ query, variables })
  });

  return await response.json();
};
