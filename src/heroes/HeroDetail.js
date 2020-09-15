import React, {useState} from "react";
import {useHistory} from "react-router-dom";

import styles from "./HeroDetail.module.css";

export const HeroDetail = (props) =>
{
    const [hero, setHero] = useState({...props.hero});
    const {goBack} = useHistory();
    const handleChange = (event) =>
    {
        const updatedHero =
        {
            ...hero,
            name: event.target.value
        };

        setHero(updatedHero);
    };

    return (
        <div className={styles.HeroDetail}>
            <h2>{hero.name.toUpperCase()} Details</h2>
            <div>
                <span>id: </span>{hero.id}
            </div>
            <div>
                <label>
                    name:
                    <input value={hero.name} onChange={handleChange} placeholder="name"></input>
                </label>
            </div>
            <button onClick={goBack}>Go Back</button>
        </div>
    );
}
