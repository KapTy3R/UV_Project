import React, {useEffect, useState} from 'react';

import {Button, Container} from 'components/common/elements';

import style from './style.module.scss';
import {mergeClassNames} from 'utils/mergeClassNames';
import {PlayerT} from '../../../../types/redux';
import {isUndefined} from 'lodash';
import styled from 'styled-components';

type InputModalP = {
    bg:string,
    players:PlayerT[],
    storePlayerName:string,
    closeModal:(typedValue:string) => void
};

const Outer = styled.div<{bg:string}>`
  background: ${props => props.bg};
`;

export const InputModal = (props:InputModalP) => {
    const {bg, storePlayerName, closeModal, players} = props;

    const [value, setValue] = useState(storePlayerName ?? '');
    const [isNameFlag, setNameFlag] = useState(false);
    const [isLengthFlag, setLengthFlag] = useState(false);

    const getSameNameFlagStyles = () =>
        mergeClassNames(
            style.sameNameFlag,
            isNameFlag || isLengthFlag ? style.sameNameFlagActive : '',
        );

    useEffect(() => {
        const playerWithSameName = players.find(player => player.name === value && player.name !== '' && player.name !== storePlayerName);
        const isMaxLength = value && value.length > 8;

        if (!isUndefined(playerWithSameName)) setNameFlag(true);
        else setNameFlag(false);

        if (isMaxLength) setLengthFlag(true);
        else setLengthFlag(false);
    }, [value, players]);

    return (
        <Outer bg={bg} className={style.outer}>
            <div className={style.bg}/>
            <Container>
                <div className={style.wrapper}>
                    <h2 className={style.title}>Введите имя</h2>
                    <input
                        type={'text'}
                        value={value && value.slice(0, 9)}
                        className={style.input}
                        onChange={(event) => setValue(event.currentTarget.value)}/>
                    <Button
                        text={'Принять'}
                        colorType={'second'}
                        className={style.btn}
                        isDisabled={isNameFlag || isLengthFlag}
                        handle={() => closeModal(value)}/>
                    <span className={getSameNameFlagStyles()}>
                        {isLengthFlag
                            ? 'Слишком длинный никнейм'
                            : isNameFlag && value && value.length > 0
                                ? 'Пользователь с таким именем уже есть'
                                : ''}</span>
                </div>
            </Container>
        </Outer>
    );
};