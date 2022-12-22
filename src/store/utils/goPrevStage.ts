import {store} from 'store';
import {setStage} from 'store/root/slice';

export const goPrevStage = (stage:string) => store.dispatch(setStage({stage, gameName: store.getState().game.gameName}));