// external
import React from "react";


var Slider = require('react-slick');
class SimpleSlider extends React.Component {
//var SimpleSlider = React.createClass({
    /**
     * constructor
     * @param {object} props
     */
    constructor(props) {
        super(props);
        /**
         * @type {object}
         * @property {string} child app class
         */
    }
    render() {
        const settings = {
            //focusOnSelect: true,
            infinite: true,
            slidesToShow: 3,
            slidesToScroll: 1,
            speed: 500
        };
        return (
            <div className='container'>
                <Slider {...settings}>
                    <div><img src='http://placekitten.com/g/400/200' /><span>dddd</span></div>
                    <div><img src='http://placekitten.com/g/400/200' /><span>fffff</span></div>
                    <div><img src='http://placekitten.com/g/400/200' />hh</div>
                    <div><img src='http://placekitten.com/g/400/200' />hjjj</div>
                </Slider>
            </div>
        );
    }
}
export default SimpleSlider;