import React, {useEffect, useState} from 'react';
import {isEmpty} from 'lodash';

import {Button, Container} from 'components/common/elements';

import {store} from 'store';
import {setAnswer3, setFieldMode, setPrevAngle} from 'store/game/slice';

import style from './style.module.scss';
import {games} from '../../../../../../config';
import styled from 'styled-components';
import {mergeClassNames} from 'utils/mergeClassNames';
import {compareValues} from 'utils/compareValues';

export type AnswerModalP = {
    task:string,
    theme:string,
    desc:string,
    answer:string,
    playerName:string,
    playerScore:number,
    setStatusReady:Function,
    setBtnStatus:Function,
    setStatusModal:Function,
    currentUserIndex:number,
    startAngleRedux:number
};

const Timer = styled.div<{bg:string}>`
  background: ${props => props.bg};
  
  div:first-child {
    background: ${props => props.bg};
  }
`;

export const AnswerModal = (props:AnswerModalP) => {
    const {
        task,
        desc,
        theme,
        answer,
        playerName,
        playerScore,
        setBtnStatus,
        setStatusReady,
        setStatusModal,
        startAngleRedux,
        currentUserIndex
    } = props;

    const {game} = store.getState();
    const {gameName} = game;
    const currentGame = games.filter(game => game.name === gameName);
    const currentUserColor = currentGame[0].colors.users[currentUserIndex];

    const [inputValue, setInputValue] = useState('');
    const [timerValue, setTimerValue] = useState(30);
    const [isAnswerShowed, setStatusAnswer] = useState(false);

    let interval:NodeJS.Timeout;

    useEffect(() => {
        if (!isAnswerShowed) {
            interval = setTimeout(() => {
                const nextTime = timerValue - 1;

                setTimerValue(nextTime);
            }, 1000);

            if (timerValue === 0) openAnswer();

            return () => clearInterval(interval);
        }

        return undefined;
    }, [timerValue, isAnswerShowed]);

    const isRightAnswer = compareValues(answer.split(''), inputValue.split(''));

    const openAnswer = () => setStatusAnswer(true);

    const setAnswer = () => {
        store.dispatch(setAnswer3({answer: answer.split(''), typed: inputValue.split('')}));
        store.dispatch(setPrevAngle(startAngleRedux));
        store.dispatch(setFieldMode(''));

        setBtnStatus(true);
        setStatusModal(false);
        setStatusReady(false);
    };

    const getThemeName = (theme:string):string => {
        switch (theme) {
            case ('literature'): return 'Литература';
            case ('games'): return 'Игры';
            case ('cinema'): return 'Кино';
            case ('sport'): return 'Спорт';
            case ('history'): return 'История';
            case ('science'): return 'Наука';
            case ('art'): return 'Искусство';
            case ('animals'): return 'Животный мир';
            default: return '';
        }
    };

    const getTimerText = (value:number):string => {
        switch (value) {
            case 4: return 'секунды';
            case 3: return 'секунды';
            case 2: return 'секунды';
            case 1: return 'секунда';
            default: return 'секунд';
        }
    };

    const getBtnStyles = () =>
        mergeClassNames(
            style.btnAnswer,
            isAnswerShowed ? style.btnAnswerMargined : ''
        );

    const getAnswerTableRightStyles = () =>
        mergeClassNames(
            style.answerTableRight,
            isRightAnswer ? style.answerTableRightSuccess : style.answerTableRightError
        );
    
    return (
        <div className={style.outer}>
            <div className={style.bg}/>
            <Container>
                <div className={style.wrapper}>
                    <Timer bg={currentUserColor} className={style.timer}>
                        <div className={style.timerBorder}>
                            <img className={style.timerIcon} src={require('assets/img/icons/gameUser.png')} alt={'user'}/>
                        </div>
                        <div className={style.timerInfo}>
                            <span>Отвечает</span>
                            <span>{playerName}</span>
                            <span>{isRightAnswer ? playerScore + 10 : playerScore}</span>
                        </div>
                        <div className={style.timerValue}>
                            <span>{timerValue}</span>
                            <span>{getTimerText(timerValue)}</span>
                        </div>
                    </Timer>
                    <h3 className={style.theme}>
                        {getThemeName(theme)}</h3>
                    <p className={style.task}>
                        {task}</p>
                    {isAnswerShowed
                        ? <div className={style.answerWrapper}>
                            <div className={style.answerInfo}>
                                <span>Ответ</span>
                                <span>{playerName}</span>
                            </div>
                            <div className={style.answerTable}>
                                <div className={getAnswerTableRightStyles()}>
                                    <span>{answer}</span></div>
                                <div className={style.answerTableUser}>
                                    <span>{inputValue}</span></div>
                            </div>
                        </div>
                        : <>
                            <h2 className={style.title} style={{marginTop: '20px'}}>
                                {'Введите ответ'}</h2>
                            <input
                                type={'text'}
                                value={inputValue}
                                className={style.input}
                                onChange={(event) => setInputValue(event.currentTarget.value)}/>
                        </>
                    }
                    <Button
                        text={isAnswerShowed ? 'Продолжить' : 'Принять'}
                        colorType={'first'}
                        handle={isAnswerShowed ? setAnswer : openAnswer}
                        className={getBtnStyles()}
                        isDisabled={!isAnswerShowed && isEmpty(inputValue)}/>
                </div>
            </Container>
        </div>
    );
};