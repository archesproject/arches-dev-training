define(['knockout', 'underscore'], function(ko, _) {
    var ViewModel = function(params) {
        var self = this;
        self.albums = params.albumlist;
        self.title = params.title;
        self.context = params.context;
        self.removeAlbum = function(album){
            self.albums.remove(album);
        }
    }
    return ViewModel;
});
