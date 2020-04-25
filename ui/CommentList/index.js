import React from "react"
import styles from "./styles.module.css"

const prettyDate = unix => {
  let date = new Date(Number(unix))
  let hoursOffset = date.getTimezoneOffset() / 60
  date.setHours(date.getHours() - hoursOffset)
  let dateString = date.toLocaleString("en-US").split(",")
  return dateString[0].trim()
}

export default ({ comments }) => {
  return (
    <ul className={styles.list}>
      {comments.map(comment => {
        return (
          <li key={comment.id} className={styles.comment}>
            <span className={styles.deets}>
              <h6 className={styles.name}>{comment.name}</h6>
              <span className={styles.date}>
                {prettyDate(comment.createdAt)}
              </span>
            </span>
            <div className={styles.content}>
              <p>{comment.content}</p>
            </div>
          </li>
        )
      })}
    </ul>
  )
}
