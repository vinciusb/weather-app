const apiKey = "2e40688d153b27c84d987746cb8e1a9a";

const weatherAPI = {
    searchWeather(text) {
        let url = `http://api.openweathermap.org/data/2.5/weather?q=${text}&appid=${apiKey}`;
        
        return fetch(url)
            .then(resp => {
                if(resp.ok) return resp.json();
                else throw new Error('Not able to get the data.');
            })
    },

    searchForecast(text) {
        let url = `http://api.openweathermap.org/data/2.5/forecast?q=${text}&appid=${apiKey}`;
        
        return fetch(url)
            .then(resp => {
                if(resp.ok) return resp.json();
                else throw new Error('Not able to get the data.');
            });
    }
}

export default weatherAPI;