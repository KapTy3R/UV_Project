import React from 'react';

import {store} from 'store';
import {setCircleType} from 'store/game/slice';

import {games} from 'config/games';

import {goNextStage} from 'store/utils';

import style from './style.module.scss';
import {Button} from 'components/common/elements';
import {CircleType} from '../../../../types/redux';

type CircleModeP = {
    circleModeBtn:Array<string>,
    isHasDifficulty:boolean
};

export const CircleMode = (props:CircleModeP) => {
    const {isHasDifficulty, circleModeBtn} = props;

    const setCircleMode = (type:CircleType) => {
        store.dispatch(setCircleType(type));
        goNextStage(isHasDifficulty ? 'difficulty' : 'players');
    };

    return (
        <div className={style.wrapper}>
            <h1 className={style.title}>Как будешь играть?</h1>
            <Button
                styles={{background: circleModeBtn[0]}}
                className={style.btn}
                text={'С коробом'}
                handle={() => setCircleMode(CircleType.hand)}/>
            <Button
                styles={{background: circleModeBtn[1]}}
                className={style.btn}
                text={'Без короба'}
                handle={() => setCircleMode(CircleType.auto)}/>
        </div>
    );
};