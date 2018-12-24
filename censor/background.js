/**
 * Basic process
 *
 * - Click browser action
 *   - If censoring is disabled
 *     - Enable censoring
 *     - Tell current tab to start censoring
 *   - If censoring is enabled
 *     - Disable censoring
 *     - Tell current tab to remove redactions & stop censoring
 *   - On tab selected, ensure that tab's content script is in the right mode
 * 
 * COMMS EVENTS
 * 
 * › Background -> content
 *   • setActive
 *   • setInactive
 * 
 * › Content -> background
 *   • isGlobalActive -> returns boolean
 *   • totalRedacted {count: int}
 */

///// CONFIG /////
var url;
var DEBUG = false;

var state = {
	isCensoringActive: false
};

var colors = {
	good: 'hsl(126, 93%, 33%)',
	warning: 'hsl(56, 83%, 43%)',
	bad: 'hsl(16, 83%, 43%)'
};

var actionTitle = {
	active: 'Stop censoring swearWord',
	inactive: 'Censor all swearWord'
};


///// DEBUG LOGGING /////

function pad(n) {
	return ('00' + n).substr(-2);
}
function log(...args) {
	if (!DEBUG) {
		return;
	}
	var now = new Date();
	var stamp = [now.getHours(), now.getMinutes(), now.getSeconds()].map(pad).join(':');
	var stampArg = '%c[' + stamp + ']';
	var stampStyle = 'color:#999';
	if (typeof args[0] === 'string' && args[0].indexOf('%c') > -1) {
		args.splice(0, 1, stampArg + ' ' + args[0], stampStyle);
	} else {
		args.unshift(stampArg, stampStyle);
	}
	console.log(...args);
}


///// WEBEXTENSIONS POLYFILL /////
/**
 * NOTE: This is suuuuuper-simple polyfill, only replacing the APIs that are used in this file.
 * The concept is based on https://github.com/mozilla/webextension-polyfill
 * but trimmed down to keep dependencies to a minimum.
 */

if (typeof browser === 'undefined') {
	var promisedCallback = function (origFn) {
		return function (...args) {
			return new Promise((resolve, reject) => {
				origFn(...args, function (...resArgs) {
					if (chrome.runtime.lastError) {
						reject(chrome.runtime.lastError);
						return;
					}
					resolve(...resArgs);
				});
			});
		}
	};

	var makeProxy = function (target, promiseKeys) {
		promiseKeys = promiseKeys || [];
		return new Proxy(target, {
			get: function (obj, key) {
				return promiseKeys.includes(key) ? promisedCallback(obj[key]) : obj[key];
			}
		})
	};

	window.browser = {};
	browser.browserAction = makeProxy(chrome.browserAction);
	browser.runtime = makeProxy(chrome.runtime);
	browser.tabs = makeProxy(chrome.tabs, ['query']);
}


///// ICON BADGING /////

function getCountText(count) {
	if (count <= 999) {
		return count.toString();
	}
	return Math.floor(count / 1000) + 'k';
}

function setBadgeCount(tabId, count) {
	var badgeOptions = { tabId: tabId, text: '' };
	console.log("inside setBadget");
	console.log("this should be read as well");
	if (count != null && count !== '') {
		console.log("count: "+count);
		chrome.tabs.query({'active': true, 'lastFocusedWindow': true}, function (tabs) {
			url = tabs[0].url;
		});
		badgeOptions.text = getCountText(count);
		// Rails.ajax({
		// 	url: "localhost:3000/dashboard/index",
		// 	type: "POST",
		// 	data: "first_name=Ricky&last_name=Bobby",
		// 	success: function(data) {
		// 	  console.log(data);
		// 	}
		//   });
		// $(function() {			
			//   var params = '{"first_name": "value1", "second_name": "value2"}'; 
			//   $.post('localhost:3000/dashboard/index', params, function(data){ 
			// 	alert(data); 
			//   });
			// });
			
			
				// alert(url);
				// var send = {
				// 	"count": count,
				// 	"url": window.location.href 
				// };

			var xhttp = new XMLHttpRequest();
			console.log("its reaching till here")
			xhttp.onreadystatechange = function() {
			console.log("on ready state change");
			if (this.readyState == 4 && this.status == 200) {
				// xhttp.open("POST", "http://localhost:3000/dashboard/values", true);

				// xhttp.send("count="+count+"&url="+url);
				console.log("sent data")
			}	
			};	
			// xhttp.open("POST", "https://web11.cs.ait.ac.th/dashboard/values", true);

			// xhttp.send("count="+count+"&url="+url);
			// 	console.log("output it")

				if (count>10){

					browser.browserAction.setIcon({
						path: {
							"16": "icons/red-icon-16.png",
							"32": "icons/red-icon-32.png",
							"64": "icons/red-icon-64.png",
							"128": "icons/red-icon-128.png"
						}
					});
					xhttp.open("POST", "https://web11.cs.ait.ac.th/dashboard/values", true);

			xhttp.send("count="+count+"&url="+url);
				console.log("output it")
				
				} else if(count <= 10 && count >=4){
					browser.browserAction.setIcon({
						path: {
							"16": "icons/orange-icon-16.png",
							"32": "icons/orange-icon-32.png",
							"64": "icons/orange-icon-64.png",
							"128": "icons/orange-icon-128.png"
						}
					});
					xhttp.open("POST", "https://web11.cs.ait.ac.th/dashboard/values", true);

			xhttp.send("count="+count+"&url="+url);
				console.log("output it")
				} else if(count <4){
					browser.browserAction.setIcon({
						path: {
							"16": "icons/green-icon-16.png",
							"32": "icons/green-icon-32.png",
							"64": "icons/green-icon-64.png",
							"128": "icons/green-icon-128.png"
						}
					});
					xhttp.open("POST", "https://web11.cs.ait.ac.th/dashboard/values", true);

			xhttp.send("count="+count+"&url="+url);
				console.log("output it")
				} else {
					browser.browserAction.setIcon({
						path: {
							// "16": "icons/black-icon-16.png",
							// "32": "icons/black-icon-32.png",
							// "64": "icons/black-icon-64.png",
							// "128": "icons/black-icon-128.png"
						}
					});
					xhttp.open("POST", "https://web11.cs.ait.ac.th/dashboard/values", true);

			xhttp.send("count="+count+"&url="+url);
				console.log("output it")
				}
				xhttp.onreadystatechange = function() {
					console.log("on ready state change");
					if (this.readyState == 4 && this.status == 200) {
						xhttp.open("POST", "http://localhost:3000/dashboard/values", true);
		
						xhttp.send("count="+count+"&url="+url);
						console.log("sent data")
					}	
					};
				
			// var xhttp = new XMLHttpRequest();
			// console.log("its reaching till here")
			// xhttp.onreadystatechange = function() {
			// console.log("on ready state change");
			// if (this.readyState == 4 && this.status == 200) {
			// 	// xhttp.open("POST", "http://localhost:3000/dashboard/values", true);

			// 	// xhttp.send("count="+count+"&url="+url);
			// 	console.log("sent data")
			// }	
			
			// xhttp.open("POST", "https://web11.cs.ait.ac.th/dashboard/values", true);
			// xhttp.send("count="+count+"&url="+url);
			// };	
				// console.log("output it")

			  
	}
	browser.browserAction.setBadgeText(badgeOptions);
	// var details = {
	// 	imageData: {}
	// }
	
}

function setBadgeColor(tabId, color) {
	browser.browserAction.setBadgeBackgroundColor({
		tabId: tabId,
		color: color
	});
}

function setTotalCount(tabId, count) {
	log('setTotalCount', tabId, count);
	setBadgeColor(tabId, colors.good);
	setBadgeCount(tabId, state.isCensoringActive ? count : '');
}


///// LIFECYCLE /////

function ensureTabStatus(tabId) {
	log('ensureTabStatus', tabId);
	browser.tabs.sendMessage(tabId, {
		msg: state.isCensoringActive ? 'setActive' : 'setInactive'
	});
}

function saveState() {
	log('saveState', state);
	localStorage.setItem('state', JSON.stringify(state));
}

function restoreState() {
	try {
		var savedState = JSON.parse(localStorage.getItem('state'));
		log('restoreState', savedState);
		if (savedState) {
			state = savedState;
		}
	} catch (e) {
		log('restoreState FAILED, state =', state);
	}
}

function contentScriptMessageHandler(request, sender, sendResponse) {
	if (sender.tab && request.msg) {
		log('%cruntime.onMessage', 'color:green;font-weight:bold', request, sender);
		switch (request.msg) {
			case 'isGlobalActive':
				log('  [response]:', state.isCensoringActive);
				sendResponse({ isActive: state.isCensoringActive });
				break;
			case 'totalRedacted':
				setTotalCount(sender.tab.id, request.count);
				break;
		}
	}
}

browser.runtime.onMessage.addListener(contentScriptMessageHandler);
browser.tabs.onActivated.addListener(function (activeInfo) {
	ensureTabStatus(activeInfo.tabId);
});

log('--- event page loaded ---');
restoreState();


///// USER ACTIONS /////

function toggleStatus() {
	state.isCensoringActive = !state.isCensoringActive;
	log('toggleStatus, active =', state.isCensoringActive);
	browser.tabs.query({ active: true }).then(function (tabs) {

		tabs.forEach(function (tab) {
			ensureTabStatus(tab.id);
		});
	});
	browser.browserAction.setIcon({
		path: {
			"16": "icons/black-icon-16.png",
			"32": "icons/black-icon-32.png",
			"64": "icons/black-icon-64.png",
			"128": "icons/black-icon-128.png"
		}
	});
	browser.browserAction.setTitle({
		title: actionTitle[state.isCensoringActive ? 'active' : 'inactive']
	});
	saveState();
}
browser.browserAction.onClicked.addListener(toggleStatus);