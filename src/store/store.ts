import {configureStore} from '@reduxjs/toolkit';

import {gameReducer} from './game';
import {rootReducer} from './root';

export const store = configureStore({
    reducer: {
        game: gameReducer,
        root: rootReducer
    }
});