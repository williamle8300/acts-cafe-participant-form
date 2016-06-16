
/*

	for these new fields, consider the "rest mode" for PS4

		stageLightss: 'on' 'off' (just makes everything monochrome. this color transition needs to like butter. it needs to feel like a silky simple ocular transition.)
		theme: 'day' 'night' (just darkens everything by... i dunno 35%)

*/

var Async = require('Async');
var Reflux = require('reflux');
var Storage = require('localforage');


module.exports = Reflux.createStore({
  
  listenables: [require('./action')],
  
  onHydrate: function (caller) {
    
    var stopwatchStart = Date.now();
    
    Async.series({

      creds: function (cb) {

				Storage.getItem('creds')
				.then(function (creds) {
					cb(null, creds);
				});
      },
      marqueeVisibility: function (cb) {

				Storage.getItem('marqueeVisibility')
				.then(function (marqueeVisibility) {
					cb(null, marqueeVisibility);
				});
      },
      controlBarVisibility: function (cb) {

				Storage.getItem('controlBarVisibility')
				.then(function (controlBarVisibility) {
					cb(null, controlBarVisibility);
				});
      },
			controlBarMode: function (cb) {
				
				Storage.getItem('controlBarMode')
				.then(function (controlBarMode) {
					cb(null, controlBarMode);
				});
			},
      user: function (cb) {

				Storage.getItem('user')
				.then(function (user) {
					cb(null, user);
				});
      },
      currentMob: function (cb) {

				Storage.getItem('currentMob')
				.then(function (currentMob) {
					cb(null, currentMob);
				});
      },
      following: function (cb) {

				Storage.getItem('following')
				.then(function (following) {
					cb(null, following);
				});
      },
      followers: function (cb) {

	      Storage.getItem('followers')
				.then(function(followers) {
	          cb(null, followers);
					});
      },
      queuedMedia: function (cb) {
				
        Storage.getItem('queuedMedia')
				.then(function(queuedMedia) {
	          cb(null, queuedMedia);
					});
      },
			stageLights: function (cb) {
        Storage.getItem('stageLights')
				.then(function(stageLights) {
	          cb(null, stageLights);
					});				
			},
      gpsPlots: function (cb) {

	      Storage.getItem('gpsPlots')
				.then(function(gpsPlots) {
	          cb(null, gpsPlots);
					});
      },
      marqueeTitle: function (cb) {

	      Storage.getItem('marqueeTitle')
				.then(function(marqueeTitle) {
	          cb(null, marqueeTitle);
					});
      },
      networkStrength: function (cb) {

	      Storage.getItem('networkStrength')
				.then(function(networkStrength) {
	          cb(null, networkStrength);
					});
      }
    }, function (err, results) {
      
      var elapsedTime = (Date.now() - stopwatchStart) + 'ms';
      
      console.log('HYDRATOR: ' +caller, results, elapsedTime);
      this.trigger(results);
    }.bind(this));
  },
  
  onSetCreds: function (caller, creds) {

	  Storage.setItem('creds', creds)
		.then(function (creds) {
	    this.onHydrate(caller);
		}.bind(this));
  },
  
  onRemoveCreds: function (caller) {
    
	  Storage.removeItem('creds')
		.then(function (err) {
	    this.onHydrate(caller);
		}.bind(this));
  },
  
	onSetMarqueeVisibility: function (caller, visibility) {

	  Storage.setItem('marqueeVisibility', visibility)
		.then(function (err) {
	    this.onHydrate(caller);
		}.bind(this));
	},

	onSetControlBarVisibility: function (caller, visibility) {

	  Storage.setItem('controlBarVisibility', visibility)
		.then(function (err) {
	    this.onHydrate(caller);
		}.bind(this));
	},
	
	onSetControlBarMode: function (caller, mode) {

	  Storage.setItem('controlBarMode', mode)
		.then(function (err) {
	    this.onHydrate(caller);
		}.bind(this));
	},

  onSetUser: function (caller, user) {

	  Storage.setItem('user', user)
		.then(function (user) {
	    this.onHydrate(caller);
		}.bind(this));
  },

  onRemoveUser: function (caller) {
    
	  Storage.removeItem('user')
		.then(function (err) {
	    this.onHydrate(caller);
		}.bind(this));
  },

  onSetCurrentMob: function (caller, currentMob) {

	  Storage.setItem('currentMob', currentMob)
		.then(function (currentMob) {
	    this.onHydrate(caller);
		}.bind(this));
  },
  
  onRemoveCurrentMob: function (caller) {

	  Storage.removeItem('currentMob')
		.then(function (err) {
	    this.onHydrate(caller);
		}.bind(this));
  },

  onSetFollowing: function (caller, following) {

    Storage.setItem('following', following)
		.then(function (following) {
	    this.onHydrate(caller);
		}.bind(this));
  },
  
  onRemoveFollowing: function (caller) {
    
	  Storage.removeItem('following')
		.then(function (err) {
	    this.onHydrate(caller);
		}.bind(this));
  },
  
  onSetFollowers: function (caller, followers) {

		Storage.setItem('followers', followers)
		.then(function (followers) {
	    this.onHydrate(caller);
		}.bind(this));
  },
  
  onRemoveFollowers: function (caller) {
    
		Storage.removeItem('followers')
		.then(function (err) {
	    this.onHydrate(caller);
		}.bind(this));
  },
  
  onSetMarqueeTitle: function (caller, marqueeTitle) {

	  Storage.setItem('marqueeTitle', marqueeTitle)
		.then(function (marqueeTitle) {
	    this.onHydrate(caller);
		}.bind(this));
  },
  
  onRemoveMarqueeTitle: function (caller) {
    
	  Storage.removeItem('marqueeTitle')
		.then(function (err) {
	    this.onHydrate(caller);
		}.bind(this));
  },
  
  /**
   * note: on iOS, localForage is storing a string (file path to blob on-disk)
   * 			 while on desktop it stores a blob of the media file
	 * 
   * @param [File] media
   */
  
  onPushToQueuedMedia: function (caller, FilePathOrHTMLFileObject) {
    
    if (window.cordova) {

      Storage.getItem('queuedMedia', function (err, queuedMedia) {
        
        var updatedQdMedia = !queuedMedia ? [FilePathOrHTMLFileObject] : queuedMedia.concat([FilePathOrHTMLFileObject]);
        
        if (err) {
          alert(new Error(err));
        }
        
        Storage.setItem('queuedMedia', updatedQdMedia, function (err, updatedQdMedia) {
          
          if (err) {
            alert(new Error(err));
          }
          
          this.onHydrate(caller);
        }.bind(this))
      }.bind(this))
    }
    else if (!window.cordova) {
      
      var fileReader = new FileReader();
    
      fileReader.readAsArrayBuffer(FilePathOrHTMLFileObject);
      fileReader.onload = function(e) {
      
        var arrayBuffedImg = e.target.result;
				
				//uses IndexedDB in the browser
        Storage.getItem('queuedMedia', function(err, queuedMedia) {

          var updatedQdMedia = !queuedMedia ? [arrayBuffedImg] : queuedMedia.concat([arrayBuffedImg]);
        
          if (err) {
            alert(new Error(err));
          }
        
          Storage.setItem('queuedMedia', updatedQdMedia, function(err, updatedQdMedia) {

            if (err) {
              alert(new Error(err));
            }

            this.onHydrate(caller);
          }.bind(this));
        }.bind(this));
      }.bind(this);
    }
  },
  
  onPopFromQueuedMedia: function (caller) {

    Storage.getItem('queuedMedia', function (err, queuedMedia) {
    
      var updatedQdMedia = queuedMedia.slice(1);
    
      if (err) {
        alert(new Error(err));
      }
    
      Storage.setItem('queuedMedia', updatedQdMedia, function (err, updatedQdMedia) {

        if (err) {
          alert(new Error(err));
        }

        this.onHydrate(caller);
      }.bind(this));
    }.bind(this));
  },
  
  onRemoveQueuedMedia: function (caller) {
    
	  Storage.removeItem('queuedMedia')
		.then(function (err) {
	    this.onHydrate(caller);
		}.bind(this));
		
    // Storage.removeItem('queuedMedia', function (err) {
    //
    //   if (err) {
    //     alert(new Error(err));
    //   }
    //
    //   this.onHydrate(caller);
    // }.bind(this));
  },
	
	onSetStageLights: function (caller, stageLights) {
		
	  Storage.setItem('stageLights', stageLights)
		.then(function (stageLights) {
	    this.onHydrate(caller);
		}.bind(this));
	},
});