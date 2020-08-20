import React from "react";
import {Link} from "react-router-dom";

import styles from "./Dashboard.module.css";

export const Dashboard = (props) =>
{
    const heroList = props.heroes
        .slice(1, 5)
        .map((hero) =>
        {
            return (
                <Link key={hero.id} className={styles["col-1-4"]} to={`/heroes/${hero.id}`}>
                    <div className={`${styles.module}`}>
                        <h4>{hero.name}</h4>
                    </div>
                </Link>
            );
        });

    return (
        <div className={styles.Dashboard}>
            <h3>Top Heroes</h3>
            <div className={`${styles.grid} ${styles["grid-pad"]}`}>
                {heroList}
            </div>
        </div>
    );
};
