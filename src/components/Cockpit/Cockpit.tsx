import React from 'react';
import { IPerson } from '../Persons/Persons';

import classes from './Cockpit.module.css';

interface cockpitProps {
    persons: IPerson[];
    showPersons: boolean;
    clicked: (event: React.MouseEvent) => void;
    title: string;
}

const cockpit: React.FC<cockpitProps> = (props: cockpitProps) => {

    let btnClass = '';
    if (props.showPersons) {
        btnClass = classes.Red;
    }

    const assignedClasses = [];
    if (props.persons.length <= 2) {
        assignedClasses.push(classes.red);
        if (props.persons.length <= 1) {
            assignedClasses.push(classes.bold);
        }
    }  

    return (
        <div className={classes.Cockpit}>
            <h1 >{props.title}</h1>
            <p className={assignedClasses.join(' ')}>This is really working!</p>

            <button className={btnClass} onClick={props.clicked}>
                Toggle Persons
            </button>
        </div>
    );
};

export default cockpit;