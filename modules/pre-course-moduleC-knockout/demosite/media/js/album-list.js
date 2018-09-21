define(['knockout', 'underscore'], function(ko, _) {
    var ViewModel = function(params) {
        var self = this;
        self.albums = params.albumlist
        self.title = params.title
        self.removeAlbum = function(album){
            console.log(album);
            self.albums.remove(album);
        }
    }
    return ViewModel;
});
