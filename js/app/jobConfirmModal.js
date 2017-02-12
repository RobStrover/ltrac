
function buildJobConfirmModal(operation, job_id, message) {

    if(!operation || !job_id) {
        return;
    }

    message = message || "Are you sure?";

    var buttonType;
    var buttonText;
    var buttonIcon;

    switch(operation) {
        case 'delete':
            buttonType = 'danger';
            buttonText = 'Delete';
            buttonIcon = 'glyphicon-trash';
            break;
        default:
            buttonType = 'primary';
            buttonText = 'Confirm';
            buttonIcon = 'glyphicon-ok';
    };

    var confirmModalParent = getTag("<div/>",{
        "id":job_id+"-"+operation+"-"+"confirm-modal",
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
        "id":job_id+"-"+operation+"-"+"cancel-btn",
        "class":"btn btn-default",
        "text":"Cancel"
    });

    var confirmModalConfirmButtonParent = getTag("<div/>",{
        "id":job_id+"-"+operation+"-"+"confirm-btn",
        "class":"col-xs-6 text-center"
    });

    var confirmModalConfirmButton = getTag("<button/>",{
        "class":"btn btn-"+buttonType,
        "text":buttonText + " "
    });

    var confirmModalConfirmButtonIcon = getTag("<span/>",{
        "class":"glyphicon "+buttonIcon,
        "aria-hidden":"true"
    });

    confirmModalBody.append(confirmModalRow);
    confirmModalRow.append(confirmModalMessageParent);
    confirmModalMessageParent.append(confirmModalMessage);
    confirmModalRow.append(confirmModalCancelButtonParent);
    confirmModalCancelButtonParent.append(confirmModalCancelButton);
    confirmModalRow.append(confirmModalConfirmButtonParent);
    confirmModalConfirmButtonParent.append(confirmModalConfirmButton);
    confirmModalConfirmButton.append(confirmModalConfirmButtonIcon);

    $('body').append(confirmModalParent);

    $("#"+job_id+"-"+operation+"-"+"confirm-modal").modal({
        keyboard: 'true'
    });


}

