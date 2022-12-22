import React, {ReactNode, useMemo} from 'react';
import {Route, Routes, useLocation} from 'react-router-dom';

import {games} from 'config';

import {Main, TopPanel} from 'components/common/elements';
import {Game1, Game2, Game3, Games} from '../routes';

import {useSelector} from 'react-redux';
import {store} from 'store';
import {setGameName} from 'store/game/slice';
import {GameInfo} from '../../types/config';

export type GamesListT = Array<GameInfo & {component:ReactNode}>;

export const App = () => {
    const location = useLocation();
    // @ts-ignore
    const {root, game} = useSelector(state => state);

    useMemo(() => {
        const currentGame = location.pathname.replace('/', '');

        store.dispatch(setGameName(currentGame));
    }, [location]);

    const game1 = games[0];
    const game2 = games[1];
    const game3 = games[2];

    let imgGameBg;

    for (let i = 0; i < games.length; i++) {
        if (games[i].name === game.gameName) {
            imgGameBg = games[i].imgGameBg;
        }
    }

    const commonProps = {
        currentStage: root.currentStage,
        winner: game.gamePlayData.winner,
        isFinished: game.gamePlayData.isFinished,
    };

    const GameComponent1 = <Game1
        {...commonProps}
        gameInfo={game1}/>;
    const GameComponent2 = <Game2
        {...commonProps}
        gameInfo={game2}/>;
    const GameComponent3 = <Game3
        {...commonProps}
        gameInfo={game3}/>;

    const gameList:GamesListT = [
        {...game1, component: GameComponent1},
        {...game2, component: GameComponent2},
        {...game3, component: GameComponent3}
    ];

    const GamesComponent = <Games games={gameList} />;

    return (
        <>
            {location.pathname !== '/' && <TopPanel pageTitle={root.pageTitle} />}
            <Main imgGameBg={imgGameBg}>
                <Routes>
                    <Route path={'/'} element={GamesComponent}/>
                    {gameList.map((game, i) =>
                        <Route key={i} path={game.path} element={game.component}/>)}
                </Routes>
            </Main>
        </>
    );
};