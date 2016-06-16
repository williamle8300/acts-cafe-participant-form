"use strict"

var Color = require('color')

var device = require('./device');

module.exports = {
	animation: {
		stageLights: '0.24s ease-in-out',
	},
  color: {
    plainText:  '#aaaaaa',//(keyColor)
    darkText:  '#555555',//(keyColor)
    black: 'black',
    white: 'white',
    plainBg: '#383970',
    lightBg: '#4E50A2',
		kindalightBg: '#5F62C5',
    superlightBg: '#8C8EDC',
    darkBg: '#27285B',
		kindadarkBg: '#303271',
    superdarkBg: '#20214B',
  },
  size: {
    deviceWidth: function () {
      return document.getElementsByClassName('app-wrapper')[0].offsetWidth
    },
    deviceHeight: function () {
      return document.getElementsByClassName('app-wrapper')[0].offsetHeight
    },
    screenTrim: '0.4rem',
    marqueeHeight: '3rem',
    controlBarHeight: '2.5rem',
		toolBarHeight: '3.5rem',
		metaBoxHeight: '5.5rem',
    mobTitleTextPadding: 2,
    mobTitleText: '1.125rem',
  },
  vision: {
    one: '0.85',
    two: '0.425',
    three: '0.1416'
  }
}