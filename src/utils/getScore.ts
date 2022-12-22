export const getScore = (currentScore:number, currenFieldMode:string, isRightWord:boolean):number => {
    switch (currenFieldMode) {
        case ('100'):
            if (isRightWord) return currentScore + 2000;

            return currentScore + 100;
        case ('900'):
            if (isRightWord) return currentScore + 2000;

            return currentScore + 900;
        case ('х2'):
            if (isRightWord) return currentScore * 2 + 2000;

            return currentScore * 2;
        case ('600'):
            if (isRightWord) return currentScore + 2000;

            return currentScore + 600;
        case ('800'):
            if (isRightWord) return currentScore + 2000;

            return currentScore + 800;
        case ('400'):
            if (isRightWord) return currentScore + 2000;

            return currentScore + 400;
        case ('приз'):
            if (isRightWord) return currentScore + 1000 + 2000;

            return currentScore + 1000;
        case ('0'):
            return currentScore;
        case ('банкрот'):
            return 0;
        case ('500'):
            if (isRightWord) return currentScore + 2000;

            return currentScore + 500;
        case ('300'):
            if (isRightWord) return currentScore + 2000;

            return currentScore + 300;
        case ('200'):
            if (isRightWord) return currentScore + 2000;

            return currentScore + 200;
        case ('х3'):
            if (isRightWord) return currentScore * 3 + 2000;

            return currentScore * 3;
        case ('700'):
            if (isRightWord) return currentScore + 2000;

            return currentScore + 700;
    }

    return currentScore;
};