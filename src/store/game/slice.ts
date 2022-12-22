import {createSlice} from '@reduxjs/toolkit';
import {isEmpty, isUndefined} from 'lodash';

import {initialState} from './state';

import {getDataFromJson, compareValues, getScore} from 'utils';

const gameSlice = createSlice({
    name: 'game',
    initialState,
    reducers: {
        setCircleType: (state, action) => {
            state.circleType = action.payload;
        },
        setGameName: (state, action) => {
            state.gameName = action.payload;
        },
        setDifficulty: (state, action) => {
            state.gamePlayData.difficulty = action.payload;
        },
        setPlayers: (state, action) => {
            // @ts-ignore
            state.gamePlayData.players = state.gamePlayData.players.map((player, i) =>
                i === action.payload.index
                    ? isEmpty(action.payload.name)
                        ? {}
                        : {
                            name: isEmpty(action.payload.name) ? '' : action.payload.name,
                            score: 0
                        }
                    : player
            );
        },
        setGameData1: (state, action) => {
            state.gameData = getDataFromJson({
                gameName: action.payload.gameName,
                complexity: action.payload.complexity,
                levelQty: 15
            });
        },
        setGameData2: (state, action) => {
            state.gameData = getDataFromJson({
                gameName: action.payload.gameName,
                levelQty: action.payload.playerQty * 5
            });
        },
        setGameData3: (state, action) => {
            state.gameData = getDataFromJson({
                gameName: action.payload.gameName,
                levelQty: action.payload.playerQty * 5
            });
        },
        setFieldMode: (state, action) => {
            state.gamePlayData.fieldMode = action.payload;
        },
        setAnswer1: (state, action) => {
            const typedWord = state.gamePlayData.typedWord;
            const userTyped = action.payload.typed;
            const answer = action.payload.answer;
            const isFullWord = action.payload.isFullWord;

            const newTypedAnswer = answer.map((letter:string, i:number) =>
                letter.toUpperCase() === (isFullWord
                    ? isUndefined(userTyped[i])
                        ? ''
                        : userTyped[i].toUpperCase()
                    : userTyped.toUpperCase())
                    ? letter
                    : isEmpty(typedWord[i])
                        ? ''
                        : letter
            );

            const isRightLetter = !compareValues(typedWord, newTypedAnswer);
            const isRightWord = compareValues(answer, newTypedAnswer);
            const isGameFinished = state.gameData.length - 1 === state.gamePlayData.currentLevel && isRightWord;

            const currentPlayer = state.gamePlayData.players[state.gamePlayData.currentUserIndex];
            const currenFieldMode = state.gamePlayData.fieldMode;

            const updatedPlayers = isRightLetter || isRightWord
                ? state.gamePlayData.players
                    .map((player, i) => player.name === currentPlayer.name
                        ? {...player, index: i, score: getScore(player.score, currenFieldMode, isRightWord)}
                        : player)
                : state.gamePlayData.players;

            if (isGameFinished) {
                state.gamePlayData.isFinished = true;
            }

            const winner = updatedPlayers.reduce((prev, current) => (+prev.score > +current.score) ? prev : current);

            // @ts-ignore
            state.gamePlayData = isGameFinished
                ? {
                    ...state.gamePlayData,
                    isRightAnswer: isFullWord ? isRightWord : isRightLetter,
                    typedWord: [],
                    currentRound: 0,
                    currentLevel: 0,
                    currentRotateIndex: 1,
                    players: [{}, {}, {}],
                    startAngle: 0,
                    typedLetter: '',
                    fieldMode: '',
                    difficulty: 0,
                    winner
                }
                : {
                    ...state.gamePlayData,
                    isRightAnswer: isFullWord ? isRightWord : isRightLetter,
                    typedWord: isRightWord ? [] : isFullWord ? [] : newTypedAnswer,
                    currentRound: isRightWord ? 0 : state.gamePlayData.currentRound + 1,
                    currentUserIndex: isRightLetter || isRightLetter
                        ? state.gamePlayData.currentUserIndex
                        : state.gamePlayData.players.length - 1 === state.gamePlayData.currentUserIndex
                            ? 0
                            : state.gamePlayData.currentUserIndex + 1,
                    currentLevel: isRightWord ? state.gamePlayData.currentLevel + 1 : state.gamePlayData.currentLevel,
                    currentRotateIndex: state.gamePlayData.currentRotateIndex + 1,
                    players: updatedPlayers
                };
        },
        setAnswer2: (state, action) => {
            const currentPlayer = state.gamePlayData.players[state.gamePlayData.currentUserIndex];

            const isRightAnswer = action.payload;

            const updatedPlayers = isRightAnswer
                ? state.gamePlayData.players
                    .map((player, i) => player.name === currentPlayer.name
                        ? {...player, index: i, score: player.score + 10}
                        : player)
                : state.gamePlayData.players;

            const isGameFinished = state.gameData.length - 1 === state.gamePlayData.currentLevel && isRightAnswer;

            if (isGameFinished) {
                state.gamePlayData.isFinished = true;
            }

            const winner = updatedPlayers.reduce((prev, current) => (+prev.score > +current.score) ? prev : current);

            // @ts-ignore
            state.gamePlayData = isGameFinished
                ? {
                    ...state.gamePlayData,
                    isRightAnswer,
                    currentLevel: 0,
                    currentRotateIndex: 1,
                    players: [{}, {}, {}],
                    startAngle: 0,
                    winner
                }
                : {
                    ...state.gamePlayData,
                    isRightAnswer,
                    currentUserIndex: state.gamePlayData.players.length - 1 === state.gamePlayData.currentUserIndex
                        ? 0
                        : state.gamePlayData.currentUserIndex + 1,
                    currentLevel: state.gamePlayData.currentLevel + 1,
                    currentRotateIndex: state.gamePlayData.currentRotateIndex + 1,
                    players: updatedPlayers
                };
        },
        setAnswer3: (state, action) => {
            const userTyped = action.payload.typed;
            const answer = action.payload.answer;

            const isRightAnswer = compareValues(answer, userTyped);

            const isGameFinished = state.gameData.length - 1 === state.gamePlayData.currentLevel && isRightAnswer;

            const currentPlayer = state.gamePlayData.players[state.gamePlayData.currentUserIndex];
            const currenFieldMode = state.gamePlayData.fieldMode;

            const updatedPlayers = isRightAnswer
                ? state.gamePlayData.players
                    .map((player, i) => player.name === currentPlayer.name
                        ? {...player, index: i, score: player.score + 10}
                        : player)
                : state.gamePlayData.players;

            if (isGameFinished) {
                state.gamePlayData.isFinished = true;
            }

            const winner = updatedPlayers.reduce((prev, current) => (+prev.score > +current.score) ? prev : current);

            // @ts-ignore
            state.gamePlayData = isGameFinished
                ? {
                    ...state.gamePlayData,
                    isRightAnswer,
                    currentRound: 0,
                    currentLevel: 0,
                    currentRotateIndex: 1,
                    players: [{}, {}, {}],
                    startAngle: 0,
                    fieldMode: '',
                    difficulty: 0,
                    winner
                }
                : {
                    ...state.gamePlayData,
                    isRightAnswer,
                    currentRound: isRightAnswer ? 0 : state.gamePlayData.currentRound + 1,
                    currentUserIndex: state.gamePlayData.players.length - 1 === state.gamePlayData.currentUserIndex
                        ? 0
                        : state.gamePlayData.currentUserIndex + 1,
                    currentLevel: isRightAnswer ? state.gamePlayData.currentLevel + 1 : state.gamePlayData.currentLevel,
                    currentRotateIndex: state.gamePlayData.currentRotateIndex + 1,
                    players: updatedPlayers
                };
        },
        setPrevAngle: (state, action) => {
            state.gamePlayData.startAngle = action.payload;
        },
        setPlayersQty: (state, action) => {
            state.gamePlayData.players = action.payload;
        },
        setEnd: (state, action) => {
            console.log(action.payload);

            state.gameData = [];
            state.gamePlayData = {
                difficulty: 0,
                // @ts-ignore
                players: [{}, {}, {}],
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
            };
            state.gameName = '';
            state.isFinished = false;
        },
        setBgStatus: (state, action) => {
            state.bgStatus = action.payload;
        }
    }
});

export const gameReducer = gameSlice.reducer;

export const setCircleType = gameSlice.actions.setCircleType;
export const setGameName = gameSlice.actions.setGameName;
export const setDifficulty = gameSlice.actions.setDifficulty;
export const setPlayers = gameSlice.actions.setPlayers;
export const setGameData1 = gameSlice.actions.setGameData1;
export const setGameData2 = gameSlice.actions.setGameData2;
export const setGameData3 = gameSlice.actions.setGameData3;
export const setFieldMode = gameSlice.actions.setFieldMode;
export const setAnswer1 = gameSlice.actions.setAnswer1;
export const setAnswer2 = gameSlice.actions.setAnswer2;
export const setAnswer3 = gameSlice.actions.setAnswer3;
export const setPrevAngle = gameSlice.actions.setPrevAngle;
export const setPlayersQty = gameSlice.actions.setPlayersQty;
export const setEnd = gameSlice.actions.setEnd;
export const setBgStatus = gameSlice.actions.setBgStatus;