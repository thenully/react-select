React-Select-ES6
============

A Select control built with and for [React](http://facebook.github.io/react/index.html). Initially built for use in [KeystoneJS](http://www.keystonejs.com).


## Demo & Examples

```javascript
yarn
yarn start
```

Then open [`localhost:8000`](http://localhost:8000) in a browser.


## Usage

React-Select generates a hidden text field containing the selected value, so you can submit it as part of a standard form. You can also listen for changes with the `onChange` event property.

Options should be provided as an `Array` of `Object`s, each with a `value` and `label` property for rendering and searching. You can use a `disabled` property to indicate whether the option is disabled or not.

The `value` property of each option should be set to either a string or a number.

When the value is changed, `onChange(selectedValueOrValues)` will fire.

```javascript
var options = [
  { value: 'one', label: 'One' },
  { value: 'two', label: 'Two' }
];

function logChange(val) {
  console.log("Selected: " + val);
}

<Select
  name="form-field-name"
  value="one"
  options={options}
  onChange={logChange}
/>
```

### Custom classNames

You can provide a custom `className` prop to the `<Select>` component, which will be added to the base `.Select` className for the outer container.

The built-in Options renderer also support custom classNames, just add a `className` property to objects in the `options` array.

### Multiselect options

You can enable multi-value selection by setting `multi={true}`. In this mode:

* Selected options will be removed from the dropdown menu
* The selected values are submitted in multiple `<input type="hidden">` fields, use `joinValues` to submit joined values in a single field instead
* The values of the selected items are joined using the `delimiter` prop to create the input value when `joinValues` is true
* A simple value, if provided, will be split using the `delimiter` prop
* The `onChange` event provides an array of selected options _or_ a comma-separated string of values (eg `"1,2,3"`) if `simpleValue` is true
* By default, only options in the `options` array can be selected. Use the `Creatable` Component (which wraps `Select`) to allow new options to be created if they do not already exist. Hitting comma (','), ENTER or TAB will add a new option. Versions `0.9.x` and below provided a boolean attribute on the `Select` Component (`allowCreate`) to achieve the same functionality. It is no longer available starting with version `1.0.0`.
* By default, selected options can be cleared. To disable the possibility of clearing a particular option, add `clearableValue: false` to that option:
```javascript
var options = [
  { value: 'one', label: 'One' },
  { value: 'two', label: 'Two', clearableValue: false }
];
```
Note: the `clearable` prop of the Select component should also be set to `false` to prevent allowing clearing all fields at once

### Async options

If you want to load options asynchronously, instead of providing an `options` Array, provide a `loadOptions` Function.

The function takes two arguments `String input, Function callback`and will be called when the input text is changed.

When your async process finishes getting the options, pass them to `callback(err, data)` in a Object `{ options: [] }`.

The select control will intelligently cache options for input strings that have already been fetched. The cached result set will be filtered as more specific searches are input, so if your async process would only return a smaller set of results for a more specific query, also pass `complete: true` in the callback object. Caching can be disabled by setting `cache` to `false` (Note that `complete: true` will then have no effect).

Unless you specify the property `autoload={false}` the control will automatically load the default set of options (i.e. for `input: ''`) when it is mounted.

```javascript
var getOptions = function(input, callback) {
  setTimeout(function() {
    callback(null, {
      options: [
        { value: 'one', label: 'One' },
        { value: 'two', label: 'Two' }
      ],
      // CAREFUL! Only set this to true when there are no more options,
      // or more specific queries will not be sent to the server.
      complete: true
    });
  }, 500);
};

<Select.Async
    name="form-field-name"
    loadOptions={getOptions}
/>
```

### Async options with Promises

`loadOptions` supports Promises, which can be used in very much the same way as callbacks.

Everything that applies to `loadOptions` with callbacks still applies to the Promises approach (e.g. caching, autoload, ...)

An example using the `fetch` API and ES6 syntax, with an API that returns an object like:

```javascript
/*
 * assuming the API returns something like this:
 *   const json = [
 *      { value: 'one', label: 'One' },
 *      { value: 'two', label: 'Two' }
 *   ]
 */

const getOptions = (input) => {
  return fetch(`/users/${input}.json`)
    .then((response) => {
      return response.json();
    }).then((json) => {
      return { options: json };
    });
}

<Select.Async
  name="form-field-name"
  value="one"
  loadOptions={getOptions}
/>
```

### Async options loaded externally

If you want to load options asynchronously externally from the `Select` component, you can have the `Select` component show a loading spinner by passing in the `isLoading` prop set to `true`.

```javascript
var isLoadingExternally = true;

<Select
  name="form-field-name"
  isLoading={isLoadingExternally}
  ...
/>
```

### User-created tags

The `Creatable` component enables users to create new tags within react-select.
It decorates a `Select` and so it supports all of the default properties (eg single/multi mode, filtering, etc) in addition to a couple of custom ones (shown below).
The easiest way to use it is like so:

```js
function render (selectProps) {
  return <Creatable {...selectProps} />;
};
```

##### Creatable properties

| Property | Type | Description
:---|:---|:---
| `children` | function | Child function responsible for creating the inner Select component. This component can be used to compose HOCs (eg Creatable and Async). Expected signature: `(props: Object): PropTypes.element` |
| `isOptionUnique` | function | Searches for any matching option within the set of options. This function prevents duplicate options from being created. By default this is a basic, case-sensitive comparison of label and value. Expected signature: `({ option: Object, options: Array, labelKey: string, valueKey: string }): boolean` |
| `isValidNewOption` | function | Determines if the current input text represents a valid option. By default any non-empty string will be considered valid. Expected signature: `({ label: string }): boolean` |
| `newOptionCreator` | function | Factory to create new option. Expected signature: `({ label: string, labelKey: string, valueKey: string }): Object` |
| `onNewOptionClick` | function | new option click handler, it calls when new option has been selected. `function(option) {}` |
| `shouldKeyDownEventCreateNewOption` | function | Decides if a keyDown event (eg its `keyCode`) should result in the creation of a new option. ENTER, TAB and comma keys create new options by default. Expected signature: `({ keyCode: number }): boolean` |
| `promptTextCreator` | function | Factory for overriding default option creator prompt label. By default it will read 'Create option "{label}"'. Expected signature: `(label: String): String` |

### Combining Async and Creatable

Use the `AsyncCreatable` HOC if you want both _async_ and _creatable_ functionality.
It ties `Async` and `Creatable` components together and supports a union of their properties (listed above).
Use it as follows:

```jsx
function render (props) {
  // props can be a mix of Async, Creatable, and Select properties
  return (
    <AsyncCreatable {...props} />
  );
}
```

### Filtering options

You can control how options are filtered with the following properties:

* `matchPos`: `"start"` or `"any"`: whether to match the text entered at the start or any position in the option value
* `matchProp`: `"label"`, `"value"` or `"any"`: whether to match the value, label or both values of each option when filtering
* `ignoreCase`: `Boolean`: whether to ignore case or match the text exactly when filtering
* `ignoreAccents`: `Boolean`: whether to ignore accents on characters like ø or å

`matchProp` and `matchPos` both default to `"any"`.
`ignoreCase` defaults to `true`.
`ignoreAccents` defaults to `true`.

#### Advanced filters

You can also completely replace the method used to filter either a single option, or the entire options array (allowing custom sort mechanisms, etc.)

* `filterOption`: `function(Object option, String filter)` returns `Boolean`. Will override `matchPos`, `matchProp`, `ignoreCase` and `ignoreAccents` options.
* `filterOptions`: `function(Array options, String filter, Array currentValues)` returns `Array filteredOptions`. Will override `filterOption`, `matchPos`, `matchProp`, `ignoreCase` and `ignoreAccents` options.

For multi-select inputs, when providing a custom `filterOptions` method, remember to exclude current values from the returned array of options.

#### Filtering large lists

The default `filterOptions` method scans the options array for matches each time the filter text changes.
This works well but can get slow as the options array grows to several hundred objects.
For larger options lists a custom filter function like [`react-select-fast-filter-options`](https://github.com/bvaughn/react-select-fast-filter-options) will produce better results.

### Effeciently rendering large lists with windowing

The `menuRenderer` property can be used to override the default drop-down list of options.
This should be done when the list is large (hundreds or thousands of items) for faster rendering.
Windowing libraries like [`react-virtualized`](https://github.com/bvaughn/react-virtualized) can then be used to more efficiently render the drop-down menu like so.
The easiest way to do this is with the [`react-virtualized-select`](https://github.com/bvaughn/react-virtualized-select/) HOC.
This component decorates a `Select` and uses the react-virtualized `VirtualScroll` component to render options.
Demo and documentation for this component are available [here](https://bvaughn.github.io/react-virtualized-select/).

You can also specify your own custom renderer.
The custom `menuRenderer` property accepts the following named parameters:

| Parameter | Type | Description |
|:---|:---|:---|
| focusedOption | `Object` | The currently focused option; should be visible in the menu by default. |
| focusOption | `Function` | Callback to focus a new option; receives the option as a parameter. |
| labelKey | `String` | Option labels are accessible with this string key. |
| optionClassName | `String` | The className that gets used for options |
| optionComponent | `ReactClass` | The react component that gets used for rendering an option |
| optionRenderer | `Function` | The function that gets used to render the content of an option |
| options | `Array<Object>` | Ordered array of options to render. |
| selectValue | `Function` | Callback to select a new option; receives the option as a parameter. |
| valueArray | `Array<Object>` | Array of currently selected options. |

### Updating input values with onInputChange

You can manipulate the input by providing a `onInputChange` callback that returns a new value.
**Please note:** When you want to use `onInputChange` only to listen to the input updates, you still have to return the unchanged value!

```js
function cleanInput(inputValue) {
    // Strip all non-number characters from the input
    return inputValue.replace(/[^0-9]/g, "");
}   

<Select
    name="form-field-name"
    onInputChange={cleanInput}
/>
```

### Overriding default key-down behavior with onInputKeyDown

`Select` listens to `keyDown` events to select items, navigate drop-down list via arrow keys, etc.
You can extend or override this behavior by providing a `onInputKeyDown` callback.

```js
function onInputKeyDown(event) {
    switch (event.keyCode) {
        case 9:   // TAB
            // Extend default TAB behavior by doing something here
            break;
        case 13: // ENTER
            // Override default ENTER behavior by doing stuff here and then preventing default
            event.preventDefault();
            break;
    }
}

<Select
    {...otherProps}
    onInputKeyDown={onInputKeyDown}
/>
```

### Adding floating label

If you want to show floating label above the `Select` component, you can pass in the `floatingLabelText` prop set to string.

```js

const style = {
	backgroundColor: '#fff',
	border: 0,
	borderBottom: '1px solid #e4e4e4',
	borderRadius: 0,
	boxShadow: 'none',
	color: '#333',
	display: 'table',
	height: '36px',
	outline: 'none',
	overflow: 'auto',
	position: 'relative',
};
		
<Select
	{...otherProps}
	style={style}
	floatingLabelText="Github ID"
	hideArrow
/>
```


### Adding error text

If you want to show error text under the `Select` component, you can pass in the `errorText` prop set to string.

```js
<Select
	{...otherProps}
	errorText="This is error text."
/>
```



### Further options

| Property | Type | Default | Description |
|:---|:---|:---|:---|
| addLabelText | string | 'Add "{label}"?' | text to display when `allowCreate` is true |
  arrowRenderer | func | undefined | Renders a custom drop-down arrow to be shown in the right-hand side of the select: `arrowRenderer({ onMouseDown, isOpen })` |
| autoBlur | bool | false | Blurs the input element after a selection has been made. Handy for lowering the keyboard on mobile devices |
| autofocus | bool | undefined | autofocus the component on mount |
| autoload | bool | true | whether to auto-load the default async options set |
| autosize | bool | true | If enabled, the input will expand as the length of its value increases |
| backspaceRemoves | bool | true | whether pressing backspace removes the last item when there is no input value |
| backspaceToRemoveMessage | string | 'Press backspace to remove {last label}' | prompt shown in input when at least one option in a multiselect is shown, set to '' to clear |
| cache | bool | true | enables the options cache for `asyncOptions` (default: `true`) |
| className | string | undefined | className for the outer element |
| clearable | bool | true | should it be possible to reset value |
| clearAllText | string | 'Clear all' | title for the "clear" control when `multi` is true |
| clearRenderer | func | undefined | Renders a custom clear to be shown in the right-hand side of the select when clearable true: `clearRenderer()` |
| clearValueText | string | 'Clear value' | title for the "clear" control |
| resetValue | any | null | value to use when you clear the control |
| deleteRemoves | bool | true | whether pressing delete key removes the last item when there is no input value |
| delimiter | string | ',' | delimiter to use to join multiple values |
| disabled | bool | false | whether the Select is disabled or not |
| filterOption | func | undefined | method to filter a single option: `function(option, filterString)` |
| filterOptions | func | undefined | method to filter the options array: `function([options], filterString, [values])` |
| ignoreAccents | bool | true | whether to strip accents when filtering |
| ignoreCase | bool | true | whether to perform case-insensitive filtering |
| inputProps | object | {} | custom attributes for the Input (in the Select-control) e.g: `{'data-foo': 'bar'}` |
| isLoading | bool | false | whether the Select is loading externally or not (such as options being loaded) |
| joinValues | bool | false | join multiple values into a single hidden input using the `delimiter` |
| labelKey | string | 'label' | the option property to use for the label |
| loadOptions | func | undefined | function that returns a promise or calls a callback with the options: `function(input, [callback])` |
| matchPos | string | 'any' | (any, start) match the start or entire string when filtering |
| matchProp | string | 'any' | (any, label, value) which option property to filter on |
| menuBuffer | number | 0 | buffer of px between the base of the dropdown and the viewport to shift if menu doesnt fit in viewport |
| menuRenderer | func | undefined | Renders a custom menu with options; accepts the following named parameters: `menuRenderer({ focusedOption, focusOption, options, selectValue, valueArray })` |
| multi | bool | undefined | multi-value input |
| name | string | undefined | field name, for hidden `<input />` tag |
| noResultsText | string | 'No results found' | placeholder displayed when there are no matching search results or a falsy value to hide it (can also be a react component) |
| onBlur | func | undefined | onBlur handler: `function(event) {}` |
| onBlurResetsInput | bool | true | whether to clear input on blur or not |
| onChange | func | undefined | onChange handler: `function(newValue) {}` |
| onClose | func | undefined | handler for when the menu closes: `function () {}` |
| onCloseResetsInput | bool | true | whether to clear input when closing the menu through the arrow |
| onFocus | func | undefined | onFocus handler: `function(event) {}` |
| onInputChange | func | undefined | onInputChange handler/interceptor: `function(inputValue: string): string` |
| onInputKeyDown | func | undefined | input keyDown handler; call `event.preventDefault()` to override default `Select` behavior: `function(event) {}` |
| onOpen | func | undefined | handler for when the menu opens: `function () {}` |
| onValueClick | func | undefined | onClick handler for value labels: `function (value, event) {}` |
| openOnFocus | bool | false | open the options menu when the input gets focus (requires searchable = true) |
| optionRenderer | func | undefined | function which returns a custom way to render the options in the menu |
| options | array | undefined | array of options |
| placeholder | string\|node | 'Select ...' | field placeholder, displayed when there's no value |
| scrollMenuIntoView | bool | true | whether the viewport will shift to display the entire menu when engaged |
| searchable | bool | true | whether to enable searching feature or not |
| searchPromptText | string\|node | 'Type to search' | label to prompt for search input |
| loadingPlaceholder | string\|node | 'Loading...' | label to prompt for loading search result |
| tabSelectsValue | bool | true | whether to select the currently focused value when the `[tab]` key is pressed |
| value | any | undefined | initial field value |
| valueKey | string | 'value' | the option property to use for the value |
| valueRenderer | func | undefined | function which returns a custom way to render the value selected `function (option) {}` |
| wrapperStyle | object | undefined | optional style to apply to the component wrapper |
| inputWrapperStyle | object | undefined | optional style to apply to the input wrapper |
| inputStyle | object | undefined | optional style to apply to the input |
| hideArrow | bool | false | whether arrow icon is hidden or not |
| floatingLabelFixed | bool | undefined |  |
| floatingLabelFocusStyle | object | undefined |  |
| floatingLabelShrinkStyle | object | undefined |  |
| floatingLabelStyle | object | undefined |  |
| floatingLabelText | node | undefined |  |
| errorClassName | string | undefined | className for the error element |
| errorStyle | object | undefined | optional style to apply to the error element |
| errorText | node | undefined | title for the error element |



### Methods

Right now there's simply a `focus()` method that gives the control focus. All other methods on `<Select>` elements should be considered private and prone to change.

```javascript
// focuses the input element
<instance>.focus();
```



## Bug Report

If you find a bug, please report to us posting [issues](https://github.com/thenully/react-select-es6/issues) on GitHub.



## License
react-select-es6 is released under the MIT license.

```
Copyright (c) 2017 Thenully Inc.

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.  IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
```
