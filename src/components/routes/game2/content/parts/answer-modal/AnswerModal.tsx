import React, {useState} from 'react';

import {Button, Container} from 'components/common/elements';

import style from './style.module.scss';
import {store} from 'store';
import {setAnswer2, setFieldMode, setPrevAngle} from 'store/game/slice';
import {mergeClassNames} from 'utils/mergeClassNames';
import {isEmpty} from 'lodash';

export type AnswerModalP = {
    task:string,
    theme:string,
    answer:string,
    playerName:string,
    setBtnStatus:Function,
    setStatusModal:Function,
    startAngleRedux:number
};

export const AnswerModal = (props:AnswerModalP) => {
    const {task, theme, answer, playerName, setBtnStatus, setStatusModal, startAngleRedux} = props;

    const [isAnswerShowed, setAnswerStatus] = useState<boolean>(false);
    const [btnState, setBtnState] = useState<boolean>(isEmpty(answer));

    const setAnswer = (isRight:boolean) => {
        store.dispatch(setAnswer2(isRight));
        store.dispatch(setPrevAngle(startAngleRedux));
        store.dispatch(setFieldMode(''));

        setBtnStatus(true);
        setStatusModal(false);
    };

    const getThemeName = (theme:string):string => {
        switch (theme) {
            case ('physical'): return 'Физкультура';
            case ('show'): return 'Покажи нечто';
            case ('question-answer'): return 'Вопрос-ответ';
            case ('improve'): return 'Прояви себя';
            default: return '';
        }
    };

    const getAnswerStyles = () =>
        mergeClassNames(
            style.answer,
            isAnswerShowed ? style.answerActive : ''
        );

    const showAnswer = () => {
        setBtnState(true);
        setAnswerStatus(true);
    };

    return (
        <div className={style.outer}>
            <div className={style.bg}/>
            <Container>
                <div className={style.wrapper}>
                    <h2 className={style.title}>
                        Выполняет</h2>
                    <h2 className={style.player}>
                        {playerName}</h2>
                    <h3 className={style.theme}>
                        {getThemeName(theme)}</h3>
                    <p className={style.task}>
                        {task}</p>
                    <span className={getAnswerStyles()}>
                        {answer}</span>
                    <Button
                        text={'Выполнено'}
                        colorType={'second'}
                        isDisabled={!btnState}
                        handle={() => setAnswer(true)}
                        className={style.btn}/>
                    <Button
                        text={'Не выполнено'}
                        isDisabled={!btnState}
                        handle={() => setAnswer(false)}
                        className={style.btnSecond}/>
                    {!isEmpty(answer)
                        ? <Button
                            text={'Показать ответ'}
                            colorType={'third'}
                            isDisabled={btnState}
                            handle={showAnswer}
                            className={style.btnThird}/>
                        : <></>
                    }
                </div>
            </Container>
        </div>
    );
};