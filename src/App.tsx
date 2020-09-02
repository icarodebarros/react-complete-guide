import React, { useState } from 'react';

import Person from './Person/Person';

import './App.css';

function App(): JSX.Element {
  const [personsState, setPersonsState] = useState({
    persons: [
      { name: 'Max', age: 28 },
      { name: 'Maanu', age: 29 },
      { name: 'Stephanie', age: 26 }
    ],
    // otherAtribute: 'some value' // DON'T USE BIG STATES
  });

  // USE MULTIPLE AND SMALLER STATES
  // const [otherState, setOtherState] = useState('some value');

  const switchNameHandler = (newName: string) => {
    // DON'T DO THIS: this.state.persons[0].name = 'Maximilian';
    setPersonsState({
      persons: [
        { name: newName, age: 28 },
        { name: 'Maanu', age: 29 },
        { name: 'Stephanie', age: 27 }
      ],
      // otherAtribute: personsState.otherAtribute // Must pass the full 'state'
    });
  };

  const nameChangedHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPersonsState({
      persons: [
        { name: 'Max', age: 28 },
        { name: event.target.value, age: 29 },
        { name: 'Stephanie', age: 26 }
      ]
    });
  };

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
        <button style={style} onClick={() => switchNameHandler('Maximilian')}>Switch name</button>
        <Person 
          name={personsState.persons[0].name} 
          age={personsState.persons[0].age} />
        <Person 
          name={personsState.persons[1].name} 
          age={personsState.persons[1].age}
          click={switchNameHandler.bind(globalThis, 'Max!')}
          changed={nameChangedHandler}>My hobbies: coding</Person>
        <Person 
          name={personsState.persons[2].name} 
          age={personsState.persons[2].age} />
    </div>
  );
  // return React.createElement('div', {className: 'App'}, React.createElement('h1', null, 'Hi, I\'m a React App!!'));
}

export default App;
