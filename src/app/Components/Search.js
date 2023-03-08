import React, { useState } from "react";
import styles from '../page.module.css';


const Search = (props) => {
    const [searchValue, setSearchValue] = useState("");

    const handleSearchInputChanges = (e) => {
        setSearchValue(e.target.value);
    }

    const resetInputField = () => {
        setSearchValue("")
    }

    const callSearchFunction = (e) => {
        e.preventDefault();
        props.search(searchValue);
        resetInputField();
    }

    return (
        <form className={styles.search}>
            <input
                value={searchValue}
                onChange={handleSearchInputChanges}
                type="text"
            />
            <button className={styles.button} onClick={callSearchFunction} type="submit">SEARCH</button>
        </form>
    );
}

export default Search;