define(['knockout', 'underscore'], function(ko, _) {

    function ViewModel() {
        var self = this;
        this.artist = ko.observable("");
        this.album = ko.observable("");
        this.albums = ko.observableArray([]);

        //1. Called using the click binding
        this.addAlbum = function(){
            this.albums.push({
                artist: this.artist(),
                album: this.album()
            })
            this.artist("");
            this.album("");
        };
    };

    return ViewModel;
});
