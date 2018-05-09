# apple-style-controls
High-performance view-library with web controls according to apple style guidelines

Demo
https://vestlirik.github.io/apple-style-controls.github.io/

## Main components of app
All components should have class "asc"
### Component

```javascript
asc.component('<name of component>', function () {
    //template from html file
    this.templateSrc = "...path..to..template...";
    //or template from string (string template has priority)
    this.template = "...template...";
    //enables lazy loading for template
    this.lazyTemplate = true;
});
```
Component name should be one of the following:
* \<tag-name>
* .\<class-name>
* \#\<id-of-element>


Also components have events:
* Init - fires when component is **creating**
```javascript
asc.component('<name of component>', function () {
    this.init = function(element) {
       //TODO: following code there 
    }
});
```
* After init - fires when component is **created**
```javascript
asc.component('<name of component>', function () {
    this.afterInit = function(element) {
       //TODO: following code there 
    }
});
```

### Directives
```javascript
asc.component('[<directive-name>]', function () {
});
```
Directive name should start from 'asc-'

Directive has events:
* Init - fires when component is creating
```javascript
asc.component('[<directive-name>]', function () {
    this.init = function(element) {
       //TODO: following code there 
    }
});
```
* Update - fires when bound value was changed
```javascript
asc.component('[<directive-name>]', function () {
    this.update = function (value) {
        //TODO: to do smth with new bound value
    };
});
```

### How to bind value in template
Using {{ property name of component }}
```html
<p>{{<propertyName>}}</p>
```
```html
<div <directive-name>="{{<propertyName>}}" class="asc"></div>
```

#### Binding classes in template
Using {{\<component property>: '\<value>'}}
```html
<button class="{{added: 'hidden'}}">Add button</button>
```
or with **!**
```html
<button class="{{!added: 'hidden'}}">Add button</button>
```

### How to bind event in template
Using (\<name of desired event>)="\<name of handler in component>()"
```html
<button class="asc" (click)='openAlert()'>Show alert</button>
```
Event binding can have next parameters:
- $event - event object
- $value - value in event
- $target - context object
- `<any other name>` - property name

### How to add custom events to component
Using events array with name of event, also you can optionally bind event firing to property value
```js
asc.component('<component-name>', function () {
    this.events = [
        {
            name: '<event-name>',
            bindToProperty?: '<property-name>'
        }
    ];
});
```
Also event can be fired programmatically by calling
```js
this(self).events.<event-name>(<data>);
```

### Important part for running app
At start of the body you should following line of code
```html
<script>asc.run();</script>
```
### Setting up router
You should call following function
```javascript
window.router.setRouterConfig([
            {
                path: '<path>',
                component: '<component-name>'
            },
            {
                path: '<path>/:param',
                component: '<component-name>'
            },
            {
                path: '**',
                redirectTo: '<path>'
            }
        ]);
```
If you want to get info about current route and params, you can get this info from
```javascript
var activeRoute = window.router.getActiveRoute();
```
In future releases getting active route will be reviewed (maybe be replaced by services or similar to them)

###### More examples are in repository.
###### If any questions - contact me.
