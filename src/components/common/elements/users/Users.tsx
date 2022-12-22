import React from 'react';

import {mergeClassNames} from 'utils/mergeClassNames';

import {PlayerT} from 'types/redux';

import style from './style.module.scss';
import {store} from 'store';
import {games} from '../../../../config';
import styled from 'styled-components';

export type UsersP = {
    players:Array<PlayerT>,
    currentUserIndex:number,
    // classNames:string
};

const Player = styled.div<{bgColor:string}>`
    background: ${props => props.bgColor};
`;

export const Users = (props:UsersP) => {
    const {players, currentUserIndex} = props;
    const {game} = store.getState();
    const {gameName} = game;

    const playerColors:Array<string> = [];

    for (let i = 0; i < games.length; i++) games[i].name === gameName ? playerColors.push(...games[i].colors.users) : null;

    const getUserStyles = (i:number) =>
        mergeClassNames(
            style.user,
            i === currentUserIndex ? style.userActive : '',
        );

    return (
        <div className={style.users}>
            {players.map((player, i) =>
                <div
                    key={i}
                    className={getUserStyles(i)}>
                    <Player
                        bgColor={playerColors[i]}
                        className={style.userIcon}>
                        <span className={style.userIconImg}/>
                    </Player>
                    <span className={style.userName}>
                        {player.name}</span>
                    <span className={style.userScore}>
                        {player.score}</span>
                </div>)}
        </div>
    );
};