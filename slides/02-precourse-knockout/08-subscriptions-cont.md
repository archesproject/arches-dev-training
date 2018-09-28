***Subscriptions/Computeds: ViewModel:***
```javascript
this.artist = ko.observable("");
this.album = ko.observable("");
this.recentchange = ko.observable();
this.albums = ko.observableArray([]);

this.addAlbum = function(){
    this.albums.push({artist: this.artist(), album: this.album()});
};

this.albums.subscribe(function(albums){
    var currentItem = _.last(albums)
    self.recentchange("You added " + currentItem.artist + ", " + currentItem.album);
})

this.summary = ko.computed(function(){
    var res = "<ul>"
    _.map(self.albums(), function(album){
        res += "<li>Artist: " + album.artist + ",   Album: " + album.album + "</li>"});
    res += "</ul>"
    return res
});
```
