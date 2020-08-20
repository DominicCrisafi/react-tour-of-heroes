import React from "react";

export const HeroDetail = (props) =>
{
    return (
        <div>
            <h2>{props.hero.name.toUpperCase()} Details</h2>
            <div>
                <span>id: </span>{props.hero.id}
            </div>
            <div>
                <label>
                    name:
                    <input value={props.hero.name} onChange={props.handleChange} placeholder="name"></input>
                </label>
            </div>
        </div>
    );
}
