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

    var contactModalParent = getTag("<div/>",{
        "class":"modal fade contactModal",
        "id":"contactModal"+contactData.contact_id,
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
        "type":"text",
        "data-dbvar":"contact_name",
        "value":contactData.contact_name
    }));


    // Contact Telephone Numbers

    var contactTelephoneSectionParent = getTag("<div/>",{
        "id":"contact" + contactData.contact_id + "TelephoneNumbers",
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

    $('.contact-modal').remove();

    $('body').append(contactModalParent);

    $('#contactModal'+contactData.contact_id).modal({
        backdrop: 'static',
        keyboard: 'true'
    }).on({
        'shown.bs.modal': function (e) {
            setTimeout(initModalTelephoneNumberSection(contactTelephoneSectionParent, contactTelephoneNumbers, contactData), 0);
        },
        'hidden.bs.modal': function (e) {
            setTimeout(refreshCurrent(), 0);

        }
    });

}

function initModalTelephoneNumberSection(telephoneNumbersParent, telephoneNumbers, contactData) {

    telephoneNumbersParent = $(telephoneNumbersParent);

    telephoneNumbersParent.empty();

    var numberRow = getTag('<div/>', {
        "class":"row"
    });

    for (var label in telephoneNumbers) {
        if (telephoneNumbers.hasOwnProperty(label)) {
            var number = telephoneNumbers[label];

            var contactNumberFormGroup = getTelephoneNumberFormGroup(label, number);
            numberRow.append(
                contactNumberFormGroup
            );
        }
    }

    var addTelephoneNumberParent = getTag("<div/>",{
        "class":"col-sm-12"
    });

    var addTelephoneNumberButtonIcon = getTag("<span/>",{
        "class":"glyphicon glyphicon-plus"
    });

    var addTelephoneNumberButton = getTag("<button/>",{
            "id":"contact" + contactData.contact_id + "AddNumberBtn",
            "type":"button",
            "class":"btn btn-primary btn-block",
            "text":"Add Number "
        });

    addTelephoneNumberButton.append(addTelephoneNumberButtonIcon);
    addTelephoneNumberParent.append(addTelephoneNumberButton);
    numberRow.append(addTelephoneNumberParent);

    addTelephoneNumberButton.on('click', function(){
        console.log('boop');
    });
    /**
     * add code here for add new number button.
     */

    telephoneNumbersParent.append(numberRow);
}

function getTelephoneNumberFormGroup(label, number) {

    label = label || "";
    number = number || "";

    var contactNumberLabelFormGroup = getTag("<div/>",{
        "class":"form-group col-sm-6"
    });

    contactNumberLabelFormGroup.append(getTag("<input/>",{
        "id":"contactModalTelephoneNumberLabel",
        "class":"form-control contactNumberField",
        "type":"text",
        "value":label
    }));

    var contactNumberFormGroup = getTag("<div/>",{
        "class": "telephone-number row"
    });

    var contactNumberFormGroupInner = getTag("<div/>",{
        "class": "col-sm-12"
    });

    var contactNumberInputGroupParent = getTag("<div/>", {
        "class": "col-sm-6"
    });

    var contactNumberInputGroup = getTag("<div/>",{
        "class":"input-group"
    });

    var contactNumberInput = getTag("<input/>",{
        "type":"text",
        "class":"form-control",
        "value":number
    });

    var contactNumberInputActionParent = getTag("<span/>",{
        "class":"input-group-btn"
    });

    contactNumberInputActionParent.append(getTag("<button/>",{
        "class":"btn btn-default",
        "type": "button",
        "text": "X"
    }));

    contactNumberInputGroup.append(
        contactNumberInput,
        contactNumberInputActionParent
    );

    contactNumberInputGroupParent.append(
        contactNumberInputGroup
    );

    contactNumberFormGroupInner.append(
        contactNumberLabelFormGroup,
        contactNumberInputGroupParent
    );

    contactNumberFormGroup.append(
        contactNumberFormGroupInner
    );

    return contactNumberFormGroup;

}