import {shuffle, uniqBy} from 'lodash';

import {GameDataT} from '../types/redux';

const data = require('data/data.json');

export type GetDataFromJsonT = (
    props:{
        gameName:string,
        complexity?:number,
        levelQty:number
    }
) => GameDataT;

type LevelT = {
    theme:string,
    task:string,
    answer?:string,
    complexity?:number,
    desc?:string
};

// @ts-ignore
export const getDataFromJson:GetDataFromJsonT = (props):Array<LevelT> => {
    const {gameName, complexity, levelQty} = props;

    const levels:GameDataT = data[gameName];

    const splicedLevels = [];

    if (gameName === 'imagine') {
        const filterByComplexityLevels = levels.filter((level:LevelT) => level.complexity === complexity);
        const shuffledLevels = shuffle(filterByComplexityLevels);

        splicedLevels.push(...shuffledLevels.splice(0, levelQty));
    }

    if (gameName === 'drum') {
        const getLevels = () => {
            const newLevels = [];

            for (let i = 0; i < 3; i++) newLevels.push(...uniqBy(shuffle(levels), 'theme'));

            return newLevels;
        };

        splicedLevels.push(...getLevels().splice(0, levelQty));
    }

    if (gameName === 'quiz') {
        const getLevels = () => {
            const newLevels = [];

            for (let i = 0; i < 3; i++) newLevels.push(...uniqBy(shuffle(levels), 'theme'));

            return newLevels;
        };

        splicedLevels.push(...getLevels().splice(0, levelQty));
    }

    return splicedLevels;
};