module.exports = async ({ apiKey, domain, query, variables = {} } = {}) => {
  let response = await fetch("http://localhost:4000/graphql", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": apiKey,
      "x-domain": domain
    },
    body: JSON.stringify({ query, variables })
  })

  return await response.json()
}
