import React from 'react';

import {Container} from 'components/common/elements';

import {store} from 'store';
import {goNextStage} from 'store/utils';
import {setDifficulty, setGameData1} from 'store/game/slice';

import style from './style.module.scss';

export type DifficultyP = {
    gameName:string
};

export const Difficulty = (props:DifficultyP) => {
    const {gameName} = props;

    const setGameDifficulty = (dif:number) => {
        store.dispatch(setDifficulty(dif));
        store.dispatch(setGameData1({gameName, complexity: dif}));
        goNextStage('players');
    };

    return (
        <Container>
            <div className={style.wrapper}>
                <h2 className={style.title}>Выбери уровень сложности</h2>
                <div className={style.difWrapper}>
                    <div className={style.dif} onClick={() => setGameDifficulty(1)}>
                        <img
                            className={style.difStars}
                            src={require('assets/img/icons/star1.png')}
                            alt={'star'}/>
                        <span className={style.difName}>Незнайка</span>
                    </div>
                    <div className={style.dif} onClick={() => setGameDifficulty(2)}>
                        <img
                            className={style.difStars}
                            src={require('assets/img/icons/star2.png')}
                            alt={'star'}/>
                        <span className={style.difName}>Знайка</span>
                    </div>
                    <div className={style.dif} onClick={() => setGameDifficulty(3)}>
                        <img
                            className={style.difStars}
                            src={require('assets/img/icons/star3.png')}
                            alt={'star'}/>
                        <span className={style.difName}>Всезнайка</span>
                    </div>
                </div>
            </div>
        </Container>
    );
};