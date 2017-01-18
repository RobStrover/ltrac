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
	console.log(jobData);
	
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

		var jobNameField = getTag("<input/>",{"id":"jobModal"+jobData.job_id+"JobName","class":"form-control jobModalField","data-dbvar":"job_name"});

		/*___________________________________________*/

		var modalFooter = getTag("<div/>",{"class":"modal-footer"});

		var modalFooterButton = getTag("<button/>",{"id":"modalEditButton","type":"button","data-job":jobData.job_id,"class":"btn btn-primary","text":"Edit"});

		closeButton.append(closeCross);
		jobModalHeader.append(closeButton);
		jobModalHeader.append(modalTitle);

		var jobPurchaseOrderNumberFormGroup = getTag("<div/>",{"class":"form-group col-sm-6"});
		jobPurchaseOrderNumberFormGroup.append(getTag("<label/>",{"for":"jobModal"+jobData.job_id+"JobPurchaseOrderNumber","text":"Purchase Order Number"}));
		jobPurchaseOrderNumberFormGroup.append(getTag("<input/>",{"id":"jobModal"+jobData.job_id+"JobPurchaseOrderNumber","class":"form-control jobModalField","readonly":"readonly","type":"text","data-dbvar":"job_purchase_order_number","value":jobData.job_purchase_order_number}));

		var jobStatusSelectBox = getTag("<select/>",{"id":"jobModal"+jobData.job_id+"JobStatusSelectBox","class":"form-control jobModalField","data-dbvar":"job_status","readonly":"readonly"});
		jobStatusSelectBox.append(getOptionTag("new-enquiry", "New Enquiry", jobData.job_status));
		jobStatusSelectBox.append(getOptionTag("quote-given", "Quote Given", jobData.job_status));
		jobStatusSelectBox.append(getOptionTag("current-job", "Current Job", jobData.job_status));
		jobStatusSelectBox.append(getOptionTag("awaiting-invoice", "Awaiting Invoice", jobData.job_status));
		jobStatusSelectBox.append(getOptionTag("invoice-sent", "Invoice Sent", jobData.job_status));
		jobStatusSelectBox.append(getOptionTag("invoice-paid", "Invoice Paid", jobData.job_status));

		jobStatusSelectBoxFormGroup = getTag("<div/>",{"class":"form-group col-sm-6"}).append(getTag("<label/>",{"for":"jobModal"+jobData.job_id+"JobStatusSelectBox","text":"Job Status"}), jobStatusSelectBox);

		var jobDescription = getTag("<textarea/>",{"id":"jobModal"+jobData.job_id+"JobDescription","class":"form-control jobModalField","data-dbvar":"job_description","readonly":"readonly","rows":"7"}).append(jobData.job_description);
		jobDescriptionFormGroup = getTag("<div/>",{"class":"form-group col-sm-12"}).append(getTag("<label/>",{"for":"jobModal"+jobData.job_id+"JobDescription", "text":"Job Description"}), jobDescription);

		var jobSurfaceType = getTag("<input/>",{"id":"jobModal"+jobData.job_id+"JobSurfaceType","class":"form-control jobModalField","data-dbvar":"job_surface_type","readonly":"readonly","type":"text","value":jobData.job_surface_type});
		jobSurfaceTypeFormGroup = getTag("<div/>",{"class":"form-group col-sm-6"}).append(getTag("<label/>",{"for":"jobModal"+jobData.job_id+"JobSurfaceType", "text":"Surface Type"}), jobSurfaceType);

		var jobMaterial = getTag("<input/>",{"id":"jobModal"+jobData.job_id+"JobMaterial","class":"form-control jobModalField","data-dbvar":"job_material","readonly":"readonly","type":"text","value":jobData.job_material});
		jobMaterialFormGroup = getTag("<div/>",{"class":"form-group col-sm-6"}).append(getTag("<label/>",{"for":"jobModal"+jobData.job_id+"JobMaterial","text":"Material"}),jobMaterial);

		var jobPrice = getTag("<input/>",{"id":"jobModal"+jobData.job_id+"JobPrice","class":"form-control jobModalField","data-dbvar":"job_price","readonly":"readonly","type":"number","value":jobData.job_price});
		jobPriceFormGroup = getTag("<div/>",{"class":"form-group col-sm-4"}).append(getTag("<label/>",{"for":"jobModal"+jobData.job_id+"JobPrice","text":"Price (£) inc VAT"}),jobPrice);

		var jobPaymentTerms = getTag("<input/>",{"id":"jobModal"+jobData.job_id+"JobPaymentTerms","class":"form-control jobModalField","data-dbvar":"job_payment_terms","readonly":"readonly","type":"text","value":jobData.job_payment_terms});
		jobPaymentTermsFormGroup = getTag("<div/>",{"class":"form-group col-sm-8"}).append(getTag("<label/>",{"for":"jobModal"+jobData.job_id+"JobPaymentTerms","text":"Payment Terms"}),jobPaymentTerms);

		var jobSiteContactName = getTag("<input/>",{"id":"jobModal"+jobData.job_id+"JobSiteContactName","class":"form-control jobModalField","data-dbvar":"job_site_contact_name","readonly":"readonly","type":"text","value":jobData.job_site_contact_name});
		jobSiteContactNameFormGroup = getTag("<div/>",{"class":"form-group col-sm-6"}).append(getTag("<label/>",{"for":"jobModal"+jobData.job_id+"JobSiteContactName","text":"Site Contact Name"}),jobSiteContactName);

		var jobsiteContactNumber = getTag("<input/>",{"id":"jobModal"+jobData.job_id+"JobSiteContactNumber","class":"form-control jobModalField","data-dbvar":"job_site_contact_number","readonly":"readonly","type":"number","value":jobData.job_site_contact_number});
		jobSiteContactNumberFormGroup = getTag("<div/>",{"class":"form-group col-sm-6"}).append(getTag("<label/>",{'for':"jobModal"+jobData.job_id+"JobSiteContactNumber","text":"Site Contact Number"}),jobsiteContactNumber);

		jobModalTabButtons = getTag("<ul/>",{"class":"nav nav-tabs","role":"tablist"});
		jobModalTabButtonBasicInfo = getTag("<li/>",{"role":"presentation","class":"active"}).append(getTag("<a/>",{"href":"#basic-info","aria-controls":"Basic Info","role":"tab","data-toggle":"tab","text":"Basic Info"}));
		jobModalTabButtonSiteInfo = getTag("<li/>",{"role":"presentation"}).append(getTag("<a/>",{"href":"#site-details","aria-controls":"Site Details","role":"tab","data-toggle":"tab","text":"Site Details"}));
		jobModalTabButtonClientInfo = getTag("<li/>",{"role":"presentation"}).append(getTag("<a/>",{"href":"#client-details","aria-controls":"Client Details","role":"tab","data-toggle":"tab","text":"Client Details"}));
		jobModalTabButtonFiles = getTag("<li/>",{"role":"presentation"}).append(getTag("<a/>",{"href":"#files","aria-controls":"Files","role":"tab","data-toggle":"tab","text":"Files"}));
		jobModalTabButtonMap = getTag("<li/>",{"role":"presentation"}).append(getTag("<a/>",{"href":"#map","aria-controls":"Map","role":"tab","data-toggle":"tab","text":"Map"}));
		jobModalTabButtons.append(jobModalTabButtonBasicInfo, jobModalTabButtonSiteInfo, jobModalTabButtonClientInfo, jobModalTabButtonFiles, jobModalTabButtonMap);

		jobModalTabPanelBasicInfo = getTag("<div/>",{"role":"tabpanel","class":"tab-pane active","id":"basic-info"});
		jobModalTabPanelSiteInfo = getTag("<div/>",{"role":"tabpanel","class":"tab-pane","id":"site-details"});
		jobModalTabPanelClientInfo = getTag("<div/>",{"role":"tabpanel","class":"tab-pane","id":"client-details"});
		jobModalTabPanelFiles = getTag("<div/>",{"role":"tabpanel","class":"tab-pane","id":"files"});
		jobModalTabPanelMap = getTag("<div/>",{"role":"tabpanel","class":"tab-pane","id":"map"});

		jobModalTabPanels = getTag("<div/>",{"class":"tab-content"}).append(
			jobModalTabPanelBasicInfo,
			jobModalTabPanelSiteInfo,
			jobModalTabPanelClientInfo,
			jobModalTabPanelFiles,
			jobModalTabPanelMap
			);

		jobModalTabPanelBasicInfo.append(
			jobStatusSelectBoxFormGroup,
			jobPurchaseOrderNumberFormGroup,
			'<div class="col-sm-12"><hr></div>',
			jobDescriptionFormGroup,
			jobPriceFormGroup,
			jobPaymentTermsFormGroup	
			);

		jobModalTabPanelSiteInfo.append(
			jobSurfaceTypeFormGroup,
			jobMaterialFormGroup,
			jobSiteContactNameFormGroup,
			jobSiteContactNumberFormGroup
			);


		var jobMapParentDesktop = getTag("<div/>",{"class":"embed-responsive embed-responsive-16by9 hidden-xs"});
		var jobMapParentMobile = getTag("<div/>",{"class":"embed-responsive embed-responsive-4by3 visible-xs"});

    var jobMap = '<iframe class="embed-responsive-item" src="https://www.google.com/maps/embed/v1/directions?key=AIzaSyDPG-Rdgs-Os3F3QMLU418uNObFMi38cy0&origin=SS170NH&destination='+ jobData.job_site_address_postcode +'&avoid=tolls|highways"></iframe>';
console.log(jobData.job_site_address_postocde);
    if(jobData.job_site_address_postocde == null) {
			jobMap = '<p class="text-center">Provide a postcode to see the map.</p>';
		}

		jobModalTabPanelMap.append(jobMapParentDesktop.append(jobMap), jobMapParentMobile.append(jobMap));
		modalBody.append(jobModalTabButtons, jobModalTabPanels);

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

function getJobContent(){
	var contentFields = $('.jobModalField');
	var content = [];

	$.each(contentFields,function(index, node){
		content[$(node).attr('data-dbvar')] = $(node).val();
	})
	return content;
}

function objectToJson(object){
	return JSON.stringify(object);
}

function saveJobContent(jobId, jobContent){
	console.log('saving '+jobId);
	console.log(jobContent);
}