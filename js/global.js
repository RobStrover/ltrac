requirejs.config({
    baseUrl: 'js/lib',
    paths: {
        "app": "../app",
        "jquery": "//ajax.googleapis.com/ajax/libs/jquery/2.0.0/jquery.min",
        "bootstrap": "../lib/bootstrap.min",
        "typeaheadBloodhound":"../lib/typeahead.jquery",
        "autoRefresher": "autoRefresher",
        "tabCounters": "tabCounters",
        "jobModal": "jobModal",
        "spinner":"spinner",
        "typeaheadSearch":"typeaheadSearch",
        "archive":"archive"

    }
});


requirejs(["jquery"],
	function ($){
		require(["app/main"]);      
	});