export enum CircleType {
    auto = 'auto',
    hand = 'hand'
}

export type PlayerT = {
    name:string,
    score:number
};

export type RoundT = {
    theme:string,
    task:string,
    answer:string,
    complexity:number
};

export type GameDataT = Array<RoundT>;

export type GameT = {
    gameName:string,
    gamePlayData:{
        difficulty:number,
        players:Array<PlayerT>,
        currentLevel:number,
        currentRound:number,
        currentUserIndex:number,
        currentRotateIndex:number,
        typedWord:Array<string>,
        typedLetter:string,
        fieldMode:string,
        isRightAnswer:boolean,
        startAngle:number,
        winner:PlayerT & {index:number},
        isFinished:boolean
    },
    gameData:GameDataT,
    isFinished:boolean,
    bgStatus:boolean,
    circleType:CircleType | ''
};

export type RootT = {
    pageTitle:string,
    currentStage:string,
    prevStage:string
};