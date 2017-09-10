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
        "id":"contactModalEditButton",
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
        "class":"form-control contact-modal-field contact-name-field",
        "type":"text",
        "disabled":"disabled",
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
            contactModalParent.remove();

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


    var addTelephoneNumberButtonIcon = getTag("<span/>",{
        "class":"glyphicon glyphicon-plus"
    });

    var addTelephoneNumberButton = getTag("<button/>",{
            "id":"contact" + contactData.contact_id + "AddNumberBtn",
            "type":"button",
            "class":"btn btn-primary btn-block add-number-button hide",
            "text":"Add Number "
        });

    telephoneNumbersParent.append(numberRow);

    addTelephoneNumberButton.append(addTelephoneNumberButtonIcon);
    telephoneNumbersParent.append(addTelephoneNumberButton);

    addTelephoneNumberButton.on('click', function(){
        var newNumber = getTelephoneNumberFormGroup();
        numberRow.append(newNumber);
        setRemoveTelephoneNumberButtonListeners(contactData.contact_id);
        setContactFieldSaveListeners(contactData.contact_id);
    });
    setRemoveTelephoneNumberButtonListeners(contactData.contact_id);
    setContactFieldSaveListeners(contactData.contact_id);
    contactModalEditButtonListener(contactData.contact_id);
}

function contactModalEditButtonListener(contact_id) {
    var contactModalEditButton = $('#contactModal'+contact_id+' #contactModalEditButton');
    contactModalEditButton.on('click', function(e){
        e.preventDefault();
        makeContactEditable(contact_id);
    });
}

function makeContactEditable(contact_id) {
    var contactFields = $('#contactModal'+contact_id+' .contact-modal-field');
    var contactDeleteButtons = $('#contactModal'+contact_id+' .remove-number-button');
    var contactAddButton = $('#contactModal'+contact_id+' .add-number-button');

    contactFields.removeAttr('disabled');
    contactDeleteButtons.removeClass('hide');
    contactAddButton.removeClass('hide');
}

function setRemoveTelephoneNumberButtonListeners(contact_id) {

    var telephoneNumberButtons = $('#contactModal'+contact_id+' .remove-number-button');
    telephoneNumberButtons.unbind('click');
    telephoneNumberButtons.on('click', function() {
        var numberButton = $(this);
        var numberToDelete = numberButton.closest('.telephone-number');
        numberToDelete.remove();
        saveContactModal(contact_id);
    });

}

function setContactFieldSaveListeners(contact_id) {

    var fields = $("#contactModal"+contact_id+" .contact-modal-field");
    fields.unbind("blur");
    fields.on("blur", function(){
        saveContactModal(contact_id);
    });
}



function getTelephoneNumberFormGroup(label, number) {

    label = label || "";
    number = number || "";

    var contactNumberLabelFormGroup = getTag("<div/>",{
        "class":"form-group col-sm-6"
    });

    contactNumberLabelFormGroup.append(getTag("<input/>",{
        "class":"form-control contact-number-label contact-modal-field",
        "type":"text",
        "disabled":"disabled",
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
        "class":"form-control contact-number contact-modal-field",
        "disabled":"disabled",
        "value":number
    });

    var contactNumberInputActionParent = getTag("<span/>",{
        "class":"input-group-btn contact-number-delete-button"
    });

    contactNumberInputActionParent.append(getTag("<button/>",{
        "class":"btn btn-default remove-number-button hide",
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

function saveContactModal(contactId) {

    showSpinner();

    var contactNameField = $("#contactModal"+contactId+" .contact-name-field");
    var contactNameValue = contactNameField.val();

    var formFieldParents = $("#contactModal"+contactId+" .telephone-number");
    var phoneNumbersToSave = {};

    formFieldParents.each(function(key) {
        var formFieldParent = $(this);
        var formFieldLabel = formFieldParent.find('.contact-number-label');
        var formField = formFieldParent.find('.contact-number');

        var formFieldLabelValue = formFieldLabel.val();
        var formFieldValue = formField.val();

        var phoneNumber = {};

        phoneNumber[formFieldLabelValue] = formFieldValue;

        phoneNumbersToSave[key] = phoneNumber;
    });

    $.ajax({
        type: 'POST',
        dataType: "text",
        url: "app/ajax_return.php",
        data: {
            function: 'saveContactDetails',
            contactId: contactId,
            contactName: contactNameValue,
            contactNumbers: phoneNumbersToSave
        },
        success: function (currentResponse) {
        }
    });

    hideSpinner();
}