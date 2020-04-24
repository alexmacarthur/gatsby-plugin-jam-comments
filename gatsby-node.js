require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`
})

const getClient = require("./get-client")

exports.sourceNodes = async (
  { actions, createContentDigest },
  configOptions
) => {
  const { api_key: apiKey, domain } = configOptions
  const { createNode } = actions

  console.log("\nPulling all comments \n")

  const query = `
                query Comments($domain: String){
                    comments(domain: $domain) {
                        createdAt
                        name
                        twitterHandle
                        emailAddress
                        content
                        path
                        id
                    }
                }`
  let comments = []

  try {
    let queryResult = await getClient({ apiKey, domain }).request(query, {
      domain
    })
    comments = queryResult.comments
  } catch (e) {
    console.error(e.message)
  }

  for (let comment of comments) {
    const nodeData = Object.assign(
      { ...comment },
      {
        id: comment.id,
        parent: null,
        children: [],
        internal: {
          type: `JamComment`,
          mediaType: "text/markdown",
          contentDigest: createContentDigest(comment.content)
        }
      }
    )

    createNode(nodeData)
  }
}

exports.onCreatePage = ({ graphql, page, actions }) => {
  const { createPage, deletePage } = actions

  console.log(graphql)

  deletePage(page)

  createPage({
    ...page,
    context: {
      ...page.context,
      comments: ["one", "two", "three"]
    }
  })
}

// exports.onCreateNode = ({ node, actions }) => {
//     const { createNode, createNodeField } = actions

//     console.log(node);
//     // Transform the new node here and create a new node or
//     // create a new node field.
// }
