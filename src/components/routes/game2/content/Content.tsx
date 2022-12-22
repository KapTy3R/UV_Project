import React, {useEffect, useState} from 'react';

import {HandCircle, Button, Container, Users} from 'components/common/elements';
import {AnswerModal} from './parts';

import style from './style.module.scss';

import {store} from 'store';
import {ContentP} from '../../../../types/components';
import {isEmpty, isUndefined} from 'lodash';
import {CircleType} from '../../../../types/redux';
import {AutoCircle} from 'components/common/elements/circle';

export const Content = (props:ContentP) => {
    const {circleFields, circleSize, circleImg} = props;

    const {gameData, gamePlayData, circleType} = store.getState().game;
    const {players, currentUserIndex, startAngle, currentRotateIndex, fieldMode} = gamePlayData;

    const [theme, setTheme] = useState('');
    const [task, setTask] = useState('');
    const [answer, setAnswer] = useState('');

    const [isModalOpened, setStatusModal] = useState(false);
    const [isBtnDisabled, setBtnStatus] = useState(true);
    const [startAngleRedux, setStartAngle] = useState(0);

    useEffect(() => {
        if (!isEmpty(fieldMode)) {
            // @ts-ignore
            const {theme, task, answer} = gameData.find(level => level.theme === fieldMode);

            setTask(task);
            setTheme(theme);

            !isUndefined(answer) ? setAnswer(answer) : setAnswer('');
        }
    }, [fieldMode]);

    return (
        <Container>
            {isModalOpened && <AnswerModal
                task={task}
                theme={theme}
                answer={answer}
                setBtnStatus={setBtnStatus}
                setStatusModal={setStatusModal}
                startAngleRedux={startAngleRedux}
                playerName={players[currentUserIndex].name}/>}
            <div className={style.wrapper}>
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
                <Users
                    players={players}
                    currentUserIndex={currentUserIndex}/>
                <Button
                    colorType={'third'}
                    className={style.btn}
                    text={'Играть'}
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