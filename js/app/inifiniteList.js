

function initInfiniteList(listResultsParentsId) {

    var listToInit = $('#' + listResultsParentsId);

    if(!listToInit) {
        return;
    }

    var endItem = getTag("div",{
        "class":"col-sm-12 end-of-list",
        "data-position":"0",
        "data-list-id":listResultsParentsId
    });

    listToInit.empty();

    listToInit.append(endItem);

    endItem.on('appear', infiniteListEnd(listResultsParentsId));

}

function infiniteListEnd(listResultsParentsId){

    var list = $('#' + listResultsParentsId);
    var listType = list.data('list-type');

    var dataForList = infiniteListNextResults(listType);

}

    // function infiniteListNextResults(listType, searchArguments){
    //     showSpinner();
    //     $.ajax({
    //         type: 'POST',
    //         dataType: "json",
    //         url: "app/ajax_return.php"
    //         data: {
    //             function: 'getInfiniteListResults',
    //             listType: listType,
    //             searchArguments: searchArguments
    //         },
    //         success: function(response) {
    //             return(response);
    //         }
    //     });
    //     hideSpinner();
    // }