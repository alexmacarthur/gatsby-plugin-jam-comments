import React from "react"
import CommentBox from "../CommentBox"
import CommentList from "../CommentList"
// import styles from "./styles.module.css"

export default ({ pageContext }) => {
  const comments = pageContext.comments || []

  return (
    <div className={styles.shell}>
      <h3>Comments</h3>
      <CommentBox />
      <CommentList comments={comments}></CommentList>
    </div>
  )
}
