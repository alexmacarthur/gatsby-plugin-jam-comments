import React, { useRef, useState } from "react"
import Message from "../Message"
import "./styles.scss"
import request from "../../shared/request"
import formInputsToValues from "../../utils/formInputsToValues"

const apiKey = process.env.GATSBY_JAM_COMMENTS_API_KEY
const domain = process.env.GATSBY_JAM_COMMENTS_DOMAIN

export default ({ newComment }) => {
  const formRef = useRef(null)
  const [formSuccessMessage, setFormSuccess] = useState("")
  const [formErrorMessage, setFormError] = useState("")
  const [shouldShowFullForm, setShouldShowFullForm] = useState(false)

  const submitComment = async e => {
    e.preventDefault()
    setFormError("")
    setFormSuccess("")

    let mutationParams = formInputsToValues(formRef.current)

    formRef.current.reset()

    const query = `
      mutation CreateComment(
        $name: String!, 
        $path: String!, 
        $content: String!, 
        $domain: String!,
        $emailAddress: String
      ){
        createComment(
          name: $name, 
          path: $path, 
          content: $content, 
          emailAddress: $emailAddress
          domain: $domain
        ) {
          domain
          createdAt
          name
          emailAddress
          content
          id
        }
      }
    `

    const { name, content, emailAddress } = mutationParams

    const variables = {
      name,
      domain,
      content,
      emailAddress,
      path: window.location.pathname
    }

    try {
      let response = await request({ apiKey, query, variables })

      if (response?.errors && response.errors.length) {
        console.log(response.errors[0].message)
        setFormError("Sorry, something went wrong!")
        return;
      }
  
      if (response?.data?.createComment) {
        setFormSuccess("Comment successfully submitted!")
        return newComment(response.data.createComment);
      }
    } catch(e) {
      setFormError("Sorry, something went wrong!")
    }
  }

  return (
    <div className={"jc-CommentBox"}>
      {formSuccessMessage && (
        <Message isSuccessful={true}>{formSuccessMessage}</Message>
      )}

      {formErrorMessage && <Message>{formErrorMessage}</Message>}

      <h3>Leave a Comment</h3>

      <form
        onSubmit={submitComment}
        ref={formRef}
        className={"jc-CommentBox-form"}
      >
        <label className={"jc-CommentBox-label jc-CommentBox-textarea"}>
          <textarea 
            name="content"
            required={true}
            onFocus={() => !shouldShowFullForm && setShouldShowFullForm(true)}></textarea>
        </label>

        {shouldShowFullForm && (
          <>
            <label className={"jc-CommentBox-label"}>
              Name
              <input type="text" name="name" required={true} />
            </label>

            <label className={"jc-CommentBox-label"}>
              Email Address
              <input type="email" name="emailAddress" />
            </label>

            <span className={"jc-CommentBox-buttonWrapper"}>
              <button className={"jc-CommentBox-button"}>Submit</button>
            </span>
          </>
        )}
      </form>
    </div>
  )
}
