function initClientDetails(job_id) {
    showSpinner();
    // $.ajax({
    //     type: 'POST'
    //     dataType: "json",
    //     url: "app/ajax_return.php",
    //     data: {
    //         function: 'getSingleProprietorDetails',
    //         jobId: job_id
    //     },
    //     success: function () {
    //
    //     }
    // });
    hideSpinner();


        // Proprietor Name Search

    var jobSiteAddressTown = getTag("<input/>", {
        "id":"jobModal"+jobData.job_id+"JobProprietorName",
        "class":"form-control jobModalField",
        "data-dbvar":"job_site_address_town",
        "disabled":"disabled",
        "type":"text",
        "value":jobData.job_site_address_town
    });

    var jobSiteAddressTownFormGroup = getTag("<div/>", {
        "class":"form-group col-sm-6"}).append(getTag("<label/>",{
        'for':"jobModal"+jobData.job_id+"JobSiteAddressTown",
        "text":"Site Address Town"}),jobSiteAddressTown);



    $("#jobModal"+jobData.job_id+"JobClientDetailsParent").append(

        );

}