function clickLink()
{
//	console.log('click');
	return false;
}

window.onmousemove = function (e) {
	var x = e.x;
	var y = e.y;
	var	cw= window.innerWidth;
	var	ch= window.innerHeight;
	var element = document.elementFromPoint(x, y);
	var	frame	= document.getElementById('cardinfo-frame');

	if(element && element.tagName == 'IMG')
	{
		element	= element.parentElement;
	  	//console.log(element);

		if(element && element.tagName == 'SPAN')
		{
			element	= element.parentElement;
	  		//console.log(element);

			if(element && element.tagName == 'A')
			{
				var	ww		= 540;
				var	wh		= 260;
				var	iframe	= document.getElementById('cardinfo');
				var	href	= element.getAttribute('HREF');

				//if(frame.classList.contains('show-popup')
				//&& iframe.getAttribute('SRC') ==  href)
				//	return;

				iframe.setAttribute('SRC', href);

			//	console.log(href);
				frame.classList.add('show-popup');
				frame.classList.remove('hide-popup');

				frame.style.left	= (x<cw/2 ? x+50 : x-ww-50) + 'px';
				frame.style.top		= (y<ch/2 ? y+30 : y-wh-30) + 'px';
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
