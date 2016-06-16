var _ = require('lodash')
var React = require('react');
var {Router, Route, IndexRoute} = require('react-router');
var {render} = require('react-dom');

var App = React.createClass({

  displayName: 'App',

  getInitialState: function () {
    return {
    }
  },
  
	render: function () {
    
		return (
			<div>
				hello world
			</div>
		);
	}
});


var routes = (
  <Router>
    <Route path="/" component={App}/>
  </Router>
);


render(routes, document.getElementById('app'));