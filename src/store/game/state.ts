import {GameT} from '../../types/redux';

export const initialState:GameT = {
    gameName: '',
    gamePlayData: {
        difficulty: 0,
        // @ts-ignore
        players: [{}, {}, {}, {}],
        currentLevel: 0,
        currentRound: 0,
        currentUserIndex: 0,
        currentRotateIndex: 1,
        typedWord: [],
        typedLetter: '',
        fieldMode: '',
        isRightAnswer: false,
        startAngle: 0,
        winner: {
            name: '',
            score: 0,
            index: 0
        },
        isFinished: false
    },
    gameData: [],
    bgStatus: false,
    circleType: ''
};
