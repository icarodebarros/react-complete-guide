import React from 'react';

import Person from './Person/Person';
// import ErrorBoundary from '../../util/ErrorBoundary/ErrorBoundary';

export interface IPerson {
    id: number;
    name: string;
    age: number;
}

interface personsProps {
    persons: IPerson[];
    clicked: (index: number) => void;
    changed: (event: React.ChangeEvent<HTMLInputElement>, index: number) => void;
}

const persons: React.FC<personsProps> = (props: personsProps) =>
    <div>
        {
            props.persons.map((person: IPerson, index: number) => {
                return <Person
                    key={person.id}
                    name={person.name} 
                    age={person.age}
                    click={() => props.clicked(index)}
                    changed={(event) => props.changed(event, index)}
                />;
            })
        }
    </div>;

export default persons;