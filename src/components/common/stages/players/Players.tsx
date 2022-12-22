import React, {useState} from 'react';
import {isEmpty} from 'lodash';

import {games} from 'config/games';

import {Button, Container, InputModal} from 'components/common/elements';

import {mergeClassNames} from 'utils';
import {goNextStage} from 'store/utils';

import {store} from 'store';
import {setPlayers, setPlayersQty} from 'store/game/slice';

import style from './style.module.scss';
import styled from 'styled-components';

const Player = styled.div<{bgColor:string}>`
    background: ${props => props.bgColor};
`;

export const Players = () => {
    const {game} = store.getState();
    const {gameName} = game;
    const {players} = game.gamePlayData;

    const playerColors:Array<string> = [];

    for (let i = 0; i < games.length; i++) games[i].name === gameName ? playerColors.push(...games[i].colors.users) : null;

    const [isModalOpened, setModalState] = useState(false);
    const [playerIndex, setPlayerIndex] = useState(0);

    const closeModal = (typedValue:string) => {
        setModalState(false);
        store.dispatch(setPlayers({
            name: typedValue,
            index: playerIndex
        }));
    };
    const openModal = (i:number) => {
        setPlayerIndex(i);
        setModalState(true);
    };

    const readyPlayers = players.filter(player => !isEmpty(player));
    const isReadyForGame = readyPlayers.length >= 2;

    const play = () => {
        store.dispatch(setPlayersQty(readyPlayers));
        goNextStage('game');
    };

    const getPlayerStyles = (i:number) =>
        mergeClassNames(
            style.player,
            readyPlayers.length < i && i > 1 ? style.playerDisabled : ''
        );

    const inputBg = games.filter(game => game.name === gameName)[0].rulesBg;

    return (
        <>
            {isModalOpened
                ? <InputModal
                    bg={inputBg}
                    players={players}
                    closeModal={closeModal}
                    storePlayerName={players[playerIndex].name}/>
                : <></>}
            <Container>
                <div className={style.wrapper}>
                    <h2 className={style.title}>Кто будет играть?</h2>
                    <div className={style.players}>
                        {players.map((player, i) =>
                            <Player
                                key={i}
                                bgColor={playerColors[i]}
                                className={getPlayerStyles(i)}
                                data-isactive={!isEmpty(player.name)}
                                onClick={() => openModal(i)}>
                                <span className={style.playerIcon}/>
                                <span className={style.playerName}>
                                    {isEmpty(player.name) ? 'Добавить' : player.name}</span></Player>)}
                    </div>
                    <Button
                        handle={play}
                        text={'Играть'}
                        colorType={'third'}
                        className={style.btn}
                        isDisabled={!isReadyForGame}/>
                </div>
            </Container>
        </>
    );
};