import React from 'react';
import styled from 'styled-components';

import {Button, Container} from 'components/common/elements';

import {goNextStage} from 'store/utils';

import style from './style.module.scss';

export type StartModalP = {
    bgImgUrl:string
};

const ImageBackground = styled.div<{imgUrl:string}>`
    background-image: url(${props => props.imgUrl});
`;

export const StartModal = (props:StartModalP) => {
    const {bgImgUrl} = props;

    return (
        <ImageBackground
            imgUrl={bgImgUrl}
            className={style.bg}>
            <Container>
                <div className={style.btnWrapper}>
                    <Button
                        text={'Играть'}
                        colorType={'first'}
                        className={style.btn}
                        handle={() => goNextStage('circleMode')}/>
                    <Button
                        text={'Правила'}
                        colorType={'second'}
                        className={style.btn}
                        handle={() => goNextStage('rules')}/>
                </div>
            </Container>
        </ImageBackground>
    );
};