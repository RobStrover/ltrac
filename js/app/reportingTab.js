function initReportingButtons() {
    var reportingButtons = $('a.download-report-button');

    reportingButtons.on("click", function(e){
        e.preventDefault();
        var button = $(this);
        if(button.attr('data-report').length > 0) {
            requestAjaxReport(button.attr('data-report'), button);
        }
    });
}


function requestAjaxReport(reportType, button) {
    // button.addClass('disabled');
    // var originalText = button.text();
    window.open(
        "app/ajax_return.php?data=report&type="+reportType
    );
}

setTimeout(function(){
    initReportingButtons();
},0);