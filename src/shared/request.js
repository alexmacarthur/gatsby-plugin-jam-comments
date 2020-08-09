const endpoint = require("./endpoint")

module.exports = async ({ apiKey, domain, query, variables = {} } = {}) => {
  const response = await fetch(endpoint(), {
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
