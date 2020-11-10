import React from 'react';
import { GenericProps } from '../containers/App';

// interface withClassProps {
//     classes: string;
// }

// const withClass: React.FC<withClassProps> = (props: PropsWithChildren<withClassProps>) => (
//     <div className={props.classes}> {props.children} </div>
// );

// const withClass = <P extends GenericProps>(WrappedComponent: React.ComponentType<P>, className: string): React.ComponentClass<P> => {
//     return class Wrapped extends React.Component<P> {
//         render() {
//             return (
//                 <div className={className}>
//                     <WrappedComponent {...this.props as P} />
//                 </div>
//             );
//         }
//     };
// };

const withClass = <P extends GenericProps>(WrappedComponent: React.ComponentType<P>, className: string): React.FC<P> => {
    // eslint-disable-next-line react/display-name
    return (props: P): JSX.Element => (
        <div className={className}>
            <WrappedComponent {...props} />
        </div>
    );
};

export default withClass;