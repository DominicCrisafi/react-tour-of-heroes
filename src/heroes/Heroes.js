import React, {Component} from "react";

export class Heroes extends Component
{
    constructor(props)
    {
        super(props);
        this.state =
        {
            hero:
            {
                name: "Windstorm",
                id: 1
            }
        };
    }

    handleChange(event)
    {
        this.setState((state, props) =>
        {
            return {hero: {name: event.target.value, id: state.hero.id}}
        });
    }

    render()
    {
        return  (
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
        );
    }
}
