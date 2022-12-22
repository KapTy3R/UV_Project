import {AutoCircleP} from '../../../../types/components';
import styled, {keyframes} from 'styled-components';
import {store} from 'store';
import React, {useEffect, useState} from 'react';
import style from 'components/common/elements/circle/style.module.scss';
import {setFieldMode} from 'store/game/slice';
import {random} from 'lodash';

const rotate = (startAngle:number, finishAngle:number) => keyframes`
    0% {transform: rotate(${startAngle}deg)}
    100% {transform: rotate(${finishAngle}deg)}
`;

const CircleComponent = styled.div<{startAngle:number, finishAngle:number, rotatingTime:number, bg:string, size:number}>`
  width: ${props => props.size}px;
  height: ${props => props.size}px;
  background-image: url(${props => props.bg});
  animation: ${props => rotate(props.startAngle, props.finishAngle)} ${props => props.rotatingTime}s ease-in-out forwards;
`;

export const AutoCircle = (props:AutoCircleP) => {
    const {circleImg, circleSize, setBtnStatus, circleFields, currentRotateIndex, startAngle, setStartAngle} = props;

    const initAngle = 0;
    const rotatingTime = 4;
    const rotatingQty = 3;
    const initField = {name: '', finishAngle: initAngle};

    const [currentField, setCurrentField] = useState<{name:string, finishAngle:number}>(initField);

    useEffect(() => {
        const randomField = circleFields[random(0, circleFields.length - 1)];

        const newAngle = rotatingQty * 360 * currentRotateIndex + randomField.angle;

        setCurrentField({...randomField, finishAngle: newAngle});
        setStartAngle(newAngle);

        store.dispatch(setFieldMode(randomField.name));
    }, [currentRotateIndex]);

    return (
        <>
            <div className={style.circleWrapper}>
                <CircleComponent
                    bg={circleImg}
                    size={circleSize}
                    startAngle={startAngle}
                    className={style.circle}
                    onAnimationEnd={() => setBtnStatus(false)}
                    finishAngle={currentField.finishAngle}
                    rotatingTime={rotatingTime}/>
                <span className={style.circleArrow}/>
            </div>
        </>
    );
};