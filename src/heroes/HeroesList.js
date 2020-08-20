import React from "react";

import styles from "./HeroesList.module.css";

export const HeroesList = (props) =>
{
    const heroes = props.heroes.map((hero) =>
    {
        return (
            <li key={hero.id} className={props.selectedHeroId === hero.id ? styles.selected : ""} onClick={() => props.handleClick(hero)}>
                <span className={styles.badge}>{hero.id}</span> {hero.name}
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
