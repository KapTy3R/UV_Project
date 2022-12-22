import {GameInfo} from './config';

export type GameP = {
    gameInfo:GameInfo
    isFinished:boolean,
    currentStage:string,
    winner:{name:string, score:number, index:number},
};

export type AutoCircleP = {
    startAngle:number,
    currentRotateIndex:number,
    setBtnStatus:Function,
    circleFields:GameInfo['circleFields'],
    setStartAngle:Function,
    circleImg:GameInfo['circleImg'],
    circleSize:GameInfo['circleSize']
};

export type HandCircleP = {
    circleImg:GameInfo['circleImg'],
    circleSize:GameInfo['circleSize']
};

export type ContentP = Pick<AutoCircleP, 'circleFields' | 'circleImg' | 'circleSize'>;