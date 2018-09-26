require.config({
    appDir: ".",
    baseUrl: "media",
    paths: {
        'jquery': ['https://code.jquery.com/jquery-3.3.1.min'],
        'knockout': ['https://cdnjs.cloudflare.com/ajax/libs/knockout/3.4.2/knockout-min'],
        'underscore': ['https://cdnjs.cloudflare.com/ajax/libs/underscore.js/1.9.1/underscore-min'],
        'text': ['https://cdnjs.cloudflare.com/ajax/libs/require-text/2.0.12/text.min']
    }
});

require(['underscore', 'knockout', 'js/app-view-model'], function(_, ko, appViewModel) {

    ko.components.register('album-list-simple', {
        viewModel: {require: 'js/album-list-simple'},
        template: {require: 'text!templates/album-list-simple.html'}
    });

    ko.components.register('album-list', {
        viewModel: {require: 'js/album-list'},
        template: {require: 'text!templates/album-list.html'}
    });

    ko.applyBindings(new appViewModel());
});
