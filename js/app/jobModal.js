$('.jobs-list').on('click', '.job-link', function(e){
	e.preventDefault();
	var jobId = $(this).attr('data-job');
	setTimeout(getJobData(jobId), 0);
});

$('body').on('click', '#modalEditButton', function(e){
	e.preventDefault();
	makeEditable('.jobModalField');
	var jobId = $(this).attr('data-job');
	//var saveButton = buildNode('button', {'id':'modalSaveButton', 'type':'button', 'data-job':jobId, 'class':'btn btn-primary', 'text':'Save'});
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
	makeReadOnly('.jobModalField');
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
	var jobContent = objectToJson(jobContent);
	saveJobContent(jobId, jobContent);
	removeButtonSpinner();

	$('.modal-footer').append(editButton);
	return;
});

function makeEditable(target){
	$('.jobModalField').removeAttr('readonly');
	return;
}

function makeReadOnly(target){
	$(target).attr('readonly','readonly');
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
	
		var jobModalParent = $(
			"<div/>",{
				"class": "modal fade jobModal",
				"id": "jobModal"+jobData.job_id,
				"tabindex": "-1",
				"role": "dialog",
			}
		)

		var jobModalDialog = $(
			"<div/>", {
				"class": "modal-dialog modal-lg",
				"role": "document"
			}
			)

		var jobModalContent = $(
			"<div/>",{
				"class":"modal-content"
			})

		/*___________________________________________*/

		var jobModalHeader = $(
			"<div/>",{
				"class":"modal-header"
			})

		var closeButton = $(
			"<button/>",{
				"type":"button",
				"class":"close",
				"data-dismiss":"modal"
			})

		var closeCross = $(
			"<span/>",{
				"html":"&times;"
			})

		var modalTitle = $(
			"<h4/>",{
				"class":"modal-title",
				"id":"modalTitle"+jobData.job_id+"Uneditable",
				"text":jobData.job_id+' | '+jobData.job_name 
			})

		/*___________________________________________*/

		var modalBody = $(
			"<div/>",{
				"id":"modalBody"+jobData.job_id,
				"class":"modal-body row"
			})

		var jobNameField = $(
			"<input/>", {
				"id":"jobModal"+jobData.job_id+"JobName",
				"class":"form-control jobModalField",
				"data-dbvar":"job_name"
			})

		var jobPurchaseOrderNumberField = $(
			"<input/>",{
				"id":"jobModal"+jobData.job_id+"JobPurchaseOrderNumber",
				"class":"form-control jobModalField",
				"readonly":"readonly",
				"type":"text",
				"data-dbvar":"job_purchase_order_number",
				"value":jobData.job_purchase_order_number
			})

		var jobStatusSelectBox = $(
			"<select/>",{
				"id":"jobModal"+jobData.job_id+"JobStatusSelectBox",
				"class":"form-control jobModalField",
				"data-dbvar":"job_status",
				"readonly":"readonly"
			})

		var jobDescription = $(
			"<textarea/>",{
				"id":"jobModal"+jobData.job_id+"JobDescription",
				"class":"form-control jobModalField",
				"data-dbvar":"job_description",
				"readonly":"readonly",
				"rows":"7"
			})
		jobDescription.append(jobData.job_description);

		var jobSurfaceType = $(
			"<input/>",{
				"id":"jobModal"+jobData.job_id+"JobSurfaceType",
				"class":"form-control jobModalField",
				"data-dbvar":"job_surface_type",
				"readonly":"readonly",
				"type":"text",
				"value":jobData.job_surface_type
			})

		var jobMaterial = $(
			"<input/>",{
				"id":"jobModal"+jobData.job_id+"JobMaterial",
				"class":"form-control jobModalField",
				"data-dbvar":"job_material",
				"readonly":"readonly",
				"type":"text",
				"value":jobData.job_material
			})

		var jobPrice = $(
			"<input/>",{
				"id":"jobModal"+jobData.job_id+"JobPrice",
				"class":"form-control jobModalField",
				"data-dbvar":"job_price",
				"readonly":"readonly",
				"type":"number",
				"value":jobData.job_price
			})

		var jobPaymentTerms = $(
			"<input/>",{
				"id":"jobModal"+jobData.job_id+"JobPaymentTerms",
				"class":"form-control jobModalField",
				"data-dbvar":"job_payment_terms",
				"readonly":"readonly",
				"type":"text",
				"value":jobData.job_payment_terms
			})

		var jobSiteContactName = $(
			"<input/>",{
				"id":"jobModal"+jobData.job_id+"JobSiteContactName",
				"class":"form-control jobModalField",
				"data-dbvar":"job_site_contact_name",
				"readonly":"readonly",
				"type":"text",
				"value":jobData.job_site_contact_name
			})

		var jobSiteContactNumber = $(
			"<input/>",{
				"id":"jobModal"+jobData.job_id+"JobSiteContactNumber",
				"class":"form-control jobModalField",
				"data-dbvar":"job_site_contact_number",
				"readonly":"readonly",
				"type":"number",
				"value":jobData.job_site_contact_number
			})

		/*___________________________________________*/

		var modalFooter = $(
			"<div/>",{
				"class":"modal-footer"
			})

		var modalFooterButton = $(
			"<button/>", {
				"id":"modalEditButton",
				"type":"button",
				"data-job":jobData.job_id,
				"class":"btn btn-primary",
				"text":"Edit"
			})

		closeButton.append(closeCross);
		jobModalHeader.append(closeButton);
		jobModalHeader.append(modalTitle);

		jobPurchaseOrderNumberFormGroup = getFormGroup("form-group col-sm-6");
		jobPurchaseOrderNumberFormGroup.append(getLabel("jobModal"+jobData.job_id+"JobPurchaseOrderNumber", "Purchase Order Number"));
		jobPurchaseOrderNumberFormGroup.append(jobPurchaseOrderNumberField);

		jobStatusSelectBox.append(getOptionTag("new-enquiry", "New Enquiry", jobData.job_status));
		jobStatusSelectBox.append(getOptionTag("quote-given", "Quote Given", jobData.job_status));
		jobStatusSelectBox.append(getOptionTag("current-job", "Current Job", jobData.job_status));
		jobStatusSelectBox.append(getOptionTag("awaiting-invoice", "Awaiting Invoice", jobData.job_status));
		jobStatusSelectBox.append(getOptionTag("invoice-sent", "Invoice Sent", jobData.job_status));
		jobStatusSelectBox.append(getOptionTag("invoice-paid", "Invoice Paid", jobData.job_status));
		jobStatusSelectBoxFormGroup = getFormGroup("form-group col-sm-6");
		jobStatusSelectBoxFormGroup.append(getLabel("jobModal"+jobData.job_id+"JobStatusSelectBox", "Job Status"));
		jobStatusSelectBoxFormGroup.append(jobStatusSelectBox);

		jobDescriptionFormGroup = getFormGroup();
		jobDescriptionFormGroup.append(getLabel("jobModal"+jobData.job_id+"JobDescription", "Job Description"));
		jobDescriptionFormGroup.append(jobDescription);

		jobSurfaceTypeFormGroup = getFormGroup("form-group col-sm-6");
		jobSurfaceTypeFormGroup.append(getLabel("jobModal"+jobData.job_id+"JobSurfaceType", "Surface Type"));
		jobSurfaceTypeFormGroup.append(jobSurfaceType);

		jobMaterialFormGroup = getFormGroup("form-group col-sm-6");
		jobMaterialFormGroup.append(getLabel("jobModal"+jobData.job_id+"JobMaterial", "Material"));
		jobMaterialFormGroup.append(jobMaterial);

		jobPriceFormGroup = getFormGroup("form-group col-sm-4");
		jobPriceFormGroup.append(getLabel("jobModal"+jobData.job_id+"JobPrice", "Price (£) inc VAT"));
		jobPriceFormGroup.append(jobPrice);

		jobPaymentTermsFormGroup = getFormGroup("form-group col-sm-8");
		jobPaymentTermsFormGroup.append(getLabel("jobModal"+jobData.job_id+"JobPaymentTerms", "Payment Terms"));
		jobPaymentTermsFormGroup.append(jobPaymentTerms);

		jobSiteContactNameFormGroup = getFormGroup("form-group col-sm-6");
		jobSiteContactNameFormGroup.append(getLabel("jobModal"+jobData.job_id+"JobSiteContactName", "Site Contact Name"));
		jobSiteContactNameFormGroup.append(jobSiteContactName);

		jobSiteContactNumberFormGroup = getFormGroup("form-group col-sm-6");
		jobSiteContactNumberFormGroup.append(getLabel("jobModal"+jobData.job_id+"JobSiteContactNumber", "Site Contact Number"));
		jobSiteContactNumberFormGroup.append(jobSiteContactNumber);

		modalBody.append(jobStatusSelectBoxFormGroup);
		modalBody.append(jobPurchaseOrderNumberFormGroup);
		modalBody.append(jobDescriptionFormGroup);
		modalBody.append('<div class="col-sm-12"><hr></div>');
		modalBody.append(jobSurfaceTypeFormGroup);
		modalBody.append(jobMaterialFormGroup);
		modalBody.append('<div class="col-sm-12"><hr></div>');
		modalBody.append(jobPriceFormGroup);
		modalBody.append(jobPaymentTermsFormGroup);
		modalBody.append('<div class="col-sm-12"><hr></div>');
		modalBody.append(jobSiteContactNameFormGroup);
		modalBody.append(jobSiteContactNumberFormGroup);


		modalFooter.append(modalFooterButton);

		jobModalContent.append(jobModalHeader);
		jobModalContent.append(modalBody);
		jobModalContent.append(modalFooter);
		
		jobModalDialog.append(jobModalContent);
		jobModalParent.append(jobModalDialog);
		$('body').append(jobModalParent);
		$('#jobModal'+jobData.job_id).modal();


	return;
}

/*function buildNode(tagName, attributes) {
	console.log($(
		"<"+tagName+"/>",{
			$.each(attributes, function(key,value)) {
				"key":"value",
			}
		}))
}*/

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

function getFormGroup(classes = "form-group col-sm-12") {
	return $(
		"<div/>",{
			"class":classes
		})
}

function getJobContent(){
	var contentFields = $('.jobModalField');
	var content = [];

	$.each(contentFields,function(index, node){
		content[$(node).attr('data-dbvar')] = $(node).val();
	})
	return content;
}

function objectToJson(object){
	console.log(object);
	return JSON.stringify(object);
}

function saveJobContent(jobId, jobContent){
	console.log('saving '+jobId);
	console.log(jobContent);
}