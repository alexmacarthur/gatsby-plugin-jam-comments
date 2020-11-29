const request = require("./request");
const log = require("./log");

/**
 * Fetch a batch of comments for a particular domain.
 *
 * @param {string} param0
 * @param {string} param0
 * @param {number} param0
 *
 * @return {object}
 */
const fetchComments = async ({ apiKey, domain, skip = 0 }) => {
  const PER_PAGE = 50;
  const query = `
    query Comments($domain: String!, $status: String, $skip: Int, $perPage: Int){
      comments(domain: $domain, status: $status, skip: $skip, perPage: $perPage) {
        items {
          createdAt
          name
          emailAddress
          content
          path
          id
        }
        meta {
          hasMore
        }
      }
    }`;

  let comments = [];
  let hasMore = false;

  try {
    let queryResult = await request({
      apiKey,
      query,
      variables: {
        domain,
        status: "approved",
        perPage: PER_PAGE,
        skip
      }
    });

    if (queryResult.errors) {
      throw new Error(queryResult.errors[0].message);
    }

    const { items, meta } = queryResult.data.comments;

    comments = items;
    hasMore = meta.hasMore;
  } catch (e) {
    console.error(`JamComments error! ${e.message}`);
  }

  log(`Fetched a batch of ${comments.length} comments.`);

  return {
    comments,
    hasMore
  };
};

/**
 * Fetch comments for a particular domain until no more can be retrieved.
 *
 * @param {string} param0
 * @param {string} param1
 *
 * @return {array}
 */
module.exports = async ({ apiKey, domain }) => {
  let allComments = [];
  let skip = 0;
  let hasMore = false;

  do {
    const freshFetch = await fetchComments({ skip, apiKey, domain });
    hasMore = freshFetch.hasMore;
    skip = skip + freshFetch.comments.length;
    allComments = [...allComments, ...freshFetch.comments];
  } while (hasMore);

  return allComments;
};
