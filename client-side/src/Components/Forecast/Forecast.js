import './Forecast.css';
import React from 'react';

class Forecast extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
        };
    }

    render() {
        return (
            <div className="Forecast">
                <p>{ this.props.data.dt }</p>
            </div>
        );
    }
}

export default Forecast;