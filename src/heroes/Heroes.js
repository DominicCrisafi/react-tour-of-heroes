import React, {useState} from "react";

import {HeroDetail} from "./HeroDetail";
import {HeroesList} from "./HeroesList"

export const Heroes = (props) =>
{
    const [currentHero, setCurrentHero] = useState(null);
    const handleChange = ({target}) =>
    {
        setCurrentHero({name: target.value, id: currentHero.id});
    };
    const handleClick = (hero) =>
    {
        setCurrentHero(hero);
    };

    return (
        <div>
            <HeroesList heroes={props.heroes} selectedHeroId={currentHero?.id} handleClick={(hero) => handleClick(hero)}></HeroesList>
            {currentHero &&
                <HeroDetail hero={currentHero} handleChange={(e) => handleChange(e)}></HeroDetail>
            }
        </div>
    );
};
