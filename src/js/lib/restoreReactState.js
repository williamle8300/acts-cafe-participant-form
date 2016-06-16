module.exports = function (component, hash) {
	
	component.setState(JSON.parse(sessionStorage.getItem(hash)));
};