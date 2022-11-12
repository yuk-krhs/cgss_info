const grayCards = new Set();
var	initialWidth= 0;
var mode		= 1;
var	selected	= null;

function changeMode(elem) {
	setMode(elem.innerText == 'タッチモード' ? 0 : 1);
	setSelected(null);
}

function setMode(m) {
	mode	= m;

	var	elem	= document.getElementById('change-mode');

	if(elem)
		elem.innerText = mode == 0 ? 'マウスモード' : 'タッチモード';

	saveMode();
}

function saveMode() {
	var value = 'opMode=' + mode + '; Max-Age=' + (24*60*60*365*10);
//	console.log(value);
	document.cookie = value;
}

function saveGrayOut() {
	var value = 'grayCards=' + Array.from(grayCards).join('/') + '; Max-Age=' + (24*60*60*365*10);
//	console.log(value);
	document.cookie = value;
}

function loadCookie() {
	return getCookieMap();
}

function getCookieMap() {
	var	map	= new Map();

//	console.log('get cookies');
//	console.log(document.cookie);

	try
	{
		for(var i of document.cookie.split(';'))
		{
	    	var kv	= i.split('=');
			var	key	= kv[0].trim();
			var	val	= kv[1].trim();

			//console.log('key="' + key + '" value="' + val + '"'); 

			map.set(key, val);
		}
	} catch(e) {}

	return map;
}

function removeHeader() {
	var	elem= document.getElementById('pagehead');
	elem.style.display = 'none';

	for(var i of Array.from(document.getElementsByClassName('cb')))
		i.style.display = 'none';
}

function resetDisplay() {
	for(var i of Array.from(document.getElementsByClassName('hidden1')))
		i.classList.remove('hidden1');

	for(var i of Array.from(document.getElementsByClassName('hidden2')))
		i.classList.remove('hidden2');

	for(var i of document.getElementsByClassName('cb_skill'))
		i.checked	= true;

	for(var i of document.getElementsByClassName('cb_sec'))
	{
		i.parentElement.setAttribute('colspan', '1');
		i.checked	= true;
	}

	var	table	= document.getElementById('card-skill-table');
	table.style.width	= initialWidth;
}

function changeSkill(elem, cls) {
	var	th			= elem.parentElement;

//	if(elem.checked)
//			th.setAttribute('colspan', '1');
//	else	th.setAttribute('colspan', '2');

	var	wid	= new Map();

	for(var i of document.getElementsByClassName('head1'))
		wid[i]	= i.clientWidth;

	if(elem.checked)
		for(var i of document.getElementsByClassName(cls))
			i.classList.remove('hidden1');
	else
		for(var i of document.getElementsByClassName(cls))
			i.classList.add('hidden1');

	var	w	= 48;

	for(var i of document.getElementsByClassName('head1'))
		if(i.checkVisibility())
			w	= w + wid[i];

	var	table	= document.getElementById('card-skill-table');
	table.style.width	= w + 'px';
}

function changeSec(elem, cls) {
	var	th			= elem.parentElement;

	if(elem.checked)
			th.setAttribute('colspan', '1');
	else	th.setAttribute('colspan', '2');

	if(elem.checked)
		for(var i of document.getElementsByClassName(cls))
			i.classList.remove('hidden2');
	else
		for(var i of document.getElementsByClassName(cls))
			i.classList.add('hidden2');
}

function doClickLinkMode0(e, elem, img_id) {
	var	img	= document.getElementById(img_id);

	if(img.classList.contains('g'))
	{
		img.classList.remove('g');
		grayCards.delete(img_id);
	} else
	{
		img.classList.add('g');
		grayCards.add(img_id);
	}

	saveGrayOut();

//	console.log('set cookies');
//	console.log(document.cookie);

	return false;
}

function doClickLinkMode1(e, elem, img_id) {
	var	elemImg	= document.getElementById(img_id);
	var	td		= elem.parentElement.parentElement;

	if(selected == elemImg)
		return doClickLinkMode0(e, elem, img_id);

	setSelected(elemImg);

	// show Status
	processShowCardStatus(e);

	return false;
}

function doOnMouseDownDoc(e) {
//	console.log('doOnMouseMoveDoc');

	var x		= e.x;
	var y		= e.y;
	var elem	= document.elementFromPoint(x, y);

	while(elem)
	{
		if(elem.tagName == 'IMG')
			break;

		elem	= elem.parentElement;
	}

	if(elem != selected)
	{
		setSelected(null);
		hideCardStatus();
	}
}

function setSelected(elem) {
	if(selected)
		selected.classList.remove('selected');

	selected	= elem;

	if(selected)
		selected.classList.add('selected');
}

function doClickLink(e, elem, img_id) {
//	console.log('doClickLink');

	if(mode == 0)
			return doClickLinkMode0(e, elem, img_id);
	else	return doClickLinkMode1(e, elem, img_id);
}

function doDOMContentLoaded() {
	var	cmap= loadCookie();

//	console.log(cmap);

	if(cmap.has('opMode'))
		setMode(Number(cmap.get('opMode')));

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

	var	table	= document.getElementById('card-skill-table');
	initialWidth= table.style.width;
}

function showCardStatus(x, y, href) {
	var	ww		= 320;
	var	wh		= 160;
	var	frame	= document.getElementById('cardinfo-frame');
	var	iframe	= document.getElementById('cardinfo');

	iframe.setAttribute('SRC', href);
	frame.classList.add('show-popup');
	frame.classList.remove('hide-popup');

	frame.style.left	= x + 'px';
	frame.style.top		= y + 'px';
	frame.style.width	= ww + 'px';
	frame.style.height	= wh + 'px';
	iframe.style.width	= ww + 'px';
	iframe.style.height	= wh + 'px';
}

function hideCardStatus() {
	var	frame	= document.getElementById('cardinfo-frame');

	if(frame)
	{
		frame.classList.remove('show-popup');
		frame.classList.add('hide-popup');
	}
}

function processShowCardStatus(e) {
	var	ww	= 320;
	var	wh	= 160;
	var x	= e.x;
	var y	= e.y;
	var	cw	= window.innerWidth;
	var	ch	= window.innerHeight;
	var elem= document.elementFromPoint(x, y);

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
				var	href	= elem.getAttribute('HREF');

				showCardStatus(x<cw/2 ? x+30 : x-ww-30, y<ch/2 ? y+16 : y-wh-16, href);

				return;
			}
		}
	}

	hideCardStatus();
}

function doOnMouseMove(e) {
	if(mode == 1)
		return;

	processShowCardStatus(e);
}

function clickLink(e, elem, img_id)							{ try { return doClickLink(e, elem, img_id); }	catch(ex) { console.log(ex); return false; } }
window.onmousemove = function (e)							{ try { doOnMouseMove(e); }						catch(ex) { console.log(ex); } }
document.addEventListener('DOMContentLoaded', function()	{ try { doDOMContentLoaded(); }					catch(ex) { console.log(ex); } }, false);
document.onmousedown = function (e)							{ try { doOnMouseDownDoc(e); }					catch(ex) { console.log(ex); } }