import React, {useRef} from 'react';
import styled from 'styled-components';

import style from './style.module.scss';
import {HandCircleP} from '../../../../types/components';
import {store} from 'store';
import {setFieldMode} from 'store/game/slice';
import {games} from '../../../../config';

const CircleComponent = styled.div<{bg:string, size:number}>`
  width: ${props => props.size}px;
  height: ${props => props.size}px;
  background-image: url(${props => props.bg});
`;

export const HandCircle = (props:HandCircleP) => {
    const {circleImg, circleSize} = props;
    const {gameName} = store.getState().game;

    const circleRef = useRef<HTMLDivElement>(null);

    const {circleFields} = games.filter(game => game.name === gameName)[0];

    const rotateFinished = ():void => {
        // @ts-ignore
        const [currentAngle] = circleRef.current.style.transform.match(/rotate\((\d+)(.+)\)/).slice(1);

        if (currentAngle) {
            const currentField = circleFields
                .filter(field =>
                    (Math.abs(+currentAngle - field.angle) + (360 / circleFields.length / 2)) < (360 / circleFields.length))[0];

            store.dispatch(setFieldMode(currentField.name));
        }
    };

    const rotate = ():void => {
        // @ts-ignore
        new Propeller(circleRef.current, {
        // inertia: 0.99,
        // onDragStop: rotateFinished
        });
    };

    return (
        <>
            <div className={style.circleWrapper}>
                <CircleComponent
                    ref={circleRef}
                    onTouchMove={rotate}
                    onTouchEnd={rotateFinished}
                    bg={circleImg}
                    size={circleSize}
                    className={style.circle}/>
                <span className={style.circleArrow}/>
            </div>
        </>
    );
};