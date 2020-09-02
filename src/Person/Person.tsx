import React, { PropsWithChildren } from 'react';
import './Person.css';

interface personProps {
    name: string;
    age: number;
    click?: (event: React.MouseEvent) => void;
    changed?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const person: React.FC<personProps> = (props: PropsWithChildren<personProps>) => {
    return (
        <div className="Person">
            <p onClick={props.click} >I&apos;m a Person! My name is {props.name}, and I have {props.age} years old!</p>
            <p>{props.children}</p>
            <input type="text" onChange={props.changed} value={props.name} />
        </div>
    );
};

export default person;
