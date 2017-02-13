function saveJobContent(jobId, jobContent){
    showSpinner();
    $.ajax({
        type: 'POST',
        dataType: "text",
        url: "app/ajax_return.php",
        data: {
            function: 'saveJob',
            jobId: jobId,
            content: jobContent
        },
        success: function (currentResponse) {
            //processCurrent(currentResponse);
        }
    });
    hideSpinner();
}

function getJobContent(){
    var contentFields = $('.jobModalField');
    var content = {};

    $.each(contentFields,function(index, node){
        content[$(node).attr('data-dbvar')] = $(node).val();
    });
    return content;
}