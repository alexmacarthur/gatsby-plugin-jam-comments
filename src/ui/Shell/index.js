import React from "react"
import CommentBox from "../CommentBox"
import CommentList from "../CommentList"

export default ({ pageContext }) => {
  const comments = pageContext.comments || []

  return (
    <div className={"jc-Shell"}>
      <h3>Comments</h3>
      <CommentBox />
      <CommentList comments={comments}></CommentList>
    </div>
  )
}
