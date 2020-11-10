import React, { Component } from 'react';
import Cockpit from '../components/Cockpit/Cockpit';

import Persons, { IPerson } from '../components/Persons/Persons';
import withClass from '../hoc/WithClass';
import Aux from '../hoc/Auxiliary';
import AuthContext from '../context/auth-context';

import classes from './App.module.css';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface GenericProps { }

interface appProps extends GenericProps {
  appTitle: string;
}

interface appState {
  persons: IPerson[];
  otherAtribute: string;
  showPersons: boolean;
  showCockpit: boolean;
  changeCounter: number;
  authenticated: boolean;
}

class App extends Component<appProps, appState> {

  constructor(props: appProps) {
    super(props);
    console.log('[App.js] constructor');
    // this.state = { ... }
  }

  state: appState = {
    persons: [
      { id: 1, name: 'Max', age: 28 },
      { id: 2, name: 'Maanu', age: 29 },
      { id: 3, name: 'Stephanie', age: 26 }
    ],
    otherAtribute: 'some value',
    showPersons: false,
    showCockpit: true,
    changeCounter: 0,
    authenticated: false,
  };

  static getDerivedStateFromProps(props: appProps, state: appState): appState {
    console.log('[App.js] getDerivedStateFromProps', props);
    return state;
  }

  componentDidMount(): void {
    console.log('[App.js] componentDidMount');
  }

  shouldComponentUpdate(nextProps: appProps, nextState: appState): boolean {
    console.log('[App.js] shouldComponentUpdate', nextProps, nextState);
    return true;
  }
  
  componentDidUpdate(): void {
    console.log('[App.js] componentDidUpdate');
  }

  deletePersonHandler = (personIndex: number): void => {
    const persons = [...this.state.persons];
    persons.splice(personIndex, 1);
    this.setState({ persons });
  };

  nameChangedHandler = (event: React.ChangeEvent<HTMLInputElement>, personIndex: number): void => {
    const person: IPerson = {...this.state.persons[personIndex]};
    person.name = event.target.value;

    const persons = [...this.state.persons];
    persons[personIndex] = person;
    
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    this.setState((prevState: appState, _props: appProps) => {
      return {
        persons: persons,
        changeCounter: prevState.changeCounter + 1,
      };
    });
  };
  
  togglePersonsHandler = (): void => {
    const doesShow = this.state.showPersons;
    this.setState({ showPersons: !doesShow });    
  };

  loginHandler = () => {
    this.setState({authenticated: true});
  };

  render(): JSX.Element {
    console.log('[App.js] render');
    let persons = null;
    
    if (this.state.showPersons) {
      persons = (
        <Persons
          persons={this.state.persons}
          clicked={this.deletePersonHandler}
          changed={this.nameChangedHandler}
          isAuthenticated={this.state.authenticated}
        />
      );
    }

    return (
      <Aux>
        <button onClick={() => this.setState({showCockpit: false})}>
          Remove Cockpit
        </button>
        <AuthContext.Provider value={{ 
            authenticated: this.state.authenticated,
            login: this.loginHandler
          }}
        >
          {this.state.showCockpit ? (
            <Cockpit
              personsLength={this.state.persons.length}
              showPersons={this.state.showPersons}
              clicked={this.togglePersonsHandler} 
              title={this.props.appTitle}
            />
          ) : null}
          { persons }
        </AuthContext.Provider>
      </Aux>
    );
    // return React.createElement('div', {className: 'App'}, React.createElement('h1', null, 'Hi, I\'m a React App!!'));
  }

}

export default withClass(App, classes.App);
