# apple-style-controls
Web controls according to apple style guidelines

Demo
https://vestlirik.github.io/apple-style-controls.github.io/

## Main components of app
All components should have class "asc"
### Component

```javascript
asc.component('<name of component>', function () {
    this.templateSrc = "...path..to..template...";
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

### How to bind event in template
Using (\<name of desired event>)="\<name of handler in component>()"
```html
<button class="asc" (click)='openAlert()'>Show alert</button>
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
                path: '**',
                redirectTo: '<path>'
            }
        ]);
```

###### More examples are in repository.
###### If you like this project - please star it.
###### If any questions - contact me.
