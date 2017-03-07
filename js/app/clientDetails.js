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

    var jobProprietorName = getTag("<input/>", {
        "id":"jobModal"+job_id+"JobProprietorName",
        "class":"form-control",
        "disabled":"disabled",
        "type":"text",
        "value":""
    });

    var jobProprietorNameFormGroup = getTag("<div/>", {
        "class":"form-group col-sm-12"}).append(getTag("<label/>",{
        'for':"jobModal"+job_id+"JobProprietorName",
        "text":"Company / Proprietor Name"}),jobProprietorName);


    jobProprietorNameFormGroup.append(jobProprietorName);



    // Job Proprietor Parent

    var jobProrprietorParent = getTag("<div/>", {
        "class":"col-sm-6"
    });

    var jobProprietorParentRow = getTag("<div/>", {
        "class":"row"
    });



    // Job Contacts Parent

    var jobContactsParent = getTag("<div/>", {
        "class":"col-sm-6"
    });

    var jobContactsParentRow = getTag("<div/>", {
        "class":"row"
    });



    jobProprietorParentRow.append(
        getTag("<h3/>",{
            "text":"Company / Proprietor"
        }),
        jobProprietorNameFormGroup
    );

    jobProrprietorParent.append(
        jobProprietorParentRow
    );



    jobContactsParentRow.append(
        getTag("<h3/>",{
            "text":"Contacts"
        })
    );

    jobContactsParent.append(
        jobContactsParentRow
    );

    $("#jobModal"+job_id+"JobClientDetailsParent").append(
        jobProrprietorParent,
        jobContactsParent
        );

}