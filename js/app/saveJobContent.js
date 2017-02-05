function saveJobContent(jobId, jobContent){
    showSpinner();
    //jobContent = objectToJson(jobContent);
    console.log(JSON.parse(jobContent));
    $.ajax({
        type: 'POST',
        dataType: "text",
        url: "app/ajax_return.php",
        data: {
            jobId: jobContent
        },
        success: function (currentResponse) {
            //processCurrent(currentResponse);
        }
    })
    hideSpinner();
}