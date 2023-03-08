import React from "react";
import styles from '../page.module.css';

const Header = (props) => {
    return (
        <header className={styles.header}>
            <h2>{props.text}</h2>
        </header>
    );
};

export default Header;