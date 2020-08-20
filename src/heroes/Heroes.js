import React from "react";
import {Route, useRouteMatch} from "react-router-dom";

import {HeroDetail} from "./HeroDetail";
import {HeroesList} from "./HeroesList"

export const Heroes = (props) =>
{
    const {path} = useRouteMatch();
    const heroDetailMatch = useRouteMatch(`${path}/:id`);
    const currentHero = heroDetailMatch
        ? props.heroes
            .find((hero) =>
            {
                return hero.id === parseInt(heroDetailMatch.params.id);
            })
        : null;

    return (
        <div>
            <Route exact path={path}>
                <HeroesList heroes={props.heroes}></HeroesList>
            </Route>
            <Route path={`${path}/:id`}>
                {currentHero &&
                    <HeroDetail hero={currentHero}></HeroDetail>
                }
            </Route>
        </div>
    );
};
