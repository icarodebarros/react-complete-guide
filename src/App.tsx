import React, { useState } from 'react';

import Person from './Person/Person';

import classes from './App.module.css';

interface IPerson {
  id: number;
  name: string;
  age: number;
}

function App(): JSX.Element {
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
  const btnClass = [classes.Button];

  if (showPersons) {
    persons = (
      <div>
        {
          personsState.persons.map((person: IPerson, index: number) => {
            return (
              <Person
                key={person.id}
                name={person.name} 
                age={person.age}
                click={() => deletePersonHandler(index)}
                changed={(event) => nameChangedHandler(event, index)}
              />
            );
          })
        }
      </div>
    );

    btnClass.push(classes.Red);
  }

  const assignedClasses = [];
  if (personsState.persons.length <= 2) {
    assignedClasses.push(classes.red);
    if (personsState.persons.length <= 1) {
      assignedClasses.push(classes.bold);
    }
  }

  return (
    <div className={classes.App}>
        <h1 >Hi, I&apos;m a React App</h1>
        <p className={assignedClasses.join(' ')}>This is really working!</p>

        <button className={btnClass.join(' ')} onClick={togglePersonsHandler}>
          Toggle Persons
        </button>
        { persons }
    </div>
  );
  // return React.createElement('div', {className: 'App'}, React.createElement('h1', null, 'Hi, I\'m a React App!!'));
}

export default App;
