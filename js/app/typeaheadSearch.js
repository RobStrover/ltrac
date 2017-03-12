var searchJobs = [];
var jobSearchField = $("#nav-job-search");

jobSearchField.select2({
    data: searchJobs
});

function addToSearch(jobData) {
  searchJobs.push(
          {
          id:parseInt(jobData.job_id),
          text:jobData.job_id +  ' - ' + jobData.job_name
      }
  );
    jobSearchField.select2({
        data: searchJobs
    });
}

jobSearchField.on('select2:select', function (evt) {
    getJobData($('#nav-job-search').val());
});

