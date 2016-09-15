function autoRefresh() {
	refreshCurrent();
	setTimeout(function() { autoRefresh(); }, 20000);
}

function refreshCurrent(){
	showSpinner();
	$.ajax({
		dataType: "json",
		url: "app/ajax_return.php",
		data: "data=current",
		success: function (currentResponse) {
			processCurrent(currentResponse);
		}
	})
	hideSpinner();
}



function processCurrent(currentResponse){
	showSpinner();
	removeUpdatedFlag();
	currentResponse.forEach(function(job){

if($('#job-'+job.job_id).length > 0) {
		updateJob(job);
	} else {
			addJob(job);
		}



		//setTimeout(function(){
		//	console.log(job);
		//},0);
	})
	removeNonUpdated();
	hideSpinner();
}

function addJob(jobData){
	var newJobParent = $(
			"<div/>",{
				"id": 'job-'+jobData.job_id,
				"class": "col-sm-12 "+jobData.job_status+"-job job animated fadeIn updated"
			}
		)
	var newJobTitleRow = $(
			"<div/>",{
				"class": "row"
			}
		)
	var newJobDataRow = $(
			"<div/>",{
				"class": "row"
			}
		)
	var newJobCol12Title = $(
		"<div/>",{
			"class":"col-sm-12 job-col-title"
		})
	var newJobCol4Location = $(
		"<div/>",{
			"class":"col-sm-4"
		})
	var newJobCol4Client = $(
		"<div/>",{
			"class":"col-sm-4"
		})

	var newJobTitleLink = $(
		"<a/>",{
			"href": '#',
			"class": 'job-link',
			"data-job": jobData.job_id
		})

	var newJobTitle = $(
			"<h4/>",{
				"class": "new-job-title",
				"text": jobData.job_id + " | " + jobData.job_name
			}
		)
	var newJobLocation = $(
		"<p/>",{
			"class": jobData.job_id+"-location",
			"text": "location data here"
		})
	var newJobClient = $(
		"<p/>",{
			"class": jobData.job_id+"-client",
			"text": "client data here"
		})


	newJobTitleLink.append(newJobTitle);
	newJobCol12Title.append(newJobTitleLink);
	newJobTitleRow.append(newJobCol12Title);

	newJobCol4Location.append(newJobLocation);
	newJobCol4Client.append(newJobClient);

	newJobDataRow.append(newJobCol4Location).append(newJobCol4Client);
	
	newJobParent.append(newJobTitleRow).append(newJobDataRow).append('<hr>');

	$('#'+jobData.job_status+"-list").append(newJobParent);

	setTimeout(updateCounter(jobData.job_status), 0);
	return;
}

function updateJob(jobData){
	var jobToCheck = $('#job-'+jobData.job_id);
	jobToCheck.find('.new-job-title').text(jobData.job_id + " | " + jobData.job_name);
	if(!jobToCheck.hasClass(jobData.job_status + '-job')){
		jobToCheck.addClass(jobData.job_status + '-job')
		jobToCheck.appendTo('#'+jobData.job_status + '-list');
		updateCounter(jobData.job_status);
	}
	jobToCheck.addClass('updated');
}

function removeJob(jobId){
	var jobToRemove = $('#job-'+jobId);
	if(jobToRemove.length > 0){
		jobToRemove.remove();
	}
	return;
}

function removeUpdatedFlag(){
	var updatedFlags = $('.jobs-list').find('.updated');
	updatedFlags.removeClass('updated');
}

function removeNonUpdated(){
	var jobsToRemove = $('.job:not(.updated)');
	jobsToRemove.remove();
	updateAllCounters();
}

var jobsList = $('.jobs-list');

if(jobsList.length > 0) {
	autoRefresh();
}