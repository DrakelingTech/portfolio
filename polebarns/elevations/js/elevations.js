

<!--============BEGIN VARIABLE INITIALIZATION============//-->
	svgNS='http://www.w3.org/2000/svg';

	views=[];
	activeView=null;
	libMade=null;

	mainOffsetX=5;
	mainOffsetY=10;

	incrementX=3;
	incrementY=null;

	optionCount=3;

	colors=['black','darkBlue','darkSlateGray','darkRed','darkGreen','darkMagenta','deepPink','indigo','purple'];
<!--=============END VARIABLE INITIALIZATION=============//-->


<!--============BEGIN ZOOM FUNCTIONS============//-->

function zoomIn(viewName){
	
	if(activeView!==viewName) {
		
		<!--STORE THE ACTIVE VIEW, ETC..-->
		activeView=viewName;
		activeDiv=document.getElementById('frame'+viewName+'Div');
		activeSVG=activeDiv.querySelector('svg');
		activeGroup=activeSVG.querySelector('g');
		activeRoof=activeSVG.querySelector('polygon.roof');
		activeWall=activeGroup.querySelector('rect.wall');
	
		<!--STORE THE ACTIVE WALL’S DIMENSIONS.-->
		wallL=parseFloat($(activeWall).attr('x'))+mainOffsetX;
		wallT=parseFloat($(activeWall).attr('y'))+mainOffsetY;
		wallW=parseFloat($(activeWall).attr('width'));
		wallH=parseFloat($(activeWall).attr('height'));
		wallR=wallL+wallW;
		wallB=wallT+wallH;
	
		pt = activeSVG.createSVGPoint();
	
		//Show all buttons pertaining to detail view.
		$('#libButton,#zoomOutButton,.closebtnCir').addClass('visible').removeClass('hidden');
		
		//Enable dragging of options.
		lockOptions(false);
	
		//Zoom in on the div and disallow further zooming.
		$(activeDiv).addClass('zoomIn').removeClass('zoomOut');
		//$(activeDiv).off('click');
	
		//Hide all other divs.
		$('div.elevation').removeClass('zoomOut narrow');
		$('div.elevation').not(activeDiv).css('display','none');
	
	}

} //end zoomIn


function zoomOut(){

	//Hide all buttons pertaining to detail view.
	$('#libButton,#zoomOutButton,.closebtnCir').addClass('hidden').removeClass('visible');	
	
	//Make sure the library panel is closed.
	$('#library').css({'width':0,'boxShadow':'none'});

	//Disable dragging of options.
	lockOptions(true);

	//Zoom out of the div and reenable zooming.
	$(activeDiv).addClass('zoomOut').removeClass('zoomIn');

	//Clear the active variables and show all elevation divs.
	activeView=null; activeDiv=null; activeSVG=null;
		activeGroup=null; activeRoof=null; activeWall=null;
	$('div.elevation').not(activeDiv).css('display','initial');

} //end zoomOut	


function makeCloseButton(objID){

	//Create the close button for this object.
	var closeGroup=document.createElementNS(svgNS,'g');
	$(closeGroup).attr({'id':objID+'RemoveGroup','draggable':false});
	$(closeGroup).removeClass('redrag');

	var closeCircle=document.createElementNS(svgNS,'circle');
	var objID_toPass=objID.replace('Div','');

	$(closeCircle).attr({'id':csID+'Remove','cx':0,'cy':0,'draggable':false});
	$(closeCircle).addClass('closebtnCir');
	$(closeCircle).click(function(){removeOption(objID_toPass)});

	var closeX=document.createElementNS(svgNS,'text');
	$(closeX).attr('id',csID+'RemoveX');
	$(closeX).addClass('closebtnCir');
	closeX.innerHTML='&times';

	//Attach the close button to its parent.
	closeGroup.appendChild(closeCircle);
	closeGroup.appendChild(closeX);
	cGroup.appendChild(closeGroup);

}


function lockOptions(boolean){

	if(typeof cSVG !=='undefined'){ //1

		//Store the options to lock or unlock.
		var optMain=$('.optMain');
			
		if(boolean===true){ //2

			//Lock the options.
			$('g',$('.option',activeDiv)).attr('draggable',false).removeClass('redrag');
			
			//Remove the custom strokes.
			optMain.css('stroke','').css({'stroke-width':'','stroke-opacity':''});	
			
		}else{ //2

			//Unlock the options.
			$('g',$('.option',activeDiv)).not('[id*="Dynadim"]').attr('draggable',true).addClass('redrag');

			//Restore any custom strokes.
			$('.optMain',activeDiv).css({'stroke-width':'4px','stroke-opacity':'0.5'});	
			for(i=0;i<optMain.length;i++) $(optMain[i]).css('stroke',$(optMain[i]).attr('color'));

		} //end if 2
			
		//Update the dimensions’ display values.
		var disp=(boolean===true) ? 'none' : 'initial';
		$('[id$="DynadimGroup"]').css('display',disp);
		
	} //end if 1

}

<!--=============END ZOOM FUNCTIONS=============//-->





<!--============BEGIN LIBRARY FUNCTIONS============//-->

function openLib() {
	if(libMade!=true){
		libMade=true;
	}
	var lib = document.getElementById('library');
	lib.style.width='250px';
	lib.style.boxShadow='-3px 0 15px 0 #333';
	$(activeDiv).addClass('narrow');
}

function closeLib() {
	var lib = document.getElementById('library');
	lib.style.width=0;
	lib.style.boxShadow='none';
	$(activeDiv).removeClass('narrow');
	$(activeDiv).addClass('wide');
}
<!--============END LIBRARY FUNCTIONS============//-->





<!--============================BEGIN SMALL DIVS============================//-->

<!--============BEGIN ZOOM OUT BUTTON============//-->
<div id="zoomOutButton" class="closebtn hidden">
	<a name="close" class="closebtn" onClick="zoomOut()">&times;</a>
</div>
<!--=============END ZOOM OUT BUTTON=============//-->


<!--============BEGIN LIBRARY BUTTON============//-->
<div id="libButton" class="libButton" onclick="openLib()">
	<img src="">
</div>
<!--=============END LIBRARY BUTTON=============//-->


<!--============BEGIN LIBRARY DIV/TABLE============//-->
<div id="library" class="lib">
<a class="closebtn lib" onclick="closeLib()">&times;</a>

<table id="libTable">
	<tr id="libTableRow0">
		<td id="libTableCell0" style="height:30px; border:0;" />
	</tr>
</table>
</div>
<!--=============END LIBRARY DIV/TABLE=============//-->


<!--=============================END SMALL DIVS=============================//-->




<!--===========BEGIN DISPLAY FUNCTIONS===========//-->

function hideOthers(){
	var viewCount=views.length;
	for(i=0; i<viewCount; i++){
		var view = window.views[i]
		if(view != activeDiv.id){
			var obj = document.getElementById(view);
			obj.style.display = 'none';
		} //end If
	} //end for
} //end hideOthers

function showOthers(){
	var viewCount=views.length;
	for(i=0; i<viewCount; i++){
		var view = views[i];
		if(view != activeDiv.id){
			var obj=document.getElementById(view);
			obj.style.display = 'initial';
		} //end If
	} //end for
} //end showOthers

function makeDraggable(isTrue){

	var optionList=document.querySelectorAll('.draggable');

	for(i=0;i<optionList.length;i++){
		var option=optionList[i];
		$(option).attr('draggable',isTrue);

		if(isTrue){
			$(option).addClass('redrag');
		} else {
			$(option).removeClass('redrag');
		}

	}
	
}

<!--============END DISPLAY FUNCTIONS============//-->





<!--=========BEGIN DRAG-AND-DROP FUNCTIONS=========//-->

<!--==============BEGIN DEFAULT DRAG==============//->

//Make sure the document is ready.
$(document).ready(function(){

	var cSVG;
	$('svg').on('mousedown','.redrag',function(evt){

		//Store the curent target, its group, and the enclosing SVGs.
		var target=evt.target;
		var targetID=target.id;

		csID=targetID.replace('Remove','');
		
		if(targetID.indexOf('Remove')<0){
			
			var gTarget=evt.target.closest('g');
			var pTarget=gTarget.closest('svg');
			var pTargetID=pTarget.id;
			csID=pTargetID;
			var tTarget=pTarget.parentElement;
			var sTarget=tTarget.closest('svg');

			//Get the initial coordinates of the pointer.
			var coords=getCoords(evt);
			var x=parseFloat(coords[0]); var y=parseFloat(coords[1]);
	
			//Store the option’s size.
			var optW=parseFloat($(pTarget).attr('width'));
			var optH=parseFloat($(pTarget).attr('height'));
			var pTUPos=pTargetID.indexOf('_');
			eval('optW_'+pTargetID.substring(0,pTUPos)+'='+optW);
			eval('optH_'+pTargetID.substring(0,pTUPos)+'='+optH);

			//Get the initial coordinates of the option.
			var optL=parseFloat($(pTarget).attr('x')-mainOffsetX)+x;
			var optT=parseFloat($(pTarget).attr('y')-mainOffsetY)+y; 
			var optR=optL+optW;
			var optB=optT+optH; 

			//Get the initial transform of the target.
			var tr=$(gTarget).attr('transform');
			if(tr===undefined) tr='translate(0, 0)';
			var trv=tr.replace(/translate\(|\)/g,'');
			var trVals=trv.split(', ');
			var xT=parseFloat(trVals[0]); var yT=parseFloat(trVals[1]);
	
			//Store the maximum distances the option can be moved.
			var minX=-(optL-x)+(wallL-mainOffsetX);
			var minY=-(optT-y)+(wallT-mainOffsetY);
	
			var maxX=wallR-(optR-x)-mainOffsetX;
			var maxY=wallB-(optB-y)-mainOffsetY;
	
			//Just in case the mouse doesn’t move, initialize the drop variables.
			var xD=''; var yD='';

			//Store the default fill color(s).
			defaultFill=$(target).css('fill');

			//When the mouse is moved while down, apply the transformation.
			$(this).on('mousemove',function(evt){
	
				//Make sure the selected SVG is in front and highlighted.
				sTarget.appendChild(pTarget);
				$(target).css('fill','#eafaff');
	
				//Store the ID of the parent SVG.
				var par=pTarget.id;
	
				//Store the current coordinates.
				var coords=getCoords(evt);
				var xD=coords[0];
				var yD=coords[1];
				eval('xD_'+targetID+'='+xD);
				eval('yD_'+targetID+'='+yD);

				//Store the attachTo value. (Make sure it’s defined.)
				var attachto=$(this).attr('attachto');
				var attachto=(typeof attachto==='undefined') ? '':attachto;
	
				//Store the translate values.
				if(attachto.indexOf('left')>=0||attachto.indexOf('right')>=0){
					//If the option is attached to the left or right, x doesn’t change.
					var translateX=0;
				}else{
					var defaultX=(xT+xD-x);
					var translateX=Math.max(minX,Math.min(defaultX,maxX));
				}
	
				if(attachto.indexOf('top')>=0||attachto.indexOf('bottom')>=0){
					//If the option is attached to the top or bottom, y doesn’t change.
					var translateY=0;
				}else{
					var defaultY=(yT+yD-y);
					var translateY=Math.max(minY,Math.min(defaultY,maxY));
				}
	
				$(gTarget).attr('transform','translate('+translateX+', '+translateY+')');
				eval('translateX_'+pTargetID+'='+translateX);
				eval('translateY_'+pTargetID+'='+translateY);
				var pX=parseFloat($(pTarget).attr('x'));
				var pY=parseFloat($(pTarget).attr('y'));

				//Store the distance from each side of the wall.
				var distL=(pX+translateX)-wallL;
				eval('distL_'+pTargetID+'='+distL);

				var distR=wallR-(optW+pX+translateX);
				eval('distR_'+pTargetID+'='+distR);

				var distT=(pY+translateY)-wallT;
				eval('distT_'+pTargetID+'='+distT);

				var distB=wallB-(optH+pY+translateY);
				eval('distB_'+pTargetID+'='+distB);
	
				var obj=event.target;
	
				/*If the option is attached to any side, we don’t
				  need dimensions for that side nor its opposite.*/
				var sides=[ ];
				if(attachto!=='left' && attachto!=='right') sides.push('left','right');
				if(attachto!=='top' && attachto!=='bottom') sides.push('top','bottom');

				for(i=0;i<sides.length;i++) {
					var dimSide=sides[i].substring(0,1).toUpperCase();
					updateOptDim(pTarget,dimSide,false);
				}
				
			} //end if
			
		);

		//Let go of the option when the mouse is released or the cursor goes past the edge of the building.
		$(this).on('mouseup',function(evt){
			
			$(this).off('mousemove');
			$(this).blur;
			$(target).css('fill',defaultFill);
			
			var targetID=target.id;
			var gTarget=target.closest('g');
			var pTarget=gTarget.closest('svg');
			var pTargetID=pTarget.id;

			//If the translate values are undefined for this object, initialize them.
			try{ eval('translateX_'+pTargetID); }
			catch(err){ eval('translateX_'+pTargetID+'=0') }
			try{ eval('translateY_'+pTargetID); }
			catch(err){ eval('translateY_'+pTargetID+'=0') }

			var translateX=eval('translateX_'+pTargetID);
			var translateY=eval('translateY_'+pTargetID);

			if(incrementX>0) var translateX=round(translateX/incrementX,0)*incrementX;
			if(incrementY>0) var translateY=round(translateY/incrementY,0)*incrementY;

			$(gTarget).attr('transform','translate('+translateX+', '+translateY+')');
			eval('translateX_'+pTargetID+'='+translateX);
			eval('translateY_'+pTargetID+'='+translateY);

			//Store the attachTo value. (Make sure it’s defined.)
			var attachto=$(this).attr('attachto');
			var attachto=(typeof attachto==='undefined') ? '':attachto;

			/*If the option is attached to any side, we don’t
			  need dimensions for that side nor its opposite.*/
			var sides=[ ];
			if(attachto!=='left' && attachto!=='right') sides.push('left','right');
			if(attachto!=='top' && attachto!=='bottom') sides.push('top','bottom');

			for(i=0;i<sides.length;i++) {
				var dimSide=sides[i].substring(0,1).toUpperCase();
				updateOptDim(pTarget,dimSide,true);
			}

		});

	}}); //end SVG function

}); //end document function
<!--===============END DEFAULT DRAG===============//->


function getCoords(evt,target) {

	//Check to see if the target is explicitly specified.
	if(target===undefined){
	var target=(event.targetTouches && event.targetTouches.length) ?
			$(event.targetTouches[0].target) : event.target;

			var tDefined=false;
		//}
	}else{ var tDefined=true;
	}

	//Check to see if the target is an SVG element.
	var svgTop=target.ownerSVGElement;

	if(target instanceof SVGElement){
		var isSVG=true;
	}else if(svgTop===undefined){
		var isSVG=false;
	}else{
		var isSVG=true;
	}

	if(isSVG){
		//If the target is an SVG, translate the cursor position into svg coordinates.
		cSVG=target;
		cGroup=cSVG.querySelector('g');

		if(cSVG===undefined) var cSVG=target;

		if(cSVG instanceof SVGElement){

			//Create the point based on the identity of the current object.
			pt=(svgTop===null) ? cSVG.createSVGPoint() : svgTop.createSVGPoint();

			if(tDefined){
				pt.x=$(target).attr('x');
				pt.y=$(target).attr('y');
				var cursorPt=pt.matrixTransform(svgTop.getScreenCTM());
			}else{
				pt.x=evt.clientX;
				pt.y=evt.clientY;
				var cursorPt=pt.matrixTransform(svgTop.getScreenCTM().inverse());			
			}
			
			var x=cursorPt.x;
			var y=cursorPt.y;

		}

	}else{
		
		//Otherwise, translate the cursor position according to the bounding rectangle.
		var bcRect=target.getBoundingClientRect();
		var bcLeft=bcRect.left;
		var bcTop=bcRect.top;
		var x=evt.clientX-bcLeft;
		var y=evt.clientY-bcTop;
		
	}

    return[x,y]
	
}


function addFromLib(evt) {

	/*This function MUST act on a div, which works correctly with mouse events.
	  However, it does not work correctly with touch events. Thus, if touch
	  is being used, we need to select the target’s closest div ancestor.*/
	var trg=(evt.targetTouches && evt.targetTouches.length) ?
			$(evt.targetTouches[0].target).closest('div')[0] : evt.target;

	//Once we’ve got the appropriate div, select the first child SVG.
	opt=$(trg).find('svg')[0];
	optID=opt.id;

	var bcr=opt.getBoundingClientRect();
	var optW=bcr.width;
	var optH=bcr.height;

	var coords=getCoords(evt,trg);
	x=coords[0]; y=coords[1];

	prcX=x/optW ;
	prcY=y/optH ;

	var optW=round($(opt).attr('width'),1);
	var optH=round($(opt).attr('height'),1);

	eval('optW_'+optID+'='+optW);
	eval('optH_'+optID+'='+optH);

}


function allowDrop(evt) { evt.preventDefault(); }


function drop(evt) {

	//Suppress standard functionality.
    evt.preventDefault();

	//Augment the option number.
	try{ optNum=optNum+1; }
	catch(e){ optNum=1 };

	//Since this is the first drop, clone the the node.
	cloneNode(opt);

	var cTarget=evt.target;
	var optID=opt.id;
	csID=optID+'_'+optNum;

	makeCloseButton(csID);

	var optW=round($(opt).attr('width'),1);
	var optH=round($(opt).attr('height'),1);
	var translateX=0;
	var translateY=0;

	var coords=getCoords(evt);
	var dropX=coords[0]; dropY=coords[1];

	var pt=cSVG.createSVGPoint();
	pt.x=evt.pageX;
	pt.y=evt.pageY;

	var ctm=evt.target.getScreenCTM();
	if (ctm=ctm.inverse())
		pt=pt.matrixTransform(ctm);

	var minX=wallL;
	var minY=wallT;

	var maxX=wallR-optW;
	var maxY=wallB-optH;

	var optX=pt.x-(prcX*optW)+mainOffsetX;
	var optY=pt.y-(prcY*optH)+mainOffsetY;

	var attachto=$(cSVG).attr('attachto');
	if(typeof attachto==='undefined') attachto='';

	if(attachto.indexOf('left')>=0){
		var finalX=minX;
	}else if(attachto.indexOf('right')>=0){
		var finalX=maxX;
	}else{
		var finalX=Math.max(minX,Math.min(maxX,optX));
	}
	
	if(attachto.indexOf('top')>=0){
		var finalY=minY;
	}else if(attachto.indexOf('bottom')>=0){
		var finalY=maxY;
	}else{
		var finalY=Math.max(minY,Math.min(maxY,optY));
	}

	//If the x-axis is constrained to increments, use that constraint.
	if(incrementX>0){
		$(cSVG).attr('x',wallL+(round((finalX-wallL)/incrementX,0)*incrementX));
	}else{
		$(cSVG).attr('x',finalX);
	}

	//If the y-axis is constrained to increments, use that constraint.
	if(incrementY>0){
		$(cSVG).attr('y',wallT+(round((finalY-wallT)/incrementY,0)*incrementY));
	}else{
		$(cSVG).attr('y',finalY);
	}

	//Remove the library option’s CSS dimensions from the clone.
	$(cSVG).css({'width':'','height':''});
	activeSVG.appendChild(cSVG);

	var pX=parseFloat($(cSVG).attr('x'));
	var pY=parseFloat($(cSVG).attr('y'));

	var distL=pX-wallL;
	eval('distL_'+csID+'='+distL);

	var distR=wallR-(optW+pX);
	eval('distR_'+csID+'='+distR);

	var distT=pY-wallT;
	eval('distT_'+csID+'='+distT);

	var distB=wallB-(optH+pY);
	eval('distB_'+csID+'='+distB);

	//Add visible dimensions.

	/*If the option is attached to a side, we don’t
	  need dimensions for that side nor its opposite.*/
	var sides=[ ];
	if(attachto!=='left' && attachto!=='right') sides.push('left','right');
	if(attachto!=='top' && attachto!=='bottom') sides.push('top','bottom');
	
	var dynadimGroup=document.createElementNS(svgNS,'g');
	dynadimGroup.id=csID+'DynadimGroup';
	cSVG.appendChild(dynadimGroup);

	eval('translateX_'+csID+'='+translateX);
	eval('translateY_'+csID+'='+translateY);

	for(i=0;i<sides.length;i++){
		var dim=makeOptDim(opt,sides[i]);
	}

	//Update the remaining count.
	var countDivName=optID+'OptCount';
	updateCount(countDivName,-1);
	
	eval('optW_'+optID+'='+optW);
	eval('optH_'+optID+'='+optH);

}

function cloneNode(obj){

	//Clone the the node.
	cSVG=obj.cloneNode(true);
	csID=obj.id;
	csID=csID+'_'+optNum;
	cSVG.id=csID;
	$(cSVG).removeAttr('ondragstart');

	cGroup=$('g:first',cSVG)[0];
	$(cGroup).addClass('redrag');

	var at=$(obj).attr('attachto');
	var w=$(obj).attr('width');
	var h=$(obj).attr('height')
	$(cGroup).attr({'draggable':'true','attachto':at,'width':w,'height':h});

	//Set the custom color of the option and its dimensions.
	optColor=colors[(optNum%colors.length)];
	var topLevel=$('rect',cSVG)[0];
	$(topLevel).attr('color',optColor).removeAttr('viewBox');
	$(topLevel).css({'stroke':optColor,'stroke-width':'4px','stroke-opacity':'0.5'});

	//Update the IDs of all its children.
	var kids=cSVG.querySelectorAll('*');
	for(i=0;i<kids.length;i++){
		var kid=kids[i];
		kid.id=kid.id.replace(obj.id,csID);
	}

}

<!--==========END DRAG-AND-DROP FUNCTIONS==========//-->





<!--============BEGIN CONVERSION FUNCTIONS============//-->
function round(value, precision) {
    var m = Math.pow(10, precision || 0);
    return Math.round(value * m) / m;
}


function makePrime(string){
	var p='\u2032';
	var dP='\u2033';

	var string=string.toString();
	
	var string=string.replace("'",p);
	var string=string.replace("‘",p);
	var string=string.replace("’",p);
	var string=string.replace("′",p);

	var string=string.replace('"',dP);
	var string=string.replace('“',dP);
	var string=string.replace('”',dP);
	var string=string.replace('″',dP);

	return string;
}


function footInchToDec(footInch,precision){

	var p='\u2032';
	var dP='\u2033';
	var dist=makePrime(footInch);

	var fPos=dist.indexOf(p);
	var iPos=dist.indexOf(dP);

	//If the number has neither foot nor inch marks, add them.
	if(fPos<0 && iPos<0) dist=decToFootInch(footInch,precision);

	var fPos=dist.indexOf(p);
	var iPos=dist.indexOf(dP);

	/*If there is a foot mark, store the value before it.
	  If there is an inch mark, store nothing.
	  Otherwise, use the entire number.*/
	var ft=(fPos>0) ? dist.substring(0,fPos) : (iPos>0) ? '' : parseInt(dist);
	var ft=parseInt(ft);

	var sPos=(iPos>0) ? iPos : footInch.length;
	var inch=dist.substring(fPos+1,sPos);
	var inch=parseFloat(inch);
	if(isNaN(inch)) var inch=0;

	/*Note: due to rounding errors, the calculation can return a value of [x]′12″.
      If this happens, round up to the next foot.*/
	var ft=ft+Math.floor(inch/12);
    var inch=inch%12;
	var inchRound=round(inch/12,precision);

	return (parseFloat(ft)+parseFloat(inchRound));

}

function decToFootInch(decimal,precision,showZeroes){

	var p='\u2032';
	var dP='\u2033';

	var dist=makePrime(decimal);
	var fPos=dist.indexOf(p);
	var iPos=dist.indexOf(dP);

	/*If there is a foot mark, store the value before it.
	  If there is an inch mark, store nothing.
	  Otherwise, use the entire number.*/
	var ft=(fPos>0) ? dist.substring(0,fPos) : (iPos>0) ? '' : parseInt(dist);

	//Store the inches appropriately.
 	dec=Math.abs(decimal)-Math.abs(ft);
  	if(fPos>0 && iPos>0){
		//If there are foot and inch marks, store the value between them.
		var inch=dist.substring(fPos+1,iPos);
	}else if(fPos>0){
		//If there is only a foot mark, store the value after it.
		var inch=dist.substring(fPos+1,decimal.length+1);
	}else{
		//Otherwise, convert the decimal portion value to inches.
		var inch=parseFloat((decimal-ft)*12);
	}

	if(precision===undefined) precision=6;
	var inch=round(inch,precision);

	/*Note: due to rounding errors, the calculation can return a value of [x]′12″.
	  If this happens, round up to the next foot.*/
	ft=ft+Math.floor(inch/12);
	inch=inch%12;

	//If there are feet, display them.
	var ft=(Math.abs(ft)>0) ? ft+p : '';
	
	//If there are inches that need to be shown, display them.
	var inch=(round(inch,precision)==0 && (showZeroes==false)) ? '' : inch+dP;
	
	return (ft+inch);

}
<!--============END CONVERSION FUNCTIONS============//-->





<!--============BEGIN OPTION MANAGEMENT FUNCTIONS============//-->

function removeOption(objID){

	//Delete the appropriate SVG object.
	var pTarget=$('#'+objID).closest('svg');
	$(pTarget).remove();

	//Clear the transformation.
	eval('translateX_'+objID+'=undefined');
	eval('translateY_'+objID+'=undefined');

	//Update the remaining count.
	var oUPos=objID.indexOf('_');
	var sID=objID.substring(0,oUPos);
	var countDivName=sID+'OptCount';
	updateCount(countDivName,1);

}
        

function updateCount(countDivName,increase){
	
	//Update the remaining count.
	var countDiv=document.getElementById(countDivName);
	var objID=countDivName.replace('OptCount','');
	var obj=document.getElementById(objID);

	if(countDiv != null){ //if 1
		var countDivCount=countDiv.innerText;
		document.getElementById(countDivName).innerText=parseInt(countDivCount)+parseInt(increase);
		var countDivCount=document.getElementById(countDivName).innerText;
		var objDiv=document.getElementById(obj.id+'Div');

		//If the remaining count is now zero, gray it out and prevent additional dragging.
		if(countDivCount==0){ //if 2
			$(objDiv).attr('draggable','false').removeAttr('ondragstart');;
			$(objDiv).css('opacity',0.5);
			$(objDiv).removeClass('draggable').addClass('inactive');
		}else{
			$(objDiv).attr({'draggable':'true','ondragstart':'addFromLib(event)'});
			$(objDiv).css('opacity',1);
			$(objDiv).addClass('draggable').removeClass('inactive');
		} //end if 2

	} //end if 1

}


function saveOptions() {
	var theBody=$('body')[0];
	//var theBody=document.getElementsByTagName('body');
	var theContent=theBody[0];
	alert(theBody);
	 
	//document.location.href='fmp://$/#filename?script=storerequired&param='+required+','+reqChecked+','+ids;

}

<!--=============END OPTION MANAGEMENT FUNCTIONS=============//-->





<!--==========BEGIN DIMENSIONS FUNCTIONS==========//-->

function makeOptDim(obj,side){

	var objID=obj.id;
	csID=objID+'_'+optNum;
	var cs=document.getElementById(csID);
	var dgID=csID+'DynadimGroup';
	var dynadimGroup=document.getElementById(dgID);

	var dimSide=side.substring(0,1).toUpperCase();
	var dynadim=csID+'Dynadim'+dimSide;

	var dimGroup=document.createElementNS(svgNS,'g');
	dimGroup.id=dynadim+'Group';
	$(dimGroup).addClass('dimension');
	dynadimGroup.appendChild(dimGroup);

	var dimText=document.createElementNS(svgNS,'text');

	var distance=eval('dist'+dimSide+'_'+csID);
	dimText.id=dynadim+'Text';
	$(dimText).addClass('dimension');
	$(dimText).addClass('smaller');
	$(dimText).attr('fill',optColor);
	dimGroup.appendChild(dimText);

	var dimLine=document.createElementNS(svgNS,'line');
	dimLine.id=dynadim+'Line';
	dimGroup.appendChild(dimLine);

	$(dimLine).addClass('opt');
	$(dimLine).addClass('dimTemp');
	$(dimLine).attr('stroke',optColor);
	$(dimLine).attr('fill',optColor);
	updateOptDim(cs,dimSide,false)

	return dimGroup;
	
} //end makeOptDim


function updateOptDim(obj,sideFirst,useDiff){

	var objID=obj.id;
	var par=$(obj).closest('svg').attr('id');
	
	var pTUPos=objID.indexOf('_');
	var sID=objID.substring(0,pTUPos);
	var optW=eval('optW_'+sID);
	var optH=eval('optH_'+sID);
	
	var translateX=eval('translateX_'+objID);
	var translateY=eval('translateY_'+objID);
	if(typeof translateX==='undefined') translateX=0;
	if(typeof translateY==='undefined') translateY=0;

	//Store the distance.
	var distance=eval('dist'+sideFirst+'_'+objID);

	//Store the dynadim group and its contents.
	var groupID=csID+'Dynadim'+sideFirst+'Group';

	try{
		var dimGroup=document.getElementById(groupID);
		var dimText=dimGroup.querySelector('text');
		var dimLine=dimGroup.querySelector('line');
	
		//Set the default feet and inches.
		var dimFeet=parseInt(distance);
		var dimFloat=parseFloat(distance);
		var xDiff=0;
		var yDiff=0;
	
		//Store the constrained feet, if needed.
		if((sideFirst==='L'||sideFirst==='R')&&incrementX>0){
			//If the x-axis is constrained to increments, use that constraint.
			var xInc=round(distance/incrementX,0)*incrementX;
			var dimFeet=parseInt(xInc);
			var dimFloat=parseFloat(xInc);
			var xDiff=xInc-distance;
		}else if((sideFirst==='T'||sideFirst==='B')&&incrementY>0){
			//If the y-axis is constrained to increments, use that constraint.
			var yInc=round(distance/incrementY,0)*incrementY;
			var dimFeet=parseInt(yInc);
			var dimFloat=parseFloat(yInc);
			var yDiff=yInc-distance;
		}
	
		//Store the number of inches.
		var dimDec=dimFloat-dimFeet;
		var dimInches=round(48*dimDec,0)/4;
	
		//If the inches round to ≥12, convert them to feet and inches.
		var dimFeet=dimFeet+Math.floor(dimInches/12);
		var dimInches=dimInches%12;
	
		//Display the distance in feet and inches.
		var dimDisplay=dimFeet+'&prime;'+dimInches+'&Prime;';
		dimText.innerHTML=dimDisplay;
	
		$(dimText).attr('display','auto');
		if($(dimText).attr('hasClick')!=='true'){
			$(dimText).attr('hasClick',true);
			$(dimText).click(function(){ editDim(dimText) });
		}
		
		//The distance should be displayed at the half point of the line.
		var midX=translateX+(optW/2);
		var midY=translateY+(optH/2);
		if(useDiff!==true){
			//If we don’t need to use the difference, do nothing.
		}else if(sideFirst==='L'||sideFirst==='R'){
			//Otherwise, if the current side is horizontal, use the x diff.
			var distance=distance+xDiff;
		}else if(sideFirst==='T'||sideFirst==='B'){
			//Otherwise, if the current side is vertical, use the y diff.
			var distance=distance+yDiff;
		}
		var halfDist=distance/2;
	
		//Show the dimension by default.
		$(dimGroup).attr('display','initial');
	
		//If the dimension is less than 1, hide it.
		if(distance<1){ $(dimGroup).attr('display','none');
	
		}else switch(sideFirst){
	
			//Otherwise, set it based on the specified side.
			
			case 'L':
				$(dimText).attr('x',translateX-halfDist);
				$(dimLine).attr({'x1':translateX-distance,'x2':translateX});
				$(dimText).attr('y',midY); $(dimLine).attr('y1',midY); $(dimLine).attr('y2',midY);
	
				break;
				
			case 'R':
				$(dimText).attr('x',translateX+optW+halfDist);
				$(dimLine).attr({'x1':translateX+optW,'x2':translateX+optW+distance});
				$(dimText).attr('y',midY); $(dimLine).attr('y1',midY); $(dimLine).attr('y2',midY);
				
				break;
				
			case 'T':
				$(dimText).attr('x',midX); $(dimLine).attr('x1',midX); $(dimLine).attr('x2',midX);
				$(dimText).attr('y',translateY-halfDist);		
				$(dimLine).attr({'y1':translateY-distance,'y2':translateY});
	
				break;
				
			case 'B':
				$(dimText).attr('x',midX); $(dimLine).attr('x1',midX); $(dimLine).attr('x2',midX);
				$(dimText).attr('y',translateY+optH+halfDist);
				$(dimLine).attr({'y1':translateY+optH,'y2':translateY+optH+distance});
	
				break;
	
		}
	
		eval('optW_'+optID+'='+optW);
		eval('optH_'+optID+'='+optH);
	
		eval('translateX_'+optID+'='+translateX);
		eval('translateY_'+optID+'='+translateY);
		eval('dist'+sideFirst+'_'+optID+'='+distance);
		
	}catch(e){
		
		//If the update fails, do nothing.

	}//end try

	//If the active view has any support poles, bring them to the front.
	$('#support'+activeView).parent().append($('#support'+activeView));

}


function bothSides(obj){
	var tPos=obj.id.indexOf('Text')
	var oSide=obj.id.substring(tPos-1,tPos);

	switch(oSide){
		case 'L': var aSide='R'; break;
		case 'R': var aSide='L'; break;
		case 'T': var aSide='B'; break;
		case 'B': var aSide='T'; break;
	}

	altObj=document.getElementById(obj.id.substring(0,tPos-1)+aSide+'Text');
	
	var val=footInchToDec(obj.innerHTML,3);
	var altVal=footInchToDec(altObj.innerHTML,3);

	return[val,altVal];
}

function editDim(obj){

	//Store the location at which the dimension being edited is displayed.
	var coords=getCoords('',obj);
	var x=coords[0];
	var y=coords[1];
	var val=obj.innerHTML;
	
	translateX=$(obj).attr('translateX');
	translateY=$(obj).attr('translateY');
	translate=$(obj).attr('transform');

	//Hide the dimension’s uneditable instance.
	$(obj).css('display','none');

	//If the div containing the edit box doesn’t exist yet, create it.
	if(document.getElementById('eDiv')===null){
		var eDiv=document.createElement('div');
		eDiv.id='eDiv';
		$(eDiv).css({'left':x-56,'top':y-24,'position':'absolute','z-index':30});
		document.body.appendChild(eDiv);
	}

	//If the edit box doesn’t exist yet, create it.
	if(document.getElementById('eInput')===null){
		var eInput=document.createElement('input');
		eInput.id='eInput';
		$(eInput).attr('type','text');
		$(eInput).val(val);
		eDiv.appendChild(eInput);
	}
	
	//Either way, activate the edit box.
	$(eInput).select();
	
	if($(eInput).attr('hasFO')!=='true'){
		//If the user clicks out of the field, revert the change.
		$(eInput).attr('hasFO',true);
		$(eInput).focusout(function(){restoreDim(obj,eDiv)});
	}

	if($(eInput).attr('hasKP')!=='true'){
		$(eInput).attr('hasKP',true);
		$(eInput).keypress(function(evt){
			if(evt.which==10||evt.which==13){
				//If the user presses ⎆ (enter) or ⏎ (return), save the change. 
				saveDim(obj,eDiv);
			}else if(evt.which==27){
				//If the user presses ⎋ (escape), revert the change. 
				restoreDim(obj,eDiv);
			}
		});
	}
		
} //end editDim

function restoreDim(objToRestore,objToRemove,isSave){

	//Remove the temporary object.
	var par=objToRemove.parentElement;
	par.removeChild(objToRemove);
	$(objToRemove).remove;
	
	//Restore the permanent object.
	$(objToRestore).css('display','initial');

}

function saveDim(objToRestore,objToRemove){

	//Store the name of the object to restore.
	var restID=objToRestore.id;

	//Get the position of the word “text” and parse out the side from immediately before it.
	var tPos=restID.indexOf('Text')
	var oSide=restID.substring(tPos-1,tPos);

	//Store the value from the input field.
	var field=$('input',objToRemove)[0];
	var val=footInchToDec($(field).val());
	

	//If the relevant axis is constrained to increments, use that constraint.
	if((oSide==='L'||oSide==='R') && incrementX>0){
		var val=round(val/incrementX,0)*incrementX;
	}else if((oSide==='T'||oSide==='B') && incrementY>0){
		var val=round(val/incrementY,0)*incrementY;
	} //end if
	
	objID='#'+objToRestore.id;
	if(val !== undefined) $(objID).val(val);

	//Store the name of the actual option.
	var dynPos=restID.indexOf('Dynadim');
	var optPlID=restID.substring(0,dynPos);
	var plPos=restID.indexOf('_');
	var optID=restID.substring(0,plPos);
	var optPl=$('#'+optPlID)[0];
	var optPlPar=optPl.parentElement;

	var vals=bothSides(objToRestore);
	var oVal=parseFloat(vals[0]);
	var aVal=parseFloat(vals[1]);

	var fVal=makePrime(val);
	var dVal=footInchToDec(fVal,3);

	//Make sure the decimal value is constrained to the wall.
	var dVal=Math.max(Math.min(dVal,(oVal+aVal)),0);

	//Store the difference between the original and final values.
	var vDiff=round(dVal-oVal,10);

	//Make sure the display version includes an inch mark.
	var pPos=fVal.indexOf('\u2032');
	var dPPos=fVal.indexOf('\u2033');
	if(pPos>0 && dPPos<0 && pPos<val.length) var fVal=fVal+'\u2033';
	var aVal=aVal-vDiff;

	//Remove the temporary object and restore the permanent object.
	restoreDim(objToRestore,objToRemove,true);

	//Store the temporary value in the permanent object.
	objToRestore.innerHTML=decToFootInch(fVal,3,true);

	var pPos=objToRestore.id.indexOf('Dynadim');
	var optID=objToRestore.id.substring(0,pPos);
	var tPos=objToRestore.id.indexOf('Text');
	var dimID=objToRestore.id.substring(0,tPos);

	var gTarget=document.getElementById(optID+'Group');
	var lTarget=document.getElementById(dimID+'Line');
	var tTarget=objToRestore;

	//Update all option dimensions.

	/*If the option is attached to a side, we don’t
	  need dimensions for that side nor its opposite.*/
	var sides=[ ];
	var attachto=$(gTarget).attr('attachto');
	if(attachto.indexOf('left')+attachto.indexOf('right') >= 0) sides.push('left','right');
	if(attachto.indexOf('top')+attachto.indexOf('bottom') >=0) sides.push('top','bottom');
	for(i=0;i<sides.length;i++){
		var dim=makeOptDim(opt,sides[i]);
	}

	var tr=$(gTarget).attr('transform');
	if(tr===undefined){
		$(gTarget).attr('transform','translate(0, 0)');
		var tr=$(gTarget).attr('transform');
	}

	//Get the position of the parentheses.
	var trOPos=tr.indexOf('(');
	var trCPos=tr.indexOf(')');

	//Parse the x and y transforms from between the parentheses.
	var trDimStr=tr.substring(trOPos+1,trCPos);
	var trDims=trDimStr.split(', ');
	var trDimX=parseFloat(trDims[0]);
	var trDimY=parseFloat(trDims[1]);

	//Update the distance from each wall based on the change.
	switch(oSide){
		case 'L': var x=vDiff; var y=0; var aDist='distL_'+optID; var oDist='distR_'+optID; break;
		case 'R': var x=-vDiff; var y=0; var aDist='distR_'+optID; var oDist='distL_'+optID; break;
		case 'T': var x=0; var y=vDiff; var aDist='distT_'+optID; var oDist='distB_'+optID; break;
		case 'B': var x=0; var y=-vDiff; var aDist='distB_'+optID; var oDist='distT_'+optID; break;
	}
	eval(aDist+'+='+vDiff);
	eval(oDist+'-='+vDiff);
	
	eval('translateX_'+optID+'='+(trDimX+x));
	eval('translateY_'+optID+'='+(trDimY+y));
	$(gTarget).attr('transform','translate('+eval('translateX_'+optID)+', '+eval('translateY_'+optID)+')');
	var pTarget=gTarget.closest('svg');

	$(gTarget).trigger('mousedown');
	$(gTarget).trigger('mouseup');

} //end saveDim

<!--==========END DIMENSIONS FUNCTIONS==========//-->