import React, {useState} from 'react';
import {isEmpty} from 'lodash';

import {Button, Container} from 'components/common/elements';

import {store} from 'store';
import {setAnswer1, setFieldMode, setPrevAngle} from 'store/game/slice';

import style from './style.module.scss';

export type AnswerModalP = {
    task:string,
    theme:string,
    playerName:string,
    setBtnStatus:Function,
    typedWord:Array<string>,
    answerArray:Array<string>,
    setStatusModal:Function,
    startAngleRedux:number
};

export const AnswerModal = (props:AnswerModalP) => {
    const {task, theme, playerName, setBtnStatus, typedWord, answerArray, setStatusModal, startAngleRedux} = props;

    const [inputValue, setInputValue] = useState('');
    const [isFullWord, setInputStatus] = useState(false);

    const compareValues = () => {
        store.dispatch(setAnswer1({answer: answerArray, typed: inputValue, isFullWord}));
        store.dispatch(setPrevAngle(startAngleRedux));
        store.dispatch(setFieldMode(''));

        setBtnStatus(true);
        setStatusModal(false);
    };

    return (
        <div className={style.outer}>
            <div className={style.bg}/>
            <Container>
                <div className={style.wrapper}>
                    <h2 className={style.title}>
                        Отвечает</h2>
                    <span className={style.name}>
                        {playerName}</span>
                    <h3 className={style.theme}>
                        {theme}</h3>
                    <p className={style.task}>
                        {task}</p>
                    <div className={style.letters} >
                        {answerArray.map((letter, i) =>
                            <span className={style.letter} key={i}>
                                {letter === typedWord[i] ? letter : ''}</span>)}</div>
                    <h2 className={style.title} style={{marginTop: '20px'}}>
                        {isFullWord ? 'Введите слово' : 'Введите букву'}</h2>
                    <input
                        type={'text'}
                        value={inputValue}
                        className={style.input}
                        onChange={(event) =>
                            setInputValue(isFullWord
                                ? event.currentTarget.value
                                : Array.from(event.currentTarget.value)[0])}/>
                    <Button
                        text={'Готово'}
                        colorType={'second'}
                        handle={compareValues}
                        className={style.btnAnswer}
                        isDisabled={isEmpty(inputValue)}/>
                    <Button
                        colorType={'first'}
                        handle={() => setInputStatus(!isFullWord)}
                        className={style.btnWord}
                        text={isFullWord ? 'Назвать букву' : 'Назвать слово целиком'}
                        isDisabled={!isEmpty(inputValue)}/>
                </div>
            </Container>
        </div>
    );
};