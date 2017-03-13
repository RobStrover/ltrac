var reportingTabButton = $('#reporting-tab-btn');

if(reportingTabButton.length > 0) {
    registerAddJobButton(reportingTabButton);
}

function registerAddJobButton(reportingTabButton) {
    reportingTabButton.on('click', function(e){
    	e.preventDefault();
        showSpinner();
        setTimeout(function(){
            transitionOutJobs();
            transitionInReporting();
        },0);
    });
}

function transitionOutJobs() {
	$('#jobs-layout-parent').addClass("animated zoomOutLeft");
}

function transitionInReporting() {
	$('#reporting-layout-parent').addClass("animated zoomInRight");
}
