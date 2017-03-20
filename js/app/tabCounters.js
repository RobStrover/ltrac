function updateCounter(counter){

		var numberOfJobs = $('.'+counter+'-list').find('.'+counter+'-job').length;
		
		$('#'+counter+'-counter').text(numberOfJobs);

	}

function updateAllCounters(){
	var counters = [
		"new-enquiry",
		"quote-given",
		"current-job",
		"awaiting-invoice",
		"invoice-sent",
		"invoice-paid",
		];

		counters.forEach(function(counter){

			var numberOfJobs = $('.'+counter+'-list').find('.'+counter+'-job').length;

			$('#'+counter+'-counter').text(numberOfJobs);
			
		})
}