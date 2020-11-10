import React, { Component } from 'react';
import AuthContext from '../../../context/auth-context';

import Aux from '../../../hoc/Auxiliary';
import withClass from '../../../hoc/WithClass';
import classes from './Person.module.css';

interface personProps {
    name: string;
    age: number;
    click?: (event: React.MouseEvent) => void;
    changed?: (event: React.ChangeEvent<HTMLInputElement>) => void;
    isAuth: boolean;
}

// ----- CLASS BASED COMPONENT -----
class Person extends Component<personProps> {
    private inputElementRef: React.RefObject<HTMLInputElement>;

    static contextType = AuthContext; // Necessário para acessar o contexto no código JS/TS

    constructor(props: personProps) {
        super(props);
        this.inputElementRef = React.createRef();
    }
    
    componentDidMount() {
        this.inputElementRef.current && this.inputElementRef.current.focus();
        console.log(this.context.authenticated); // Contexto acessável via 'this.context'
    }

    render(): JSX.Element {
        console.log('[Person.js] rendering...');
        return (
            // <React.Fragment>
            <Aux>
                
                { this.context.authenticated ? <p>Authenticated!</p> : <p>Please log in</p>}
                
                <p onClick={this.props.click} >I&apos;m a Person! My name is {this.props.name}, and I have {this.props.age} years old!</p>
                <p>{this.props.children}</p>
                <input 
                    ref={this.inputElementRef}
                    type="text" 
                    onChange={this.props.changed} 
                    value={this.props.name}
                />
            </Aux>
            // </React.Fragment>
        );
    }
}

export default withClass(Person, classes.Person);

// ----- FUNCTION COMPONENT -----
// const person: React.FC<personProps> = (props: PropsWithChildren<personProps>) => {
//     console.log('[Person.js] rendering...');
//     return (
//         <div className={classes.Person}>
//             <p onClick={props.click} >I&apos;m a Person! My name is {props.name}, and I have {props.age} years old!</p>
//             <p>{props.children}</p>
//             <input type="text" onChange={props.changed} value={props.name} />
//         </div>
//     );
// };

// export default person;
