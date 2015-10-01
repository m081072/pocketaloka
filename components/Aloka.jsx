'use strict';

var React = require('react');
var View = require('react-flexbox');
var $ = require('jquery');
var $f = require('vimeo-froogaloop');
var Video = require('./Video');

module.exports = React.createClass({
    getInitialState: function() {
        return {videos: []};
    },
    componentDidMount: function() {
        $.ajax({
            url: this.props.url,
            dataType: 'json',
            beforeSend: function(xhr){xhr.setRequestHeader('Authorization', 'bearer 961a6d99c966f78a5ff492eebe936cfb');},
            cache: false,
            success: function(data) {
                this.setState({videos: data.data});
            }.bind(this),
            error: function(xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        });
    },
    render: function () {
        var player = <div/>
        if(this.state.videos.length > 0) {
            var index = Math.floor(Math.random() * this.state.videos.length);
            var video = this.state.videos[index];
            player = <Video uri={video.uri} duration={video.duration}/>
        }

        return player
    }
});
