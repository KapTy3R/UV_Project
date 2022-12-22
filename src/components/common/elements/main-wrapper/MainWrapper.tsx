import React, {ReactNode} from 'react';

import styles from './style.module.scss';

type MainWrapperP = {children:ReactNode};

export const MainWrapper = ({children}:MainWrapperP) => <div className={styles.wrapper}>{children}</div>;