

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

    listToInit.clear();

    listToInit.append(endItem);

    endItem.on('appear', infiniteListEnd(listResultsParentsId));

}

function infiniteListEnd(listResultsParentsId){

}