'use strict';

var React = require('react');

var Hello = require('./components/Hello');
var Aloka = require('./components/Aloka');

React.render(
    <Aloka url="https://api.vimeo.com/users/dharmamind/videos"/>,
    document.getElementById('content'));

