
function buildConfirmModal(message) {

    message = message || "Are you sure?";

    var confirmModalParent = getTag("<div/>",{
        "id":"confirm-modal",
        "class":"modal fade modal",
        "tabindex":"-1",
        "role":"dialog"
    });

    var confirmModalDialog = getTag("<div/>",{
        "class":"modal-dialog modal-sm",
        "role":"document"
    });

    var confirmModalContent = getTag("<div/>",{
        "class":"modal-content"
    });

    /*___________________________________________*/

    var confirmModalBody = getTag("<div/>",{
        "class":"modal-body row"
    });

    /*___________________________________________*/

    confirmModalParent.append(confirmModalDialog);
    confirmModalDialog.append(confirmModalContent);
    confirmModalContent.append(confirmModalBody);

    var confirmModalRow = getTag("<div/>",{
       "class":"row"
    });

    var confirmModalMessageParent = getTag("<div/>",{
        "class":"col-xs-12"
    });

    var confirmModalMessage = getTag("<p/>",{
        "class":"text-center",
        "text":message
    });

    var confirmModalCancelButtonParent = getTag("<div/>",{
        "class":"col-xs-6 text-center"
    });

    var confirmModalCancelButton = getTag("<button/>",{
        "class":"btn btn-default",
        "text":"Cancel",
        "data-response":false
    });

    var confirmModalConfirmButtonParent = getTag("<div/>",{
        "class":"col-xs-6 text-center"
    });

    var confirmModalConfirmButton = getTag("<button/>",{
        "class":"btn btn-primary",
        "text":"Confirm",
        "data-response":true
    });

    confirmModalBody.append(confirmModalRow);
    confirmModalRow.append(confirmModalMessageParent);
    confirmModalMessageParent.append(confirmModalMessage);
    confirmModalRow.append(confirmModalCancelButtonParent);
    confirmModalCancelButtonParent.append(confirmModalCancelButton);
    confirmModalRow.append(confirmModalConfirmButtonParent);
    confirmModalConfirmButtonParent.append(confirmModalConfirmButton);

    $('body').append(confirmModalParent);
    $('#confirm-modal').modal({
        backdrop: 'static',
        keyboard: 'true'
    })
}

