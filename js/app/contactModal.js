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

function showContactModal(modalData) {

    var contactData = modalData['contact-details'][0];
    var contactTelephoneNumbers = contactData['contact_contact_numbers'];
    contactTelephoneNumbers = JSON.parse(contactTelephoneNumbers);
    var contactProrpietors = modalData['contact-proprietors'];

    console.log(contactData, contactData.contact_name, contactProrpietors);

    var contactModalParent = getTag("<div/>",{
        "class":"modal fade contactModal",
        "id":"jobModal"+contactData.contact_id,
        "tabindex":"-1",
        "role":"dialog"
    });

    var contactModalDialog = getTag("<div/>",{
        "class":"modal-dialog modal-lg",
        "role":"document"
    });

    var contactModalContent = getTag("<div/>",{
        "class":"modal-content"
    });

    /*___________________________________________*/

    var contactModalHeader = getTag("<div/>",{
        "class":"modal-header"
    });

    var closeButton = getTag("<button/>",{
        "type":"button",
        "class":"close",
        "data-dismiss":"modal"
    });

    var closeCross = getTag("<span/>",{
        "html":"&times;"
    });

    var modalTitle = getTag("<h4/>",{
        "class":"modal-title",
        "id":"modalTitle"+contactData.contact_id+"Uneditable",
        "text":contactData.contact_name
    });

    /*___________________________________________*/

    var modalBody = getTag("<div/>",{
        "id":"modalBody"+contactData.contact_id,
        "class":"modal-body row"
    });

    /*___________________________________________*/

    var modalFooter = getTag("<div/>",{
        "class":"modal-footer"
    });

    var modalFooterButton = getTag("<button/>",{
        "id":"modalEditButton",
        "type":"button",
        "data-job":contactData.contact_id,
        "class":"btn btn-primary",
        "text":"Edit"
    });

    closeButton.append(closeCross);

    contactModalHeader.append(
        closeButton,
        modalTitle
    );

    modalFooter.append(modalFooterButton);



    // Contact Name

    var contactNameFormGroup = getTag("<div/>",{
        "class":"form-group col-sm-12"
    });

    contactNameFormGroup.append(getTag("<label/>",{
        "for":"contactModal"+contactData.contact_id+"ContactName",
        "text":"Contact Name"
    }));

    contactNameFormGroup.append(getTag("<input/>",{
        "id":"contactModal"+contactData.contact_id+"ContactName",
        "class":"form-control contactModalField",
        "disabled":"disabled",
        "type":"text",
        "data-dbvar":"contact_name",
        "value":contactData.contact_name
    }));


    // Contact Telephone Numbers

    var contactTelephoneSectionParent = getTag("<div/>",{
        "class":"form-group col-sm-12"
    });


    // Contact Details Section

    var contactDetailsSectionParent = getTag("<div/>", {
       "id":"contactModal"+contactData.contact_id+"ContactDetailsSection",
        "class":"col-sm-6"
    });

    var contactDetailsSection = getTag("<div/>", {
        "class":"row"
    });

    contactDetailsSectionParent.append(
        contactDetailsSection
    );

    contactDetailsSection.append(
      contactNameFormGroup,
      contactTelephoneSectionParent
    );

    modalBody.append(contactDetailsSectionParent);

    contactModalContent.append(contactModalHeader);
    contactModalContent.append(modalBody);
    contactModalContent.append(modalFooter);

    contactModalDialog.append(contactModalContent);
    contactModalParent.append(contactModalDialog);

    $('body').append(contactModalParent);
    $('#jobModal'+contactData.contact_id).modal({
        backdrop: 'static',
        keyboard: 'true'
    }).on({
        'show.bs.modal': function (e) {
            setTimeout(initModalTelephoneNumberSection(contactTelephoneSectionParent, contactTelephoneNumbers), 0);
        },
        'hidden.bs.modal': function (e) {
            setTimeout(refreshCurrent(), 0);
        }
    });

}

function initModalTelephoneNumberSection(telephoneNumbersParent, telephoneNumbers) {
    telephoneNumbersParent = $(telephoneNumbersParent);
    console.log(telephoneNumbersParent);
}