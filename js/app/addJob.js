var addJobButton = $('#add-job-btn');

if(addJobButton.length > 0) {
    registerAddJobButton(addJobButton);
}

function registerAddJobButton(addJobButton) {
    e.preventDefault();
    addJobButton.on('click', function(e){
        showSpinner();
        setTimeout(function(){
            registerNewJob();
        },0);


    });
}

function registerNewJob() {
    showSpinner();
    $.ajax({
        type: 'POST',
        dataType: "json",
        url: "app/ajax_return.php",
        data: {
            function: 'addJob'
        },
        success: function (singleResponse) {
            processSingleResponse(singleResponse);
        }
    });
    hideSpinner();
}