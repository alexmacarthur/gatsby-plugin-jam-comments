const GraphQLClient = require("graphql-request").GraphQLClient

module.exports = function({ apiKey, domain } = {}) {
  return new GraphQLClient("http://localhost:4000/graphql", {
    headers: {
      "Content-Type": "application/json",
      "x-api-key": apiKey,
      "x-domain": domain
    }
  })
}
