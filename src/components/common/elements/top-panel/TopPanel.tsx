import React from 'react';
import {useNavigate} from 'react-router-dom';

import {Container} from 'components/common/elements';

import {store} from 'store';
import {goPrevStage} from 'store/utils';

import style from './style.module.scss';
import {isEmpty} from 'lodash';
import {mergeClassNames} from 'utils/mergeClassNames';

type TopPanelP = {
    pageTitle:string
};

export const TopPanel = (props:TopPanelP) => {
    const {pageTitle} = props;
    const {root, game} = store.getState();
    const {currentStage, prevStage} = root;
    const {winner} = game.gamePlayData;
    const navigate = useNavigate();
    
    const toPrevPage = () =>
        currentStage === 'startModal'
            ? navigate('/')
            : goPrevStage(prevStage);

    return isEmpty(winner.name)
        ? <div className={style.panel}>
            <Container>
                <div className={style.wrapper}>
                    <span onClick={toPrevPage} className={style.arrow}/>
                    <h1 className={style.title}>{pageTitle}</h1>
                </div>
            </Container>
        </div>
        : <></>;
};