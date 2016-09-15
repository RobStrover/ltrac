$('.nav-tabs').on('click', '#archive-tab', function(e){
	setTimeout(showArchiveLoading(), 0);
	setTimeout(refreshArchive(), 0);
});

function showArchiveLoading(){
	var archiveLoadParent = $(
	"<div/>",{
		"class": "col-sm-12 archive-loading"
	}
)

	var archiveLoadSpinner = $(
		"img",{
			"src":"ui/img/spinner.gif",
			"class":"centered-spinner"
		})

	var archiveLoadText = $(
	"<h3/>",{
		"class": "text-center",
		"text": "Just a sec..."
	}
)
	$('#archive-list').empty();
	archiveLoadParent.append(archiveLoadSpinner);
	archiveLoadParent.append(archiveLoadText);
	$('#archive-list').append(archiveLoadParent);
}

function refreshArchive(){

	showSpinner();
	$.ajax({
		dataType: "json",
		url: "app/ajax_return.php",
		data: "data=archive",
		success: function (archiveResponse) {
			$('.archive-loading').remove();
			setTimeout(processArchive(archiveResponse), 0);
			}
	})
	hideSpinner();
}

function processArchive(archiveResponse){
	showSpinner();
	archiveResponse.forEach(function(archiveJob){
	addArchivedJob(archiveJob);
	})
	hideSpinner();
}

function addArchivedJob(jobData){
	var newJobParent = $(
			"<div/>",{
				"id": 'job-'+jobData.job_id,
				"class": "col-sm-12 "+jobData.job_status+"-job archive-job"
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

	$('#archive-list').append(newJobParent);

	return;
}