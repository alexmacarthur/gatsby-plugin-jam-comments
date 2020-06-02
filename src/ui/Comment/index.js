import React from "react"
import { toPrettyDate, toIsoString } from "../../utils/formatDate"
import "./styles.scss"

export default ({ comment }) => {
  return (
    <div className={"jc-Comment"}>
      <span className={"jc-Comment-details"}>
        <h6 className={"jc-Comment-name"}>{comment.name}</h6>
        <a
          className={"jc-Comment-anchor"}
          href={`#comment-${comment.id}`}
          aria-label="comment anchor link"
        >
          #
        </a>
        <time
          className={"jc-Comment-date"}
          dateTime={toIsoString(comment.createdAt)}
        >
          {toPrettyDate(comment.createdAt)}
        </time>
      </span>
      <div className={"jc-Comment-content"}>
        <p>{comment.content}</p>
      </div>
    </div>
  )
}
