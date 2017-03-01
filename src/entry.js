// external
import React from 'react'
import ReactDOM from 'react-dom'
//import Slider from './src/slider'

//import SimpleSlider from "./components/SimpleSlider";
import AppPost from "./components/AppPost";
//import SignUp from "./components/SignUp";
//import TabApp from "./components/TabApp";
//const App = () => <p>It work samir test!</p>
//import React, { Component } from 'react'
//import Slider from '../src/slider'

//var React = require('react');


/*
var ReactSlickDemo = React.createClass({
    render: function() {
        var settings = {
            dots: true
        }
        return (
            <div className='container'>
                <Slider {...settings}>
                    <div><img src='http://placekitten.com/g/400/200' /></div>
                    <div><img src='http://placekitten.com/g/400/200' /></div>
                    <div><img src='http://placekitten.com/g/400/200' /></div>
                    <div><img src='http://placekitten.com/g/400/200' /></div>
                </Slider>
            </div>
        );
    }
});
*/

/*
export default class FocusOnSelect extends React.createClass {
    render() {
        const settings = {
            focusOnSelect: true,
            infinite: true,
            slidesToShow: 3,
            slidesToScroll: 1,
            speed: 500
        };
        return (
            <div>
                <h2>FocusOnSelect</h2>
                <div>Click on any slide to select and make it current slide</div>
                <Slider {...settings}>
                    <div><h3>1</h3></div>
                    <div><h3>2</h3></div>
                    <div><h3>3</h3></div>
                    <div><h3>4</h3></div>
                    <div><h3>5</h3></div>
                    <div><h3>6</h3></div>
                </Slider>
            </div>
        );
    }
}
*/


//render(<App/>, document.getElementById('container'));
//ReactDOM.render(<SimpleSlider />, document.getElementById('root'));
//ReactDOM.render(<TabApp />, document.getElementById('tab'));
//ReactDOM.render(<SignUp />, document.getElementById('signup'));
//ReactDOM.render( <SimpleSlider />, document.getElementById('slide'));
ReactDOM.render(<AppPost />, document.getElementById('root'));
