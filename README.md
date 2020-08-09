# gatsby-plugin-jam-comments

The official Gatsby plugin for integrating [Jam Comments](https://jamcomments.com) into your Gatsby application.

## Setup

Before installing this plugin, create a Jam Comments account.

### Environment Variables

The following environment variables are required for this plugin to work.

```
GATSBY_JAM_COMMENTS_API_KEY="1234567-1234567-1234567-1234567"
GATSBY_JAM_COMMENTS_DOMAIN="mydomain.com"
```

## Usage

### Embedding Comments
 
To include a comment form and existing comments on your blog posts, you'll need to place the following component on your page component(s), along with the required `path` and `pageContext` props: 

```jsx
<JamComments path={props.path} pageContext={props.pageContext} />
```

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
