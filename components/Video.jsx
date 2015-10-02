'use strict';

var React = require('react');
var $ = require('jquery');
var fl = require('vimeo-froogaloop');

var stopped = {
    backgroundColor: 'black',
    width: 640,
    height: 360
};

module.exports = React.createClass({
    getInitialState: function() {
        return {status:"stopped"};
    },
    componentWillReceiveProps: function(nextProps) {
        if(nextProps.uri) {
            var start = Math.floor(Math.random() * nextProps.duration);
            this.setState({status: "playing", start: start});
            setTimeout(this.checkPlayingVideo, 1000);
        }
    },
    componentDidMount: function() {
        var component = this;
        var listener = function (event) {
            var data = typeof event.data === "string" ? JSON.parse(event.data) : event;
            if(data.method === "getCurrentTime" && component.state.status === "playing") {
                var start = component.state.start;
                var current = data.value;
                var duration = current - start;
                console.log({start: start, current:current, duration: duration});
                if(duration > component.props.stopAfterSeconds) {
                    component.setState({status:"stopped"});
                }
            }
        };
        if (window.addEventListener) {
            window.addEventListener("message", listener, false);
        } else {
            window.attachEvent("onmessage", listener, false);
        }
    },
    checkPlayingVideo: function() {
        if(this.state.status === "playing") {
            var iframe = $('#player1')[0];
            var player = $f(iframe);

            player.api('getCurrentTime', function (value, player_id) {

                console.log({start: this.state.start, current: value, duration: value - this.state.start});
            });
            setTimeout(this.checkPlayingVideo, 1000);
        }
    },
    render: function () {
        if(this.state.status === "playing" && this.props.uri) {
            var uri = this.props.uri.replace("videos","video") + "#t="+this.state.start+"s";
            uri = "https://player.vimeo.com" + uri + "?api=1title=0&byline=0&portrait=0&badge=0&autopause=0&player_id=player1&autoplay=1";
            console.log(uri);
            return <iframe src={uri} width="640" height="360" frameBorder="0" id="player1"></iframe>
        }
            return <div style={stopped}></div>
    }
});
