var Reflux = require('reflux');

//hydrate
//set x
//clear x
//remove x
//pushTo x
//unshiftTo x
//popFrom x

module.exports = Reflux.createActions([
  'hydrate',
  'setCreds',
  'removeCreds',
	'setMarqueeVisibility',
	'setControlBarVisibility',
	'setControlBarMode',
  'setUser',
  'removeUser',
  'setCurrentMob',
  'removeCurrentMob',
  'setFollowing',
  'removeFollowers',
  'setFollowers',
  'removeFollowing',
  'setMarqueeTitle',
  'removeMarqueeTitle',
  'pushToQueuedMedia',
  'popFromQueuedMedia',
  'removeQueuedMedia',
	'setStageLights',
]);