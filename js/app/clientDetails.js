function initClientDetails(job_id) {
    showSpinner();
    $.ajax({
        type: 'POST',
        dataType: "json",
        url: "app/ajax_return.php",
        data: {
            function: 'getClient',
            jobId: job_id
        },
        success: function () {

        }
    });
    hideSpinner();
}