import './WeatherContainer.css';
import React from 'react';
import Forecast from '../Forecast/Forecast';
import ClimateDescription from '../ClimateDescription/ClimateDescription';

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
        if(Object.entries(this.props.forecast).length !== 0) {
            let result = [];
        
            for(let i = 0; i < 40; i += 8) {
                result.push(
                    <Forecast
                        key={ i / 8 }
                        data={ this.props.forecast.list[i] }
                        unit={ this.props.unit }
                        timeFormat={ this.props.timeFormat }
                        convertTemp={ this.convertTemp } />
                )
            }
            return result;
        }
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
                            <div className="underline"></div>
                            <ClimateDescription desc={ this.props.data.weather[0].main.toUpperCase() } />
                        </div>

                        <div className="atmosphere">
                            <div className="humidity">
                                <div className="atmo-prop">
                                    <h3>HUMIDITY </h3>
                                    <svg className="icon" xmlns="http://www.w3.org/2000/svg" height="512" viewBox="0 0 512 512" width="512">
                                        <g className="humidity-icon"><g><circle cx="304" cy="256" r="12" /><circle cx="216" cy="180" r="12" /><path d="m349.884 114.194c-42.06-61.085-83.462-104.655-85.2-106.48a12 12 0 0 0 -17.362 0c-1.741 1.825-43.143 45.4-85.2 106.48-57.148 82.994-86.122 154.928-86.122 213.806 0 99.252 80.748 180 180 180s180-80.748 180-180c0-58.878-28.974-130.812-86.116-213.806zm-9.884 141.806a36 36 0 1 1 -36-36 36.04 36.04 0 0 1 36 36zm-36.485-96.485a12 12 0 0 1 16.97 16.97l-112 112a12 12 0 0 1 -16.97-16.97zm-87.515-15.515a36 36 0 1 1 -36 36 36.04 36.04 0 0 1 36-36zm40 316c-72.785 0-132-59.215-132-132 0-1.345.028-2.708.07-4.078 9.306-4.74 14.815-11.922 31.5-11.922 24.888 0 24.888 16 49.776 16s24.889-16 49.778-16 24.888 16 49.776 16 24.887-16 49.774-16c17.716 0 22.827 8.1 33.275 12.776.026 1.079.055 2.161.055 3.224-.004 72.785-59.219 132-132.004 132z" /></g></g>
                                    </svg>
                                </div>
                                <h3>{ this.props.data.main.humidity }%</h3>
                            </div>
                            <div className="spacer-bar"></div>
                            <div className="wind">
                                <div className="atmo-prop">
                                    <h3>WIND</h3>
                                    <svg className="icon" xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 512 512" height="512" viewBox="0 0 512 512" width="512">
                                        <g><path d="m405.051 42.294c-24.259 0-48.037 8.364-66.953 23.551-6.46 5.187-7.492 14.627-2.307 21.087 5.187 6.459 14.628 7.493 21.088 2.306 13.61-10.927 30.718-16.944 48.172-16.944 42.43 0 76.949 34.519 76.949 76.949s-34.52 76.949-76.949 76.949h-282.052c-8.284 0-15 6.716-15 15s6.716 15 15 15h282.052c58.972 0 106.949-47.977 106.949-106.949s-47.978-106.949-106.949-106.949z" /><path d="m94.262 196.293h160.237c8.285 0 15-6.716 15-15s-6.715-15-15-15h-160.237c-8.284 0-15 6.716-15 15s6.716 15 15 15z" /><path d="m250.295 286.294h-235.295c-8.284 0-15 6.716-15 15s6.716 15 15 15h235.295c34.025 0 61.707 27.681 61.707 61.706s-27.682 61.706-61.707 61.706c-13.997 0-27.715-4.826-38.63-13.588-6.459-5.186-15.9-4.154-21.087 2.306s-4.154 15.901 2.306 21.087c16.221 13.022 36.61 20.194 57.411 20.194 50.567 0 91.707-41.139 91.707-91.706s-41.14-91.705-91.707-91.705z" /><path d="m15 196.293h20.235c8.284 0 15-6.716 15-15s-6.716-15-15-15h-20.235c-8.284 0-15 6.716-15 15s6.716 15 15 15z" /><path d="m196 361.001c0-8.284-6.716-15-15-15h-90c-8.284 0-15 6.716-15 15s6.716 15 15 15h90c8.285 0 15-6.716 15-15z" /></g>
                                    </svg>
                                </div>
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