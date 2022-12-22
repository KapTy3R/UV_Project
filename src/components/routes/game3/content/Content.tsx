import React, {useEffect, useState} from 'react';

import {Button, HandCircle, Container, Users} from 'components/common/elements';
import {AnswerModal} from './parts';

import style from './style.module.scss';

import {store} from 'store';
import {ContentP} from '../../../../types/components';
import {isEmpty} from 'lodash';
import {CircleType} from '../../../../types/redux';
import {AutoCircle} from 'components/common/elements/circle';

export const Content = (props:ContentP) => {
    const {circleFields, circleSize, circleImg} = props;

    const {gameData, gamePlayData, circleType} = store.getState().game;
    const {players, currentUserIndex, startAngle, currentRotateIndex, fieldMode} = gamePlayData;

    const [theme, setTheme] = useState('');
    const [task, setTask] = useState('');
    const [desc, setDesc] = useState('');
    const [answer, setAnswer] = useState('');

    const [isReady, setStatusReady] = useState(false);
    const [isModalOpened, setStatusModal] = useState(false);
    const [isBtnDisabled, setBtnStatus] = useState(true);
    const [startAngleRedux, setStartAngle] = useState(0);

    useEffect(() => {
        if (!isEmpty(fieldMode)) {
            // @ts-ignore
            const {theme, task, desc, answer} = gameData.find(level => level.theme === fieldMode);

            setTask(task);
            setTheme(theme);
            setDesc(desc);
            setAnswer(answer);
        }
    }, [fieldMode]);

    return (
        <Container>
            {isModalOpened || !isBtnDisabled ? <AnswerModal
                task={task}
                theme={theme}
                desc={desc}
                currentUserIndex={currentUserIndex}
                setStatusReady={setStatusReady}
                answer={answer}
                setBtnStatus={setBtnStatus}
                setStatusModal={setStatusModal}
                startAngleRedux={startAngleRedux}
                playerScore={players[currentUserIndex].score}
                playerName={players[currentUserIndex].name}/>
                : <></>}
            <div className={style.wrapper}>
                {isReady
                    ? circleType === CircleType.auto
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
                            circleImg={circleImg}/>
                    : <div className={style.readyBlock}>
                        <h2 className={style.readyBlockTitle}>{players[currentUserIndex].name}, вы готовы?</h2>
                        <Button
                            handle={() => setStatusReady(true)}
                            className={style.readyBlockBtn}
                            colorType={'second'}
                            text={'Готов'}/>
                    </div>
                }
                <Users
                    players={players}
                    currentUserIndex={currentUserIndex}/>
                {isReady && circleType === CircleType.hand
                    ? <Button
                        colorType={'third'}
                        className={style.btn}
                        text={'Играть'}
                        isDisabled={isEmpty(fieldMode)}
                        handle={() => setStatusModal(true)}/>
                    : <></>
                }
            </div>
        </Container>
    );
};