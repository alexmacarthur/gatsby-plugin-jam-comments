import React, {useRef} from 'react';
import styles from './styles.module.css';

export default () => {
    const formRef = useRef(null);

    const submitComment = async (e) => {
        e.preventDefault(); 
        let withValues = [...formRef.current.elements].filter(el => {
            return !!el.value;
        });

        let formData = withValues.map(input => {
            return {
                name: input.name,
                value: input.value
            }
        });

        let mutationParams = withValues.reduce((totalString, input, index) => {
            let string = totalString + `${input.name}: "${input.value}"`;
            return index + 1 < withValues.length ? string + ', ' : string;
        }, "");

        console.log(mutationParams);

        console.log(process.env.GATSBY_JAM_COMMENTS_API_KEY);

        const response = await fetch('http://localhost:4000/graphql', {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json',
                // 'x-api-key': process.env.GATSBY_JAM_COMMENTS_API_KEY,
                'x-api-key': "7T0CRJM-0N34CT8-MQEX3CP-JHGQ6R2",
                'x-domain': 'mysitename.com'
            },
            body: JSON.stringify({ query: `
                mutation {
                    createComment(${mutationParams}) {
                        createdAt
                        name
                        twitterHandle
                        emailAddress
                        content
                    }
                }` 
            }),
        });

        console.log(await response.json());
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
