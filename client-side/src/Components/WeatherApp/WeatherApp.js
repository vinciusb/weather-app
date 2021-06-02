import './WeatherApp.css';
import WeatherContainer from "../WeatherContainer/WeatherContainer";
import SearchBar from "../SearchBar/SearchBar";
import React from 'react';

import weatherAPI from "../../utils/weatherAPI";

class WeatherApp extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            weatherResult: {},
            forecastResult: {},
            tempUnit: true,
            timeFormat: false,
            filter: {
                sat: 0.4,
                hue: 100,
                brightness: 75
            },
            searchSuccess: true
        };

        this.getFilterString = this.getFilterString.bind(this);
        this.handleWeatherChange = this.handleWeatherChange.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
    }

    getFilterString() {
        return {
            "--filter": `saturate(${this.state.filter.sat}) hue-rotate(${this.state.filter.hue}deg) brightness(${this.state.filter.brightness}%)`
        };
    }

    handleWeatherChange(weatherState) {
        var sat = 0.4;
        var hue = 0;
        var brightness = 75;

        if(weatherState === "CLEAR") {
            sat = 0.6;
            hue = 30;
        }
        else if(weatherState === "FEW CLOUDS" || weatherState === "SCATTERED CLOUDS" || weatherState === "BROKEN CLOUDS" || weatherState === "CLOUDS") {
            sat = 0.25;
            hue = 200;
        }
        else if(weatherState === "RAIN" || weatherState === "SHOWER RAIN") {
            sat = 0.45;
            hue = 180;
        }
        else if(weatherState === "THUNDERSTORM") {
            brightness = 50;
            hue = 270;
        }
        else if(weatherState === "SNOW") {
            hue = 200;
            sat = 0.7;
            brightness = 60;
        }
        else if(weatherState === "MIST") {
            sat = 0.0;
            brightness = 60;
        }

        const filter = {
            sat: sat,
            hue: hue,
            brightness: brightness
        };
        this.setState({ filter });
    }

    handleSearch(text) {
        weatherAPI.searchWeather(text)
            .then(data => {
                this.setState({ weatherResult: data },
                    () => {
                        // Change background color
                        this.handleWeatherChange(this.state.weatherResult.weather[0].main.toUpperCase());
                        // Search forecasts
                        weatherAPI.searchForecast(text)
                            .then(data => this.setState({ forecastResult: data }))
                            .catch(err => console.log(err.message));
                    }
                );
            })
            .catch(err => console.log(err.message));
    }

    render() {
        return (
            <div className="WeatherApp" style={ this.getFilterString() }>
                <div className="WeatherApp-inside">
                    <header>
                        <SearchBar onSearch={ this.handleSearch } />
                    </header>
                    <main>
                        {
                            Object.entries(this.state.weatherResult).length !== 0 &&
                            <WeatherContainer
                                data={ this.state.weatherResult }
                                forecast={ this.state.forecastResult }
                                unit={ this.state.tempUnit }
                                timeFormat={ this.state.timeFormat } />
                        }
                    </main>
                </div>
            </div>
        );
    }
}

export default WeatherApp;