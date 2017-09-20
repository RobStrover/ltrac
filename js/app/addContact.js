var addContactButton = $('#add-client-btn');

if(addContactButton.length > 0) {
    registerAddContactButton(addContactButton);
}

function registerAddContactButton(addContactButton) {
    addContactButton.on('click', function(e){
        console.log('clicked ')
        e.preventDefault();
        showSpinner();
        setTimeout(function(){
            registerNewClient();
        },0);


    });
}

function registerNewClient() {
    showSpinner();
    $.ajax({
        type: 'POST',
        dataType: "json",
        url: "app/ajax_return.php",
        data: {
            function: 'addContact'
        },
        success: function (response) {
            processAddContactResponse(response);
        }
    });
    hideSpinner();
}

function processAddContactResponse(singleResponse) {

    var responseContactDetails = singleResponse.contactDetails[0];
    var contactId = responseContactDetails.contact_id;

        // if(singleResponse[0].contact_id == 0){
        //     removeContact(contact_id);
        //     return;
        // }

        hideSpinner();
        // removeContactModals();
        buildContactModal(contactId);

    setTimeout(initInfiniteList('clients-search'), 0);
}