import React from "react";
import {Link} from "react-router-dom";

import styles from "./HeroesList.module.css";

export const HeroesList = (props) =>
{
    const heroes = props.heroes.map((hero) =>
    {
        return (
            <li key={hero.id}>
                <Link to={`/heroes/${hero.id}`}>
                    <span className={styles.badge}>{hero.id}</span> {hero.name}
                </Link>
            </li>
        );
    });

    return (
        <div>
            <h2>My Heroes</h2>
            <ul className={styles.HeroesList}>
                {heroes}
            </ul>
        </div>
    );
}
