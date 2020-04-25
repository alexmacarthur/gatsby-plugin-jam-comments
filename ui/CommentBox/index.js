import React, { useRef } from "react"
import styles from "./styles.module.css"
import getClient from "../../get-client"

const apiKey = process.env.GATSBY_JAM_COMMENTS_API_KEY
const domain = process.env.GATSBY_JAM_COMMENTS_DOMAIN

export default () => {
  const formRef = useRef(null)

  const submitComment = async e => {
    e.preventDefault()

    let mutationParams = [...formRef.current.elements].reduce((obj, input) => {
      obj[input.name] = input.value
      return obj
    }, {})

    const query = `
                mutation CreateComment($name: String!, $content: String!, $twitterHandle: String, $emailAddress: String, $path: String){
                    createComment(name: $name, content: $content, twitterHandle: $twitterHandle, emailAddress: $emailAddress, path: $path) {
                        createdAt
                        name
                        twitterHandle
                        emailAddress
                        content
                    }
                }`

    const variables = {
      name: mutationParams.name,
      content: mutationParams.content,
      twitterHandle: mutationParams.twitterHandle,
      emailAddress: mutationParams.emailAddress,
      path: window.location.pathname
    }

    await getClient({ apiKey, domain }).request(query, variables)
  }

  return (
    <form onSubmit={submitComment} ref={formRef} className={styles.box}>
      <label className={styles.label}>
        Comment
        <textarea name="content" required={true}></textarea>
      </label>
      <label className={styles.label}>
        Name
        <input type="text" name="name" required={true} />
      </label>
      <label className={styles.label}>
        Email Address
        <input type="email" name="emailAddress" />
      </label>
      <label className={styles.label}>
        Twitter Handle
        <input type="text" name="twitterHandle" />
      </label>

      <button>Submit</button>
    </form>
  )
}
