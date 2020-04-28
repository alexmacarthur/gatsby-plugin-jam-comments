require("isomorphic-fetch")
require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`
})

const request = require("./src/shared/request")

exports.sourceNodes = async (
  { actions, cache, createContentDigest },
  configOptions
) => {
  const { api_key: apiKey, domain } = configOptions
  const { createNode } = actions

  process.env.GATSBY_JAM_COMMENTS_API_KEY = apiKey
  process.env.GATSBY_JAM_COMMENTS_DOMAIN = domain

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
    let queryResult = await request({
      apiKey,
      domain,
      query,
      variables: {
        domain
      }
    })
    comments = queryResult.data.comments
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

  await cache.set("jamComments", comments)
}

/**
 * When each page is created, attach any of its comments to page context.
 */
exports.onCreatePage = async ({ page, actions, cache }) => {
  const { createPage, deletePage } = actions
  const cachedComments = await cache.get("jamComments")

  const comments = cachedComments
    ? cachedComments.filter(c => {
        return c.path === page.path
      })
    : []

  if (!comments.length) {
    return
  }

  deletePage(page)

  createPage({
    ...page,
    context: {
      ...page.context,
      comments
    }
  })
}
