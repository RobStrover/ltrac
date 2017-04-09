
function initMainNavigationItems(mainNavigationItems) {
    mainNavigationItems.forEach(function(navigationItem){
        var navigationItemButton = $('#' + navigationItem + '-tab-btn');
        if(navigationItemButton.length > 0) {
            var navigationItemTarget = $("#" + navigationItem + '-layout-parent');
            if(navigationItemTarget.length > 0) {
                navigationItemButton.on('click', function(e){
                    e.preventDefault();
                        mainNavigationItems.forEach(function(navigationItem){
                            if(navigationItemTarget.attr('id') !== navigationItem + '-layout-parent') {
                                setTimeout(function(){
                                    $('#' + navigationItem + '-layout-parent').addClass('hide');
                                },0);
                            } else {
                                $('#' + navigationItem + '-layout-parent').removeClass('hide');
                            }

                        });
                })
            } else {
                navigationItemButton.remove();
            }

        }
    });


}


var mainNavigationItems = [
    "jobs",
    "reporting",
    "client"
];

setTimeout(function(){
    initMainNavigationItems(mainNavigationItems);
},0);
