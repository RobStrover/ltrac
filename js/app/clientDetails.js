function initClientDetails(job_id) {
    showSpinner();
    $.ajax({
        type: 'POST',
        dataType: "json",
        url: "app/ajax_return.php",
        data: {
            function: 'getSingleProprietorDetails',
            jobId: job_id
        },
        success: function () {

        }
    });
    hideSpinner();
}