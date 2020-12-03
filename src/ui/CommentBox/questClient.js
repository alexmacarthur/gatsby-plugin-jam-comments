import { QuestClient } from "graphql-quest";
import { getServiceEndpoint } from "jam-comments-utilities/shared";

const client = QuestClient({
  endpoint: `${process.env.JAM_COMMENTS_SERVICE_ENDPOINT ||
    getServiceEndpoint()}/graphql`,
  headers: {
    "x-api-key": process.env.GATSBY_JAM_COMMENTS_API_KEY
  }
});

export default client;
