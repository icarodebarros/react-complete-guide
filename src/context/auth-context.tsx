import React from 'react';

export interface IAuthContext {
    authenticated: boolean,
    login: () => unknown,
}

const authContext = React.createContext<IAuthContext>({
    authenticated: false,
    login: () => { /** */ },
});

export default authContext;