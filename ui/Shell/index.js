import React from "react"
import CommentBox from "../CommentBox"
import styles from "./styles.module.css"
import { useStaticQuery } from "gatsby"

export default props => {
  console.log(props.pageContext)

  // const results = useStaticQuery(
  //     graphql`
  //         query {
  //             allJamComment(limit: 10) {
  //                 edges {
  //                     node {
  //                         content
  //                         twitterHandle
  //                         name
  //                         path
  //                         id
  //                     }
  //                 }
  //             }
  //         }
  //         `
  //     );

  return (
    <div className={styles.shell}>
      <h3>Comments</h3>

      {/* <CommentList></CommentList> */}

      <CommentBox />
    </div>
  )
}
