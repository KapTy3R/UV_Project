import React from 'react';

import {getRenderText} from 'utils';
import {goNextStage} from 'store/utils';
import {Button, Container} from 'components/common/elements';

import style from './style.module.scss';
import styled from 'styled-components';

export type RulesP = {
    rules:string,
    rulesBg:string
};

const Wrapper = styled.div<{bg:string}>`
  background: ${props => props.bg};
`;

export const Rules = (props:RulesP) => {
    const {rules, rulesBg} = props;

    return (
        <Wrapper className={style.wrapper} bg={rulesBg}>
            <Container>
                <div className={style.inner}>
                    <div className={style.text}>{getRenderText(rules).map((row, i) =>
                        <p key={i} className={style.textRow}>{row}</p>)}</div>
                    <Button
                        text={'Играть'}
                        colorType={'third'}
                        className={style.btn}
                        handle={() => goNextStage('circleMode')}/>
                </div>
            </Container>
        </Wrapper>
    );
};