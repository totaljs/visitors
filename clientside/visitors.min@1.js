!function(){var e=navigator,s=window,n=s.localStorage,o=location,a=o.hostname;if(n&&(null==e.onLine||e.onLine)&&!/\d\.\d\.\d|^(http:)/.test(a)){function t(e,t){var r=new XMLHttpRequest;r.onreadystatechange=function(){var e=this;if(4===e.readyState){if(200===e.status){var t=e.responseText;(m=t)&&n.setItem(u,t);var r=o.pathname;c!==r&&(c=r,s.$visitorscounter=0),s.$visitorscounter?s.$visitorscounter++:s.$visitorscounter=1}t&&6!==s.$visitorscounter&&200===e.status||clearInterval(s.$visitorsinterval)}},r.open('GET','https://visitors.trackomator.com/'+i+e),r.setRequestHeader('X-Ping',o.pathname),r.setRequestHeader('X-Requested-With','XMLHttpRequest'),document.referrer&&r.setRequestHeader('X-Referrer',document.referrer),t&&r.setRequestHeader('X-Reading','1'),r.setRequestHeader('X-Host',a),r.send()}var i=a.substring(a.lastIndexOf('.')+1)+'/',u='visitor',m=n.getItem(u)||'',c=o.pathname;try{var r=u+'test';localStorage.setItem(r,'1');var d='1'===n.getItem(r);if(n.removeItem(r),!d)return}catch(e){return}for(var v,l='?id='+m,f={},p=o.href.slice(o.href.indexOf('?')+1).split('&'),h=0;h<p.length;h++){var R=p[h].split('=');if(2===R.length){var g=decodeURIComponent(R[0]),I=decodeURIComponent(R[1]);f[g]=I}}(f.utm_medium||f.utm_source||f.campaign_id)&&(l='&utm_medium=1'),s.user?s.user.name?v=s.user.name+'':s.user.nick&&(v=s.user.nick+''):s.username?v=s.username+'':f.utm_user&&(v=f.utm_user),v&&(l+='&utm_user='+encodeURIComponent(v)),t(l),s.$visitorsinterval=setInterval(function(){document.hasFocus()&&t('?id='+m+(v?'&utm_user='+encodeURIComponent(v):''),!0)},3e4)}}();