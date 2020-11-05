import React, { useState } from 'react';
import Cockpit from '../components/Cockpit/Cockpit';

import Persons from '../components/Persons/Persons';
import { IPerson } from '../components/Persons/Persons';
// import ErrorBoundary from '../util/ErrorBoundary/ErrorBoundary';

import classes from './App.module.css';

interface appProps {
  appTitle: string;
}

function App(props: appProps): JSX.Element {
  const [personsState, setPersonsState] = useState<{persons: IPerson[]}>({
    persons: [
      { id: 1, name: 'Max', age: 28 },
      { id: 2, name: 'Maanu', age: 29 },
      { id: 3, name: 'Stephanie', age: 26 }
    ],
    // otherAtribute: 'some value' // DON'T USE BIG STATES
  });

  // USE MULTIPLE AND SMALLER STATES
  // const [otherState, setOtherState] = useState('some value');

  const [showPersons, setShowPersons] = useState(false);

  const deletePersonHandler = (personIndex: number) => {
    const persons = [...personsState.persons];
    persons.splice(personIndex, 1);
    setPersonsState({ persons });
  };

  const nameChangedHandler = (event: React.ChangeEvent<HTMLInputElement>, personIndex: number) => {
    const person: IPerson = {...personsState.persons[personIndex]};
    person.name = event.target.value;

    const persons = [...personsState.persons];
    persons[personIndex] = person;
    
    setPersonsState({ persons });
  };
  
  const togglePersonsHandler = () => {
    setShowPersons(!showPersons);    
  };

  let persons = null;
  if (showPersons) {
    persons = (
      <Persons
        persons={personsState.persons}
        clicked={deletePersonHandler}
        changed={nameChangedHandler}
      />
    );
  }

  return (
    <div className={classes.App}>
      <Cockpit
        persons={personsState.persons}
        showPersons={showPersons}
        clicked={togglePersonsHandler}
        title={props.appTitle}
      />
        { persons }
    </div>
  );
  // return React.createElement('div', {className: 'App'}, React.createElement('h1', null, 'Hi, I\'m a React App!!'));
}

export default App;
