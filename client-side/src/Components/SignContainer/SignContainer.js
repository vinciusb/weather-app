import './SignContainer.css';
import React from 'react';
import Arrow from './arrow.png'

class SignContainer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            signingIn: true,
            msg: null
        };

        this.handleSign = this.handleSign.bind(this);
        this.changeSign = this.changeSign.bind(this);
    }

    handleSign(data) {
        var url;
        var method;
        if(this.state.signingIn) {
            url = `http://localhost:4001/signin?email=${data.email}&pwd=${data.password}`;
            method = {};
        }
        else {
            url = 'http://localhost:4001/signup';
            method = {
                method: 'PUT',
                headers: { 'Content-type': 'application/json; charset=UTF-8' },
                body: JSON.stringify(data)
            };
        }

        fetch(url, method)
            .then(res => {
                if(res.ok) this.state.signingIn && this.props.onSignIn();
                else res.text().then(msg => this.setState({ msg }));
            })
            .catch(err => {
                console.log(err.message);
            });
    }

    changeSign() {
        this.setState({
            signingIn: !this.state.signingIn,
            msg: null
        });
    }

    render() {
        return (
            <div className="SignContainer">
                <Sign type={ this.state.signingIn } failMsg={ this.state.msg } onSubmit={ this.handleSign } onChangeSign={ this.changeSign } />
                { this.state.signingIn && <h3>Not a member yet? <a onClick={ this.changeSign }>Sign up</a></h3> }
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
            },
            mouseOn: false
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
                <form className="sign-form" onSubmit={ this.handleSubmit } >
                    <input name="email" type="text" placeholder="E-mail" value={ this.state.formData.email } onChange={ this.handleChange } />
                    <input name="password" type="password" placeholder="Password" value={ this.state.formData.password } onChange={ this.handleChange } />
                    <input className="submit-button" type="submit" value="Sign In" />
                    { this.props.failMsg !== null && <div className="signError"><h3>{ this.props.failMsg }</h3></div> }
                </form>;
        }
        else {
            children =
                <form className="sign-form" onSubmit={ this.handleSubmit } >
                    <input name="fName" type="text" placeholder="First name" minLength="1" maxLength="20" value={ this.state.formData.fName } onChange={ this.handleChange } required={ true } />
                    <input name="lName" type="text" placeholder="Last name" minLength="1" maxLength="20" value={ this.state.formData.lName } onChange={ this.handleChange } required={ true } />
                    <input name="email" type="text" placeholder="E-mail" minLength="4" value={ this.state.formData.email } onChange={ this.handleChange } required={ true } />
                    <input name="password" type="password" placeholder="Password" minLength="8" maxLength="20" value={ this.state.formData.password } onChange={ this.handleChange } required={ true } />
                    <input className="submit-button" type="submit" value="Sign Up" onMouseOut={ this.animateOut } />
                    { this.props.failMsg !== null && <div className="signError"><h3>{ this.props.failMsg }</h3></div> }
                </form>;
        }
        return children;
    }

    render() {
        return (
            <div className="Sign">
                { !this.props.type && <img className="back-arrow" src={ Arrow } alt="back arrow" onClick={ this.props.onChangeSign } />}
                { this.renderSign(this.props.type) }
            </div>
        );
    }
}

export default SignContainer;