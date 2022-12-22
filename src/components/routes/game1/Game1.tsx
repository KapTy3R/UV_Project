import React from 'react';

import {StartModal, Rules, Difficulty, Players} from 'components/common/stages';
import {FinishModal} from 'components/common/elements';
import {Content} from './content';
import {GameP} from '../../../types/components';
import {CircleMode} from 'components/common/stages/circle-mode';

export const Game1 = (props:GameP) => {
    const {gameInfo, winner, isFinished, currentStage} = props;

    const isStartModal = currentStage === 'startModal';
    const isRules = currentStage === 'rules';
    const isDifficulty = currentStage === 'difficulty';
    const isPlayers = currentStage === 'players';
    const isGame = currentStage === 'game';
    const isCircleMode = currentStage === 'circleMode';

    return isFinished
        ? <FinishModal
            finishBg={gameInfo.finishBg}
            playerName={winner.name}
            playerScore={winner.score}
            playerColor={gameInfo.colors.users[winner.index]}/>
        : <>
            {isStartModal && <StartModal bgImgUrl={gameInfo.imgBg}/>}
            {isRules && <Rules rules={gameInfo.rules} rulesBg={gameInfo.rulesBg}/>}
            {isCircleMode && <CircleMode circleModeBtn={gameInfo.colors.buttons.circleMode} isHasDifficulty={true}/>}
            {isDifficulty && <Difficulty gameName={gameInfo.name}/>}
            {isPlayers && <Players/>}
            {isGame && <Content
                circleSize={gameInfo.circleSize}
                circleImg={gameInfo.circleImg}
                circleFields={gameInfo.circleFields}/>}
        </>;
};