import React from "react"

export default ({ comments }) => {
  return (
    <>
      {comments.map(comment => {
        return <span key={comment.id}>comment!</span>
      })}
    </>
  )
}
