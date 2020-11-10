import React, { useEffect, useRef, MutableRefObject, useContext } from 'react';
import AuthContext from '../../context/auth-context';

import classes from './Cockpit.module.css';

interface cockpitProps {
    personsLength: number;
    showPersons: boolean;
    clicked: (event: React.MouseEvent) => void;
    title: string;
}

const Cockpit: React.FC<cockpitProps> = (props: cockpitProps) => {
    const toggleBtnRef: MutableRefObject<HTMLButtonElement | null> = useRef(null);
    
    const authContext = useContext(AuthContext);
    console.log(authContext.authenticated);

    useEffect(() => { // componentDidMount + componentDidUpdate
        console.log('[Cockpit.js] useEffect');
        // Http request...
        // setTimeout(() => alert('Saved data to cloud!'), 1000);
        toggleBtnRef.current && toggleBtnRef.current.click();
        return () => {
            console.log('[Cockpit.js] cleanup work in useEffect');
        };
    }, []); // Array de pedendencias que disparam a callback function;
    // Se passado um array vazio, a função cb só executa quando o componende é montado e quando é
    // desmontado.

    useEffect(() => {
        console.log('[Cockpit.js] 2nd useEffect');
        return () => {
            console.log('[Cockpit.js] cleanup work in 2nd useEffect');
        };
    });

    let btnClass = '';
    if (props.showPersons) {
        btnClass = classes.Red;
    }

    const assignedClasses = [];
    if (props.personsLength <= 2) {
        assignedClasses.push(classes.red);
        if (props.personsLength <= 1) {
            assignedClasses.push(classes.bold);
        }
    }  

    return (
        <div className={classes.Cockpit}>
            <h1 >{props.title}</h1>
            <p className={assignedClasses.join(' ')}>This is really working!</p>

            <button ref={toggleBtnRef} className={btnClass} onClick={props.clicked}>
                Toggle Persons
            </button>

            {/* <AuthContext.Consumer>
                {(context) => <button onClick={context.login}>Log In</button>}
            </AuthContext.Consumer> */}
            <button onClick={authContext.login}>Log In</button>
        </div>
    );
};

// React.memo: usado em functional components que não precisam ser atualizados sempre o componente pai
// for alterado
export default React.memo(Cockpit);