
function buildJobConfirmModal(operation, job_id, title, message) {

    if(!operation || !job_id) {
        return;
    }

    title = title || "Message";

    message = message || "Are you sure?";

    var buttonType;
    var buttonText;
    var buttonIcon;
    var titleIcon;

    switch(operation) {
        case "archive":
            buttonType = 'warning';
            buttonText = 'Confirm';
            buttonIcon = 'glyphicon-folder-open';
            titleIcon = 'glyphicon-folder-open';
            break;
        case 'delete':
            buttonType = 'danger';
            buttonText = 'Delete';
            buttonIcon = 'glyphicon-trash';
            titleIcon = 'glyphicon-warning-sign';
            break;
        default:
            buttonType = 'primary';
            buttonText = 'Confirm';
            buttonIcon = 'glyphicon-ok';
            titleIcon = 'glyphicon-envelope';
    }

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
        "class":"modal-body"
    });

    /*___________________________________________*/

    confirmModalParent.append(confirmModalDialog);
    confirmModalDialog.append(confirmModalContent);
    confirmModalContent.append(confirmModalBody);

    var confirmModalRow = getTag("<div/>",{
       "class":"row"
    });

    var confirmModalTitleParent = getTag("<div/>",{
        "class":"col-xs-12"
    });

    var confirmModalTitle = getTag("<p/>",{
        "class":"lead text-center",
        "text":' '+title
    });

    var confirmModalTitleIcon = getTag("<span/>",{
        "class":"glyphicon "+titleIcon,
        "aria-hidden":"true"
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
        "class":"col-xs-6 text-center"
    });

    var confirmModalConfirmButton = getTag("<button/>",{
        "id":job_id+"-"+operation+"-"+"confirm-btn",
        "data-jobid":job_id,
        "class":"btn btn-"+buttonType,
        "text":buttonText + " "
    });

    var confirmModalConfirmButtonIcon = getTag("<span/>",{
        "class":"glyphicon "+buttonIcon,
        "aria-hidden":"true"
    });

    confirmModalBody.append(confirmModalRow);
    confirmModalTitle.prepend(confirmModalTitleIcon);
    confirmModalTitleParent.append(confirmModalTitle);
    confirmModalRow.append(confirmModalTitleParent);
    confirmModalRow.append(confirmModalMessageParent);
    confirmModalMessageParent.append(confirmModalMessage);
    confirmModalRow.append(confirmModalCancelButtonParent);
    confirmModalCancelButtonParent.append(confirmModalCancelButton);
    confirmModalRow.append(confirmModalConfirmButtonParent);
    confirmModalConfirmButtonParent.append(confirmModalConfirmButton);
    confirmModalConfirmButton.append(confirmModalConfirmButtonIcon);

    $('body').append(confirmModalParent);



    confirmModalParent.modal({
        keyboard: 'true'
    });

    confirmModalParent.on('hidden.bs.modal', function(e) {
        confirmModalConfirmButton.unbind("click");
        confirmModalCancelButton.unbind("click");
        confirmModalParent.remove();
    });

    confirmModalConfirmButton.on("click", function() {
        job_id = $(this).data("jobid");
        switch(operation) {
            case 'archive':
                archiveJob(job_id);
                break;
            case 'delete':
                deleteJob(job_id);
                break;
            default:
                break;
        }
    });

    confirmModalCancelButton.on("click", function() {
        confirmModalParent.modal('hide');
    });

    function deleteJob(job_id){

        showSpinner();
        $.ajax({
            type: 'POST',
            dataType: "text",
            url: "app/ajax_return.php",
            data: {
                function: 'deleteJob',
                jobId: job_id
            },
            success: function () {
                confirmModalParent.modal('hide');
                $('#jobModal'+job_id).modal('hide');
                refreshCurrent();
            }
        });
        hideSpinner();
    }

    function archiveJob(job_id){

        showSpinner();
        $.ajax({
            type: 'POST',
            dataType: "text",
            url: "app/ajax_return.php",
            data: {
                function: 'archiveJob',
                jobId: job_id
            },
            success: function () {
                confirmModalParent.modal('hide');
                $('#jobModal'+job_id).modal('hide');
                refreshCurrent();
            }
        });
        hideSpinner();
    }
}

