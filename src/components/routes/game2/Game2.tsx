import React, {useEffect} from 'react';

import {Players, Rules, StartModal} from 'components/common/stages';
import {Content} from './content';
import {GameP} from '../../../types/components';
import {store} from 'store';
import {setGameData2} from 'store/game/slice';
import {FinishModal} from 'components/common/elements';
import {CircleMode} from 'components/common/stages/circle-mode';

export const Game2 = (props:GameP) => {
    const {gameInfo, isFinished, winner, currentStage} = props;
    const {game} = store.getState();

    const isStartModal = currentStage === 'startModal';
    const isRules = currentStage === 'rules';
    const isPlayers = currentStage === 'players';
    const isGame = currentStage === 'game';
    const isCircleMode = currentStage === 'circleMode';

    useEffect(() => {
        isGame
            ? store.dispatch(setGameData2({
                gameName: gameInfo.name,
                playerQty: game.gamePlayData.players.length
            }))
            : null;
    }, [isGame, game.gamePlayData.fieldMode]);

    return isFinished
        ? <FinishModal
            finishBg={gameInfo.finishBg}
            playerName={winner.name}
            playerScore={winner.score}
            playerColor={gameInfo.colors.users[winner.index]}/>
        : <>
            {isStartModal && <StartModal bgImgUrl={gameInfo.imgBg}/>}
            {isRules && <Rules rules={gameInfo.rules} rulesBg={gameInfo.rulesBg}/>}
            {isCircleMode && <CircleMode circleModeBtn={gameInfo.colors.buttons.circleMode} isHasDifficulty={false}/>}
            {isPlayers && <Players/>}
            {isGame && <Content
                circleSize={gameInfo.circleSize}
                circleImg={gameInfo.circleImg}
                circleFields={gameInfo.circleFields}/>}
        </>;
};