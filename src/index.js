import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import allContent from './contenttags';
import Parser from 'html-react-parser';

class WeatherApp extends Component {

    constructor(props){
        super(props);
        this.state = {cityName: '', result: '', showHomePage: true};
    }

    setCityName(name, event){
        this.setState({cityName: event.target.value});        
    }

    setResult(json){
        console.log(json);
        if(json.cod === 200){
            this.setState({result: json, showHomePage: false});
        }
        else if(json.cod === '404'){
            alert(json.message);
            this.setState({cityName: ''});
        }
        else {
            alert('Something went wrong !!! Please try later...');
        }
    }

    goBackHome(){
        document.getElementById('maincontent').className = 'mainbg';
        this.setState({cityName: '', showHomePage: true});
    }

    renderMainPageContent(){
        return(
            <div> 
                {Parser(allContent.headingSection)}
                <section id="inputForm">
                    <div className="form-group">
                        <form className="form-inline" role="form">
                            <input type="text" name={this.state.cityName} value={this.state.cityName} className="form-control form-control-sm" 
                                onChange={this.setCityName.bind(this,'cityName')} placeholder="Enter city name" />
                            <button type="button" onClick={this.getWeather.bind(this)}
                                className="btn btn-primary btn-sm">Get Weather</button>
                        </form>
                    </div>
                </section>
                {Parser(allContent.infoSection)}
            </div>
        );
    }

    renderDataPageContent(){

        if(typeof(this.state.result.weather) !== 'undefined'){
            var climateId = this.state.result.weather[0].id;
            if(climateId === 800){
                document.getElementById('maincontent').className = 'clearskybg';                
            }
            else if(climateId >= 801 && climateId <= 804){
                document.getElementById('maincontent').className = 'cloudybg';
            }
            else if((climateId >= 701 && climateId <= 741) || 
                (climateId >= 600 && climateId <= 622)){
                document.getElementById('maincontent').className = 'mistybg';
            }
            else if((climateId >= 300 && climateId <= 321) ||
                (climateId >= 500 && climateId <= 531)){
                document.getElementById('maincontent').className = 'rainybg';
            }
            else {
                document.getElementById('maincontent').className = 'sunnybg';
            }
        }

        return(
            <div> 
                {Parser(allContent.headingSection)}
                {
                    typeof(this.state.result.weather) !== 'undefined' &&
                    <section id="weatherDataSection">
                        <h2><u>{this.state.result.name}</u></h2>
                        <br/>
                        <p>Sky: {this.state.result.weather[0].main}</p>
                        <p>Temperature: {(this.state.result.main.temp- 273.15).toFixed(2)} <sup>o</sup>C</p>
                        <p>Min. Temp. : {(this.state.result.main.temp_min- 273.15).toFixed(2)}<sup>o</sup>C Max. Temp.: {(this.state.result.main.temp_max- 273.15).toFixed(2)}<sup>o</sup>C</p>
                        <p>Humidity: {this.state.result.main.humidity}</p>
                        <p>Latitude: {this.state.result.coord.lat} Longitude: {this.state.result.coord.lon}</p>
                        <p>Sunrise:  {this.getTimeValue(this.state.result.sys.sunrise, this.state.result.sys.country)}</p>
                        <p>Sunset: {this.getTimeValue(this.state.result.sys.sunset, this.state.result.sys.country)}</p>                  
                    </section>
                }
                <section id="backToHome">
                    <div className="form-group">
                        <form className="form-inline" role="form" method="post" action="#">
                            <button type="button" onClick={this.goBackHome.bind(this)}
                                className="btn btn-danger btn-sm">Back</button>
                        </form>
                    </div>
                </section>
            </div>
        );
    }

    getTimeValue(timeValue, country){
        //convert Unix time to JS time
        var tmpDate = new Date(timeValue * 1000);
        if(country === 'IN'){
            return tmpDate.toDateString() +' '+tmpDate.toLocaleTimeString();
        }
        else{
            return tmpDate.toDateString()+' '+tmpDate.toLocaleTimeString() + ' IST';
        }
    }

    getWeather(){
        if(this.state.cityName !== null && this.state.cityName !== ''){
            var queryString = `http://api.openweathermap.org/data/2.5/weather?APPID=${allContent.api_key}&q=${this.state.cityName}`;
            console.log(queryString);
            fetch(queryString).then(response => response.json()).then(json => this.setResult(json));
        }
        else {
            alert('Please enter the city name');
        }
    }
    
    render(){
        if(this.state.showHomePage){
            return this.renderMainPageContent();
        }
        else {
            return this.renderDataPageContent();
        }
    }
}

ReactDOM.render(<WeatherApp />, document.getElementById('root'));