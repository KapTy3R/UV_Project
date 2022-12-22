import React, {useState} from 'react';

import {Button, Container, HandCircle, Users} from 'components/common/elements';
import {AnswerModal} from './parts';

import style from './style.module.scss';

import {store} from 'store';
import {ContentP} from 'types/components';
import {CircleType} from 'types/redux';
import {AutoCircle} from 'components/common/elements/circle';
import {isEmpty} from 'lodash';

export const Content = (props:ContentP) => {
    const {circleFields, circleSize, circleImg} = props;

    const {gameData, gamePlayData, circleType} = store.getState().game;
    const {players, currentUserIndex, typedWord, startAngle, currentLevel, currentRotateIndex, fieldMode} = gamePlayData;

    const level = gameData[currentLevel];
    const answerArray = level.answer.split('');

    const [isModalOpened, setStatusModal] = useState(false);
    const [isBtnDisabled, setBtnStatus] = useState(true);
    const [startAngleRedux, setStartAngle] = useState(0);

    return (
        <Container>
            {isModalOpened && <AnswerModal
                task={level.task}
                theme={level.theme}
                typedWord={typedWord}
                answerArray={answerArray}
                setBtnStatus={setBtnStatus}
                setStatusModal={setStatusModal}
                startAngleRedux={startAngleRedux}
                playerName={players[currentUserIndex].name}/>}
            <div className={style.wrapper}>
                <h2 className={style.theme}>{level.theme}</h2>
                <p className={style.task}>{level.task}</p>
                {circleType === CircleType.auto
                    ? <AutoCircle
                        circleSize={circleSize}
                        circleImg={circleImg}
                        startAngle={startAngle}
                        setBtnStatus={setBtnStatus}
                        circleFields={circleFields}
                        setStartAngle={setStartAngle}
                        currentRotateIndex={currentRotateIndex}/>
                    : <HandCircle
                        circleSize={circleSize}
                        circleImg={circleImg}/>}
                <div className={style.letters} >
                    {answerArray.map((letter, i) =>
                        <span className={style.letter} key={i}>
                            {letter === typedWord[i] ? letter : ''}</span>)}</div>
                <Users
                    players={players}
                    currentUserIndex={currentUserIndex}/>
                <Button
                    colorType={'third'}
                    className={style.btn}
                    text={'Назвать букву'}
                    isDisabled={
                        circleType === CircleType.auto
                            ? isBtnDisabled
                            : isEmpty(fieldMode)
                    }
                    handle={() => setStatusModal(true)}/>
            </div>
        </Container>
    );
};