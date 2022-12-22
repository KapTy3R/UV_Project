import React from 'react';
import {useNavigate} from 'react-router-dom';

import {Button, Container} from 'components/common/elements';

import {store} from 'store';
import {setEnd} from 'store/game/slice';

import styles from './style.module.scss';
import {setRootEnd} from 'store/root/slice';
import styled from 'styled-components';

type FinishModalP = {
    playerName:string,
    playerScore:number,
    finishBg:string,
    playerColor:string
};

const FinishBg = styled.div<{finishBg:string}>`
  background-image: url(${props => props.finishBg});
`;

const UserIcon = styled.div<{playerColor:string}>`
  background: ${props => props.playerColor};
`;

export const FinishModal = (props:FinishModalP) => {
    const {playerName, playerScore, finishBg, playerColor} = props;
    const navigate = useNavigate();
    const end = () => {
        navigate('/');
        store.dispatch(setEnd('-game'));
        store.dispatch(setRootEnd('-root'));
    };

    return (
        <FinishBg finishBg={finishBg} className={styles.bg}>
            <Container>
                <div className={styles.wrapper}>
                    <h1 className={styles.title}>Победитель</h1>
                    <UserIcon playerColor={playerColor} className={styles.userIcon}>
                        <img src={require('assets/img/icons/readyUser.png')} alt={'user'}/></UserIcon>
                    <h2 className={styles.userName}>{playerName}</h2>
                    <span className={styles.userScore}>{playerScore} очков</span>
                    <Button
                        handle={end}
                        text={'На главную'}
                        colorType={'second'}
                        className={styles.btn}/>
                </div>
            </Container>
        </FinishBg>
    );
};