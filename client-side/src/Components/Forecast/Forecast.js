import './Forecast.css';
import React from 'react';
import ClimateDescription from '../ClimateDescription/ClimateDescription';

class Forecast extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
        };

        this.getTemp = this.getTemp.bind(this);
    }

    getTemp() {
        return this.props.convertTemp(this.props.data.main.temp, this.props.unit, 1);
    }

    formatDate() {
        const date = new Date(this.props.data.dt * 1000);
        const day = date.getDate();
        const month = date.getMonth() + 1;
        const year = date.getFullYear();
        var str;
        if(this.props.timeFormat) str = `${month}/${day}/${year}`;
        else str = `${day}/${month}/${year}`;
        return str;
    }

    getTempUnit() {
        if(this.props.unit) return "C";
        else return "F";
    }

    render() {
        return (
            <div className="Forecast">
                <h4>{ this.formatDate() }</h4>
                <h4>{ this.getTemp() }° { this.getTempUnit() }</h4>
                <ClimateDescription desc={ this.props.data.weather[0].main.toUpperCase() } />
            </div>
        );
    }
}

export default Forecast;