***Components***

- Composed of template and view model
- Reusable within an application
- Registering a component:
```javascript
ko.components.register('album-list', {
    viewModel: {require: 'js/album-list'},
    template: {require: 'text!templates/album-list.html'}
});
```
