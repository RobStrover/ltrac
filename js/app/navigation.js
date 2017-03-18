var reportingTabButton = $('#reporting-tab-btn');

if(reportingTabButton.length > 0) {
    registerReportingButton(reportingTabButton);
}


var mainNavigationItems = [
    "jobs",
    "reporting"
];

mainNavigationItems.forEach(function(navigationItem){
    var navigationItemButton = $('#' + navigationItem + '-tab-btn');
    if(navigationItemButton.length > 0) {
        navigationItemButton.on('click', function(e){

        })
    }
});


function registerReportingButton(reportingTabButton) {
    reportingTabButton.on('click', function(e){
    	e.preventDefault();
        showSpinner();
        setTimeout(function(){

        },0);
    });
}
