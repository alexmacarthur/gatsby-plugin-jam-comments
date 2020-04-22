import React from "react";
import CommentBox from "../CommentBox";
import styles from './styles.module.css';

export default () => {
    return (
        <div className={styles.shell}>
            <h3>Comments</h3>

            {/* <CommentList></CommentList> */}

            <CommentBox/>

        </div>
    )
}
