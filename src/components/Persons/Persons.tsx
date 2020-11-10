import React, { Component } from 'react';

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
    isAuthenticated: boolean;
}

// ----- CLASS BASED COMPONENT -----
class Persons extends Component<personsProps>{ // extends PureComponent
    // PureComponent -> é basicamente igual ao Component mas que tem o método
    // 'shouldComponentUpdate' implementado com TODOS os atributos sendo verificados


    // static getDerivedStateFromProps(props: personsProps, state: unknown): unknown {
    //     console.log('[Persons.js] getDerivedStateFromProps');
    //     return state;
    // }

    shouldComponentUpdate(nextProps: personsProps, nextState: unknown): boolean {
        console.log('[Persons.js] shouldComponentUpdate', nextProps, nextState);
        // Deve atualizar apenas se lista de pessoas mudar
        return nextProps.persons !== this.props.persons;
        // OBS.: só funciona pq a referência do array persons também está mudando
        // quando algum elemento muda.
    }

    getSnapshotBeforeUpdate(prevProps: personsProps, prevState: unknown): unknown {
        console.log('[Persons.js] getSnapshotBeforeUpdate', prevProps, prevState);
        return {message: 'Snapshot!'};
    }

    componentDidUpdate(prevProps: personsProps, prevState: unknown, snapshot: unknown): void {
        console.log('[Persons.js] componentDidUpdate');
        console.log(snapshot);
    }

    // dispara após o componente ser removido
    componentWillUnmount(): void { // usado geralmente para 'limpeza'
        console.log('[Persons.js] componentWillUnmount');
    }

    render(): JSX.Element[] {
        console.log('[Persons.js] rendering...');
        return this.props.persons.map((person: IPerson, index: number) => {
            return <Person
                key={person.id}
                name={person.name} 
                age={person.age}
                click={() => this.props.clicked(index)}
                changed={(event) => this.props.changed(event, index)}
                isAuth={this.props.isAuthenticated}
            />;
        });
    }
}

export default Persons;

// ----- FUNCTION COMPONENT -----
// const persons: React.FC<personsProps> = (props: personsProps) => {
//     console.log('[Persons.js] rendering...');
//     return (
//         <div>
//             {
//                 props.persons.map((person: IPerson, index: number) => {
//                     return <Person
//                         key={person.id}
//                         name={person.name} 
//                         age={person.age}
//                         click={() => props.clicked(index)}
//                         changed={(event) => props.changed(event, index)}
//                     />;
//                 })
//             }
//         </div>
//     );
// };

// export default persons;