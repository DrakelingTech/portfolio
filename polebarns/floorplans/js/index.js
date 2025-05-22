
function getFontSize(fontSize) {
	return (fontSize) + "px 'Helvetica Neue Light','Helvetica Neue',Helvetica,sans-serif";
} //end getFontSize

//	vertical dimension definition
function dimV(hPos, top, bottom, text, color, fontSize) {

	if (fontSize === undefined) { var fontSize = 12 }

	ctx.save();
	ctx.translate(hPos + 2.5, (top + bottom) / 2);
	ctx.rotate(3 * Math.PI / 2);
	ctx.font = getFontSize(fontSize);
	ctx.textAlign = 'center';
	ctx.fillStyle = 'black';
	ctx.fillText(text, 0, 0);
	ctx.restore();
	ctx.beginPath();
	ctx.strokeStyle = color;
	ctx.setLineDash([]);
	ctx.lineWidth = 1;

	//	top extent
	ctx.moveTo(hPos + 10, top);
	ctx.lineTo(hPos - 10, top);
	ctx.stroke();

	//	bottom extent
	ctx.moveTo(hPos + 10, bottom);
	ctx.lineTo(hPos - 10, bottom);
	ctx.stroke();

	//	lines
	ctx.moveTo(hPos, top);
	ctx.lineTo(hPos, ((top + bottom) / 2) + 27.5);
	ctx.stroke();
	ctx.moveTo(hPos, bottom);
	ctx.lineTo(hPos, ((top + bottom) / 2) - 22.5);
	ctx.stroke();
	ctx.closePath();

}
//	end vertical dimension definition


//	horizontal dimension definition
function dimH(vPos, left, right, text, color, fontSize) {

	if (fontSize === undefined) { var fontSize = 12; }

	ctx.save();
	ctx.translate((left + right) / 2, vPos + 2.5);
	ctx.font = getFontSize(fontSize);
	ctx.textAlign = 'center';
	ctx.fillStyle = 'black';
	ctx.fillText(text, 0, 0);
	ctx.restore();
	ctx.beginPath();
	ctx.strokeStyle = color;
	ctx.lineWidth = 1;

	//	left extent
	ctx.moveTo(left, vPos + 10);
	ctx.lineTo(left, vPos - 10);
	ctx.stroke();

	//	right extent
	ctx.moveTo(right, vPos + 10);
	ctx.lineTo(right, vPos - 10);
	ctx.stroke();

	//	lines
	ctx.moveTo(left, vPos);
	var lineMin = Math.max((((left + right) / 2) - 27.5), left);
	ctx.lineTo(lineMin, vPos);
	ctx.stroke();
	ctx.moveTo(right, vPos);
	var lineMax = Math.min((((left + right) / 2) + 22.5), right);
	ctx.lineTo(lineMax, vPos);
	ctx.stroke();
	ctx.closePath();

}//	end horizontal dimension definition




//	========= BEGIN MAKEPOLE FUNCTION =========

function makePole(x, y, w, h, pNum, pVis, dim, dimXLoc, dimYLoc, dimAlign) {

	var svgNS = 'http://www.w3.org/2000/svg';

	//Create the rectangle to represent the pole.
	var pRect = document.createElementNS(svgNS, 'rect');
	pRect.id = 'pole' + pNum;
	pRect.setAttribute('x', x - (w / 2));
	pRect.setAttribute('y', y - (h / 2));
	pRect.setAttribute('width', w);
	pRect.setAttribute('height', h);
	pRect.setAttribute('class', 'pole');
	floorPlan.appendChild(pRect);

	/*Create the dot to represent the pier.
	Note: set pierDotRadius as desired.*/
	var pierDotRadius = 0.05;
	if (pVis) {
		var pCir = document.createElementNS(svgNS, 'circle');
		pCir.id = 'pier' + pNum;
		pCir.setAttribute('cx', x);
		pCir.setAttribute('cy', y);
		pCir.setAttribute('r', pierDotRadius);
		pCir.style.strokeWidth = '0.1px';
		floorPlan.appendChild(pCir);
	}

	//Create the dimension associated with this pier.
	if (dim != null) {
		var pText = document.createElementNS(svgNS, 'text');
		pText.id = 'poleDim' + pNum;
		var pTextNode = document.createTextNode(dim);
		pTextNode.id = 'poleDimText' + pNum;
		pText.setAttribute('x', dimXLoc);
		pText.setAttribute('y', dimYLoc);
		pText.setAttribute('class', 'dim');
		pText.textAlign = dimAlign;
		switch (dimAlign) {
			case ('left'):
				pText.textAnchor = 'start'
				break;
			case ('center'):
				pText.textAnchor = 'middle'
				break;
			case ('right'):
				pText.textAnchor = 'end'
				break;
		}
		pText.appendChild(pTextNode);
		floorPlan.appendChild(pText);
	}
}
// ==========END MAKEPOLE FUNCTION ==========



