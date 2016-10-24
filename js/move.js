function move(dom, target, fn){
	clearInterval(dom.timer);
	dom.timer = setInterval(function (){
		var isOk = true;
		for(var property in target){
			var iCur = getStyle(dom, property);
			if(property === "opacity"){
				iCur = parseInt(iCur*100);
			} else {
				iCur = parseInt(iCur);
			}
			
			if(iCur !== target[property]){
				isOk = false;
			}
			
			var speed = (target[property] - iCur)/10;
			
			speed = speed > 0? Math.ceil(speed) : Math.floor(speed);
			
			if(property === "opacity"){
				dom.style.opacity = "" + (iCur + speed)/100;
				dom.style.filter = "alpha(opacity=" + (iCur + speed) + ")";
			} else {
				dom.style[property] = iCur + speed + "px";
			}
		}
		
		if(isOk){
			clearInterval(dom.timer);
			if(fn){
				fn();
			}
		}
	}, 10);
}

function getStyle(dom, property){
	if(dom.currentStyle){
		return dom.currentStyle[property];
	} else {
		return window.getComputedStyle(dom)[property];
	}	
}