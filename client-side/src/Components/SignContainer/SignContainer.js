import './SignContainer.css';
import React from 'react';

class SignContainer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            signingIn: true,
            failed: null
        };

        this.handleSignIn = this.handleSignIn.bind(this);
        this.handleSignUp = this.handleSignUp.bind(this);
        this.changeToSignUp = this.changeToSignUp.bind(this);
    }

    handleSignIn(data) {
        const url = `http://localhost:4001/signin?email=${data.email}&pwd=${data.password}`;
        fetch(url)
            .then(res => res.ok ?
                this.props.onSignIn() : res.text().then(msg => { throw new Error(msg); })
            )
            .catch(err => {
                console.log(err.message);
            });
    }

    handleSignUp(data) {
        const putMethod = {
            method: 'PUT',
            headers: { 'Content-type': 'application/json; charset=UTF-8' },
            body: JSON.stringify(data)
        };
            
        fetch('http://localhost:4001/signup', putMethod)
            .then(res => res.ok ?
                res.json() : res.text().then(msg => { throw new Error(msg); })
            )
            .then(res => console.log(res))
            // .then(this.props.onSignIn())
            .catch(err => {
                console.log(err.message);
            });
    }

    changeToSignUp() {
        this.setState({ signingIn: false });
    }

    render() {
        return (
            <div className="SignContainer">
                <Sign type={ this.state.signingIn } failMsg={"a"} onSubmit={ this.state.signingIn ? this.handleSignIn : this.handleSignUp } />
                { this.state.signingIn && <p>Not a member yet? <a onClick={ this.changeToSignUp }>Sign up</a></p> }
            </div>
        );
    }
}


class Sign extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            formData: {
                fName: "",
                lName: "",
                email: "",
                password: ""
            }
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.renderSign = this.renderSign.bind(this);
    }

    handleChange(e) {
        let formData = this.state.formData;
        formData[e.target.name] = e.target.value;
        this.setState({ formData });
    }
    
    handleSubmit(e) {
        e.preventDefault();
        this.props.onSubmit(this.state.formData);
    }

    renderSign(type) {
        let children;
        if(type) {
            children =
                <form action="" onSubmit={ this.handleSubmit } >
                    <input name="email" type="text" placeholder="E-mail" value={ this.state.formData.email } onChange={ this.handleChange } />
                    <input name="password" type="password" placeholder="Password" value={ this.state.formData.password } onChange={ this.handleChange } />
                    <input type="submit" value="Sign In" />
                </form>;
        }
        else {
            children =
                <form action="" onSubmit={ this.handleSubmit } >
                <input name="fName" type="text" placeholder="First name" minLength="1" maxLength="20" value={ this.state.formData.fName } onChange={ this.handleChange } required={ true } />
                    <input name="lName" type="text" placeholder="Last name" minLength="1" maxLength="20" value={ this.state.formData.lName } onChange={ this.handleChange } required={ true } />
                    <input name="email" type="text" placeholder="E-mail" minLength="4" value={ this.state.formData.email } onChange={ this.handleChange } required={ true } />
                    <input name="password" type="password" placeholder="Password" minLength="8" maxLength="20" value={ this.state.formData.password } onChange={ this.handleChange } required={ true } />
                    <input type="submit" value="Sign Up" />
                </form>;
        }
        return children;
    }

    render() {
        return (
            <div className="Sign">
                { this.renderSign(this.props.type) }
            </div>
        );
    }
}

export default SignContainer;