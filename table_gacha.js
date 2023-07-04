var	selected	= null;

function doClickLinkMode1(e, elem, img_id) {
	var	elemImg	= document.getElementById(img_id);

	setSelected(elemImg);

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

	return doClickLinkMode1(e, elem, img_id);
}

function showCardStatus(x, y, href) {
	var	ww		= 360;
	var	wh		= 182;
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
	var	ww	= 360;
	var	wh	= 182;
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

function clickLink(e, elem, img_id)							{ try { return doClickLink(e, elem, img_id); }	catch(ex) { console.log(ex); return false; } }
document.onmousedown = function (e)							{ try { doOnMouseDownDoc(e); }					catch(ex) { console.log(ex); } }