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
                hue: 0,
                brightness: 75
            }
        };

        this.handleSearch = this.handleSearch.bind(this);
    }

    handleSearch(text) {
        weatherAPI.searchWeather(text)
            .then(data => this.setState({ weatherResult: data },
                () => {
                    weatherAPI.searchForecast(text)
                        .then(data => this.setState({ forecastResult: data }));
                }
            ));
    }

    render() {
        return (
            <div className="WeatherApp" beo>
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