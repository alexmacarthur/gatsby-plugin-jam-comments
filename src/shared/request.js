module.exports = async ({ apiKey, query, variables = {} } = {}) => {
  // const response = await fetch("https://service.jamcomments.com/graphql", {
  const response = await fetch("http://localhost:4000/graphql", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": apiKey,
    },
    body: JSON.stringify({ query, variables })
  });

  return await response.json()
}
