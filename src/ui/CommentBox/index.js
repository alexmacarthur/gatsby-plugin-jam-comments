import React, { useRef, useState } from "react"
import Error from "../Error"
import "./styles.scss"
import request from "../../shared/request"

const apiKey = process.env.GATSBY_JAM_COMMENTS_API_KEY
const domain = process.env.GATSBY_JAM_COMMENTS_DOMAIN

export default ({ newComment }) => {
  const formRef = useRef(null)
  const [formErrors, setFormErrors] = useState([])

  const submitComment = async e => {
    e.preventDefault()

    let mutationParams = [...formRef.current.elements].reduce((obj, input) => {
      obj[input.name] = input.value
      return obj
    }, {})

    const query = `
                mutation CreateComment($name: String!, $path: String!, $content: String!, $emailAddress: String){
                    createComment(name: $name, path: $path, content: $content, emailAddress: $emailAddress) {
                        createdAt
                        name
                        emailAddress
                        content
                        id
                    }
                }`

    const { name, content, emailAddress } = mutationParams

    const variables = {
      name,
      content,
      emailAddress,
      path: window.location.pathname
    }

    let response = await request({ apiKey, domain, query, variables }).catch(
      function() {
        setFormErrors(["Sorry, something went wrong"])
      }
    )

    if (!response.errors) {
      return newComment(response.data.createComment)
    }

    setFormErrors(response.errors.map(e => e.message))
  }

  return (
    <div className={"jc-CommentBox"}>
      {formErrors.map(error => (
        <Error key={error}>{error}</Error>
      ))}

      <form
        onSubmit={submitComment}
        ref={formRef}
        className={"jc-CommentBox-form"}
      >
        <label className={"jc-CommentBox-label jc-CommentBox-textarea"}>
          Comment
          <textarea name="content" required={true}></textarea>
        </label>
        <label className={"jc-CommentBox-label"}>
          Name
          <input type="text" name="name" required={true} />
        </label>
        <label className={"jc-CommentBox-label"}>
          Email Address
          <input type="email" name="emailAddress" />
        </label>

        <span>
          <button className={"jc-CommentBox-button"}>Submit</button>
        </span>
      </form>
    </div>
  )
}
