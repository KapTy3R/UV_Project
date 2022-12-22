import React, {CSSProperties} from 'react';

import {mergeClassNames} from 'utils/index';

import {games} from 'config/games';

import {store} from 'store';

import style from './style.module.scss';

import styled from 'styled-components';
import {GameInfo} from '../../../../types/config';

const ColoredButton = styled.button<{bgColor:string}>`
  background: ${props => props.bgColor};
`;

type ButtonP = {
    text:string,
    isDisabled?:boolean
    className?:string,
    styles?:CSSProperties,
    handle?:Function,
    colorType?:keyof GameInfo['colors']['buttons']
};

export const Button = (props:ButtonP) => {
    const {isDisabled, className = '', styles, text, handle, colorType = 'first'} = props;
    const {gameName} = store.getState().game;

    // @ts-ignore
    const buttonColors:GameT['colors']['buttons'] = games.find(game => game.name === gameName).colors.buttons;

    const isHasHandle = !!handle;

    const getButtonClasses = () =>
        mergeClassNames(
            className,
            style.button
        );

    return (
        <ColoredButton
            bgColor={buttonColors[colorType]}
            disabled={isDisabled}
            style={styles}
            onClick={() => isHasHandle ? handle() : null}
            className={getButtonClasses()}>{text}</ColoredButton>
    );
};