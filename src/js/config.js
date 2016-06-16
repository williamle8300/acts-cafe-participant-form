var device = require('./lib/device');

var backendHost = function () {
  if (device.platform === 'Android') {
    //See http://developer.android.com/tools/devices/emulator.html
    //under "Network Address Space" Aug2015
    return 'https://10.0.2.2:3000';
  }
  if (device.platform === 'iOS') {
		return 'http://192.168.1.172:3000';
	}
	if (device.platform === 'Browser') {
    return 'http://localhost:3000';
  }
  // return 'http://172.31.98.11:3000';//sbux macA & bristol
}

module.exports = {
  backendHost: backendHost()
};