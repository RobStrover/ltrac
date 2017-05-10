

function initInfiniteList(listParentId) {

    var listResultsParent = $('#' + listParentId + '-list');
    var listControlsParent = $('#' + listParentId + '-controls');
    var listSubmitControl = listControlsParent.find('.search-control-submit');

    if(!listResultsParent) {
        return;
    }

    if(listSubmitControl.length > 0) {
        listSubmitControl.on('click', function(){
            listSubmitControl.unbind('click');
            initInfiniteList(listParentId);
        });
    }

    var endItem = getTag("div",{
        "class":"col-sm-12 end-of-list",
        "data-list-id":listParentId
    });

    // listResultsParent.empty();

    listResultsParent.append(endItem);

    endItem.on('appear', infiniteListEnd(listParentId, listControlsParent, listResultsParent));

}

function infiniteListEnd(listParentId, listControlsParent, listResultsParent){

    var listParent = $('#' + listParentId);

    // This will be overwritten if we find a list type control
    var listType = listParent.data('list-type');

    var searchArguments = {};
        listControlsParent = $(listControlsParent);
        listResultsParent = $(listResultsParent);

    var listControls = listControlsParent.find('.search-control');

    listControls.each(function(index){
        var control = $(this);

        // Overwriting the list type here if we find the right control
        if(control.attr('id') == listParentId + '-type') {
            listType = control.val();
        } else {
            searchArguments[control.attr('id')] = control.val();
        }
    });

    var currentList = listResultsParent.find('.searchResultItem');
    var currentListCount = currentList.length;

    var dataForList = infiniteListNextResults(listType, searchArguments, currentListCount);

    console.log(dataForList);

    dataForList.forEach(function(listItem){
        addItemToList(listResultsParent, listItem);
    });

}

    function addItemToList(listResultsParent, listItem) {
        var listResultsParent = $(listResultsParent);
        console.log(listItem);
        listResultsParent.append('item');
    }

    function infiniteListNextResults(listType, searchArguments, limitFrom){
        showSpinner();
        $.ajax({
            type: 'POST',
            dataType: "json",
            url: "app/ajax_return.php",
            data: {
                function: 'getInfiniteListResults',
                listType: listType,
                searchArguments: searchArguments,
                limitFrom: limitFrom
            },
            success: function(response) {
                return(response);
            }
        });
        hideSpinner();
    }