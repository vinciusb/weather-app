import './App.css';
import React from 'react';
import SignContainer from "../SignContainer/SignContainer";
import WeatherApp from '../WeatherApp/WeatherApp';

class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            signedIn: false
        };

        this.signIn = this.signIn.bind(this);
    }

    signIn() {
        this.setState({ signedIn: true });
    }

    render() {
        return (
            <div className="App">
                {
                    !this.state.signedIn ?
                        <SignContainer
                            onSignIn={ this.signIn }
                        /> :
                        <WeatherApp />
                }
            </div>
        );
    }
}

export default App;