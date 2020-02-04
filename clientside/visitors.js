// Online statistics for visitors
(function() {

	var n = navigator;
	var W = window;
	var LS = W.localStorage;
	var L = location;
	var h = L.hostname;

	if (!LS || (n.onLine != null && !n.onLine) || (/\d\.\d\.\d|^(http:)/).test(h))
		return;

	var key = 'visitor';
	var ticks = LS.getItem(key) || '';

	var ajax = function(params, reading) {
		var xhr = new XMLHttpRequest();
		xhr.onreadystatechange = function() {
			var t = this;
			if (t.readyState === 4) {
				if (t.status === 200) {
					var r = t.responseText;
					ticks = r;
					r && LS.setItem(key, r);

					if (W.$visitorscounter)
						W.$visitorscounter++;
					else
						W.$visitorscounter = 1;
				}
				// 3 minutes
				if (!r || W.$visitorscounter === 6 || t.status !== 200)
					clearInterval(W.$visitorsinterval);
			}
		};
		xhr.open('GET', 'https://visitors.totaljs.com/' + params);
		xhr.setRequestHeader('X-Ping', L.pathname);
		xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
		document.referrer && xhr.setRequestHeader('X-Referrer', document.referrer);
		reading && xhr.setRequestHeader('X-Reading', '1');
		xhr.setRequestHeader('X-Host', h);
		xhr.send();
	};

	try {
		var key2 = key + 'test';
		localStorage.setItem(key2, '1');
		var is = LS.getItem(key2) === '1';
		LS.removeItem(key2);
		if (!is)
			return;
	} catch (e) {
		// disabled localStorage (skip user)
		return;
	}

	var params = '?id=' + ticks;
	var query = {};
	var un;

	var arr = L.href.slice(L.href.indexOf('?') + 1).split('&');
	for (var i = 0; i < arr.length; i++) {
		var param = arr[i].split('=');
		if (param.length === 2) {
			var name = decodeURIComponent(param[0]);
			var value = decodeURIComponent(param[1]);
			query[name] = value;
		}
	}

	if (query.utm_medium || query.utm_source || query.campaign_id)
		params = '&utm_medium=1';

	if (W.user) {
		if (W.user.name)
			un = W.user.name + '';
		else if (W.user.nick)
			un = W.user.nick + '';
	} else if (W.username)
		un = W.username + '';
	else if (query.utm_user)
		un = query.utm_user;

	if (un)
		params += '&utm_user=' + encodeURIComponent(un);

	ajax(params);
	W.$visitorsinterval = setInterval(function() {
		ajax('?id=' + ticks + (un ? ('&utm_user=' + encodeURIComponent(un)) : ''), true);
	}, 30000);

})();