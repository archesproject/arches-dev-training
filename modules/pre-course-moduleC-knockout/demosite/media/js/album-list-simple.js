define(['knockout', 'underscore'], function(ko, _) {
    var ViewModel = function(params) {
        var self = this;
        self.recentchange = ko.observable();
        self.albums = params.albumlist;
        self.title = params.title;
        self.summary = ko.computed(function(){
            var res = "<ul>"
            _.map(self.albums(), function(album){res += "<li>Artist: " + album.artist + ",   Album: " + album.album + "</li>"});
            res += "</ul>"
            return res
        });

        this.albums.subscribe(function(albums){
            var currentItem = _.last(albums)
            if (currentItem) {
                self.recentchange("You just added " + currentItem.artist + ", " + currentItem.album);
            }
        })
    }
    return ViewModel;
});
