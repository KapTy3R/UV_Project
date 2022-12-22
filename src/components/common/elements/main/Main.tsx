import React, {ReactNode} from 'react';
import styled from 'styled-components';
import {useLocation} from 'react-router-dom';

import {MainWrapper} from '../../elements';

import style from './style.module.scss';
import {mergeClassNames} from 'utils/mergeClassNames';
import {store} from 'store';

type MainP = {
    imgGameBg:string | undefined,
    children:ReactNode
};

const Background = styled.div<{imgGameBg:string | undefined}>`
  background-image: url(${props => props.imgGameBg})
`;

export const Main = (props:MainP) => {
    const {children, imgGameBg} = props;

    const location = useLocation();

    const styles = {
        background: location.pathname === '/' ? '#fff' : ''
    };
    
    return (
        <Background
            style={styles}
            className={style.bg}
            imgGameBg={imgGameBg}>
            <MainWrapper>
                {children}
            </MainWrapper>
        </Background>
    );
};