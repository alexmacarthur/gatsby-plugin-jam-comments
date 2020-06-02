# gatsby-plugin-jam-comments

The official Gatsby plugin for integrating Jam Comments into your Gatsby application.

## Setup

Before installing this plugin, create a Jam Comments account.

### Environment Variables

The following environment variables are required for this plugin to work.

```
GATSBY_JAM_COMMENTS_API_KEY="1234567-1234567-1234567-1234567"
GATSBY_JAM_COMMENTS_DOMAIN="mydomain.com"
```

## Usage

### Querying for Data

```graphql
{
  allJamComment(limit: 10) {
    edges {
      node {
        content
        name
        path
        id
      }
    }
  }
}
```
