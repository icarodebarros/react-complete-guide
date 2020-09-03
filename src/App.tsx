import React, { useState } from 'react';

import Person from './Person/Person';

import './App.css';

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
  }

  const style = {
    backgroundColor: 'white',
    font: 'innerit',
    border: '1px solid blue',
    padding: '8px',
    cursor: 'pointer'
  };

  return (
    <div className="App">
        <h1 >Hi, I&apos;m a React App</h1>
        <p>This is really working!</p>
        <button style={style} onClick={togglePersonsHandler}>Toggle Persons</button>
        { persons }
    </div>
  );
  // return React.createElement('div', {className: 'App'}, React.createElement('h1', null, 'Hi, I\'m a React App!!'));
}

export default App;
