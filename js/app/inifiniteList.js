

function initInfiniteList(listParentId) {

    var listResultsParent = $('#' + listParentId + '-list');
    var listControlsParent = $('#' + listParentId + '-controls');
    var listSubmitControl = listControlsParent.find('.search-control-submit');

    if(!listResultsParent) {
        return;
    }

    if(listSubmitControl.length > 0) {
        listSubmitControl.on('click', function(e){
            e.preventDefault();
            listSubmitControl.unbind('click');
            initInfiniteList(listParentId);
        });
    }

    listResultsParent.empty();

    addEndItem(listParentId, listControlsParent, listResultsParent);

    listResultsParent.on('click', '.item-link', function(e) {
        e.preventDefault();
        var clickedItem = $(this);
        var clickedItemType = clickedItem.attr('data-item-type');
        var clickedItemId = clickedItem.attr('data-item-id');

        openInfiniteListModal(clickedItemType, clickedItemId);
        
    })

}

function addEndItem(listParentId, listControlsParent, listResultsParent) {
    var endItem = getTag("div",{
        "class":"col-sm-12 end-of-list",
        "data-list-id":listParentId
    });

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

    infiniteListNextResults(listType, searchArguments, currentListCount, listParentId, listControlsParent, listResultsParent);
}

    function infiniteListNextResults(listType, searchArguments, limitFrom, listParentId, listControlsParent, listResultsParent){
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
            success: function(dataForList) {
                dataForList.forEach(function(listItem){
                    addItemToList(listResultsParent, listItem, listType);
                });
                // addEndItem(listParentId, listControlsParent, listResultsParent);
            }
        });
        hideSpinner();
    }


function addItemToList(listResultsParent, listItem, listType) {

    var listResultsParentObj = $(listResultsParent);

        var newItemParent = $(
            "<div/>",{
                "id": listType+'-'+listItem[listType+'_id'],
                "class": "col-sm-12 " + listType + " animated fadeIn"
            }
        );
        var newItemTitleRow = $(
            "<div/>",{
                "class": "row"
            }
        );
        var newItemDataRow = $(
            "<div/>",{
                "class": "row"
            }
        );
        var newItemCol12Title = $(
            "<div/>",{
                "class":"col-sm-12 job-col-title"
            });
        var newItemCol4Location = $(
            "<div/>",{
                "class":"col-sm-4"
            });
        var newItemCol4Client = $(
            "<div/>",{
                "class":"col-sm-4"
            });

        var newItemTitleLink = $(
            "<a/>",{
                "href": '#',
                "class": 'item-link',
                "data-item-id": listItem[listType+'_id'],
                "data-item-type": listType
            });

        var newItemTitle = $(
            "<h4/>",{
                "class": "new-job-title",
                "text": listItem[listType+'_name']
            }
        );
        // var newItemLocation = $(
        //     "<p/>",{
        //         "class": jobData.job_id+"-location",
        //         "text": "location data here"
        //     })
        // var newItemClient = $(
        //     "<p/>",{
        //         "class": jobData.job_id+"-client",
        //         "text": "client data here"
        //     })


        newItemTitleLink.append(newItemTitle);
        newItemCol12Title.append(newItemTitleLink);
        newItemTitleRow.append(newItemCol12Title);

        // newItemCol4Location.append(newItemLocation);
        // newItemCol4Client.append(newItemClient);

        newItemDataRow.append(newItemCol4Location).append(newItemCol4Client);

        newItemParent.append(newItemTitleRow).append(newItemDataRow).append('<hr>');

    listResultsParentObj.append(newItemParent);

}