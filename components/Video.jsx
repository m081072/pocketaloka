'use strict';

var React = require('react');
var View = require('react-flexbox');
var $ = require('jquery');
var $f = require('vimeo-froogaloop');
var stopped = {
    backgroundColor: 'black',
    width: 640,
    height: 360
};

module.exports = React.createClass({
    getInitialState: function() {
        return {status: "playing"};
    },
    stopVideo: function(){
        console.log("Stopping video");
        console.log(this.state.status);
        this.setState({status:"stopped"});
    },
    componentDidMount: function() {
        setTimeout(this.stopVideo, 15000);
    },
    render: function () {
        if(this.state.status === "playing") {
            var start = Math.floor(Math.random() * this.props.duration);
            var uri = this.props.uri.replace("videos","video") + "#t="+start+"s";
            uri = "https://player.vimeo.com" + uri + "?api=1title=0&byline=0&portrait=0&badge=0&autopause=0&player_id=0&autoplay=1";
            console.log(uri);
            return <iframe src={uri} width="640" height="360" frameborder="0" id="vimeo-player"></iframe>
        }
            return <div style={stopped}></div>
    }
});
