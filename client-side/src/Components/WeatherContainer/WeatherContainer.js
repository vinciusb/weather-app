import './WeatherContainer.css';
import React from 'react';
import Forecast from '../Forecast/Forecast';

class WeatherContainer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
        };

    }

    convertTemp(kelvin, unit, precision) {
        let temp, pow = Math.pow(10, precision);
        if(unit) temp = kelvin - 273.15;
        else temp = (kelvin - 273.15) * 9 / 5 + 32;
        return Math.round(temp * pow) / pow;
    }

    getTemp() {
        return this.convertTemp(this.props.data.main.temp, this.props.unit, 1);
    }

    getTempUnit() {
        if(this.props.unit) return "CELSIUS";
        else return "FAHRENHEIT";
    }

    renderForecasts() {
        let result = [];

        for(let i = 0; i < 40; i += 8) {
            result.push(<Forecast data={ this.props.forecast.list[i] } />)
        }
        return result;
    }

    render() {
        return (
            <div className="WeatherContainer">
                <div className="upperContainer">
                    <div className="weather">
                        <div className="climate">
                            <div className="temperature">
                                <h1>{ this.getTemp() }°</h1>
                                <h4>{ this.getTempUnit() }</h4>
                            </div>
                            <h3>{ this.props.data.weather[0].main.toUpperCase() }</h3>
                        </div>

                        <div className="atmosphere">
                            <div className="humidity">
                                <h3>HUMIDITY</h3>
                                <h3>{ this.props.data.main.humidity }%</h3>
                            </div>
                            <div className="spacer-bar"></div>
                            <div className="wind">
                                <h3>WIND</h3>
                                <h3>{ this.props.data.wind.speed } m/s</h3>
                            </div>
                        </div>
                    </div>

                    <div className="city">
                        <h2>{ this.props.data.name.toUpperCase() }</h2>
                        <div className="underline"></div>
                    </div>
                </div>

                <div className="lowerContainer">
                    { this.renderForecasts() }
                </div>
            </div>
        );
    }
}

export default WeatherContainer;