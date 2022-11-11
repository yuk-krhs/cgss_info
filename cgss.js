const grayCards = new Set();

function getCookieMap() {
	var	map	= new Map();

//	console.log('get cookies');
//	console.log(document.cookie);

	try
	{
		for(var i of document.cookie.split(';'))
		{
	    	var kv	= i.split('=');

			map.set(kv[0], kv[1]);
		}
	} catch(e) {}

	return map;
}

function doClickLink(elem, imd_id) {
	var	img	= document.getElementById(imd_id);

	if(img.classList.contains('g'))
	{
		img.classList.remove('g');
		grayCards.delete(imd_id);
	} else
	{
		img.classList.add('g');
		grayCards.add(imd_id);
	}

	document.cookie = "grayCards=" + Array.from(grayCards).join('/') + ";max-age=" + (24*60*60*365*10);

//	console.log('set cookies');
//	console.log(document.cookie);

	return false;
}

function doDOMContentLoaded() {
	var	cmap= getCookieMap();

//	console.log(cmap);

	if(cmap.has('grayCards'))
	{
		var	cards	= cmap.get('grayCards');
		var	list	= cards.split('/');

		for(var i of list)
		{
			var	elem= document.getElementById(i);

			if(elem)
			{
				elem.classList.add('g');
				grayCards.add(i);
			}
		}
	}
}

function doOnMouseMove(e) {
	var x		= e.x;
	var y		= e.y;
	var	cw		= window.innerWidth;
	var	ch		= window.innerHeight;
	var elem	= document.elementFromPoint(x, y);
	var	frame	= document.getElementById('cardinfo-frame');

	if(elem && elem.tagName == 'IMG')
	{
		var	img	= elem;
		var	id	= img.getAttribute('ID');
		elem	= elem.parentElement;

	//	console.log(elem);

		if(elem && elem.tagName == 'SPAN')
		{
			elem	= elem.parentElement;

	  	//	console.log(elem);

			if(elem && elem.tagName == 'A')
			{
				var	ww		= 350;
				var	wh		= 180;
				var	iframe	= document.getElementById('cardinfo');
				var	href	= elem.getAttribute('HREF');

				//if(frame.classList.contains('show-popup')
				//&& iframe.getAttribute('SRC') ==  href)
				//	return;

				iframe.setAttribute('SRC', href);

			//	console.log(href);
				frame.classList.add('show-popup');
				frame.classList.remove('hide-popup');

				frame.style.left	= (x<cw/2 ? x+30 : x-ww-30) + 'px';
				frame.style.top		= (y<ch/2 ? y+16 : y-wh-16) + 'px';
				frame.style.width	= ww + 'px';
				frame.style.height	= wh + 'px';
				iframe.style.width	= ww + 'px';
				iframe.style.height	= wh + 'px';

				return;
			}
		}
	}

	if(frame)
	{
		frame.classList.remove('show-popup');
		frame.classList.add('hide-popup');
	}
}

function clickLink(elem, imd_id) 							{ try { return doClickLink(elem, imd_id); }	catch(ex) { console.log(ex); return false; } }
window.onmousemove = function (e)							{ try { doOnMouseMove(e); }					catch(ex) { console.log(ex); } }
document.addEventListener('DOMContentLoaded', function()	{ try { doDOMContentLoaded(); }				catch(ex) { console.log(ex); } }, false);
