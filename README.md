> :warning: JamComments is still in active development, and has not yet been opened to the public. To be notified when it's available, sign up here: [jamcomments.com](https://jamcomments.com/).

# gatsby-plugin-jam-comments

The official Gatsby plugin for integrating [JamComments](https://jamcomments.com) into your Gatsby application.

## Setup

1. Create a JamComments account.
2. Create a site and generate an API key.
3. Install this plugin: `npm install gatsby-plugin-jam-comments`.
4. Configure the plugin by adding the following to your `gatsby-node.js`:

```js
resolve: 'gatsby-plugin-jam-comments',
  options: {
    api_key: "YOUR-API-KEY",
    domain: "your-domain.me"
  }
},
```

## Usage

### Embedding Comments

To include a comment form and existing comments on your blog posts, you'll need to place the following component on your page component(s), along with the required `path` and `pageContext` props:

```jsx
import JamComments from "gatsby-plugin-jam-comments";

// your comment code

<JamComments path={props.path} pageContext={props.pageContext} />;
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
