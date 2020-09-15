import React, {Component} from "react";

import styles from "./Heroes.module.css";

export class Heroes extends Component
{
    constructor(props)
    {
        super(props);
        this.state = { hero: null };
    }

    renderHeroes(heroes)
    {
        return heroes.map((hero) =>
        {
            return (
                <li key={hero.id} className={this.state.hero && this.state.hero.id === hero.id ? styles.selected : ""} onClick={() => this.handleClick(hero)}>
                    <span className={styles.badge}>{hero.id}</span> {hero.name}
                </li>
            );
        });
    }

    handleChange({target})
    {
        this.setState((state, props) =>
        {
            return {hero: {name: target.value, id: state.hero.id}}
        });
    }

    handleClick(hero)
    {
        this.setState({hero: hero});
    }

    render()
    {
        return  (
            <div>
                <h2>My Heroes</h2>
                <ul className={styles.Heroes}>
                    {this.renderHeroes(this.props.heroes)}
                </ul>
                {this.state.hero &&
                    <div>
                        <h2>{this.state.hero.name.toUpperCase()} Details</h2>
                        <div>
                            <span>id: </span>{this.state.hero.id}
                        </div>
                        <div>
                            <label>
                                name:
                                <input value={this.state.hero.name} onChange={(e) => this.handleChange(e)} placeholder="name"></input>
                            </label>
                        </div>
                    </div>
                }
            </div>
        );
    }
}
