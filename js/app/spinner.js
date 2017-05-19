function showSpinner(){
	if($('#loading-spinner').hasClass('hide')){
		$('#loading-spinner').removeClass('hide');
	}
}

function hideSpinner(){
	if($('#loading-spinner').hasClass('hide')){
		
	} else {
		$('#loading-spinner').addClass('hide');
	}
}

function addButtonSpinner(){
	var spinner = $(
		"<img/>",{
			"src":"ui/img/spinner.gif",
			"id":"button-loading-spinner"
		});
	$('.modal-footer').append(spinner);
}

function removeButtonSpinner(){
$('#button-loading-spinner').remove();
}

function addInfiniteListSpinner(listParentId) {
	var listParent = $(listParentId);

	console.log(listParent);
}