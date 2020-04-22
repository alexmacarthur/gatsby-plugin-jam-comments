import React, {useRef} from 'react';
import styles from './styles.module.css';

export default () => {
    const formRef = useRef(null);

    const submitComment = async (e) => {
        e.preventDefault(); 
        let withValues = [...formRef.current.elements].filter(el => {
            return !!el.value;
        });

        console.log(process.env.GATSBY_JAM_COMMENTS_API_KEY);

        const response = await fetch('http://localhost:4000/graphql', {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json',
                'x-api-key': process.env.GATSBY_JAM_COMMENTS_API_KEY,
                'x-domain': 'hello2.com'
            },
            body: JSON.stringify({ query: `
                mutation {
                    createComment(content: "new c33onddfsdstent!", userId: null, siteId: 3) {
                        createdAt
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
                <textarea name="comment" required={true}></textarea>
            </label>
            <label className={styles.label}>
                Name
                <input type="text" name="name" required={true} />
            </label>
            <label className={styles.label}>
                Email Address
                <input type="email" name="email" />
            </label>
            <label className={styles.label}>
                Twitter Handle
                <input type="text" name="twitter_handle" />
            </label>

            <button>Submit</button>
        </form>
    )
}
