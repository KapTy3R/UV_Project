export const stages = {
    startModal: {
        name: '',
        prevStage: ''
    },
    rules: {
        name: {
            imagine: 'Правила',
            drum: 'Правила',
            quiz: 'Правила'
        },
        prevStage: {
            imagine: 'startModal',
            drum: 'startModal',
            quiz: 'startModal'
        }
    },
    circleMode: {
        name: {
            imagine: '',
            drum: '',
            quiz: ''
        },
        prevStage: {
            imagine: 'startModal',
            drum: 'startModal',
            quiz: 'startModal'
        }
    },
    difficulty: {
        name: {
            imagine: 'Сложность'
        },
        prevStage: {
            imagine: 'circleMode',
            drum: 'startModal',
            quiz: 'startModal'
        }
    },
    players: {
        name: {
            imagine: 'Игроки',
            drum: 'Игроки',
            quiz: 'Игроки'
        },
        prevStage: {
            imagine: 'difficulty',
            drum: 'circleMode',
            quiz: 'circleMode'
        }
    },
    game: {
        name: {
            imagine: 'Поле чудес',
            drum: 'Фан-барабан',
            quiz: 'IQ-Викторина'
        },
        prevStage: {
            imagine: 'players',
            drum: 'players',
            quiz: 'players'
        }
    }
};