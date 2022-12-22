import React, {useEffect, useRef} from 'react';
import {Link} from 'react-router-dom';

import {GamesListT} from 'components/app/App';

import {mergeClassNames} from 'utils/mergeClassNames';

import style from './style.module.scss';

type GamesP = {
    games:GamesListT
};

export const Games = (props:GamesP) => {
    const {games} = props;

    const firstUpdate = useRef(true);
    
    useEffect(() => {
        if (firstUpdate.current) {
            firstUpdate.current = false;
        } else {
            location.reload();
        }
    });

    const getCardStyles = (isDisabled:boolean) =>
        mergeClassNames(
            style.card,
            isDisabled ? style.cardDisabled : ''
        );

    return (
        <div className={style.wrapper}>
            <h1 className={style.title}>Выберите игру</h1>
            <div className={style.cards}>
                {games.map((game, i) =>
                    <Link
                        key={i}
                        className={getCardStyles(game.isDisabled)}
                        to={game.path}>
                        <img className={style.cardImg} src={game.imgCard} alt={game.name}/>
                    </Link>)}
            </div>
        </div>
    );
};