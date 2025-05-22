

ids=[#ids];

//If a folder is clicked, expand it.
$(function() {
	$('.title').click(function() {
		$(this).toggleClass('active').next().children('.content').toggleClass('show');
	});
});

//If an input is clicked, store its ID.
$(function() {
	$('input').click(function() {
		setSelectionList($(this).attr('id'));
	});
});

//If an input label is clicked, store the associated ID.
$(function() {
	$('label').click(function() {
		var id='#'+$(this).attr('for');
		$(id).prop('checked',!$(id).prop('checked')).change();
	});
});

function setSelectionList(id) {

	//Store the option clicked.
	var optClicked=$('#'+id)[0];

	if(ids.indexOf(id)>-1){
		//If the selected option was already selected, deselect it.
		$(optClicked).prop('checked',false);
		var ocID='-'+id;
		var aID=id;

	}else{
		//Otherwise, select it.
		$(optClicked).prop('checked',true);
		var ocID=id;
		var aID='-'+id;

	}

	if($('#'+id).attr('type')==='radio'){

		//If we’re dealing with a radio group, remove each deselected item from the FileMaker variable.
		
		//First, identify each input in the radio group.
		var theName=$('#'+id).attr('name');
		var inputs=$('input[name="'+theName+'"]');

		//Then check each input in the radio group against the existing id list.
		for(var i=0; i<(inputs.length); i++){
			var dID=inputs[i].id;
			var pos=ids.indexOf(dID);

			//If the ID was previously selected in the list, deselect it.
			if(pos>-1) ids[pos]='-'+dID;		
			
		} //end for

	}else{

		//If we’re dealing with checkboxes, check for deselect options.
		var deselect=$('#'+id).attr('deselect');
		
		//If there are checkboxes that need to be deselected, do so.
		if(deselect!=undefined){
			
			//Get the deselect ids as an array.
			var deselect=deselect.split(',');

			//Deselect each of them. 
			for(var i=0; i<deselect.length; i++){
				$('#'+deselect[i]).prop('checked',false);
				
				//Then update the id list to reflect their deselection.
				for(var j=0; j<ids.length; j++){
					if(ids[j]===deselect[i]){
						ids[j]='-'+deselect[i];
					}
				} //end for j

			} //end for i
			
		} //end if 2

	} //end if 1
	
	//Toggle the selected ID in the list.
	var pos=ids.indexOf(aID);
	if(pos>-1) ids[pos]=ocID;
			
	//Find the farthest wrapper div.
	var topAnc=$(optClicked).parents('div.wrapper').last();
	var topAncID=$(topAnc)[0].id.replace('w','');

	//Store the top ancestor’s child sections as an array.
	var ocAnc=$('div.sub',topAnc);

	var ocArray=[topAncID];
	for(i=0;i<ocAnc.length;i++){
		ocArray.push($(ocAnc[i])[0].id);
	}

	//Process each section.
	for(var i=0; i<ocArray.length; i++){
		
		//Store the section’s ID and required count, if any.
		var opt=$('#'+ocArray[i]);
		var optID=$(opt).attr('id');
		var rCount=parseInt($('#'+optID+'s').attr('req'));

		//Parse the parenthetical values.
		var optText=$(opt).html();
		var optSpanEnd=optText.indexOf('</span');
		var optTextBegin=optText.substring(0,optSpanEnd-1);
		var optSpanBegin=optTextBegin.lastIndexOf('>')+1;

		var optSpanPre=optText.substring(0,optSpanBegin);
		var osPreLength=optSpanPre.length;

		var optSpan=optText.substring(osPreLength,optSpanEnd);
		var optSpanPost=optText.substring(optSpanEnd,optText.length);
		var sPos=optSpan.indexOf('/');

		//Count the number of checked boxes associated with the section.
		cCount=0;
		$('input',topAnc).each(function(){
			var cAnc=$(this).attr('ancestors');
			var cArray=eval(cAnc);
			var cChecked=$(this).prop('checked');
			cCount=cCount+( cArray.indexOf(optID)>-1 && cChecked );
		});

		//Update the parsed values with the new checked count.
		$(opt).html(optSpanPre+'('+cCount+optSpan.substring(sPos,optSpan.length)+optSpanPost);

		if(cCount>0){
			//If the resulting checked count is greater than zero, make it black.
			var theColor='black';
		}else{
			//Otherwise, make it gray.
			var theColor='gray';
		}
		$('#'+ocArray[i]+'s').css('color',theColor);

		if(rCount>0 && cCount>=rCount){
			//If the resulting checked count fulfills the required quantity, display the checkbox.
			$('#'+optID+'cb').addClass('display');
		}else{
			//Otherwise, remove it.
			$('#'+optID+'cb').removeClass('display');
		}
	}

	//If the selected object still needs to be added to the array, do so.
	if(ids.indexOf(ocID)<0) ids.push(ocID);

	//Update the FileMaker variable appropriately.
	document.location.href='fmp://$/#filename?script=storerequired&param='+required+','+reqChecked+','+ids;

} //end setSelectionList