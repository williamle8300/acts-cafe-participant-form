var {assign} = require('lodash');


module.exports = function (component, hash, partialState, cb) {
	
	var wholeState = assign(component.state, partialState);
	
	component.setState(wholeState, cb);
	
	sessionStorage.setItem(hash, JSON.stringify(wholeState));
};