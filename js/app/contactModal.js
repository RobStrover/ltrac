function buildContactModal(contactId) {

    showSpinner();
    $.ajax({
        type: 'POST',
        dataType: "json",
        url: "app/ajax_return.php",
        data: {
            function: 'getSingleContactDetails',
            contactId: contactId
        },
        success: function (singleResponse) {
            processSingleClientResponse(singleResponse);
        }
    });
    hideSpinner();

}


function processSingleClientResponse(singleResponse) {

    setTimeout(showContactModal(singleResponse), 0);

}

function showContactModal(contactData) {

    console.log(contactData);

}