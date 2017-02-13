$('.jobs-list').on('click', '.job-link', function(e){
	e.preventDefault();
	var jobId = $(this).attr('data-job');
	setTimeout(getJobData(jobId), 0);
});

$('body').on('click', '#modalEditButton', function(e){
	e.preventDefault();
	makeEditable('.jobModalField');
	var jobId = $(this).attr('data-job');
		var saveButton = $(
			"<button/>", {
				"id":"modalSaveButton",
				"type":"button",
				"data-job":jobId,
				"class":"btn btn-primary",
				"text":"Save"
			});
	removeNode('#modalEditButton');
	$('.modal-footer').append(saveButton);
	return;
});

$('body').on('click', '#modalSaveButton', function(e){
	e.preventDefault();
	makedisabled('.jobModalField');
	var jobId = $(this).attr('data-job');
	var editButton = $(
		"<button/>", {
			"id":"modalEditButton",
			"type":"button",
			"data-job":jobId,
			"class":"btn btn-primary",
			"text":"Edit"
		});
	removeNode('#modalSaveButton');
	addButtonSpinner();
	var jobContent = getJobContent(jobId);
	saveJobContent(jobId, jobContent);
	removeButtonSpinner();

	$('.modal-footer').append(editButton);
	return;
});

function makeEditable(target){
	$('.jobModalField').removeAttr('disabled');
	return;
}

function makedisabled(target){
	$(target).attr('disabled','disabled');
	return;
}

function getJobData(jobId){
	showSpinner();
	$.ajax({
		dataType: "json",
		url: "app/ajax_return.php",
		data: "data=single&jobid="+jobId,
		success: function (singleResponse) {
			processSingleResponse(singleResponse);
		}
	})
	hideSpinner();
}

function processSingleResponse(singleResponse) {

	if(singleResponse[0].job_id == 0){
	removeJob(jobId);
	return;
}

hideSpinner();
removeJobModals();
buildJobModal(singleResponse);

}

function removeJobModals(){
	if($('.jobModal').length > 0) {
		$('.jobModal').remove();
	}
	if($('.modal-backdrop').length > 0) {
		$('.modal-backdrop').remove();
	}
}

function buildJobModal(singleResponse){
	var jobData = singleResponse[0];

		var jobModalParent = getTag("<div/>",{"class":"modal fade jobModal","id":"jobModal"+jobData.job_id,"tabindex":"-1","role":"dialog"});

		var jobModalDialog = getTag("<div/>",{"class":"modal-dialog modal-lg","role":"document"});

		var jobModalContent = getTag("<div/>",{"class":"modal-content"});

		/*___________________________________________*/

		var jobModalHeader = getTag("<div/>",{"class":"modal-header"});

		var closeButton = getTag("<button/>",{"type":"button","class":"close","data-dismiss":"modal"});

		var closeCross = getTag("<span/>",{"html":"&times;"});

		var modalTitle = getTag("<h4/>",{"class":"modal-title","id":"modalTitle"+jobData.job_id+"Uneditable","text":jobData.job_id+' | '+jobData.job_name});

		/*___________________________________________*/

		var modalBody = getTag("<div/>",{"id":"modalBody"+jobData.job_id,"class":"modal-body row"});

		/*___________________________________________*/

		var modalFooter = getTag("<div/>",{"class":"modal-footer"});

		var modalFooterButton = getTag("<button/>",{"id":"modalEditButton","type":"button","data-job":jobData.job_id,"class":"btn btn-primary","text":"Edit"});

		closeButton.append(closeCross);
		jobModalHeader.append(closeButton);
		jobModalHeader.append(modalTitle);

		var jobPurchaseOrderNumberFormGroup = getTag("<div/>",{"class":"form-group col-sm-4"});
		jobPurchaseOrderNumberFormGroup.append(getTag("<label/>",{"for":"jobModal"+jobData.job_id+"JobPurchaseOrderNumber","text":"Purchase Order Number"}));
		jobPurchaseOrderNumberFormGroup.append(getTag("<input/>",{"id":"jobModal"+jobData.job_id+"JobPurchaseOrderNumber","class":"form-control jobModalField","disabled":"disabled","type":"text","data-dbvar":"job_purchase_order_number","value":jobData.job_purchase_order_number}));

		var jobStatusSelectBox = getTag("<select/>",{"id":"jobModal"+jobData.job_id+"JobStatusSelectBox","class":"form-control jobModalField","data-dbvar":"job_status","disabled":"disabled"});
		jobStatusSelectBox.append(getOptionTag("new-enquiry", "New Enquiry", jobData.job_status));
		jobStatusSelectBox.append(getOptionTag("quote-given", "Quote Given", jobData.job_status));
		jobStatusSelectBox.append(getOptionTag("current-job", "Current Job", jobData.job_status));
		jobStatusSelectBox.append(getOptionTag("awaiting-invoice", "Awaiting Invoice", jobData.job_status));
		jobStatusSelectBox.append(getOptionTag("invoice-sent", "Invoice Sent", jobData.job_status));
		jobStatusSelectBox.append(getOptionTag("invoice-paid", "Invoice Paid", jobData.job_status));

		var jobStatusSelectBoxFormGroup = getTag("<div/>",{"class":"form-group col-sm-4"}).append(getTag("<label/>",{"for":"jobModal"+jobData.job_id+"JobStatusSelectBox","text":"Job Status"}), jobStatusSelectBox);

	var jobNameField = getTag("<input/>",{"id":"jobModal"+jobData.job_id+"JobName","class":"form-control jobModalField","data-dbvar":"job_name","disabled":"disabled","value":jobData.job_name});

	var jobNameFormGroup = getTag("<div/>",{"class":"form-group col-sm-4"}).append(getTag("<label/>",{"for":"jobModal"+jobData.job_id+"jobNameField","text":"Job Name"}), jobNameField);

		var jobDescription = getTag("<textarea/>",{"id":"jobModal"+jobData.job_id+"JobDescription","class":"form-control jobModalField","data-dbvar":"job_description","disabled":"disabled","rows":"7"}).append(jobData.job_description);
		var jobDescriptionFormGroup = getTag("<div/>",{"class":"form-group col-sm-12"}).append(getTag("<label/>",{"for":"jobModal"+jobData.job_id+"JobDescription", "text":"Job Description"}), jobDescription);

		var jobSurfaceType = getTag("<input/>",{"id":"jobModal"+jobData.job_id+"JobSurfaceType","class":"form-control jobModalField","data-dbvar":"job_surface_type","disabled":"disabled","type":"text","value":jobData.job_surface_type});
		var jobSurfaceTypeFormGroup = getTag("<div/>",{"class":"form-group col-sm-6"}).append(getTag("<label/>",{"for":"jobModal"+jobData.job_id+"JobSurfaceType", "text":"Surface Type"}), jobSurfaceType);

		var jobMaterial = getTag("<input/>",{"id":"jobModal"+jobData.job_id+"JobMaterial","class":"form-control jobModalField","data-dbvar":"job_material","disabled":"disabled","type":"text","value":jobData.job_material});
		var jobMaterialFormGroup = getTag("<div/>",{"class":"form-group col-sm-6"}).append(getTag("<label/>",{"for":"jobModal"+jobData.job_id+"JobMaterial","text":"Material"}),jobMaterial);

		var jobPrice = getTag("<input/>",{"id":"jobModal"+jobData.job_id+"JobPrice","class":"form-control jobModalField","data-dbvar":"job_price","disabled":"disabled","type":"number","value":jobData.job_price});
		var jobPriceFormGroup = getTag("<div/>",{"class":"form-group col-sm-4"}).append(getTag("<label/>",{"for":"jobModal"+jobData.job_id+"JobPrice","text":"Price (£) exc VAT"}),jobPrice);

    var jobPaymentTermsNumber = getTag("<input/>",{"id":"jobModal"+jobData.job_id+"JobPaymentTermsNumber","class":"form-control jobModalField","data-dbvar":"job_payment_terms_number","disabled":"disabled","type":"number","value":jobData.job_payment_terms_number});
    var jobPaymentTermsNumberFormGroup = getTag("<div/>",{"class":"form-group col-sm-4 col-xs-6"}).append(getTag("<label/>",{"for":"jobModal"+jobData.job_id+"JobPaymentTermsNumber","text":"Payment Expected After"}),jobPaymentTermsNumber);


	var jobPaymentTermsDenomination = getTag("<select/>",{"id":"jobModal"+jobData.job_id+"JobPaymentTermsDenomination","class":"form-control jobModalField","data-dbvar":"job_payment_terms_denomination","disabled":"disabled"});
    jobPaymentTermsDenomination.append(getOptionTag("days", "Days", jobData.job_payment_terms_denomination));
    jobPaymentTermsDenomination.append(getOptionTag("months", "Months", jobData.job_payment_terms_denomination));

	var jobPaymentTermsDenominationFormGroup = getTag("<div/>",{"class":"form-group col-sm-4 col-xs-6"}).append(getTag("<label/>",{"for":"jobModal"+jobData.job_id+"JobPaymentTermsDenomination","text":"Days / Months"}), jobPaymentTermsDenomination);

		var jobSiteContactName = getTag("<input/>",{"id":"jobModal"+jobData.job_id+"JobSiteContactName","class":"form-control jobModalField","data-dbvar":"job_site_contact_name","disabled":"disabled","type":"text","value":jobData.job_site_contact_name});
		var jobSiteContactNameFormGroup = getTag("<div/>",{"class":"form-group col-sm-6"}).append(getTag("<label/>",{"for":"jobModal"+jobData.job_id+"JobSiteContactName","text":"Site Contact Name"}),jobSiteContactName);

		var jobsiteContactNumber = getTag("<input/>",{"id":"jobModal"+jobData.job_id+"JobSiteContactNumber","class":"form-control jobModalField","data-dbvar":"job_site_contact_number","disabled":"disabled","type":"number","value":jobData.job_site_contact_number});
		var jobSiteContactNumberFormGroup = getTag("<div/>",{"class":"form-group col-sm-6"}).append(getTag("<label/>",{'for':"jobModal"+jobData.job_id+"JobSiteContactNumber","text":"Site Contact Number"}),jobsiteContactNumber);

		var jobSiteAddressLine1 = getTag("<input/>",{"id":"jobModal"+jobData.job_id+"JobSiteAddressLine1", "class":"form-control jobModalField", "data-dbvar":"job_site_address_line_1", "disabled":"disabled", "type":"text", "value":jobData.job_site_address_line_1});
    	var jobSiteAddressLine1FormGroup = getTag("<div/>",{"class":"form-group col-sm-12"}).append(getTag("<label/>",{'for':"jobModal"+jobData.job_id+"JobSiteAddressLine1","text":"Site Address Line 1"}),jobSiteAddressLine1);

   		var jobSiteAddressLine2 = getTag("<input/>",{"id":"jobModal"+jobData.job_id+"JobSiteAddressLine2", "class":"form-control jobModalField", "data-dbvar":"job_site_address_line_2", "disabled":"disabled", "type":"text", "value":jobData.job_site_address_line_2});
   		var jobSiteAddressLine2FormGroup = getTag("<div/>",{"class":"form-group col-sm-12"}).append(getTag("<label/>",{'for':"jobModal"+jobData.job_id+"JobSiteAddressLine2","text":"Site Address Line 2"}),jobSiteAddressLine2);

   		var jobSiteAddressTown = getTag("<input/>", {"id":"jobModal"+jobData.job_id+"JobSiteAddressTown", "class":"form-control jobModalField", "data-dbvar":"job_site_address_town", "disabled":"disabled", "type":"text", "value":jobData.job_site_address_town});
   		var jobSiteAddressTownFormGroup = getTag("<div/>", {"class":"form-group col-sm-6"}).append(getTag("<label/>",{'for':"jobModal"+jobData.job_id+"JobSiteAddressTown","text":"Site Address Town"}),jobSiteAddressTown);

   		var jobSiteAddressCity = getTag("<input/>",{"id":"jobModal"+jobData.job_id+"JobSiteAddressCity", "class":"form-control jobModalField", "data-dbvar":"job_site_address_city", "disabled":"disabled", "type":"text", "value":jobData.job_site_address_city});
   		var jobSiteAddressCityFormGroup = getTag("<div/>",{"class":"form-group col-sm-6"}).append(getTag("<label/>",{"for":"jobModal"+jobData.job_id+"JobSiteAddressCity","text":"Site Address City"}),jobSiteAddressCity);

        var jobSiteAddressPostcode = getTag("<input/>",{"id":"jobModal"+jobData.job_id+"JobSitePostcode", "class":"form-control jobModalField", "data-dbvar":"job_site_address_postcode", "disabled":"disabled", "type":"text", "value":jobData.job_site_address_postcode});
        var jobSiteAddressPostcodeFormGroup = getTag("<div/>",{"class":"form-group col-sm-6"}).append(getTag("<label/>",{"for":"jobModal"+jobData.job_id+"JobSiteAddressPostcode","text":"Site Address Postcode"}),jobSiteAddressPostcode);

	var jobModalDeleteButton = getTag("<button/>",{
		"id":"jobModal"+jobData.job_id+"DeleteJobButton",
		"data-jobid":jobData.job_id,
		"class":"btn btn-danger",
		"text":"Delete Job "
	});

	jobModalDeleteButton.on("click", function(e){
		var jobToDelete = jobModalDeleteButton.data("jobid");
		buildJobConfirmModal("delete", jobToDelete, "WARNING", "Are you sure you want to delete this job? This cannot be undone.");
	});

	var confirmModalConfirmButtonIcon = getTag("<span/>",{
		"class":"glyphicon glyphicon-trash",
		"aria-hidden":"true"
	});

	var jobModalDeleteButtonFormGroup = getTag("<div/>",{
		"class":"col-xs-6"
	}).append(
		jobModalDeleteButton.append(
			confirmModalConfirmButtonIcon
		)
	);

		jobModalTabButtons = getTag("<ul/>",{"class":"nav nav-tabs","role":"tablist"});
		jobModalTabButtonBasicInfo = getTag("<li/>",{"role":"presentation","class":"active"}).append(getTag("<a/>",{"href":"#basic-info","aria-controls":"Basic Info","role":"tab","data-toggle":"tab","text":"Basic Info"}));
		jobModalTabButtonSiteInfo = getTag("<li/>",{"role":"presentation"}).append(getTag("<a/>",{"href":"#site-details","aria-controls":"Site Details","role":"tab","data-toggle":"tab","text":"Site Details"}));
		jobModalTabButtonClientInfo = getTag("<li/>",{"role":"presentation"}).append(getTag("<a/>",{"href":"#client-details","aria-controls":"Client Details","role":"tab","data-toggle":"tab","text":"Client Details"}));
		jobModalTabButtonFiles = getTag("<li/>",{"role":"presentation"}).append(getTag("<a/>",{"href":"#files","aria-controls":"Files","role":"tab","data-toggle":"tab","text":"Files"}));
		jobModalTabButtonMap = getTag("<li/>",{"role":"presentation"}).append(getTag("<a/>",{"href":"#map","aria-controls":"Map","role":"tab","data-toggle":"tab","text":"Map"}));
		jobModalTabButtonActions = getTag("<li/>",{"role":"presentation"}).append(getTag("<a/>",{"href":"#actions","aria-controls":"Actions","role":"tab","data-toggle":"tab","text":"Actions"}));
		jobModalTabButtons.append(jobModalTabButtonBasicInfo, jobModalTabButtonSiteInfo, jobModalTabButtonClientInfo, jobModalTabButtonFiles, jobModalTabButtonMap, jobModalTabButtonActions);

		jobModalTabPanelBasicInfo = getTag("<div/>",{"role":"tabpanel","class":"tab-pane active","id":"basic-info"});
		jobModalTabPanelSiteInfo = getTag("<div/>",{"role":"tabpanel","class":"tab-pane","id":"site-details"});
		jobModalTabPanelClientInfo = getTag("<div/>",{"role":"tabpanel","class":"tab-pane","id":"client-details"});
		jobModalTabPanelFiles = getTag("<div/>",{"role":"tabpanel","class":"tab-pane","id":"files"});
		jobModalTabPanelMap = getTag("<div/>",{"role":"tabpanel","class":"tab-pane","id":"map"});
		jobModalTabPanelActions = getTag("<div/>",{"role":"tabpanel","class":"tab-pane","id":"actions"});

		jobModalTabPanels = getTag("<div/>",{"class":"tab-content"}).append(
			jobModalTabPanelBasicInfo,
			jobModalTabPanelSiteInfo,
			jobModalTabPanelClientInfo,
			jobModalTabPanelFiles,
			jobModalTabPanelMap,
			jobModalTabPanelActions
			);

		jobModalTabPanelBasicInfo.append(
			jobStatusSelectBoxFormGroup,
			jobNameFormGroup,
			jobPurchaseOrderNumberFormGroup,
			'<div class="col-sm-12"><hr></div>',
			jobDescriptionFormGroup,
			jobPriceFormGroup,
            jobPaymentTermsNumberFormGroup,
            jobPaymentTermsDenominationFormGroup
			);

		jobModalTabPanelSiteInfo.append(
			jobSurfaceTypeFormGroup,
			jobMaterialFormGroup,
			jobSiteContactNameFormGroup,
			jobSiteContactNumberFormGroup,
            jobSiteAddressLine1FormGroup,
            jobSiteAddressLine2FormGroup,
            jobSiteAddressTownFormGroup,
            jobSiteAddressCityFormGroup,
            jobSiteAddressPostcodeFormGroup
			);

		if(undefined != jobData.job_site_address_postcode && "" != jobData.job_site_address_postcode){
			var jobMapParentDesktop = getTag("<div/>",{"class":"embed-responsive embed-responsive-16by9 hidden-xs"});
			var jobMapParentMobile = getTag("<div/>",{"class":"embed-responsive embed-responsive-4by3 visible-xs"});
			var jobMap = '<iframe class="embed-responsive-item" src="https://www.google.com/maps/embed/v1/directions' +
				'?key=AIzaSyDPG-Rdgs-Os3F3QMLU418uNObFMi38cy0' +
				'&origin=SS170NH' +
				'&destination=' + jobData.job_site_address_postcode +
				'"></iframe>';
			// &avoid=tolls|highways.
			jobModalTabPanelMap.append(jobMapParentDesktop.append(jobMap), jobMapParentMobile.append(jobMap));
		} else {
			jobModalTabPanelMap.append(getTag("<p/>",{"class":"text-center","text":"Add a site address postcode to see directions."}));
		}

		jobModalTabPanelActions.append(
			jobModalDeleteButtonFormGroup
		);


		modalBody.append(jobModalTabButtons, jobModalTabPanels);

		modalFooter.append(modalFooterButton);

		jobModalContent.append(jobModalHeader);
		jobModalContent.append(modalBody);
		jobModalContent.append(modalFooter);
		
		jobModalDialog.append(jobModalContent);
		jobModalParent.append(jobModalDialog);
		$('body').append(jobModalParent);
		$('#jobModal'+jobData.job_id).modal({
			backdrop: 'static',
			keyboard: 'true'
		})
        .on('hidden.bs.modal', function (e) {
            setTimeout(refreshCurrent(), 0);
        });
}

function removeNode(target){
	$(target).remove();
}

function getOptionTag(value, label, selected) {
	var optionTag = $(
		"<option/>",{
			"value":value,
			"text":label
		});
	if(value == selected) {
		optionTag.attr('selected','selected');
	}
	return optionTag;
}

function getLabel(target, label) {
	return $(
		"<label/>",{
			"for":target,
			"text":label
		})
}

function getTag(type, attributes) {
	return $(
		type,
			attributes
		)
}