'use strict';

var React = require('react');
var $ = require('jquery');
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
    playVideo: function() {
            var index = Math.floor(Math.random() * this.state.videos.length);
            var video = this.state.videos[index];
            this.setState({selectedVideo: video});
    },
    render: function () {
        var playButton = this.state.videos.length > 0 ? <button type="button" onClick={this.playVideo}>Play video</button> : <button type="button">Waiting</button>
        var videoTag = this.state.selectedVideo  ? <Video uri={this.state.selectedVideo.uri} duration={this.state.selectedVideo.duration} stopAfterSeconds="15"/> : <Video/>

        return <div>
            {videoTag}
            <br/>
            {playButton}
            </div>

    }
});
