require=(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _Select = require('./Select');

var _Select2 = _interopRequireDefault(_Select);

var propTypes = {
	autoload: _propTypes2['default'].bool.isRequired, // automatically call the `loadOptions` prop on-mount; defaults to true
	cache: _propTypes2['default'].any, // object to use to cache results; set to null/false to disable caching
	children: _propTypes2['default'].func.isRequired, // Child function responsible for creating the inner Select component; (props: Object): PropTypes.element
	ignoreAccents: _propTypes2['default'].bool, // strip diacritics when filtering; defaults to true
	ignoreCase: _propTypes2['default'].bool, // perform case-insensitive filtering; defaults to true
	loadingPlaceholder: _propTypes2['default'].oneOfType([// replaces the placeholder while options are loading
	_propTypes2['default'].string, _propTypes2['default'].node]),
	loadOptions: _propTypes2['default'].func.isRequired, // callback to load options asynchronously; (inputValue: string, callback: Function): ?Promise
	multi: _propTypes2['default'].bool, // multi-value input
	options: _propTypes2['default'].array.isRequired, // array of options
	placeholder: _propTypes2['default'].oneOfType([// field placeholder, displayed when there's no value (shared with Select)
	_propTypes2['default'].string, _propTypes2['default'].node]),
	noResultsText: _propTypes2['default'].oneOfType([// field noResultsText, displayed when no options come back from the server
	_propTypes2['default'].string, _propTypes2['default'].node]),
	onChange: _propTypes2['default'].func, // onChange handler: function (newValue) {}
	searchPromptText: _propTypes2['default'].oneOfType([// label to prompt for search input
	_propTypes2['default'].string, _propTypes2['default'].node]),
	onInputChange: _propTypes2['default'].func, // optional for keeping track of what is being typed
	value: _propTypes2['default'].any };
// initial field value
var defaultCache = {};
var defaultProps = {
	autoload: true,
	cache: defaultCache,
	children: function children(props) {
		return _react2['default'].createElement(_Select2['default'], props);
	},
	ignoreAccents: true,
	ignoreCase: true,
	loadingPlaceholder: 'Loading...',
	options: [],
	searchPromptText: 'Type to search'
};

var Async = (function (_Component) {
	_inherits(Async, _Component);

	function Async(props, context) {
		_classCallCheck(this, Async);

		_get(Object.getPrototypeOf(Async.prototype), 'constructor', this).call(this, props, context);

		this._cache = props.cache === defaultCache ? {} : props.cache;

		this.state = {
			isLoading: false,
			options: props.options
		};

		this._onInputChange = this._onInputChange.bind(this);
	}

	_createClass(Async, [{
		key: 'componentDidMount',
		value: function componentDidMount() {
			var autoload = this.props.autoload;

			if (autoload) {
				this.loadOptions('');
			}
		}
	}, {
		key: 'componentWillReceiveProps',
		value: function componentWillReceiveProps(nextProps) {
			if (nextProps.options !== this.props.options) {
				this.setState({
					options: nextProps.options
				});
			}
		}
	}, {
		key: 'clearOptions',
		value: function clearOptions() {
			this.setState({ options: [] });
		}
	}, {
		key: 'loadOptions',
		value: function loadOptions(inputValue) {
			var _this = this;

			var loadOptions = this.props.loadOptions;

			var cache = this._cache;

			if (cache && cache.hasOwnProperty(inputValue)) {
				this.setState({
					options: cache[inputValue]
				});

				return;
			}

			var callback = function callback(error, data) {
				if (callback === _this._callback) {
					_this._callback = null;

					var options = data && data.options || [];

					if (cache) {
						cache[inputValue] = options;
					}

					_this.setState({
						isLoading: false,
						options: options
					});
				}
			};

			// Ignore all but the most recent request
			this._callback = callback;

			var promise = loadOptions(inputValue, callback);
			if (promise) {
				promise.then(function (data) {
					return callback(null, data);
				}, function (error) {
					return callback(error);
				});
			}

			if (this._callback && !this.state.isLoading) {
				this.setState({
					isLoading: true
				});
			}

			return inputValue;
		}
	}, {
		key: '_onInputChange',
		value: function _onInputChange(inputValue) {
			var _props = this.props;
			var ignoreAccents = _props.ignoreAccents;
			var ignoreCase = _props.ignoreCase;
			var onInputChange = _props.onInputChange;

			if (ignoreCase) {
				inputValue = inputValue.toLowerCase();
			}

			if (onInputChange) {
				onInputChange(inputValue);
			}

			return this.loadOptions(inputValue);
		}
	}, {
		key: 'inputValue',
		value: function inputValue() {
			if (this.select) {
				return this.select.state.inputValue;
			}
			return '';
		}
	}, {
		key: 'noResultsText',
		value: function noResultsText() {
			var _props2 = this.props;
			var loadingPlaceholder = _props2.loadingPlaceholder;
			var noResultsText = _props2.noResultsText;
			var searchPromptText = _props2.searchPromptText;
			var isLoading = this.state.isLoading;

			var inputValue = this.inputValue();

			if (isLoading) {
				return loadingPlaceholder;
			}
			if (inputValue && noResultsText) {
				return noResultsText;
			}
			return searchPromptText;
		}
	}, {
		key: 'focus',
		value: function focus() {
			this.select.focus();
		}
	}, {
		key: 'render',
		value: function render() {
			var _this2 = this;

			var _props3 = this.props;
			var children = _props3.children;
			var loadingPlaceholder = _props3.loadingPlaceholder;
			var placeholder = _props3.placeholder;
			var _state = this.state;
			var isLoading = _state.isLoading;
			var options = _state.options;

			var props = {
				noResultsText: this.noResultsText(),
				placeholder: isLoading ? loadingPlaceholder : placeholder,
				options: isLoading && loadingPlaceholder ? [] : options,
				ref: function ref(_ref) {
					return _this2.select = _ref;
				},
				onChange: function onChange(newValues) {
					if (_this2.props.multi && _this2.props.value && newValues.length > _this2.props.value.length) {
						_this2.clearOptions();
					}
					_this2.props.onChange(newValues);
				}
			};

			return children(_extends({}, this.props, props, {
				isLoading: isLoading,
				onInputChange: this._onInputChange
			}));
		}
	}]);

	return Async;
})(_react.Component);

Async.propTypes = propTypes;
Async.defaultProps = defaultProps;

exports['default'] = Async;
module.exports = exports['default'];

},{"./Select":"react-select-es6","prop-types":undefined,"react":undefined}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var propTypes = {
	children: _propTypes2['default'].node,
	className: _propTypes2['default'].string, // className (based on mouse position)
	instancePrefix: _propTypes2['default'].string.isRequired, // unique prefix for the ids (used for aria)
	isDisabled: _propTypes2['default'].bool, // the option is disabled
	isFocused: _propTypes2['default'].bool, // the option is focused
	isSelected: _propTypes2['default'].bool, // the option is selected
	onFocus: _propTypes2['default'].func, // method to handle mouseEnter on option element
	onSelect: _propTypes2['default'].func, // method to handle click on option element
	onUnfocus: _propTypes2['default'].func, // method to handle mouseLeave on option element
	option: _propTypes2['default'].object.isRequired, // object that is base for that option
	optionIndex: _propTypes2['default'].number };
// index of the option, used to generate unique ids for aria
var defaultProps = {};

var Option = (function (_Component) {
	_inherits(Option, _Component);

	function Option(props) {
		_classCallCheck(this, Option);

		_get(Object.getPrototypeOf(Option.prototype), 'constructor', this).call(this, props);
		this.handleMouseDown = this.handleMouseDown.bind(this);
		this.handleMouseEnter = this.handleMouseEnter.bind(this);
		this.handleMouseMove = this.handleMouseMove.bind(this);
		this.handleTouchEnd = this.handleTouchEnd.bind(this);
		this.handleTouchMove = this.handleTouchMove.bind(this);
		this.handleTouchStart = this.handleTouchStart.bind(this);
		this.onFocus = this.onFocus.bind(this);
	}

	_createClass(Option, [{
		key: 'blockEvent',
		value: function blockEvent(event) {
			event.preventDefault();
			event.stopPropagation();
			if (event.target.tagName !== 'A' || !('href' in event.target)) {
				return;
			}
			if (event.target.target) {
				window.open(event.target.href, event.target.target);
			} else {
				window.location.href = event.target.href;
			}
		}
	}, {
		key: 'handleMouseDown',
		value: function handleMouseDown(event) {
			event.preventDefault();
			event.stopPropagation();
			this.props.onSelect(this.props.option, event);
		}
	}, {
		key: 'handleMouseEnter',
		value: function handleMouseEnter(event) {
			this.onFocus(event);
		}
	}, {
		key: 'handleMouseMove',
		value: function handleMouseMove(event) {
			this.onFocus(event);
		}
	}, {
		key: 'handleTouchEnd',
		value: function handleTouchEnd(event) {
			// Check if the view is being dragged, In this case
			// we don't want to fire the click event (because the user only wants to scroll)
			if (this.dragging) return;

			this.handleMouseDown(event);
		}
	}, {
		key: 'handleTouchMove',
		value: function handleTouchMove(event) {
			// Set a flag that the view is being dragged
			this.dragging = true;
		}
	}, {
		key: 'handleTouchStart',
		value: function handleTouchStart(event) {
			// Set a flag that the view is not being dragged
			this.dragging = false;
		}
	}, {
		key: 'onFocus',
		value: function onFocus(event) {
			if (!this.props.isFocused) {
				this.props.onFocus(this.props.option, event);
			}
		}
	}, {
		key: 'render',
		value: function render() {
			var _props = this.props;
			var option = _props.option;
			var instancePrefix = _props.instancePrefix;
			var optionIndex = _props.optionIndex;

			var className = (0, _classnames2['default'])(this.props.className, option.className);

			return option.disabled ? _react2['default'].createElement(
				'div',
				{ className: className,
					onMouseDown: this.blockEvent,
					onClick: this.blockEvent },
				this.props.children
			) : _react2['default'].createElement(
				'div',
				{ className: className,
					style: option.style,
					role: 'option',
					onMouseDown: this.handleMouseDown,
					onMouseEnter: this.handleMouseEnter,
					onMouseMove: this.handleMouseMove,
					onTouchStart: this.handleTouchStart,
					onTouchMove: this.handleTouchMove,
					onTouchEnd: this.handleTouchEnd,
					id: instancePrefix + '-option-' + optionIndex,
					title: option.title },
				this.props.children
			);
		}
	}]);

	return Option;
})(_react.Component);

Option.propTypes = propTypes;
Option.defaultProps = defaultProps;

exports['default'] = Option;
module.exports = exports['default'];

},{"classnames":undefined,"prop-types":undefined,"react":undefined}],3:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _stylesTransitions = require('./styles/transitions');

var _stylesTransitions2 = _interopRequireDefault(_stylesTransitions);

function getStyles(props) {
	var defaultStyles = {
		color: '#1d1d1d',
		position: 'absolute',
		lineHeight: '36px',
		zIndex: 1,
		transition: _stylesTransitions2['default'].easeOut(),
		transform: 'scale(1) translate(0, 0)',
		transformOrigin: 'left top',
		pointerEvents: 'auto',
		userSelect: 'none',
		margin: 0,
		fontWeight: 'normal'
	};

	var shrinkStyles = props.shrink ? _extends({
		transform: 'scale(0.8) translate(0, -25px)',
		pointerEvents: 'none'
	}, props.shrinkStyle) : null;

	return {
		root: _extends(defaultStyles, props.style, shrinkStyles)
	};
}

var propTypes = {
	children: _propTypes2['default'].node, // The label contents.
	className: _propTypes2['default'].string, // The css class name of the root element.
	disabled: _propTypes2['default'].bool, // Disables the label if set to true.
	htmlFor: _propTypes2['default'].string, // The id of the target element that this label should refer to.
	shrink: _propTypes2['default'].bool, // True if the floating label should shrink.
	shrinkStyle: _propTypes2['default'].object, // Override the inline-styles of the root element when shrunk.
	style: _propTypes2['default'].object };
// Override the inline-styles of the root element.
var defaultProps = {
	disabled: false,
	shrink: false
};

var TextFieldLabel = function TextFieldLabel(props) {
	var className = props.className;
	var children = props.children;
	var htmlFor = props.htmlFor;

	var styles = getStyles(props);

	return _react2['default'].createElement(
		'label',
		{
			className: className,
			style: styles.root,
			htmlFor: htmlFor
		},
		children
	);
};

TextFieldLabel.propTypes = propTypes;
TextFieldLabel.defaultProps = defaultProps;

exports['default'] = TextFieldLabel;
module.exports = exports['default'];

},{"./styles/transitions":5,"prop-types":undefined,"react":undefined}],4:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var propTypes = {
	children: _propTypes2['default'].node,
	disabled: _propTypes2['default'].bool, // disabled prop passed to ReactSelect
	id: _propTypes2['default'].string, // Unique id for the value - used for aria
	onClick: _propTypes2['default'].func, // method to handle click on value label
	onRemove: _propTypes2['default'].func, // method to handle removal of the value
	value: _propTypes2['default'].object.isRequired };
// the option object for this value
var defaultProps = {};

var Value = (function (_Component) {
	_inherits(Value, _Component);

	function Value(props) {
		_classCallCheck(this, Value);

		_get(Object.getPrototypeOf(Value.prototype), 'constructor', this).call(this, props);
		this.state = {};
		this.handleMouseDown = this.handleMouseDown.bind(this);
		this.onRemove = this.onRemove.bind(this);
		this.handleTouchEndRemove = this.handleTouchEndRemove.bind(this);
		this.handleTouchMove = this.handleTouchMove.bind(this);
		this.handleTouchStart = this.handleTouchStart.bind(this);
	}

	_createClass(Value, [{
		key: 'handleMouseDown',
		value: function handleMouseDown(event) {
			if (event.type === 'mousedown' && event.button !== 0) {
				return;
			}
			if (this.props.onClick) {
				event.stopPropagation();
				this.props.onClick(this.props.value, event);
				return;
			}
			if (this.props.value.href) {
				event.stopPropagation();
			}
		}
	}, {
		key: 'onRemove',
		value: function onRemove(event) {
			event.preventDefault();
			event.stopPropagation();
			this.props.onRemove(this.props.value);
		}
	}, {
		key: 'handleTouchEndRemove',
		value: function handleTouchEndRemove(event) {
			// Check if the view is being dragged, In this case
			// we don't want to fire the click event (because the user only wants to scroll)
			if (this.dragging) return;

			// Fire the mouse events
			this.onRemove(event);
		}
	}, {
		key: 'handleTouchMove',
		value: function handleTouchMove(event) {
			// Set a flag that the view is being dragged
			this.dragging = true;
		}
	}, {
		key: 'handleTouchStart',
		value: function handleTouchStart(event) {
			// Set a flag that the view is not being dragged
			this.dragging = false;
		}
	}, {
		key: 'renderRemoveIcon',
		value: function renderRemoveIcon() {
			if (this.props.disabled || !this.props.onRemove) return;
			return _react2['default'].createElement(
				'span',
				{ className: 'Select-value-icon',
					'aria-hidden': 'true',
					onMouseDown: this.onRemove,
					onTouchEnd: this.handleTouchEndRemove,
					onTouchStart: this.handleTouchStart,
					onTouchMove: this.handleTouchMove },
				'&times'
			);
		}
	}, {
		key: 'renderLabel',
		value: function renderLabel() {
			var className = 'Select-value-label';
			return this.props.onClick || this.props.value.href ? _react2['default'].createElement(
				'a',
				{ className: className, href: this.props.value.href, target: this.props.value.target, onMouseDown: this.handleMouseDown, onTouchEnd: this.handleMouseDown },
				this.props.children
			) : _react2['default'].createElement(
				'span',
				{ className: className, role: 'option', 'aria-selected': 'true', id: this.props.id },
				this.props.children
			);
		}
	}, {
		key: 'render',
		value: function render() {
			return _react2['default'].createElement(
				'div',
				{ className: (0, _classnames2['default'])('Select-value', this.props.value.className),
					style: this.props.value.style,
					title: this.props.value.title },
				this.renderRemoveIcon(),
				this.renderLabel()
			);
		}
	}]);

	return Value;
})(_react.Component);

Value.propTypes = propTypes;
Value.defaultProps = defaultProps;

exports['default'] = Value;
module.exports = exports['default'];

},{"classnames":undefined,"prop-types":undefined,"react":undefined}],5:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});
exports['default'] = {
	easeOutFunction: 'cubic-bezier(0.23, 1, 0.32, 1)',
	easeInOutFunction: 'cubic-bezier(0.445, 0.05, 0.55, 0.95)',

	easeOut: function easeOut(duration, property, delay, easeFunction) {
		easeFunction = easeFunction || this.easeOutFunction;

		if (property && Object.prototype.toString.call(property) === '[object Array]') {
			var transitions = '';
			for (var i = 0; i < property.length; i++) {
				if (transitions) transitions += ',';
				transitions += this.create(duration, property[i], delay, easeFunction);
			}

			return transitions;
		} else {
			return this.create(duration, property, delay, easeFunction);
		}
	},

	create: function create(duration, property, delay, easeFunction) {
		duration = duration || '650ms';
		property = property || 'all';
		delay = delay || '0ms';
		easeFunction = easeFunction || 'linear';

		return property + ' ' + duration + ' ' + easeFunction + ' ' + delay;
	}
};
module.exports = exports['default'];

},{}],6:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

exports["default"] = function (_ref) {
	var onMouseDown = _ref.onMouseDown;

	return _react2["default"].createElement("span", {
		className: "Select-arrow",
		onMouseDown: onMouseDown
	});
};

module.exports = exports["default"];

},{"react":undefined}],7:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

exports['default'] = function () {
	return _react2['default'].createElement('span', {
		className: 'Select-clear',
		dangerouslySetInnerHTML: { __html: '&times;' }
	});
};

module.exports = exports['default'];

},{"react":undefined}],8:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});

exports['default'] = function (options, filterValue, excludeOptions, props) {
	if (props.ignoreCase) {
		filterValue = filterValue.toLowerCase();
	}

	if (excludeOptions) excludeOptions = excludeOptions.map(function (i) {
		return i[props.valueKey];
	});

	return options.filter(function (option) {
		if (excludeOptions && excludeOptions.indexOf(option[props.valueKey]) > -1) return false;
		if (props.filterOption) return props.filterOption.call(undefined, option, filterValue);
		if (!filterValue) return true;
		var valueTest = String(option[props.valueKey]);
		var labelTest = String(option[props.labelKey]);
		if (props.ignoreCase) {

			if (props.matchProp !== 'label') valueTest = valueTest.toLowerCase();
			if (props.matchProp !== 'value') labelTest = labelTest.toLowerCase();
		}
		return props.matchPos === 'start' ? props.matchProp !== 'label' && valueTest.substr(0, filterValue.length) === filterValue || props.matchProp !== 'value' && labelTest.substr(0, filterValue.length) === filterValue : props.matchProp !== 'label' && valueTest.indexOf(filterValue) >= 0 || props.matchProp !== 'value' && labelTest.indexOf(filterValue) >= 0;
	});
};

module.exports = exports['default'];

},{}],9:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

exports['default'] = function (_ref) {
	var focusedOption = _ref.focusedOption;
	var instancePrefix = _ref.instancePrefix;
	var labelKey = _ref.labelKey;
	var onFocus = _ref.onFocus;
	var onSelect = _ref.onSelect;
	var optionClassName = _ref.optionClassName;
	var optionComponent = _ref.optionComponent;
	var optionRenderer = _ref.optionRenderer;
	var options = _ref.options;
	var valueArray = _ref.valueArray;
	var valueKey = _ref.valueKey;
	var onOptionRef = _ref.onOptionRef;

	var Option = optionComponent;
	return options.map(function (option, i) {
		var isSelected = valueArray && valueArray.indexOf(option) > -1;
		var isFocused = option === focusedOption;
		var optionClass = (0, _classnames2['default'])(optionClassName, {
			'Select-option': true,
			'is-selected': isSelected,
			'is-focused': isFocused,
			'is-disabled': option.disabled
		});

		return _react2['default'].createElement(
			Option,
			{
				className: optionClass,
				instancePrefix: instancePrefix,
				isDisabled: option.disabled,
				isFocused: isFocused,
				isSelected: isSelected,
				key: 'option-' + i + '-' + option[valueKey],
				onFocus: onFocus,
				onSelect: onSelect,
				option: option,
				optionIndex: i,
				ref: function (ref) {
					onOptionRef(ref, isFocused);
				}
			},
			optionRenderer(option, i)
		);
	});
};

module.exports = exports['default'];

},{"classnames":undefined,"react":undefined}],"react-select-es6":[function(require,module,exports){
/**
 * Copyright (c) 2017 Thenully Inc.
 * react-select project is licensed under the MIT license
 */

'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _TextFieldLabel = require('./TextFieldLabel');

var _TextFieldLabel2 = _interopRequireDefault(_TextFieldLabel);

var _stylesTransitions = require('./styles/transitions');

var _stylesTransitions2 = _interopRequireDefault(_stylesTransitions);

var _utilsDefaultArrowRenderer = require('./utils/defaultArrowRenderer');

var _utilsDefaultArrowRenderer2 = _interopRequireDefault(_utilsDefaultArrowRenderer);

var _utilsDefaultFilterOptions = require('./utils/defaultFilterOptions');

var _utilsDefaultFilterOptions2 = _interopRequireDefault(_utilsDefaultFilterOptions);

var _utilsDefaultMenuRenderer = require('./utils/defaultMenuRenderer');

var _utilsDefaultMenuRenderer2 = _interopRequireDefault(_utilsDefaultMenuRenderer);

var _utilsDefaultClearRenderer = require('./utils/defaultClearRenderer');

var _utilsDefaultClearRenderer2 = _interopRequireDefault(_utilsDefaultClearRenderer);

var _Async = require('./Async');

var _Async2 = _interopRequireDefault(_Async);

var _Option = require('./Option');

var _Option2 = _interopRequireDefault(_Option);

var _Value = require('./Value');

var _Value2 = _interopRequireDefault(_Value);

function stringifyValue(value) {
	var valueType = typeof value;
	if (valueType === 'string') {
		return value;
	} else if (valueType === 'object') {
		return JSON.stringify(value);
	} else if (valueType === 'number' || valueType === 'boolean') {
		return String(value);
	} else {
		return '';
	}
}

function isValid(value) {
	return value !== '' && value !== undefined && value !== null && !(Array.isArray(value) && value.length === 0);
}

var getStyles = function getStyles(props, state) {
	var styles = {
		floatingLabel: {
			color: '#cdcdcd',
			pointerEvents: 'none'
		},
		error: {
			position: 'absolute',
			fontSize: 11,
			fontWeight: 'normal',
			lineHeight: '1',
			bottom: '-20px',
			textAlign: 'left',
			color: '#f92020',
			transition: _stylesTransitions2['default'].easeOut()
		}
	};

	styles.textarea = _extends({}, styles.input, {
		marginTop: props.floatingLabelText ? 36 : 12,
		marginBottom: props.floatingLabelText ? -36 : -12,
		boxSizing: 'border-box',
		font: 'inherit'
	});

	// Do not assign a height to the textarea as he handles it on his own.
	if (state.isFocused || state.hasValue) {
		styles.floatingLabel.color = '#1d1d1d';
	}

	return styles;
};

var stringOrNode = _propTypes2['default'].oneOfType([_propTypes2['default'].string, _propTypes2['default'].node]);

var instanceId = 1;

var propTypes = {
	addLabelText: _propTypes2['default'].string, // placeholder displayed when you want to add a label on a multi-value input
	'aria-describedby': _propTypes2['default'].string, // HTML ID(s) of element(s) that should be used to describe this input (for assistive tech)
	'aria-label': _propTypes2['default'].string, // Aria label (for assistive tech)
	'aria-labelledby': _propTypes2['default'].string, // HTML ID of an element that should be used as the label (for assistive tech)
	arrowRenderer: _propTypes2['default'].func, // Create drop-down caret element
	autoBlur: _propTypes2['default'].bool, // automatically blur the component when an option is selected
	autofocus: _propTypes2['default'].bool, // autofocus the component on mount
	autosize: _propTypes2['default'].bool, // whether to enable autosizing or not
	backspaceRemoves: _propTypes2['default'].bool, // whether backspace removes an item if there is no text input
	backspaceToRemoveMessage: _propTypes2['default'].string, // Message to use for screenreaders to press backspace to remove the current item - {label} is replaced with the item label
	className: _propTypes2['default'].string, // className for the outer element
	clearAllText: stringOrNode, // title for the "clear" control when multi: true
	clearRenderer: _propTypes2['default'].func, // create clearable x element
	clearValueText: stringOrNode, // title for the "clear" control
	clearable: _propTypes2['default'].bool, // should it be possible to reset value
	deleteRemoves: _propTypes2['default'].bool, // whether backspace removes an item if there is no text input
	delimiter: _propTypes2['default'].string, // delimiter to use to join multiple values for the hidden field value
	disabled: _propTypes2['default'].bool, // whether the Select is disabled or not
	escapeClearsValue: _propTypes2['default'].bool, // whether escape clears the value when the menu is closed
	filterOption: _propTypes2['default'].func, // method to filter a single option (option, filterString)
	filterOptions: _propTypes2['default'].any, // boolean to enable default filtering or function to filter the options array ([options], filterString, [values])
	ignoreCase: _propTypes2['default'].bool, // whether to perform case-insensitive filtering
	inputProps: _propTypes2['default'].object, // custom attributes for the Input
	inputRenderer: _propTypes2['default'].func, // returns a custom input component
	instanceId: _propTypes2['default'].string, // set the components instanceId
	isLoading: _propTypes2['default'].bool, // whether the Select is loading externally or not (such as options being loaded)
	joinValues: _propTypes2['default'].bool, // joins multiple values into a single form field with the delimiter (legacy mode)
	labelKey: _propTypes2['default'].string, // path of the label value in option objects
	matchPos: _propTypes2['default'].string, // (any|start) match the start or entire string when filtering
	matchProp: _propTypes2['default'].string, // (any|label|value) which option property to filter on
	menuBuffer: _propTypes2['default'].number, // optional buffer (in px) between the bottom of the viewport and the bottom of the menu
	menuContainerStyle: _propTypes2['default'].object, // optional style to apply to the menu container
	menuRenderer: _propTypes2['default'].func, // renders a custom menu with options
	menuStyle: _propTypes2['default'].object, // optional style to apply to the menu
	multi: _propTypes2['default'].bool, // multi-value input
	name: _propTypes2['default'].string, // generates a hidden <input /> tag with this field name for html forms
	noResultsText: stringOrNode, // placeholder displayed when there are no matching search results
	onBlur: _propTypes2['default'].func, // onBlur handler: function (event) {}
	onBlurResetsInput: _propTypes2['default'].bool, // whether input is cleared on blur
	onChange: _propTypes2['default'].func, // onChange handler: function (newValue) {}
	onClose: _propTypes2['default'].func, // fires when the menu is closed
	onCloseResetsInput: _propTypes2['default'].bool, // whether input is cleared when menu is closed through the arrow
	onFocus: _propTypes2['default'].func, // onFocus handler: function (event) {}
	onInputChange: _propTypes2['default'].func, // onInputChange handler: function (inputValue) {}
	onInputKeyDown: _propTypes2['default'].func, // input keyDown handler: function (event) {}
	onMenuScrollToBottom: _propTypes2['default'].func, // fires when the menu is scrolled to the bottom; can be used to paginate options
	onOpen: _propTypes2['default'].func, // fires when the menu is opened
	onValueClick: _propTypes2['default'].func, // onClick handler for value labels: function (value, event) {}
	openAfterFocus: _propTypes2['default'].bool, // boolean to enable opening dropdown when focused
	openOnFocus: _propTypes2['default'].bool, // always open options menu on focus
	optionClassName: _propTypes2['default'].string, // additional class(es) to apply to the <Option /> elements
	optionComponent: _propTypes2['default'].func, // option component to render in dropdown
	optionRenderer: _propTypes2['default'].func, // optionRenderer: function (option) {}
	options: _propTypes2['default'].array, // array of options
	pageSize: _propTypes2['default'].number, // number of entries to page when using page up/down keys
	placeholder: stringOrNode, // field placeholder, displayed when there's no value
	required: _propTypes2['default'].bool, // applies HTML5 required attribute when needed
	resetValue: _propTypes2['default'].any, // value to use when you clear the control
	scrollMenuIntoView: _propTypes2['default'].bool, // boolean to enable the viewport to shift so that the full menu fully visible when engaged
	searchable: _propTypes2['default'].bool, // whether to enable searching feature or not
	simpleValue: _propTypes2['default'].bool, // pass the value to onChange as a simple value (legacy pre 1.0 mode), defaults to false
	style: _propTypes2['default'].object, // optional style to apply to the control
	tabIndex: _propTypes2['default'].string, // optional tab index of the control
	tabSelectsValue: _propTypes2['default'].bool, // whether to treat tabbing out while focused to be value selection
	value: _propTypes2['default'].any, // initial field value
	valueComponent: _propTypes2['default'].func, // value component to render
	valueKey: _propTypes2['default'].string, // path of the label value in option objects
	valueRenderer: _propTypes2['default'].func, // valueRenderer: function (option) {}
	wrapperStyle: _propTypes2['default'].object, // optional style to apply to the component wrapper
	inputWrapperStyle: _propTypes2['default'].object, // optional style to apply to the input wrapper
	inputStyle: _propTypes2['default'].object, // optional style to apply to the input
	hideArrow: _propTypes2['default'].bool, // whether arrow icon is hidden or not
	floatingLabelFixed: _propTypes2['default'].bool,
	floatingLabelFocusStyle: _propTypes2['default'].object,
	floatingLabelShrinkStyle: _propTypes2['default'].object,
	floatingLabelStyle: _propTypes2['default'].object,
	floatingLabelText: _propTypes2['default'].node, // title for the error element
	errorClassName: _propTypes2['default'].string, // className for the error element
	errorStyle: _propTypes2['default'].object, // optional style to apply to the error element
	errorText: _propTypes2['default'].node };
// title for the error element

var defaultProps = {
	addLabelText: 'Add "{label}"?',
	arrowRenderer: _utilsDefaultArrowRenderer2['default'],
	autosize: true,
	backspaceRemoves: true,
	backspaceToRemoveMessage: 'Press backspace to remove {label}',
	clearable: true,
	clearAllText: 'Clear all',
	clearRenderer: _utilsDefaultClearRenderer2['default'],
	clearValueText: 'Clear value',
	deleteRemoves: true,
	delimiter: ',',
	disabled: false,
	escapeClearsValue: true,
	filterOptions: _utilsDefaultFilterOptions2['default'],
	ignoreCase: true,
	inputProps: {},
	isLoading: false,
	joinValues: false,
	labelKey: 'label',
	matchPos: 'any',
	matchProp: 'any',
	menuBuffer: 0,
	menuRenderer: _utilsDefaultMenuRenderer2['default'],
	multi: false,
	noResultsText: 'No results found',
	onBlurResetsInput: true,
	onCloseResetsInput: true,
	optionComponent: _Option2['default'],
	pageSize: 5,
	placeholder: 'Select...',
	required: false,
	scrollMenuIntoView: true,
	searchable: true,
	simpleValue: false,
	tabSelectsValue: true,
	valueComponent: _Value2['default'],
	valueKey: 'value',
	hideArrow: false
};

var Select = (function (_Component) {
	_inherits(Select, _Component);

	function Select(props) {
		_classCallCheck(this, Select);

		_get(Object.getPrototypeOf(Select.prototype), 'constructor', this).call(this, props);
		this.state = {
			inputValue: '',
			isFocused: false,
			isOpen: false,
			isPseudoFocused: false,
			required: false,
			hasValue: false,
			errorText: undefined
		};
		this.handleMouseDown = this.handleMouseDown.bind(this);
		this.handleMouseDownOnArrow = this.handleMouseDownOnArrow.bind(this);
		this.handleMouseDownOnMenu = this.handleMouseDownOnMenu.bind(this);
		this.closeMenu = this.closeMenu.bind(this);
		this.handleInputFocus = this.handleInputFocus.bind(this);
		this.handleInputBlur = this.handleInputBlur.bind(this);
		this.handleInputChange = this.handleInputChange.bind(this);
		this.handleKeyDown = this.handleKeyDown.bind(this);
		this.handleValueClick = this.handleValueClick.bind(this);
		this.handleMenuScroll = this.handleMenuScroll.bind(this);
		this.getOptionLabel = this.getOptionLabel.bind(this);
		this.getValueArray = this.getValueArray.bind(this);
		this.setValue = this.setValue.bind(this);
		this.selectValue = this.selectValue.bind(this);
		this.addValue = this.addValue.bind(this);
		this.popValue = this.popValue.bind(this);
		this.removeValue = this.removeValue.bind(this);
		this.clearValue = this.clearValue.bind(this);
		this.removeValue = this.removeValue.bind(this);
		this.getResetValue = this.getResetValue.bind(this);
		this.focusOption = this.focusOption.bind(this);
		this.focusAdjacentOption = this.focusAdjacentOption.bind(this);
		this.getInputValue = this.getInputValue.bind(this);
		this.selectFocusedOption = this.selectFocusedOption.bind(this);
		this.filterOptions = this.filterOptions.bind(this);
		this.onOptionRef = this.onOptionRef.bind(this);
		this.getFocusableOptionIndex = this.getFocusableOptionIndex.bind(this);
	}

	_createClass(Select, [{
		key: 'componentWillMount',
		value: function componentWillMount() {
			this._instancePrefix = 'react-select-' + (this.props.instanceId || ++instanceId) + '-';
			var valueArray = this.getValueArray(this.props.value);

			if (this.props.required) {
				this.setState({
					required: this.handleRequired(valueArray[0], this.props.multi),
					hasValue: isValid(this.props.value),
					errorText: this.props.errorText
				});
			}
		}
	}, {
		key: 'componentDidMount',
		value: function componentDidMount() {
			if (this.props.autofocus) {
				this.focus();
			}
		}
	}, {
		key: 'componentWillReceiveProps',
		value: function componentWillReceiveProps(nextProps) {
			var valueArray = this.getValueArray(nextProps.value, nextProps);

			if (nextProps.required) {
				this.setState({
					required: this.handleRequired(valueArray[0], nextProps.multi),
					hasValue: isValid(nextProps.value),
					errorText: nextProps.errorText
				});
			}
		}
	}, {
		key: 'componentWillUpdate',
		value: function componentWillUpdate(nextProps, nextState) {
			if (nextState.isOpen !== this.state.isOpen) {
				this.toggleTouchOutsideEvent(nextState.isOpen);
				var handler = nextState.isOpen ? nextProps.onOpen : nextProps.onClose;
				handler && handler();
			}
		}
	}, {
		key: 'componentDidUpdate',
		value: function componentDidUpdate(prevProps, prevState) {
			// focus to the selected option
			if (this.menu && this.state.focused && this.state.isOpen && !this.hasScrolledToOption) {
				var focusedOptionNode = _reactDom2['default'].findDOMNode(this.state.focused);
				var menuNode = _reactDom2['default'].findDOMNode(this.menu);
				menuNode.scrollTop = focusedOptionNode.offsetTop;
				this.hasScrolledToOption = true;
			} else if (!this.state.isOpen) {
				this.hasScrolledToOption = false;
			}

			if (this._scrollToFocusedOptionOnUpdate && this.state.focused && this.menu) {
				this._scrollToFocusedOptionOnUpdate = false;
				var focusedDOM = _reactDom2['default'].findDOMNode(this.state.focused);
				var menuDOM = _reactDom2['default'].findDOMNode(this.menu);
				var focusedRect = focusedDOM.getBoundingClientRect();
				var menuRect = menuDOM.getBoundingClientRect();
				if (focusedRect.bottom > menuRect.bottom || focusedRect.top < menuRect.top) {
					menuDOM.scrollTop = focusedDOM.offsetTop + focusedDOM.clientHeight - menuDOM.offsetHeight;
				}
			}
			if (this.props.scrollMenuIntoView && this.menuContainer) {
				var menuContainerRect = this.menuContainer.getBoundingClientRect();
				if (window.innerHeight < menuContainerRect.bottom + this.props.menuBuffer) {
					window.scrollBy(0, menuContainerRect.bottom + this.props.menuBuffer - window.innerHeight);
				}
			}
			if (prevProps.disabled !== this.props.disabled) {
				this.setState({ isFocused: false }); // eslint-disable-line react/no-did-update-set-state
				this.closeMenu();
			}
		}
	}, {
		key: 'componentWillUnmount',
		value: function componentWillUnmount() {
			if (!document.removeEventListener && document.detachEvent) {
				document.detachEvent('ontouchstart', this.handleTouchOutside);
			} else {
				document.removeEventListener('touchstart', this.handleTouchOutside);
			}
		}
	}, {
		key: 'toggleTouchOutsideEvent',
		value: function toggleTouchOutsideEvent(enabled) {
			if (enabled) {
				if (!document.addEventListener && document.attachEvent) {
					document.attachEvent('ontouchstart', this.handleTouchOutside);
				} else {
					document.addEventListener('touchstart', this.handleTouchOutside);
				}
			} else {
				if (!document.removeEventListener && document.detachEvent) {
					document.detachEvent('ontouchstart', this.handleTouchOutside);
				} else {
					document.removeEventListener('touchstart', this.handleTouchOutside);
				}
			}
		}
	}, {
		key: 'handleTouchOutside',
		value: function handleTouchOutside(event) {
			// handle touch outside on ios to dismiss menu
			if (this.wrapper && !this.wrapper.contains(event.target)) {
				this.closeMenu();
			}
		}
	}, {
		key: 'focus',
		value: function focus() {
			if (!this.input) return;
			this.input.focus();
		}
	}, {
		key: 'blurInput',
		value: function blurInput() {
			if (!this.input) return;
			this.input.blur();
		}
	}, {
		key: 'handleTouchMove',
		value: function handleTouchMove(event) {
			// Set a flag that the view is being dragged
			this.dragging = true;
		}
	}, {
		key: 'handleTouchStart',
		value: function handleTouchStart(event) {
			// Set a flag that the view is not being dragged
			this.dragging = false;
		}
	}, {
		key: 'handleTouchEnd',
		value: function handleTouchEnd(event) {
			// Check if the view is being dragged, In this case
			// we don't want to fire the click event (because the user only wants to scroll)
			if (this.dragging) return;

			// Fire the mouse events
			this.handleMouseDown(event);
		}
	}, {
		key: 'handleTouchEndClearValue',
		value: function handleTouchEndClearValue(event) {
			// Check if the view is being dragged, In this case
			// we don't want to fire the click event (because the user only wants to scroll)
			if (this.dragging) return;

			// Clear the value
			this.clearValue(event);
		}
	}, {
		key: 'handleMouseDown',
		value: function handleMouseDown(event) {
			// if the event was triggered by a mousedown and not the primary
			// button, or if the component is disabled, ignore it.
			if (this.props.disabled || event.type === 'mousedown' && event.button !== 0) {
				return;
			}

			if (event.target.tagName === 'INPUT') {
				return;
			}

			// prevent default event handlers
			event.stopPropagation();
			event.preventDefault();

			// for the non-searchable select, toggle the menu
			if (!this.props.searchable) {
				this.focus();
				return this.setState({
					isOpen: !this.state.isOpen
				});
			}

			if (this.state.isFocused) {
				// On iOS, we can get into a state where we think the input is focused but it isn't really,
				// since iOS ignores programmatic calls to input.focus() that weren't triggered by a click event.
				// Call focus() again here to be safe.
				this.focus();

				var input = this.input;
				if (typeof input.getInput === 'function') {
					// Get the actual DOM input if the ref is an <AutosizeInput /> component
					input = input.getInput();
				}

				// clears the value so that the cursor will be at the end of input when the component re-renders
				input.value = '';

				// if the input is focused, ensure the menu is open
				this.setState({
					isOpen: true,
					isPseudoFocused: false
				});
			} else {
				// otherwise, focus the input and open the menu
				this._openAfterFocus = true;
				this.focus();
			}
		}
	}, {
		key: 'handleMouseDownOnArrow',
		value: function handleMouseDownOnArrow(event) {
			// if the event was triggered by a mousedown and not the primary
			// button, or if the component is disabled, ignore it.
			if (this.props.disabled || event.type === 'mousedown' && event.button !== 0) {
				return;
			}
			// If the menu isn't open, let the event bubble to the main handleMouseDown
			if (!this.state.isOpen) {
				return;
			}
			// prevent default event handlers
			event.stopPropagation();
			event.preventDefault();
			// close the menu
			this.closeMenu();
		}
	}, {
		key: 'handleMouseDownOnMenu',
		value: function handleMouseDownOnMenu(event) {
			// if the event was triggered by a mousedown and not the primary
			// button, or if the component is disabled, ignore it.
			if (this.props.disabled || event.type === 'mousedown' && event.button !== 0) {
				return;
			}
			event.stopPropagation();
			event.preventDefault();

			this._openAfterFocus = true;
			this.focus();
		}
	}, {
		key: 'closeMenu',
		value: function closeMenu() {
			if (this.props.onCloseResetsInput) {
				this.setState({
					isOpen: false,
					isPseudoFocused: this.state.isFocused && !this.props.multi,
					inputValue: ''
				});
			} else {
				this.setState({
					isOpen: false,
					isPseudoFocused: this.state.isFocused && !this.props.multi,
					inputValue: this.state.inputValue
				});
			}
			this.hasScrolledToOption = false;
		}
	}, {
		key: 'handleInputFocus',
		value: function handleInputFocus(event) {
			if (this.props.disabled) return;
			var isOpen = this.state.isOpen || this._openAfterFocus || this.props.openOnFocus;
			if (this.props.onFocus) {
				this.props.onFocus(event);
			}
			this.setState({
				isFocused: true,
				isOpen: isOpen
			});
			this._openAfterFocus = false;
		}
	}, {
		key: 'handleInputBlur',
		value: function handleInputBlur(event) {
			// The check for menu.contains(activeElement) is necessary to prevent IE11's scrollbar from closing the menu in certain contexts.
			// if (this.menu && (this.menu === document.activeElement || this.menu.contains(document.activeElement))) {
			// 	this.focus();
			// 	return;
			// }

			if (this.props.onBlur) {
				this.props.onBlur(event);
			}
			var onBlurredState = {
				isFocused: false,
				isOpen: false,
				isPseudoFocused: false
			};
			if (this.props.onBlurResetsInput) {
				onBlurredState.inputValue = '';
			}
			this.setState(onBlurredState);
		}
	}, {
		key: 'handleInputChange',
		value: function handleInputChange(event) {
			var newInputValue = event.target.value;

			if (this.state.inputValue !== event.target.value && this.props.onInputChange) {
				var nextState = this.props.onInputChange(newInputValue);
				// Note: != used deliberately here to catch undefined and null
				if (nextState != null && typeof nextState !== 'object') {
					newInputValue = '' + nextState;
				}
			}

			this.setState({
				isOpen: true,
				isPseudoFocused: false,
				inputValue: newInputValue,
				hasValue: isValid(newInputValue)
			});
		}
	}, {
		key: 'handleKeyDown',
		value: function handleKeyDown(event) {
			if (this.props.disabled) return;

			if (typeof this.props.onInputKeyDown === 'function') {
				this.props.onInputKeyDown(event);
				if (event.defaultPrevented) {
					return;
				}
			}

			switch (event.keyCode) {
				case 8:
					// backspace
					if (!this.state.inputValue && this.props.backspaceRemoves) {
						event.preventDefault();
						this.popValue();
					}
					return;
				case 9:
					// tab
					if (event.shiftKey || !this.state.isOpen || !this.props.tabSelectsValue) {
						return;
					}
					this.selectFocusedOption();
					return;
				case 13:
					// enter
					if (!this.state.isOpen) return;
					event.stopPropagation();
					this.selectFocusedOption();
					break;
				case 27:
					// escape
					if (this.state.isOpen) {
						this.closeMenu();
						event.stopPropagation();
					} else if (this.props.clearable && this.props.escapeClearsValue) {
						this.clearValue(event);
						event.stopPropagation();
					}
					break;
				case 38:
					// up
					this.focusPreviousOption();
					break;
				case 40:
					// down
					this.focusNextOption();
					break;
				case 33:
					// page up
					this.focusPageUpOption();
					break;
				case 34:
					// page down
					this.focusPageDownOption();
					break;
				case 35:
					// end key
					if (event.shiftKey) {
						return;
					}
					this.focusEndOption();
					break;
				case 36:
					// home key
					if (event.shiftKey) {
						return;
					}
					this.focusStartOption();
					break;
				case 46:
					// backspace
					if (!this.state.inputValue && this.props.deleteRemoves) {
						event.preventDefault();
						this.popValue();
					}
					return;
				default:
					return;
			}
			event.preventDefault();
		}
	}, {
		key: 'handleValueClick',
		value: function handleValueClick(option, event) {
			if (!this.props.onValueClick) return;
			this.props.onValueClick(option, event);
		}
	}, {
		key: 'handleMenuScroll',
		value: function handleMenuScroll(event) {
			if (!this.props.onMenuScrollToBottom) return;
			var target = event.target;

			if (target.scrollHeight > target.offsetHeight && !(target.scrollHeight - target.offsetHeight - target.scrollTop)) {
				this.props.onMenuScrollToBottom();
			}
		}
	}, {
		key: 'handleRequired',
		value: function handleRequired(value, multi) {
			if (!value) return true;
			return multi ? value.length === 0 : Object.keys(value).length === 0;
		}
	}, {
		key: 'getOptionLabel',
		value: function getOptionLabel(op) {
			return op[this.props.labelKey];
		}

		/**
   * Turns a value into an array from the given options
   * @param	{String|Number|Array}	value		- the value of the select input
   * @param	{Object}		nextProps	- optionally specify the nextProps so the returned array uses the latest configuration
   * @returns	{Array}	the value of the select represented in an array
   */
	}, {
		key: 'getValueArray',
		value: function getValueArray(value, nextProps) {
			var _this = this;

			/** support optionally passing in the `nextProps` so `componentWillReceiveProps` updates will function as expected */
			var props = typeof nextProps === 'object' ? nextProps : this.props;
			if (props.multi) {
				if (typeof value === 'string') value = value.split(props.delimiter);
				if (!Array.isArray(value)) {
					if (value === null || value === undefined) return [];
					value = [value];
				}
				return value.map(function (value) {
					return _this.expandValue(value, props);
				}).filter(function (i) {
					return i;
				});
			}
			var expandedValue = this.expandValue(value, props);
			return expandedValue ? [expandedValue] : [];
		}

		/**
   * Retrieve a value from the given options and valueKey
   * @param	{String|Number|Array}	value	- the selected value(s)
   * @param	{Object}		props	- the Select component's props (or nextProps)
   */
	}, {
		key: 'expandValue',
		value: function expandValue(value, props) {
			var valueType = typeof value;
			if (valueType !== 'string' && valueType !== 'number' && valueType !== 'boolean') return value;
			var options = props.options;
			var valueKey = props.valueKey;

			if (!options) return;
			for (var i = 0; i < options.length; i++) {
				if (options[i][valueKey] === value) return options[i];
			}
		}
	}, {
		key: 'setValue',
		value: function setValue(value) {
			var _this2 = this;

			if (this.props.autoBlur) {
				this.blurInput();
			}
			if (!this.props.onChange) return;
			if (this.props.required) {
				var required = this.handleRequired(value, this.props.multi);
				this.setState({ required: required });
			}
			if (this.props.simpleValue && value) {
				value = this.props.multi ? value.map(function (i) {
					return i[_this2.props.valueKey];
				}).join(this.props.delimiter) : value[this.props.valueKey];
			}
			this.props.onChange(value);
		}
	}, {
		key: 'selectValue',
		value: function selectValue(value) {
			var _this3 = this;

			//NOTE: update value in the callback to make sure the input value is empty so that there are no styling issues (Chrome had issue otherwise)
			this.hasScrolledToOption = false;
			if (this.props.multi) {
				this.setState({
					inputValue: '',
					focusedIndex: null
				}, function () {
					_this3.addValue(value);
				});
			} else {
				this.setState({
					isOpen: false,
					inputValue: '',
					isPseudoFocused: this.state.isFocused
				}, function () {
					_this3.setValue(value);
				});
			}
		}
	}, {
		key: 'addValue',
		value: function addValue(value) {
			var valueArray = this.getValueArray(this.props.value);
			var visibleOptions = this._visibleOptions.filter(function (val) {
				return !val.disabled;
			});
			var lastValueIndex = visibleOptions.indexOf(value);
			this.setValue(valueArray.concat(value));
			if (visibleOptions.length - 1 === lastValueIndex) {
				// the last option was selected; focus the second-last one
				this.focusOption(visibleOptions[lastValueIndex - 1]);
			} else if (visibleOptions.length > lastValueIndex) {
				// focus the option below the selected one
				this.focusOption(visibleOptions[lastValueIndex + 1]);
			}
		}
	}, {
		key: 'popValue',
		value: function popValue() {
			var valueArray = this.getValueArray(this.props.value);
			if (!valueArray.length) return;
			if (valueArray[valueArray.length - 1].clearableValue === false) return;
			this.setValue(valueArray.slice(0, valueArray.length - 1));
		}
	}, {
		key: 'removeValue',
		value: function removeValue(value) {
			var valueArray = this.getValueArray(this.props.value);
			this.setValue(valueArray.filter(function (i) {
				return i !== value;
			}));
			this.focus();
		}
	}, {
		key: 'clearValue',
		value: function clearValue(event) {
			// if the event was triggered by a mousedown and not the primary
			// button, ignore it.
			if (event && event.type === 'mousedown' && event.button !== 0) {
				return;
			}
			event.stopPropagation();
			event.preventDefault();
			this.setValue(this.getResetValue());
			this.setState({
				isOpen: false,
				inputValue: ''
			}, this.focus);
		}
	}, {
		key: 'getResetValue',
		value: function getResetValue() {
			if (this.props.resetValue !== undefined) {
				return this.props.resetValue;
			} else if (this.props.multi) {
				return [];
			} else {
				return null;
			}
		}
	}, {
		key: 'focusOption',
		value: function focusOption(option) {
			this.setState({
				focusedOption: option
			});
		}
	}, {
		key: 'focusNextOption',
		value: function focusNextOption() {
			this.focusAdjacentOption('next');
		}
	}, {
		key: 'focusPreviousOption',
		value: function focusPreviousOption() {
			this.focusAdjacentOption('previous');
		}
	}, {
		key: 'focusPageUpOption',
		value: function focusPageUpOption() {
			this.focusAdjacentOption('page_up');
		}
	}, {
		key: 'focusPageDownOption',
		value: function focusPageDownOption() {
			this.focusAdjacentOption('page_down');
		}
	}, {
		key: 'focusStartOption',
		value: function focusStartOption() {
			this.focusAdjacentOption('start');
		}
	}, {
		key: 'focusEndOption',
		value: function focusEndOption() {
			this.focusAdjacentOption('end');
		}
	}, {
		key: 'focusAdjacentOption',
		value: function focusAdjacentOption(dir) {
			var options = this._visibleOptions.map(function (option, index) {
				return { option: option, index: index };
			}).filter(function (option) {
				return !option.option.disabled;
			});
			this._scrollToFocusedOptionOnUpdate = true;
			if (!this.state.isOpen) {
				this.setState({
					isOpen: true,
					inputValue: '',
					focusedOption: this._focusedOption || (options.length ? options[dir === 'next' ? 0 : options.length - 1].option : null)
				});
				return;
			}
			if (!options.length) return;
			var focusedIndex = -1;
			for (var i = 0; i < options.length; i++) {
				if (this._focusedOption === options[i].option) {
					focusedIndex = i;
					break;
				}
			}
			if (dir === 'next' && focusedIndex !== -1) {
				focusedIndex = (focusedIndex + 1) % options.length;
			} else if (dir === 'previous') {
				if (focusedIndex > 0) {
					focusedIndex = focusedIndex - 1;
				} else {
					focusedIndex = options.length - 1;
				}
			} else if (dir === 'start') {
				focusedIndex = 0;
			} else if (dir === 'end') {
				focusedIndex = options.length - 1;
			} else if (dir === 'page_up') {
				var potentialIndex = focusedIndex - this.props.pageSize;
				if (potentialIndex < 0) {
					focusedIndex = 0;
				} else {
					focusedIndex = potentialIndex;
				}
			} else if (dir === 'page_down') {
				var potentialIndex = focusedIndex + this.props.pageSize;
				if (potentialIndex > options.length - 1) {
					focusedIndex = options.length - 1;
				} else {
					focusedIndex = potentialIndex;
				}
			}

			if (focusedIndex === -1) {
				focusedIndex = 0;
			}

			this.setState({
				focusedIndex: options[focusedIndex].index,
				focusedOption: options[focusedIndex].option
			});
		}
	}, {
		key: 'getFocusedOption',
		value: function getFocusedOption() {
			return this._focusedOption;
		}
	}, {
		key: 'getInputValue',
		value: function getInputValue() {
			return this.state.inputValue;
		}
	}, {
		key: 'selectFocusedOption',
		value: function selectFocusedOption() {
			if (this._focusedOption) {
				return this.selectValue(this._focusedOption);
			}
		}
	}, {
		key: 'renderLoading',
		value: function renderLoading() {
			if (!this.props.isLoading) return;

			return _react2['default'].createElement(
				'span',
				{ className: 'Select-loading-zone' },
				_react2['default'].createElement('span', { className: 'Select-loading' })
			);
		}
	}, {
		key: 'renderFloatingLabel',
		value: function renderFloatingLabel() {
			if (!this.props.floatingLabelText) return;

			var styles = getStyles(this.props, this.state);

			return _react2['default'].createElement(
				_TextFieldLabel2['default'],
				{
					style: _extends(styles.floatingLabel, this.props.floatingLabelStyle, this.state.hasValue || this.state.isFocused ? this.props.floatingLabelFocusStyle : null),
					shrinkStyle: this.props.floatingLabelShrinkStyle,
					htmlFor: 'TextFieldLabel',
					shrink: this.state.hasValue || this.state.isFocused || this.props.floatingLabelFixed,
					disabled: this.props.disabled
				},
				this.props.floatingLabelText
			);
		}
	}, {
		key: 'renderErrorText',
		value: function renderErrorText() {
			if (!this.props.errorText) return;
			var styles = getStyles(this.props, this.state);
			return _react2['default'].createElement(
				'label',
				{ className: this.props.errorClassName, style: _extends(styles.error, this.props.errorStyle) },
				this.props.errorText
			);
		}
	}, {
		key: 'renderValue',
		value: function renderValue(valueArray, isOpen) {
			var _this4 = this;

			var renderLabel = this.props.valueRenderer || this.getOptionLabel;
			var ValueComponent = this.props.valueComponent;
			if (!valueArray.length) {
				if (this.props.floatingLabelText) return null;

				return !this.state.inputValue ? _react2['default'].createElement(
					'div',
					{ className: 'Select-placeholder' },
					this.props.placeholder
				) : null;
			}
			var onClick = this.props.onValueClick ? this.handleValueClick : null;
			if (this.props.multi) {
				return valueArray.map(function (value, i) {
					// key={`value-${i}-${value[this.props.valueKey]}`}
					return _react2['default'].createElement(
						ValueComponent,
						{
							id: _this4._instancePrefix + '-value-' + i,
							instancePrefix: _this4._instancePrefix,
							disabled: _this4.props.disabled || value.clearableValue === false,
							key: i,
							onClick: onClick,
							onRemove: _this4.removeValue,
							value: value },
						renderLabel(value, i),
						_react2['default'].createElement(
							'span',
							{ className: 'Select-aria-only' },
							' '
						)
					);
				});
			} else if (!this.state.inputValue) {
				if (isOpen) onClick = null;
				return _react2['default'].createElement(
					ValueComponent,
					{
						id: this._instancePrefix + '-value-item',
						disabled: this.props.disabled,
						instancePrefix: this._instancePrefix,
						onClick: onClick,
						value: valueArray[0]
					},
					renderLabel(valueArray[0])
				);
			}
		}
	}, {
		key: 'renderInput',
		value: function renderInput(valueArray, focusedOptionIndex) {
			var _classNames,
			    _this5 = this;

			var className = (0, _classnames2['default'])('Select-input', this.props.inputProps.className);
			var isOpen = !!this.state.isOpen;

			var ariaOwns = (0, _classnames2['default'])((_classNames = {}, _defineProperty(_classNames, this._instancePrefix + '-list', isOpen), _defineProperty(_classNames, this._instancePrefix + '-backspace-remove-message', this.props.multi && !this.props.disabled && this.state.isFocused && !this.state.inputValue), _classNames));

			// TODO: Check how this project includes Object.assign()
			var inputProps = _extends({}, this.props.inputProps, {
				role: 'combobox',
				'aria-expanded': '' + isOpen,
				'aria-owns': ariaOwns,
				'aria-haspopup': '' + isOpen,
				'aria-activedescendant': isOpen ? this._instancePrefix + '-option-' + focusedOptionIndex : this._instancePrefix + '-value',
				'aria-describedby': this.props['aria-describedby'],
				'aria-labelledby': this.props['aria-labelledby'],
				'aria-label': this.props['aria-label'],
				className: className,
				tabIndex: this.props.tabIndex,
				onBlur: this.handleInputBlur,
				onChange: this.handleInputChange,
				onFocus: this.handleInputFocus,
				ref: function ref(_ref) {
					return _this5.input = _ref;
				},
				required: this.state.required,
				value: this.state.inputValue,
				style: this.props.inputStyle
			});

			if (this.props.inputRenderer) {
				return this.props.inputRenderer(inputProps);
			}

			if (this.props.disabled || !this.props.searchable) {
				var _props$inputProps = this.props.inputProps;
				var inputClassName = _props$inputProps.inputClassName;

				var divProps = _objectWithoutProperties(_props$inputProps, ['inputClassName']);

				return _react2['default'].createElement('div', _extends({}, divProps, {
					role: 'combobox',
					className: className,
					tabIndex: this.props.tabIndex || 0,
					onFocus: this.handleInputFocus,
					ref: function (node) {
						return _this5.input = node;
					},
					style: { border: 0, width: 1, display: 'inline-block' } }));
			}

			return _react2['default'].createElement(
				'div',
				{ className: className, style: this.props.inputWrapperStyle },
				_react2['default'].createElement('input', inputProps)
			);
		}
	}, {
		key: 'renderClear',
		value: function renderClear() {
			if (!this.props.clearable || this.props.value === undefined || this.props.value === null || this.props.multi && !this.props.value.length || this.props.disabled || this.props.isLoading) return;
			var clear = this.props.clearRenderer();

			return _react2['default'].createElement(
				'span',
				{ className: 'Select-clear-zone', title: this.props.multi ? this.props.clearAllText : this.props.clearValueText,
					onMouseDown: this.clearValue,
					onTouchStart: this.handleTouchStart,
					onTouchMove: this.handleTouchMove,
					onTouchEnd: this.handleTouchEndClearValue },
				clear
			);
		}
	}, {
		key: 'renderArrow',
		value: function renderArrow() {
			if (this.props.hideArrow) return null;

			var onMouseDown = this.handleMouseDownOnArrow;
			var isOpen = this.state.isOpen;
			var arrow = this.props.arrowRenderer({ onMouseDown: onMouseDown, isOpen: isOpen });

			return _react2['default'].createElement(
				'span',
				{
					className: 'Select-arrow-zone',
					onMouseDown: onMouseDown },
				arrow
			);
		}
	}, {
		key: 'filterOptions',
		value: function filterOptions(excludeOptions) {
			var filterValue = this.state.inputValue;
			var options = this.props.options || [];
			if (this.props.filterOptions) {
				// Maintain backwards compatibility with boolean attribute
				var filterOptions = typeof this.props.filterOptions === 'function' ? this.props.filterOptions : _utilsDefaultFilterOptions2['default'];

				return filterOptions(options, filterValue, excludeOptions, {
					filterOption: this.props.filterOption,
					ignoreCase: this.props.ignoreCase,
					labelKey: this.props.labelKey,
					matchPos: this.props.matchPos,
					matchProp: this.props.matchProp,
					valueKey: this.props.valueKey
				});
			} else {
				return options;
			}
		}
	}, {
		key: 'onOptionRef',
		value: function onOptionRef(ref, isFocused) {
			if (isFocused) {
				this.state.focused = ref;
			}
		}
	}, {
		key: 'renderMenu',
		value: function renderMenu(options, valueArray, focusedOption) {
			if (options && options.length) {
				return this.props.menuRenderer({
					focusedOption: focusedOption,
					focusOption: this.focusOption,
					instancePrefix: this._instancePrefix,
					labelKey: this.props.labelKey,
					onFocus: this.focusOption,
					onSelect: this.selectValue,
					optionClassName: this.props.optionClassName,
					optionComponent: this.props.optionComponent,
					optionRenderer: this.props.optionRenderer || this.getOptionLabel,
					options: options,
					selectValue: this.selectValue,
					valueArray: valueArray,
					valueKey: this.props.valueKey,
					onOptionRef: this.onOptionRef
				});
			} else if (this.props.noResultsText) {
				return _react2['default'].createElement(
					'div',
					{ className: 'Select-noresults' },
					this.props.noResultsText
				);
			} else {
				return null;
			}
		}
	}, {
		key: 'renderHiddenField',
		value: function renderHiddenField(valueArray) {
			var _this6 = this;

			if (!this.props.name) return;
			if (this.props.joinValues) {
				var value = valueArray.map(function (i) {
					return stringifyValue(i[_this6.props.valueKey]);
				}).join(this.props.delimiter);
				return _react2['default'].createElement('input', {
					type: 'hidden',
					ref: function (ref) {
						return _this6.value = ref;
					},
					name: this.props.name,
					value: value,
					disabled: this.props.disabled });
			}
			return valueArray.map(function (item, index) {
				return _react2['default'].createElement('input', { key: 'hidden.' + index,
					type: 'hidden',
					ref: 'value' + index,
					name: _this6.props.name,
					value: stringifyValue(item[_this6.props.valueKey]),
					disabled: _this6.props.disabled });
			});
		}
	}, {
		key: 'getFocusableOptionIndex',
		value: function getFocusableOptionIndex(selectedOption) {
			var options = this._visibleOptions;
			if (!options.length) return null;

			var valueKey = this.props.valueKey;
			var focusedOption = this.state.focusedOption || selectedOption;
			if (focusedOption && !focusedOption.disabled) {
				var focusedOptionIndex = -1;
				options.some(function (option, index) {
					var isOptionEqual = option[valueKey] === focusedOption[valueKey];
					if (isOptionEqual) {
						focusedOptionIndex = index;
					}
					return isOptionEqual;
				});
				if (focusedOptionIndex !== -1) {
					return focusedOptionIndex;
				}
			}

			for (var i = 0; i < options.length; i++) {
				if (!options[i].disabled) return i;
			}
			return null;
		}
	}, {
		key: 'renderOuter',
		value: function renderOuter(options, valueArray, focusedOption) {
			var _this7 = this;

			var menu = this.renderMenu(options, valueArray, focusedOption);
			if (!menu) {
				return null;
			}

			return _react2['default'].createElement(
				'div',
				{ ref: function (ref) {
						return _this7.menuContainer = ref;
					}, className: 'Select-menu-outer', style: this.props.menuContainerStyle },
				_react2['default'].createElement(
					'div',
					{ ref: function (ref) {
							return _this7.menu = ref;
						}, role: 'listbox', className: 'Select-menu', id: this._instancePrefix + '-list',
						style: this.props.menuStyle,
						onScroll: this.handleMenuScroll,
						onMouseDown: this.handleMouseDownOnMenu },
					menu
				)
			);
		}
	}, {
		key: 'render',
		value: function render() {
			var _this8 = this;

			var valueArray = this.getValueArray(this.props.value);
			var options = this._visibleOptions = this.filterOptions(this.props.multi ? this.getValueArray(this.props.value) : null);
			var isOpen = this.state.isOpen;
			if (this.props.multi && !options.length && valueArray.length && !this.state.inputValue) isOpen = false;
			var focusedOptionIndex = this.getFocusableOptionIndex(valueArray[0]);

			var focusedOption = null;
			if (focusedOptionIndex !== null) {
				focusedOption = this._focusedOption = options[focusedOptionIndex];
			} else {
				focusedOption = this._focusedOption = null;
			}
			var className = (0, _classnames2['default'])('Select', this.props.className, {
				'Select--multi': this.props.multi,
				'Select--single': !this.props.multi,
				'is-clearable': this.props.clearable,
				'is-disabled': this.props.disabled,
				'is-focused': this.state.isFocused,
				'is-loading': this.props.isLoading,
				'is-open': isOpen,
				'is-pseudo-focused': this.state.isPseudoFocused,
				'is-searchable': this.props.searchable,
				'has-value': valueArray.length
			});

			var removeMessage = null;
			if (this.props.multi && !this.props.disabled && valueArray.length && !this.state.inputValue && this.state.isFocused && this.props.backspaceRemoves) {
				removeMessage = _react2['default'].createElement(
					'span',
					{ id: this._instancePrefix + '-backspace-remove-message', className: 'Select-aria-only' },
					this.props.backspaceToRemoveMessage.replace('{label}', valueArray[valueArray.length - 1][this.props.labelKey])
				);
			}

			return _react2['default'].createElement(
				'div',
				{ ref: function (node) {
						return _this8.wrapper = node;
					},
					className: className,
					style: this.props.wrapperStyle },
				this.renderHiddenField(valueArray),
				_react2['default'].createElement(
					'div',
					{ ref: function (node) {
							return _this8.control = node;
						},
						className: 'Select-control',
						style: this.props.style,
						onKeyDown: this.handleKeyDown,
						onMouseDown: this.handleMouseDown,
						onTouchEnd: this.handleTouchEnd,
						onTouchStart: this.handleTouchStart,
						onTouchMove: this.handleTouchMove },
					this.renderFloatingLabel(),
					_react2['default'].createElement(
						'span',
						{ className: 'Select-multi-value-wrapper', id: this._instancePrefix + '-value' },
						this.renderValue(valueArray, isOpen),
						this.renderInput(valueArray, focusedOptionIndex)
					),
					removeMessage,
					this.renderLoading(),
					this.renderClear(),
					this.renderArrow()
				),
				isOpen ? this.renderOuter(options, !this.props.multi ? valueArray : null, focusedOption) : null,
				this.renderErrorText()
			);
		}
	}]);

	return Select;
})(_react.Component);

Select.propTypes = propTypes;
Select.defaultProps = defaultProps;
Select.Async = _Async2['default'];

exports['default'] = Select;
module.exports = exports['default'];

},{"./Async":1,"./Option":2,"./TextFieldLabel":3,"./Value":4,"./styles/transitions":5,"./utils/defaultArrowRenderer":6,"./utils/defaultClearRenderer":7,"./utils/defaultFilterOptions":8,"./utils/defaultMenuRenderer":9,"classnames":undefined,"prop-types":undefined,"react":undefined,"react-dom":undefined}]},{},[])
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvVXNlcnMvamVyZW15L3dvcmtzcGFjZS90aGVudWxseS9yZWFjdC1zZWxlY3Qvc3JjL0FzeW5jLmpzIiwiL1VzZXJzL2plcmVteS93b3Jrc3BhY2UvdGhlbnVsbHkvcmVhY3Qtc2VsZWN0L3NyYy9PcHRpb24uanMiLCIvVXNlcnMvamVyZW15L3dvcmtzcGFjZS90aGVudWxseS9yZWFjdC1zZWxlY3Qvc3JjL1RleHRGaWVsZExhYmVsLmpzIiwiL1VzZXJzL2plcmVteS93b3Jrc3BhY2UvdGhlbnVsbHkvcmVhY3Qtc2VsZWN0L3NyYy9WYWx1ZS5qcyIsIi9Vc2Vycy9qZXJlbXkvd29ya3NwYWNlL3RoZW51bGx5L3JlYWN0LXNlbGVjdC9zcmMvc3R5bGVzL3RyYW5zaXRpb25zLmpzIiwiL1VzZXJzL2plcmVteS93b3Jrc3BhY2UvdGhlbnVsbHkvcmVhY3Qtc2VsZWN0L3NyYy91dGlscy9kZWZhdWx0QXJyb3dSZW5kZXJlci5qcyIsIi9Vc2Vycy9qZXJlbXkvd29ya3NwYWNlL3RoZW51bGx5L3JlYWN0LXNlbGVjdC9zcmMvdXRpbHMvZGVmYXVsdENsZWFyUmVuZGVyZXIuanMiLCIvVXNlcnMvamVyZW15L3dvcmtzcGFjZS90aGVudWxseS9yZWFjdC1zZWxlY3Qvc3JjL3V0aWxzL2RlZmF1bHRGaWx0ZXJPcHRpb25zLmpzIiwiL1VzZXJzL2plcmVteS93b3Jrc3BhY2UvdGhlbnVsbHkvcmVhY3Qtc2VsZWN0L3NyYy91dGlscy9kZWZhdWx0TWVudVJlbmRlcmVyLmpzIiwiL1VzZXJzL2plcmVteS93b3Jrc3BhY2UvdGhlbnVsbHkvcmVhY3Qtc2VsZWN0L3NyYy9TZWxlY3QuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7cUJDQWlDLE9BQU87Ozs7eUJBQ2xCLFlBQVk7Ozs7c0JBQ2YsVUFBVTs7OztBQUU3QixJQUFNLFNBQVMsR0FBRztBQUNqQixT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QUMsZUFBZSxBQUFDO0tBQ25DLElBQUksQ0FBQyxtQkFBbUIsRUFBRTtLQUMzQjs7UUFBTSxTQUFTLEVBQUMsNEJBQTRCLEVBQUMsRUFBRSxFQUFFLElBQUksQ0FBQyxlQUFlLEdBQUcsUUFBUSxBQUFDO01BQy9FLElBQUksQ0FBQyxXQUFXLENBQUMsVUFBVSxFQUFFLE1BQU0sQ0FBQztNQUNwQyxJQUFJLENBQUMsV0FBVyxDQUFDLFVBQVUsRUFBRSxrQkFBa0IsQ0FBQztNQUMzQztLQUNOLGFBQWE7S0FDYixJQUFJLENBQUMsYUFBYSxFQUFFO0tBQ3BCLElBQUksQ0FBQyxXQUFXLEVBQUU7S0FDbEIsSUFBSSxDQUFDLFdBQVcsRUFBRTtLQUNkO0lBQ0wsTUFBTSxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsT0FBTyxFQUFFLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLEdBQUcsVUFBVSxHQUFHLElBQUksRUFBRSxhQUFhLENBQUMsR0FBRyxJQUFJO0lBQy9GLElBQUksQ0FBQyxlQUFlLEVBQUU7SUFDbEIsQ0FDTDtHQUNGOzs7UUEvL0JJLE1BQU07OztBQWtnQ1osTUFBTSxDQUFDLFNBQVMsR0FBRyxTQUFTLENBQUM7QUFDN0IsTUFBTSxDQUFDLFlBQVksR0FBRyxZQUFZLENBQUM7QUFDbkMsTUFBTSxDQUFDLEtBQUsscUJBQVEsQ0FBQzs7cUJBRU4sTUFBTSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJpbXBvcnQgUmVhY3QsIHsgQ29tcG9uZW50IH0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IFByb3BUeXBlcyBmcm9tICdwcm9wLXR5cGVzJztcbmltcG9ydCBTZWxlY3QgZnJvbSAnLi9TZWxlY3QnO1xuXG5jb25zdCBwcm9wVHlwZXMgPSB7XG5cdGF1dG9sb2FkOiBQcm9wVHlwZXMuYm9vbC5pc1JlcXVpcmVkLCAgICAgICAvLyBhdXRvbWF0aWNhbGx5IGNhbGwgdGhlIGBsb2FkT3B0aW9uc2AgcHJvcCBvbi1tb3VudDsgZGVmYXVsdHMgdG8gdHJ1ZVxuXHRjYWNoZTogUHJvcFR5cGVzLmFueSwgICAgICAgICAgICAgICAgICAgICAgLy8gb2JqZWN0IHRvIHVzZSB0byBjYWNoZSByZXN1bHRzOyBzZXQgdG8gbnVsbC9mYWxzZSB0byBkaXNhYmxlIGNhY2hpbmdcblx0Y2hpbGRyZW46IFByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsICAgICAgIC8vIENoaWxkIGZ1bmN0aW9uIHJlc3BvbnNpYmxlIGZvciBjcmVhdGluZyB0aGUgaW5uZXIgU2VsZWN0IGNvbXBvbmVudDsgKHByb3BzOiBPYmplY3QpOiBQcm9wVHlwZXMuZWxlbWVudFxuXHRpZ25vcmVBY2NlbnRzOiBQcm9wVHlwZXMuYm9vbCwgICAgICAgICAgICAgLy8gc3RyaXAgZGlhY3JpdGljcyB3aGVuIGZpbHRlcmluZzsgZGVmYXVsdHMgdG8gdHJ1ZVxuXHRpZ25vcmVDYXNlOiBQcm9wVHlwZXMuYm9vbCwgICAgICAgICAgICAgICAgLy8gcGVyZm9ybSBjYXNlLWluc2Vuc2l0aXZlIGZpbHRlcmluZzsgZGVmYXVsdHMgdG8gdHJ1ZVxuXHRsb2FkaW5nUGxhY2Vob2xkZXI6IFByb3BUeXBlcy5vbmVPZlR5cGUoWyAgLy8gcmVwbGFjZXMgdGhlIHBsYWNlaG9sZGVyIHdoaWxlIG9wdGlvbnMgYXJlIGxvYWRpbmdcblx0XHRQcm9wVHlwZXMuc3RyaW5nLFxuXHRcdFByb3BUeXBlcy5ub2RlXG5cdF0pLFxuXHRsb2FkT3B0aW9uczogUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCwgICAgLy8gY2FsbGJhY2sgdG8gbG9hZCBvcHRpb25zIGFzeW5jaHJvbm91c2x5OyAoaW5wdXRWYWx1ZTogc3RyaW5nLCBjYWxsYmFjazogRnVuY3Rpb24pOiA/UHJvbWlzZVxuXHRtdWx0aTogUHJvcFR5cGVzLmJvb2wsICAgICAgICAgICAgICAgICAgICAgLy8gbXVsdGktdmFsdWUgaW5wdXRcblx0b3B0aW9uczogUHJvcFR5cGVzLmFycmF5LmlzUmVxdWlyZWQsICAgICAgICAgICAgIC8vIGFycmF5IG9mIG9wdGlvbnNcblx0cGxhY2Vob2xkZXI6IFByb3BUeXBlcy5vbmVPZlR5cGUoWyAgICAgICAgIC8vIGZpZWxkIHBsYWNlaG9sZGVyLCBkaXNwbGF5ZWQgd2hlbiB0aGVyZSdzIG5vIHZhbHVlIChzaGFyZWQgd2l0aCBTZWxlY3QpXG5cdFx0UHJvcFR5cGVzLnN0cmluZyxcblx0XHRQcm9wVHlwZXMubm9kZVxuXHRdKSxcblx0bm9SZXN1bHRzVGV4dDogUHJvcFR5cGVzLm9uZU9mVHlwZShbICAgICAgIC8vIGZpZWxkIG5vUmVzdWx0c1RleHQsIGRpc3BsYXllZCB3aGVuIG5vIG9wdGlvbnMgY29tZSBiYWNrIGZyb20gdGhlIHNlcnZlclxuXHRcdFByb3BUeXBlcy5zdHJpbmcsXG5cdFx0UHJvcFR5cGVzLm5vZGVcblx0XSksXG5cdG9uQ2hhbmdlOiBQcm9wVHlwZXMuZnVuYywgICAgICAgICAgICAgICAgICAvLyBvbkNoYW5nZSBoYW5kbGVyOiBmdW5jdGlvbiAobmV3VmFsdWUpIHt9XG5cdHNlYXJjaFByb21wdFRleHQ6IFByb3BUeXBlcy5vbmVPZlR5cGUoWyAgICAvLyBsYWJlbCB0byBwcm9tcHQgZm9yIHNlYXJjaCBpbnB1dFxuXHRcdFByb3BUeXBlcy5zdHJpbmcsXG5cdFx0UHJvcFR5cGVzLm5vZGVcblx0XSksXG5cdG9uSW5wdXRDaGFuZ2U6IFByb3BUeXBlcy5mdW5jLCAgICAgICAgICAgICAvLyBvcHRpb25hbCBmb3Iga2VlcGluZyB0cmFjayBvZiB3aGF0IGlzIGJlaW5nIHR5cGVkXG5cdHZhbHVlOiBQcm9wVHlwZXMuYW55LCAgICAgICAgICAgICAgICAgICAgICAvLyBpbml0aWFsIGZpZWxkIHZhbHVlXG59O1xuY29uc3QgZGVmYXVsdENhY2hlID0ge307XG5jb25zdCBkZWZhdWx0UHJvcHMgPSB7XG5cdGF1dG9sb2FkOiB0cnVlLFxuXHRjYWNoZTogZGVmYXVsdENhY2hlLFxuXHRjaGlsZHJlbjogKHByb3BzKSA9PiB7XG5cdFx0cmV0dXJuIDxTZWxlY3Qgey4uLnByb3BzfSAvPjtcblx0fSxcblx0aWdub3JlQWNjZW50czogdHJ1ZSxcblx0aWdub3JlQ2FzZTogdHJ1ZSxcblx0bG9hZGluZ1BsYWNlaG9sZGVyOiAnTG9hZGluZy4uLicsXG5cdG9wdGlvbnM6IFtdLFxuXHRzZWFyY2hQcm9tcHRUZXh0OiAnVHlwZSB0byBzZWFyY2gnLFxufTtcblxuY2xhc3MgQXN5bmMgZXh0ZW5kcyBDb21wb25lbnQge1xuXHRjb25zdHJ1Y3RvciAocHJvcHMsIGNvbnRleHQpIHtcblx0XHRzdXBlcihwcm9wcywgY29udGV4dCk7XG5cblx0XHR0aGlzLl9jYWNoZSA9IHByb3BzLmNhY2hlID09PSBkZWZhdWx0Q2FjaGUgPyB7fSA6IHByb3BzLmNhY2hlO1xuXG5cdFx0dGhpcy5zdGF0ZSA9IHtcblx0XHRcdGlzTG9hZGluZzogZmFsc2UsXG5cdFx0XHRvcHRpb25zOiBwcm9wcy5vcHRpb25zLFxuXHRcdH07XG5cblx0XHR0aGlzLl9vbklucHV0Q2hhbmdlID0gdGhpcy5fb25JbnB1dENoYW5nZS5iaW5kKHRoaXMpO1xuXHR9XG5cblx0Y29tcG9uZW50RGlkTW91bnQgKCkge1xuXHRcdGNvbnN0IHsgYXV0b2xvYWQgfSA9IHRoaXMucHJvcHM7XG5cblx0XHRpZiAoYXV0b2xvYWQpIHtcblx0XHRcdHRoaXMubG9hZE9wdGlvbnMoJycpO1xuXHRcdH1cblx0fVxuXG5cdGNvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHMobmV4dFByb3BzKSB7XG5cdFx0aWYgKG5leHRQcm9wcy5vcHRpb25zICE9PSB0aGlzLnByb3BzLm9wdGlvbnMpIHtcblx0XHRcdHRoaXMuc2V0U3RhdGUoe1xuXHRcdFx0XHRvcHRpb25zOiBuZXh0UHJvcHMub3B0aW9ucyxcblx0XHRcdH0pO1xuXHRcdH1cblx0fVxuXG5cdGNsZWFyT3B0aW9ucygpIHtcblx0XHR0aGlzLnNldFN0YXRlKHsgb3B0aW9uczogW10gfSk7XG5cdH1cblxuXHRsb2FkT3B0aW9ucyAoaW5wdXRWYWx1ZSkge1xuXHRcdGNvbnN0IHsgbG9hZE9wdGlvbnMgfSA9IHRoaXMucHJvcHM7XG5cdFx0Y29uc3QgY2FjaGUgPSB0aGlzLl9jYWNoZTtcblxuXHRcdGlmIChcblx0XHRcdGNhY2hlICYmXG5cdFx0XHRjYWNoZS5oYXNPd25Qcm9wZXJ0eShpbnB1dFZhbHVlKVxuXHRcdCkge1xuXHRcdFx0dGhpcy5zZXRTdGF0ZSh7XG5cdFx0XHRcdG9wdGlvbnM6IGNhY2hlW2lucHV0VmFsdWVdXG5cdFx0XHR9KTtcblxuXHRcdFx0cmV0dXJuO1xuXHRcdH1cblxuXHRcdGNvbnN0IGNhbGxiYWNrID0gKGVycm9yLCBkYXRhKSA9PiB7XG5cdFx0XHRpZiAoY2FsbGJhY2sgPT09IHRoaXMuX2NhbGxiYWNrKSB7XG5cdFx0XHRcdHRoaXMuX2NhbGxiYWNrID0gbnVsbDtcblxuXHRcdFx0XHRjb25zdCBvcHRpb25zID0gZGF0YSAmJiBkYXRhLm9wdGlvbnMgfHwgW107XG5cblx0XHRcdFx0aWYgKGNhY2hlKSB7XG5cdFx0XHRcdFx0Y2FjaGVbaW5wdXRWYWx1ZV0gPSBvcHRpb25zO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0dGhpcy5zZXRTdGF0ZSh7XG5cdFx0XHRcdFx0aXNMb2FkaW5nOiBmYWxzZSxcblx0XHRcdFx0XHRvcHRpb25zXG5cdFx0XHRcdH0pO1xuXHRcdFx0fVxuXHRcdH07XG5cblx0XHQvLyBJZ25vcmUgYWxsIGJ1dCB0aGUgbW9zdCByZWNlbnQgcmVxdWVzdFxuXHRcdHRoaXMuX2NhbGxiYWNrID0gY2FsbGJhY2s7XG5cblx0XHRjb25zdCBwcm9taXNlID0gbG9hZE9wdGlvbnMoaW5wdXRWYWx1ZSwgY2FsbGJhY2spO1xuXHRcdGlmIChwcm9taXNlKSB7XG5cdFx0XHRwcm9taXNlLnRoZW4oXG5cdFx0XHRcdChkYXRhKSA9PiBjYWxsYmFjayhudWxsLCBkYXRhKSxcblx0XHRcdFx0KGVycm9yKSA9PiBjYWxsYmFjayhlcnJvcilcblx0XHRcdCk7XG5cdFx0fVxuXG5cdFx0aWYgKFxuXHRcdFx0dGhpcy5fY2FsbGJhY2sgJiZcblx0XHRcdCF0aGlzLnN0YXRlLmlzTG9hZGluZ1xuXHRcdCkge1xuXHRcdFx0dGhpcy5zZXRTdGF0ZSh7XG5cdFx0XHRcdGlzTG9hZGluZzogdHJ1ZVxuXHRcdFx0fSk7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIGlucHV0VmFsdWU7XG5cdH1cblxuXHRfb25JbnB1dENoYW5nZSAoaW5wdXRWYWx1ZSkge1xuXHRcdGNvbnN0IHsgaWdub3JlQWNjZW50cywgaWdub3JlQ2FzZSwgb25JbnB1dENoYW5nZSB9ID0gdGhpcy5wcm9wcztcblxuXHRcdGlmIChpZ25vcmVDYXNlKSB7XG5cdFx0XHRpbnB1dFZhbHVlID0gaW5wdXRWYWx1ZS50b0xvd2VyQ2FzZSgpO1xuXHRcdH1cblxuXHRcdGlmIChvbklucHV0Q2hhbmdlKSB7XG5cdFx0XHRvbklucHV0Q2hhbmdlKGlucHV0VmFsdWUpO1xuXHRcdH1cblxuXHRcdHJldHVybiB0aGlzLmxvYWRPcHRpb25zKGlucHV0VmFsdWUpO1xuXHR9XG5cblx0aW5wdXRWYWx1ZSgpIHtcblx0XHRpZiAodGhpcy5zZWxlY3QpIHtcblx0XHRcdHJldHVybiB0aGlzLnNlbGVjdC5zdGF0ZS5pbnB1dFZhbHVlO1xuXHRcdH1cblx0XHRyZXR1cm4gJyc7XG5cdH1cblxuXHRub1Jlc3VsdHNUZXh0KCkge1xuXHRcdGNvbnN0IHsgbG9hZGluZ1BsYWNlaG9sZGVyLCBub1Jlc3VsdHNUZXh0LCBzZWFyY2hQcm9tcHRUZXh0IH0gPSB0aGlzLnByb3BzO1xuXHRcdGNvbnN0IHsgaXNMb2FkaW5nIH0gPSB0aGlzLnN0YXRlO1xuXG5cdFx0Y29uc3QgaW5wdXRWYWx1ZSA9IHRoaXMuaW5wdXRWYWx1ZSgpO1xuXG5cdFx0aWYgKGlzTG9hZGluZykge1xuXHRcdFx0cmV0dXJuIGxvYWRpbmdQbGFjZWhvbGRlcjtcblx0XHR9XG5cdFx0aWYgKGlucHV0VmFsdWUgJiYgbm9SZXN1bHRzVGV4dCkge1xuXHRcdFx0cmV0dXJuIG5vUmVzdWx0c1RleHQ7XG5cdFx0fVxuXHRcdHJldHVybiBzZWFyY2hQcm9tcHRUZXh0O1xuXHR9XG5cblx0Zm9jdXMgKCkge1xuXHRcdHRoaXMuc2VsZWN0LmZvY3VzKCk7XG5cdH1cblxuXHRyZW5kZXIgKCkge1xuXHRcdGNvbnN0IHsgY2hpbGRyZW4sIGxvYWRpbmdQbGFjZWhvbGRlciwgcGxhY2Vob2xkZXIgfSA9IHRoaXMucHJvcHM7XG5cdFx0Y29uc3QgeyBpc0xvYWRpbmcsIG9wdGlvbnMgfSA9IHRoaXMuc3RhdGU7XG5cblx0XHRjb25zdCBwcm9wcyA9IHtcblx0XHRcdG5vUmVzdWx0c1RleHQ6IHRoaXMubm9SZXN1bHRzVGV4dCgpLFxuXHRcdFx0cGxhY2Vob2xkZXI6IGlzTG9hZGluZyA/IGxvYWRpbmdQbGFjZWhvbGRlciA6IHBsYWNlaG9sZGVyLFxuXHRcdFx0b3B0aW9uczogKGlzTG9hZGluZyAmJiBsb2FkaW5nUGxhY2Vob2xkZXIpID8gW10gOiBvcHRpb25zLFxuXHRcdFx0cmVmOiAocmVmKSA9PiAodGhpcy5zZWxlY3QgPSByZWYpLFxuXHRcdFx0b25DaGFuZ2U6IChuZXdWYWx1ZXMpID0+IHtcblx0XHRcdFx0aWYgKHRoaXMucHJvcHMubXVsdGkgJiYgdGhpcy5wcm9wcy52YWx1ZSAmJiAobmV3VmFsdWVzLmxlbmd0aCA+IHRoaXMucHJvcHMudmFsdWUubGVuZ3RoKSkge1xuXHRcdFx0XHRcdHRoaXMuY2xlYXJPcHRpb25zKCk7XG5cdFx0XHRcdH1cblx0XHRcdFx0dGhpcy5wcm9wcy5vbkNoYW5nZShuZXdWYWx1ZXMpO1xuXHRcdFx0fVxuXHRcdH07XG5cblx0XHRyZXR1cm4gY2hpbGRyZW4oe1xuXHRcdFx0Li4udGhpcy5wcm9wcyxcblx0XHRcdC4uLnByb3BzLFxuXHRcdFx0aXNMb2FkaW5nLFxuXHRcdFx0b25JbnB1dENoYW5nZTogdGhpcy5fb25JbnB1dENoYW5nZVxuXHRcdH0pO1xuXHR9XG59XG5cbkFzeW5jLnByb3BUeXBlcyA9IHByb3BUeXBlcztcbkFzeW5jLmRlZmF1bHRQcm9wcyA9IGRlZmF1bHRQcm9wcztcblxuZXhwb3J0IGRlZmF1bHQgQXN5bmM7XG5cbiIsImltcG9ydCBSZWFjdCwgeyBDb21wb25lbnQgfSBmcm9tICdyZWFjdCc7XG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gJ3Byb3AtdHlwZXMnO1xuaW1wb3J0IGNsYXNzTmFtZXMgZnJvbSAnY2xhc3NuYW1lcyc7XG5cbmNvbnN0IHByb3BUeXBlcyA9IHtcblx0Y2hpbGRyZW46IFByb3BUeXBlcy5ub2RlLFxuXHRjbGFzc05hbWU6IFByb3BUeXBlcy5zdHJpbmcsICAgICAgICAgICAgIC8vIGNsYXNzTmFtZSAoYmFzZWQgb24gbW91c2UgcG9zaXRpb24pXG5cdGluc3RhbmNlUHJlZml4OiBQcm9wVHlwZXMuc3RyaW5nLmlzUmVxdWlyZWQsICAvLyB1bmlxdWUgcHJlZml4IGZvciB0aGUgaWRzICh1c2VkIGZvciBhcmlhKVxuXHRpc0Rpc2FibGVkOiBQcm9wVHlwZXMuYm9vbCwgICAgICAgICAgICAgIC8vIHRoZSBvcHRpb24gaXMgZGlzYWJsZWRcblx0aXNGb2N1c2VkOiBQcm9wVHlwZXMuYm9vbCwgICAgICAgICAgICAgICAvLyB0aGUgb3B0aW9uIGlzIGZvY3VzZWRcblx0aXNTZWxlY3RlZDogUHJvcFR5cGVzLmJvb2wsICAgICAgICAgICAgICAvLyB0aGUgb3B0aW9uIGlzIHNlbGVjdGVkXG5cdG9uRm9jdXM6IFByb3BUeXBlcy5mdW5jLCAgICAgICAgICAgICAgICAgLy8gbWV0aG9kIHRvIGhhbmRsZSBtb3VzZUVudGVyIG9uIG9wdGlvbiBlbGVtZW50XG5cdG9uU2VsZWN0OiBQcm9wVHlwZXMuZnVuYywgICAgICAgICAgICAgICAgLy8gbWV0aG9kIHRvIGhhbmRsZSBjbGljayBvbiBvcHRpb24gZWxlbWVudFxuXHRvblVuZm9jdXM6IFByb3BUeXBlcy5mdW5jLCAgICAgICAgICAgICAgIC8vIG1ldGhvZCB0byBoYW5kbGUgbW91c2VMZWF2ZSBvbiBvcHRpb24gZWxlbWVudFxuXHRvcHRpb246IFByb3BUeXBlcy5vYmplY3QuaXNSZXF1aXJlZCwgICAgIC8vIG9iamVjdCB0aGF0IGlzIGJhc2UgZm9yIHRoYXQgb3B0aW9uXG5cdG9wdGlvbkluZGV4OiBQcm9wVHlwZXMubnVtYmVyLCAgICAgICAgICAgLy8gaW5kZXggb2YgdGhlIG9wdGlvbiwgdXNlZCB0byBnZW5lcmF0ZSB1bmlxdWUgaWRzIGZvciBhcmlhXG59O1xuY29uc3QgZGVmYXVsdFByb3BzID0ge307XG5cbmNsYXNzIE9wdGlvbiBleHRlbmRzIENvbXBvbmVudCB7XG5cdGNvbnN0cnVjdG9yKHByb3BzKSB7XG5cdFx0c3VwZXIocHJvcHMpO1xuXHRcdHRoaXMuaGFuZGxlTW91c2VEb3duID0gdGhpcy5oYW5kbGVNb3VzZURvd24uYmluZCh0aGlzKTtcblx0XHR0aGlzLmhhbmRsZU1vdXNlRW50ZXIgPSB0aGlzLmhhbmRsZU1vdXNlRW50ZXIuYmluZCh0aGlzKTtcblx0XHR0aGlzLmhhbmRsZU1vdXNlTW92ZSA9IHRoaXMuaGFuZGxlTW91c2VNb3ZlLmJpbmQodGhpcyk7XG5cdFx0dGhpcy5oYW5kbGVUb3VjaEVuZCA9IHRoaXMuaGFuZGxlVG91Y2hFbmQuYmluZCh0aGlzKTtcblx0XHR0aGlzLmhhbmRsZVRvdWNoTW92ZSA9IHRoaXMuaGFuZGxlVG91Y2hNb3ZlLmJpbmQodGhpcyk7XG5cdFx0dGhpcy5oYW5kbGVUb3VjaFN0YXJ0ID0gdGhpcy5oYW5kbGVUb3VjaFN0YXJ0LmJpbmQodGhpcyk7XG5cdFx0dGhpcy5vbkZvY3VzID0gdGhpcy5vbkZvY3VzLmJpbmQodGhpcyk7XG5cdH1cblxuXHRibG9ja0V2ZW50KGV2ZW50KSB7XG5cdFx0ZXZlbnQucHJldmVudERlZmF1bHQoKTtcblx0XHRldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcblx0XHRpZiAoKGV2ZW50LnRhcmdldC50YWdOYW1lICE9PSAnQScpIHx8ICEoJ2hyZWYnIGluIGV2ZW50LnRhcmdldCkpIHtcblx0XHRcdHJldHVybjtcblx0XHR9XG5cdFx0aWYgKGV2ZW50LnRhcmdldC50YXJnZXQpIHtcblx0XHRcdHdpbmRvdy5vcGVuKGV2ZW50LnRhcmdldC5ocmVmLCBldmVudC50YXJnZXQudGFyZ2V0KTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0d2luZG93LmxvY2F0aW9uLmhyZWYgPSBldmVudC50YXJnZXQuaHJlZjtcblx0XHR9XG5cdH1cblxuXHRoYW5kbGVNb3VzZURvd24oZXZlbnQpIHtcblx0XHRldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXHRcdGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuXHRcdHRoaXMucHJvcHMub25TZWxlY3QodGhpcy5wcm9wcy5vcHRpb24sIGV2ZW50KTtcblx0fVxuXG5cdGhhbmRsZU1vdXNlRW50ZXIoZXZlbnQpIHtcblx0XHR0aGlzLm9uRm9jdXMoZXZlbnQpO1xuXHR9XG5cblx0aGFuZGxlTW91c2VNb3ZlKGV2ZW50KSB7XG5cdFx0dGhpcy5vbkZvY3VzKGV2ZW50KTtcblx0fVxuXG5cdGhhbmRsZVRvdWNoRW5kKGV2ZW50KXtcblx0XHQvLyBDaGVjayBpZiB0aGUgdmlldyBpcyBiZWluZyBkcmFnZ2VkLCBJbiB0aGlzIGNhc2Vcblx0XHQvLyB3ZSBkb24ndCB3YW50IHRvIGZpcmUgdGhlIGNsaWNrIGV2ZW50IChiZWNhdXNlIHRoZSB1c2VyIG9ubHkgd2FudHMgdG8gc2Nyb2xsKVxuXHRcdGlmKHRoaXMuZHJhZ2dpbmcpIHJldHVybjtcblxuXHRcdHRoaXMuaGFuZGxlTW91c2VEb3duKGV2ZW50KTtcblx0fVxuXG5cdGhhbmRsZVRvdWNoTW92ZShldmVudCkge1xuXHRcdC8vIFNldCBhIGZsYWcgdGhhdCB0aGUgdmlldyBpcyBiZWluZyBkcmFnZ2VkXG5cdFx0dGhpcy5kcmFnZ2luZyA9IHRydWU7XG5cdH1cblxuXHRoYW5kbGVUb3VjaFN0YXJ0KGV2ZW50KSB7XG5cdFx0Ly8gU2V0IGEgZmxhZyB0aGF0IHRoZSB2aWV3IGlzIG5vdCBiZWluZyBkcmFnZ2VkXG5cdFx0dGhpcy5kcmFnZ2luZyA9IGZhbHNlO1xuXHR9XG5cblx0b25Gb2N1cyhldmVudCkge1xuXHRcdGlmICghdGhpcy5wcm9wcy5pc0ZvY3VzZWQpIHtcblx0XHRcdHRoaXMucHJvcHMub25Gb2N1cyh0aGlzLnByb3BzLm9wdGlvbiwgZXZlbnQpO1xuXHRcdH1cblx0fVxuXG5cdHJlbmRlciAoKSB7XG5cdFx0Y29uc3QgeyBvcHRpb24sIGluc3RhbmNlUHJlZml4LCBvcHRpb25JbmRleCB9ID0gdGhpcy5wcm9wcztcblx0XHRjb25zdCBjbGFzc05hbWUgPSBjbGFzc05hbWVzKHRoaXMucHJvcHMuY2xhc3NOYW1lLCBvcHRpb24uY2xhc3NOYW1lKTtcblxuXHRcdHJldHVybiBvcHRpb24uZGlzYWJsZWQgPyAoXG5cdFx0XHRcdDxkaXYgY2xhc3NOYW1lPXtjbGFzc05hbWV9XG5cdFx0XHRcdFx0XHQgb25Nb3VzZURvd249e3RoaXMuYmxvY2tFdmVudH1cblx0XHRcdFx0XHRcdCBvbkNsaWNrPXt0aGlzLmJsb2NrRXZlbnR9PlxuXHRcdFx0XHRcdHt0aGlzLnByb3BzLmNoaWxkcmVufVxuXHRcdFx0XHQ8L2Rpdj5cblx0XHRcdCkgOiAoXG5cdFx0XHRcdDxkaXYgY2xhc3NOYW1lPXtjbGFzc05hbWV9XG5cdFx0XHRcdFx0XHQgc3R5bGU9e29wdGlvbi5zdHlsZX1cblx0XHRcdFx0XHRcdCByb2xlPVwib3B0aW9uXCJcblx0XHRcdFx0XHRcdCBvbk1vdXNlRG93bj17dGhpcy5oYW5kbGVNb3VzZURvd259XG5cdFx0XHRcdFx0XHQgb25Nb3VzZUVudGVyPXt0aGlzLmhhbmRsZU1vdXNlRW50ZXJ9XG5cdFx0XHRcdFx0XHQgb25Nb3VzZU1vdmU9e3RoaXMuaGFuZGxlTW91c2VNb3ZlfVxuXHRcdFx0XHRcdFx0IG9uVG91Y2hTdGFydD17dGhpcy5oYW5kbGVUb3VjaFN0YXJ0fVxuXHRcdFx0XHRcdFx0IG9uVG91Y2hNb3ZlPXt0aGlzLmhhbmRsZVRvdWNoTW92ZX1cblx0XHRcdFx0XHRcdCBvblRvdWNoRW5kPXt0aGlzLmhhbmRsZVRvdWNoRW5kfVxuXHRcdFx0XHRcdFx0IGlkPXtpbnN0YW5jZVByZWZpeCArICctb3B0aW9uLScgKyBvcHRpb25JbmRleH1cblx0XHRcdFx0XHRcdCB0aXRsZT17b3B0aW9uLnRpdGxlfT5cblx0XHRcdFx0XHR7dGhpcy5wcm9wcy5jaGlsZHJlbn1cblx0XHRcdFx0PC9kaXY+XG5cdFx0XHQpO1xuXHR9XG59XG5cbk9wdGlvbi5wcm9wVHlwZXMgPSBwcm9wVHlwZXM7XG5PcHRpb24uZGVmYXVsdFByb3BzID0gZGVmYXVsdFByb3BzO1xuXG5leHBvcnQgZGVmYXVsdCBPcHRpb247XG4iLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IFByb3BUeXBlcyBmcm9tICdwcm9wLXR5cGVzJztcbmltcG9ydCB0cmFuc2l0aW9ucyBmcm9tICcuL3N0eWxlcy90cmFuc2l0aW9ucyc7XG5cbmZ1bmN0aW9uIGdldFN0eWxlcyhwcm9wcykge1xuXHRjb25zdCBkZWZhdWx0U3R5bGVzID0ge1xuXHRcdGNvbG9yOiAnIzFkMWQxZCcsXG5cdFx0cG9zaXRpb246ICdhYnNvbHV0ZScsXG5cdFx0bGluZUhlaWdodDogJzM2cHgnLFxuXHRcdHpJbmRleDogMSxcblx0XHR0cmFuc2l0aW9uOiB0cmFuc2l0aW9ucy5lYXNlT3V0KCksXG5cdFx0dHJhbnNmb3JtOiAnc2NhbGUoMSkgdHJhbnNsYXRlKDAsIDApJyxcblx0XHR0cmFuc2Zvcm1PcmlnaW46ICdsZWZ0IHRvcCcsXG5cdFx0cG9pbnRlckV2ZW50czogJ2F1dG8nLFxuXHRcdHVzZXJTZWxlY3Q6ICdub25lJyxcblx0XHRtYXJnaW46IDAsXG5cdFx0Zm9udFdlaWdodDogJ25vcm1hbCdcblx0fTtcblxuXHRjb25zdCBzaHJpbmtTdHlsZXMgPSBwcm9wcy5zaHJpbmsgPyBPYmplY3QuYXNzaWduKHtcblx0XHRcdHRyYW5zZm9ybTogJ3NjYWxlKDAuOCkgdHJhbnNsYXRlKDAsIC0yNXB4KScsXG5cdFx0XHRwb2ludGVyRXZlbnRzOiAnbm9uZScsXG5cdFx0fSwgcHJvcHMuc2hyaW5rU3R5bGUpIDogbnVsbDtcblxuXHRyZXR1cm4ge1xuXHRcdHJvb3Q6IE9iamVjdC5hc3NpZ24oZGVmYXVsdFN0eWxlcywgcHJvcHMuc3R5bGUsIHNocmlua1N0eWxlcyksXG5cdH07XG59XG5cbmNvbnN0IHByb3BUeXBlcyA9IHtcblx0Y2hpbGRyZW46IFByb3BUeXBlcy5ub2RlLFx0XHRcdFx0XHRcdFx0Ly8gVGhlIGxhYmVsIGNvbnRlbnRzLlxuXHRjbGFzc05hbWU6IFByb3BUeXBlcy5zdHJpbmcsXHRcdFx0XHRcdC8vIFRoZSBjc3MgY2xhc3MgbmFtZSBvZiB0aGUgcm9vdCBlbGVtZW50LlxuXHRkaXNhYmxlZDogUHJvcFR5cGVzLmJvb2wsXHRcdFx0XHRcdFx0XHQvLyBEaXNhYmxlcyB0aGUgbGFiZWwgaWYgc2V0IHRvIHRydWUuXG5cdGh0bWxGb3I6IFByb3BUeXBlcy5zdHJpbmcsXHRcdFx0XHRcdFx0Ly8gVGhlIGlkIG9mIHRoZSB0YXJnZXQgZWxlbWVudCB0aGF0IHRoaXMgbGFiZWwgc2hvdWxkIHJlZmVyIHRvLlxuXHRzaHJpbms6IFByb3BUeXBlcy5ib29sLFx0XHRcdFx0XHRcdFx0XHQvLyBUcnVlIGlmIHRoZSBmbG9hdGluZyBsYWJlbCBzaG91bGQgc2hyaW5rLlxuXHRzaHJpbmtTdHlsZTogUHJvcFR5cGVzLm9iamVjdCxcdFx0XHRcdC8vIE92ZXJyaWRlIHRoZSBpbmxpbmUtc3R5bGVzIG9mIHRoZSByb290IGVsZW1lbnQgd2hlbiBzaHJ1bmsuXG5cdHN0eWxlOiBQcm9wVHlwZXMub2JqZWN0LFx0XHRcdFx0XHRcdFx0Ly8gT3ZlcnJpZGUgdGhlIGlubGluZS1zdHlsZXMgb2YgdGhlIHJvb3QgZWxlbWVudC5cbn07XG5jb25zdCBkZWZhdWx0UHJvcHMgPSB7XG5cdGRpc2FibGVkOiBmYWxzZSxcblx0c2hyaW5rOiBmYWxzZSxcbn07XG5cbmNvbnN0IFRleHRGaWVsZExhYmVsID0gKHByb3BzKSA9PiB7XG5cdGNvbnN0IHtcblx0XHRjbGFzc05hbWUsXG5cdFx0Y2hpbGRyZW4sXG5cdFx0aHRtbEZvcixcblx0fSA9IHByb3BzO1xuXG5cdGNvbnN0IHN0eWxlcyA9IGdldFN0eWxlcyhwcm9wcyk7XG5cblx0cmV0dXJuIChcblx0XHQ8bGFiZWxcblx0XHRcdGNsYXNzTmFtZT17Y2xhc3NOYW1lfVxuXHRcdFx0c3R5bGU9e3N0eWxlcy5yb290fVxuXHRcdFx0aHRtbEZvcj17aHRtbEZvcn1cblx0XHQ+XG5cdFx0XHR7Y2hpbGRyZW59XG5cdFx0PC9sYWJlbD5cblx0KTtcbn07XG5cblRleHRGaWVsZExhYmVsLnByb3BUeXBlcyA9IHByb3BUeXBlcztcblRleHRGaWVsZExhYmVsLmRlZmF1bHRQcm9wcyA9IGRlZmF1bHRQcm9wcztcblxuZXhwb3J0IGRlZmF1bHQgVGV4dEZpZWxkTGFiZWw7XG4iLCJpbXBvcnQgUmVhY3QsIHsgQ29tcG9uZW50IH0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IFByb3BUeXBlcyBmcm9tICdwcm9wLXR5cGVzJztcbmltcG9ydCBjbGFzc05hbWVzIGZyb20gJ2NsYXNzbmFtZXMnO1xuXG5jb25zdCBwcm9wVHlwZXMgPSB7XG5cdGNoaWxkcmVuOiBQcm9wVHlwZXMubm9kZSxcblx0ZGlzYWJsZWQ6IFByb3BUeXBlcy5ib29sLCAgICAgICAgICAgICAgIC8vIGRpc2FibGVkIHByb3AgcGFzc2VkIHRvIFJlYWN0U2VsZWN0XG5cdGlkOiBQcm9wVHlwZXMuc3RyaW5nLCAgICAgICAgICAgICAgICAgICAvLyBVbmlxdWUgaWQgZm9yIHRoZSB2YWx1ZSAtIHVzZWQgZm9yIGFyaWFcblx0b25DbGljazogUHJvcFR5cGVzLmZ1bmMsICAgICAgICAgICAgICAgIC8vIG1ldGhvZCB0byBoYW5kbGUgY2xpY2sgb24gdmFsdWUgbGFiZWxcblx0b25SZW1vdmU6IFByb3BUeXBlcy5mdW5jLCAgICAgICAgICAgICAgIC8vIG1ldGhvZCB0byBoYW5kbGUgcmVtb3ZhbCBvZiB0aGUgdmFsdWVcblx0dmFsdWU6IFByb3BUeXBlcy5vYmplY3QuaXNSZXF1aXJlZCwgICAgIC8vIHRoZSBvcHRpb24gb2JqZWN0IGZvciB0aGlzIHZhbHVlXG59O1xuY29uc3QgZGVmYXVsdFByb3BzID0ge307XG5cbmNsYXNzIFZhbHVlIGV4dGVuZHMgQ29tcG9uZW50IHtcblx0Y29uc3RydWN0b3IocHJvcHMpIHtcblx0XHRzdXBlcihwcm9wcyk7XG5cdFx0dGhpcy5zdGF0ZSA9IHt9O1xuXHRcdHRoaXMuaGFuZGxlTW91c2VEb3duID0gdGhpcy5oYW5kbGVNb3VzZURvd24uYmluZCh0aGlzKTtcblx0XHR0aGlzLm9uUmVtb3ZlID0gdGhpcy5vblJlbW92ZS5iaW5kKHRoaXMpO1xuXHRcdHRoaXMuaGFuZGxlVG91Y2hFbmRSZW1vdmUgPSB0aGlzLmhhbmRsZVRvdWNoRW5kUmVtb3ZlLmJpbmQodGhpcyk7XG5cdFx0dGhpcy5oYW5kbGVUb3VjaE1vdmUgPSB0aGlzLmhhbmRsZVRvdWNoTW92ZS5iaW5kKHRoaXMpO1xuXHRcdHRoaXMuaGFuZGxlVG91Y2hTdGFydCA9IHRoaXMuaGFuZGxlVG91Y2hTdGFydC5iaW5kKHRoaXMpO1xuXHR9XG5cblx0aGFuZGxlTW91c2VEb3duIChldmVudCkge1xuXHRcdGlmIChldmVudC50eXBlID09PSAnbW91c2Vkb3duJyAmJiBldmVudC5idXR0b24gIT09IDApIHtcblx0XHRcdHJldHVybjtcblx0XHR9XG5cdFx0aWYgKHRoaXMucHJvcHMub25DbGljaykge1xuXHRcdFx0ZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG5cdFx0XHR0aGlzLnByb3BzLm9uQ2xpY2sodGhpcy5wcm9wcy52YWx1ZSwgZXZlbnQpO1xuXHRcdFx0cmV0dXJuO1xuXHRcdH1cblx0XHRpZiAodGhpcy5wcm9wcy52YWx1ZS5ocmVmKSB7XG5cdFx0XHRldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcblx0XHR9XG5cdH1cblxuXHRvblJlbW92ZSAoZXZlbnQpIHtcblx0XHRldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXHRcdGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuXHRcdHRoaXMucHJvcHMub25SZW1vdmUodGhpcy5wcm9wcy52YWx1ZSk7XG5cdH1cblxuXHRoYW5kbGVUb3VjaEVuZFJlbW92ZSAoZXZlbnQpe1xuXHRcdC8vIENoZWNrIGlmIHRoZSB2aWV3IGlzIGJlaW5nIGRyYWdnZWQsIEluIHRoaXMgY2FzZVxuXHRcdC8vIHdlIGRvbid0IHdhbnQgdG8gZmlyZSB0aGUgY2xpY2sgZXZlbnQgKGJlY2F1c2UgdGhlIHVzZXIgb25seSB3YW50cyB0byBzY3JvbGwpXG5cdFx0aWYodGhpcy5kcmFnZ2luZykgcmV0dXJuO1xuXG5cdFx0Ly8gRmlyZSB0aGUgbW91c2UgZXZlbnRzXG5cdFx0dGhpcy5vblJlbW92ZShldmVudCk7XG5cdH1cblxuXHRoYW5kbGVUb3VjaE1vdmUgKGV2ZW50KSB7XG5cdFx0Ly8gU2V0IGEgZmxhZyB0aGF0IHRoZSB2aWV3IGlzIGJlaW5nIGRyYWdnZWRcblx0XHR0aGlzLmRyYWdnaW5nID0gdHJ1ZTtcblx0fVxuXG5cdGhhbmRsZVRvdWNoU3RhcnQgKGV2ZW50KSB7XG5cdFx0Ly8gU2V0IGEgZmxhZyB0aGF0IHRoZSB2aWV3IGlzIG5vdCBiZWluZyBkcmFnZ2VkXG5cdFx0dGhpcy5kcmFnZ2luZyA9IGZhbHNlO1xuXHR9XG5cblx0cmVuZGVyUmVtb3ZlSWNvbiAoKSB7XG5cdFx0aWYgKHRoaXMucHJvcHMuZGlzYWJsZWQgfHwgIXRoaXMucHJvcHMub25SZW1vdmUpIHJldHVybjtcblx0XHRyZXR1cm4gKFxuXHRcdFx0PHNwYW4gY2xhc3NOYW1lPVwiU2VsZWN0LXZhbHVlLWljb25cIlxuXHRcdFx0XHRcdFx0YXJpYS1oaWRkZW49XCJ0cnVlXCJcblx0XHRcdFx0XHRcdG9uTW91c2VEb3duPXt0aGlzLm9uUmVtb3ZlfVxuXHRcdFx0XHRcdFx0b25Ub3VjaEVuZD17dGhpcy5oYW5kbGVUb3VjaEVuZFJlbW92ZX1cblx0XHRcdFx0XHRcdG9uVG91Y2hTdGFydD17dGhpcy5oYW5kbGVUb3VjaFN0YXJ0fVxuXHRcdFx0XHRcdFx0b25Ub3VjaE1vdmU9e3RoaXMuaGFuZGxlVG91Y2hNb3ZlfT5cblx0XHRcdFx0JnRpbWVzXG5cdFx0XHQ8L3NwYW4+XG5cdFx0KTtcblx0fVxuXG5cdHJlbmRlckxhYmVsICgpIHtcblx0XHRjb25zdCBjbGFzc05hbWUgPSAnU2VsZWN0LXZhbHVlLWxhYmVsJztcblx0XHRyZXR1cm4gdGhpcy5wcm9wcy5vbkNsaWNrIHx8IHRoaXMucHJvcHMudmFsdWUuaHJlZiA/IChcblx0XHRcdFx0PGEgY2xhc3NOYW1lPXtjbGFzc05hbWV9IGhyZWY9e3RoaXMucHJvcHMudmFsdWUuaHJlZn0gdGFyZ2V0PXt0aGlzLnByb3BzLnZhbHVlLnRhcmdldH0gb25Nb3VzZURvd249e3RoaXMuaGFuZGxlTW91c2VEb3dufSBvblRvdWNoRW5kPXt0aGlzLmhhbmRsZU1vdXNlRG93bn0+XG5cdFx0XHRcdFx0e3RoaXMucHJvcHMuY2hpbGRyZW59XG5cdFx0XHRcdDwvYT5cblx0XHRcdCkgOiAoXG5cdFx0XHRcdDxzcGFuIGNsYXNzTmFtZT17Y2xhc3NOYW1lfSByb2xlPVwib3B0aW9uXCIgYXJpYS1zZWxlY3RlZD1cInRydWVcIiBpZD17dGhpcy5wcm9wcy5pZH0+XG5cdFx0XHRcdHt0aGlzLnByb3BzLmNoaWxkcmVufVxuXHRcdFx0PC9zcGFuPlxuXHRcdFx0KTtcblx0fVxuXG5cdHJlbmRlciAoKSB7XG5cdFx0cmV0dXJuIChcblx0XHRcdDxkaXYgY2xhc3NOYW1lPXtjbGFzc05hbWVzKCdTZWxlY3QtdmFsdWUnLCB0aGlzLnByb3BzLnZhbHVlLmNsYXNzTmFtZSl9XG5cdFx0XHRcdFx0IHN0eWxlPXt0aGlzLnByb3BzLnZhbHVlLnN0eWxlfVxuXHRcdFx0XHRcdCB0aXRsZT17dGhpcy5wcm9wcy52YWx1ZS50aXRsZX0+XG5cdFx0XHRcdHt0aGlzLnJlbmRlclJlbW92ZUljb24oKX1cblx0XHRcdFx0e3RoaXMucmVuZGVyTGFiZWwoKX1cblx0XHRcdDwvZGl2PlxuXHRcdCk7XG5cdH1cbn1cblxuVmFsdWUucHJvcFR5cGVzID0gcHJvcFR5cGVzO1xuVmFsdWUuZGVmYXVsdFByb3BzID0gZGVmYXVsdFByb3BzO1xuXG5leHBvcnQgZGVmYXVsdCBWYWx1ZTtcbiIsImV4cG9ydCBkZWZhdWx0IHtcblx0ZWFzZU91dEZ1bmN0aW9uOiAnY3ViaWMtYmV6aWVyKDAuMjMsIDEsIDAuMzIsIDEpJyxcblx0ZWFzZUluT3V0RnVuY3Rpb246ICdjdWJpYy1iZXppZXIoMC40NDUsIDAuMDUsIDAuNTUsIDAuOTUpJyxcblxuXHRlYXNlT3V0KGR1cmF0aW9uLCBwcm9wZXJ0eSwgZGVsYXksIGVhc2VGdW5jdGlvbikge1xuXHRcdGVhc2VGdW5jdGlvbiA9IGVhc2VGdW5jdGlvbiB8fCB0aGlzLmVhc2VPdXRGdW5jdGlvbjtcblxuXHRcdGlmIChwcm9wZXJ0eSAmJiBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwocHJvcGVydHkpID09PSAnW29iamVjdCBBcnJheV0nKSB7XG5cdFx0XHRsZXQgdHJhbnNpdGlvbnMgPSAnJztcblx0XHRcdGZvciAobGV0IGkgPSAwOyBpIDwgcHJvcGVydHkubGVuZ3RoOyBpKyspIHtcblx0XHRcdFx0aWYgKHRyYW5zaXRpb25zKSB0cmFuc2l0aW9ucyArPSAnLCc7XG5cdFx0XHRcdHRyYW5zaXRpb25zICs9IHRoaXMuY3JlYXRlKGR1cmF0aW9uLCBwcm9wZXJ0eVtpXSwgZGVsYXksIGVhc2VGdW5jdGlvbik7XG5cdFx0XHR9XG5cblx0XHRcdHJldHVybiB0cmFuc2l0aW9ucztcblx0XHR9IGVsc2Uge1xuXHRcdFx0cmV0dXJuIHRoaXMuY3JlYXRlKGR1cmF0aW9uLCBwcm9wZXJ0eSwgZGVsYXksIGVhc2VGdW5jdGlvbik7XG5cdFx0fVxuXHR9LFxuXG5cdGNyZWF0ZShkdXJhdGlvbiwgcHJvcGVydHksIGRlbGF5LCBlYXNlRnVuY3Rpb24pIHtcblx0XHRkdXJhdGlvbiA9IGR1cmF0aW9uIHx8ICc2NTBtcyc7XG5cdFx0cHJvcGVydHkgPSBwcm9wZXJ0eSB8fCAnYWxsJztcblx0XHRkZWxheSA9IGRlbGF5IHx8ICcwbXMnO1xuXHRcdGVhc2VGdW5jdGlvbiA9IGVhc2VGdW5jdGlvbiB8fCAnbGluZWFyJztcblxuXHRcdHJldHVybiBgJHtwcm9wZXJ0eX0gJHtkdXJhdGlvbn0gJHtlYXNlRnVuY3Rpb259ICR7ZGVsYXl9YDtcblx0fSxcbn07XG4iLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuXG5leHBvcnQgZGVmYXVsdCAoeyBvbk1vdXNlRG93biB9KSA9PiB7XG5cdHJldHVybiAoXG5cdFx0PHNwYW5cblx0XHRcdGNsYXNzTmFtZT1cIlNlbGVjdC1hcnJvd1wiXG5cdFx0XHRvbk1vdXNlRG93bj17b25Nb3VzZURvd259XG5cdFx0Lz5cblx0KTtcbn07XG4iLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuXG5leHBvcnQgZGVmYXVsdCAoKSA9PiB7XG5cdHJldHVybiAoXG5cdFx0PHNwYW5cblx0XHRcdGNsYXNzTmFtZT1cIlNlbGVjdC1jbGVhclwiXG5cdFx0XHRkYW5nZXJvdXNseVNldElubmVySFRNTD17eyBfX2h0bWw6ICcmdGltZXM7JyB9fVxuXHRcdC8+XG5cdCk7XG59O1xuIiwiZXhwb3J0IGRlZmF1bHQgKG9wdGlvbnMsIGZpbHRlclZhbHVlLCBleGNsdWRlT3B0aW9ucywgcHJvcHMpID0+IHtcblx0aWYgKHByb3BzLmlnbm9yZUNhc2UpIHtcblx0XHRmaWx0ZXJWYWx1ZSA9IGZpbHRlclZhbHVlLnRvTG93ZXJDYXNlKCk7XG5cdH1cblxuXHRpZiAoZXhjbHVkZU9wdGlvbnMpIGV4Y2x1ZGVPcHRpb25zID0gZXhjbHVkZU9wdGlvbnMubWFwKGkgPT4gaVtwcm9wcy52YWx1ZUtleV0pO1xuXG5cdHJldHVybiBvcHRpb25zLmZpbHRlcihvcHRpb24gPT4ge1xuXHRcdGlmIChleGNsdWRlT3B0aW9ucyAmJiBleGNsdWRlT3B0aW9ucy5pbmRleE9mKG9wdGlvbltwcm9wcy52YWx1ZUtleV0pID4gLTEpIHJldHVybiBmYWxzZTtcblx0XHRpZiAocHJvcHMuZmlsdGVyT3B0aW9uKSByZXR1cm4gcHJvcHMuZmlsdGVyT3B0aW9uLmNhbGwodGhpcywgb3B0aW9uLCBmaWx0ZXJWYWx1ZSk7XG5cdFx0aWYgKCFmaWx0ZXJWYWx1ZSkgcmV0dXJuIHRydWU7XG5cdFx0bGV0IHZhbHVlVGVzdCA9IFN0cmluZyhvcHRpb25bcHJvcHMudmFsdWVLZXldKTtcblx0XHRsZXQgbGFiZWxUZXN0ID0gU3RyaW5nKG9wdGlvbltwcm9wcy5sYWJlbEtleV0pO1xuXHRcdGlmIChwcm9wcy5pZ25vcmVDYXNlKSB7XG5cblx0XHRcdGlmIChwcm9wcy5tYXRjaFByb3AgIT09ICdsYWJlbCcpIHZhbHVlVGVzdCA9IHZhbHVlVGVzdC50b0xvd2VyQ2FzZSgpO1xuXHRcdFx0aWYgKHByb3BzLm1hdGNoUHJvcCAhPT0gJ3ZhbHVlJykgbGFiZWxUZXN0ID0gbGFiZWxUZXN0LnRvTG93ZXJDYXNlKCk7XG5cdFx0fVxuXHRcdHJldHVybiBwcm9wcy5tYXRjaFBvcyA9PT0gJ3N0YXJ0JyA/IChcblx0XHRcdChwcm9wcy5tYXRjaFByb3AgIT09ICdsYWJlbCcgJiYgdmFsdWVUZXN0LnN1YnN0cigwLCBmaWx0ZXJWYWx1ZS5sZW5ndGgpID09PSBmaWx0ZXJWYWx1ZSkgfHxcblx0XHRcdChwcm9wcy5tYXRjaFByb3AgIT09ICd2YWx1ZScgJiYgbGFiZWxUZXN0LnN1YnN0cigwLCBmaWx0ZXJWYWx1ZS5sZW5ndGgpID09PSBmaWx0ZXJWYWx1ZSlcblx0XHQpIDogKFxuXHRcdFx0KHByb3BzLm1hdGNoUHJvcCAhPT0gJ2xhYmVsJyAmJiB2YWx1ZVRlc3QuaW5kZXhPZihmaWx0ZXJWYWx1ZSkgPj0gMCkgfHxcblx0XHRcdChwcm9wcy5tYXRjaFByb3AgIT09ICd2YWx1ZScgJiYgbGFiZWxUZXN0LmluZGV4T2YoZmlsdGVyVmFsdWUpID49IDApXG5cdFx0KTtcblx0fSk7XG59O1xuIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBjbGFzc05hbWVzIGZyb20gJ2NsYXNzbmFtZXMnO1xuXG5leHBvcnQgZGVmYXVsdCAoe1xuXHRmb2N1c2VkT3B0aW9uLFxuXHRpbnN0YW5jZVByZWZpeCxcblx0bGFiZWxLZXksXG5cdG9uRm9jdXMsXG5cdG9uU2VsZWN0LFxuXHRvcHRpb25DbGFzc05hbWUsXG5cdG9wdGlvbkNvbXBvbmVudCxcblx0b3B0aW9uUmVuZGVyZXIsXG5cdG9wdGlvbnMsXG5cdHZhbHVlQXJyYXksXG5cdHZhbHVlS2V5LFxuXHRvbk9wdGlvblJlZlxufSkgPT4ge1xuXHRjb25zdCBPcHRpb24gPSBvcHRpb25Db21wb25lbnQ7XG5cdHJldHVybiBvcHRpb25zLm1hcCgob3B0aW9uLCBpKSA9PiB7XG5cdFx0bGV0IGlzU2VsZWN0ZWQgPSB2YWx1ZUFycmF5ICYmIHZhbHVlQXJyYXkuaW5kZXhPZihvcHRpb24pID4gLTE7XG5cdFx0bGV0IGlzRm9jdXNlZCA9IG9wdGlvbiA9PT0gZm9jdXNlZE9wdGlvbjtcblx0XHRsZXQgb3B0aW9uQ2xhc3MgPSBjbGFzc05hbWVzKG9wdGlvbkNsYXNzTmFtZSwge1xuXHRcdFx0J1NlbGVjdC1vcHRpb24nOiB0cnVlLFxuXHRcdFx0J2lzLXNlbGVjdGVkJzogaXNTZWxlY3RlZCxcblx0XHRcdCdpcy1mb2N1c2VkJzogaXNGb2N1c2VkLFxuXHRcdFx0J2lzLWRpc2FibGVkJzogb3B0aW9uLmRpc2FibGVkLFxuXHRcdH0pO1xuXG5cdFx0cmV0dXJuIChcblx0XHRcdDxPcHRpb25cblx0XHRcdFx0Y2xhc3NOYW1lPXtvcHRpb25DbGFzc31cblx0XHRcdFx0aW5zdGFuY2VQcmVmaXg9e2luc3RhbmNlUHJlZml4fVxuXHRcdFx0XHRpc0Rpc2FibGVkPXtvcHRpb24uZGlzYWJsZWR9XG5cdFx0XHRcdGlzRm9jdXNlZD17aXNGb2N1c2VkfVxuXHRcdFx0XHRpc1NlbGVjdGVkPXtpc1NlbGVjdGVkfVxuXHRcdFx0XHRrZXk9e2BvcHRpb24tJHtpfS0ke29wdGlvblt2YWx1ZUtleV19YH1cblx0XHRcdFx0b25Gb2N1cz17b25Gb2N1c31cblx0XHRcdFx0b25TZWxlY3Q9e29uU2VsZWN0fVxuXHRcdFx0XHRvcHRpb249e29wdGlvbn1cblx0XHRcdFx0b3B0aW9uSW5kZXg9e2l9XG5cdFx0XHRcdHJlZj17cmVmID0+IHsgb25PcHRpb25SZWYocmVmLCBpc0ZvY3VzZWQpOyB9fVxuXHRcdFx0PlxuXHRcdFx0XHR7b3B0aW9uUmVuZGVyZXIob3B0aW9uLCBpKX1cblx0XHRcdDwvT3B0aW9uPlxuXHRcdCk7XG5cdH0pO1xufTtcbiIsIi8qKlxuICogQ29weXJpZ2h0IChjKSAyMDE3IFRoZW51bGx5IEluYy5cbiAqIHJlYWN0LXNlbGVjdCBwcm9qZWN0IGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZVxuICovXG5cbmltcG9ydCBSZWFjdCwgeyBDb21wb25lbnQgfSBmcm9tICdyZWFjdCc7XG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gJ3Byb3AtdHlwZXMnO1xuaW1wb3J0IFJlYWN0RE9NIGZyb20gJ3JlYWN0LWRvbSc7XG5pbXBvcnQgY2xhc3NOYW1lcyBmcm9tICdjbGFzc25hbWVzJztcblxuaW1wb3J0IFRleHRGaWVsZExhYmVsIGZyb20gJy4vVGV4dEZpZWxkTGFiZWwnO1xuaW1wb3J0IHRyYW5zaXRpb25zIGZyb20gJy4vc3R5bGVzL3RyYW5zaXRpb25zJztcblxuaW1wb3J0IGRlZmF1bHRBcnJvd1JlbmRlcmVyIGZyb20gJy4vdXRpbHMvZGVmYXVsdEFycm93UmVuZGVyZXInO1xuaW1wb3J0IGRlZmF1bHRGaWx0ZXJPcHRpb25zIGZyb20gJy4vdXRpbHMvZGVmYXVsdEZpbHRlck9wdGlvbnMnO1xuaW1wb3J0IGRlZmF1bHRNZW51UmVuZGVyZXIgZnJvbSAnLi91dGlscy9kZWZhdWx0TWVudVJlbmRlcmVyJztcbmltcG9ydCBkZWZhdWx0Q2xlYXJSZW5kZXJlciBmcm9tICcuL3V0aWxzL2RlZmF1bHRDbGVhclJlbmRlcmVyJztcblxuaW1wb3J0IEFzeW5jIGZyb20gJy4vQXN5bmMnO1xuaW1wb3J0IE9wdGlvbiBmcm9tICcuL09wdGlvbic7XG5pbXBvcnQgVmFsdWUgZnJvbSAnLi9WYWx1ZSc7XG5cbmZ1bmN0aW9uIHN0cmluZ2lmeVZhbHVlICh2YWx1ZSkge1xuXHRjb25zdCB2YWx1ZVR5cGUgPSB0eXBlb2YgdmFsdWU7XG5cdGlmICh2YWx1ZVR5cGUgPT09ICdzdHJpbmcnKSB7XG5cdFx0cmV0dXJuIHZhbHVlO1xuXHR9IGVsc2UgaWYgKHZhbHVlVHlwZSA9PT0gJ29iamVjdCcpIHtcblx0XHRyZXR1cm4gSlNPTi5zdHJpbmdpZnkodmFsdWUpO1xuXHR9IGVsc2UgaWYgKHZhbHVlVHlwZSA9PT0gJ251bWJlcicgfHwgdmFsdWVUeXBlID09PSAnYm9vbGVhbicpIHtcblx0XHRyZXR1cm4gU3RyaW5nKHZhbHVlKTtcblx0fSBlbHNlIHtcblx0XHRyZXR1cm4gJyc7XG5cdH1cbn1cblxuZnVuY3Rpb24gaXNWYWxpZCh2YWx1ZSkge1xuXHRyZXR1cm4gdmFsdWUgIT09ICcnICYmIHZhbHVlICE9PSB1bmRlZmluZWQgJiYgdmFsdWUgIT09IG51bGwgJiYgIShBcnJheS5pc0FycmF5KHZhbHVlKSAmJiB2YWx1ZS5sZW5ndGggPT09IDApO1xufVxuXG5jb25zdCBnZXRTdHlsZXMgPSAocHJvcHMsIHN0YXRlKSA9PiB7XG5cdGNvbnN0IHN0eWxlcyA9IHtcblx0XHRmbG9hdGluZ0xhYmVsOiB7XG5cdFx0XHRjb2xvcjogJyNjZGNkY2QnLFxuXHRcdFx0cG9pbnRlckV2ZW50czogJ25vbmUnLFxuXHRcdH0sXG5cdFx0ZXJyb3I6IHtcblx0XHRcdHBvc2l0aW9uOiAnYWJzb2x1dGUnLFxuXHRcdFx0Zm9udFNpemU6IDExLFxuXHRcdFx0Zm9udFdlaWdodDogJ25vcm1hbCcsXG5cdFx0XHRsaW5lSGVpZ2h0OiAnMScsXG5cdFx0XHRib3R0b206ICctMjBweCcsXG5cdFx0XHR0ZXh0QWxpZ246ICdsZWZ0Jyxcblx0XHRcdGNvbG9yOiAnI2Y5MjAyMCcsXG5cdFx0XHR0cmFuc2l0aW9uOiB0cmFuc2l0aW9ucy5lYXNlT3V0KCksXG5cdFx0fSxcblx0fTtcblxuXHRzdHlsZXMudGV4dGFyZWEgPSBPYmplY3QuYXNzaWduKHt9LCBzdHlsZXMuaW5wdXQsIHtcblx0XHRtYXJnaW5Ub3A6IHByb3BzLmZsb2F0aW5nTGFiZWxUZXh0ID8gMzYgOiAxMixcblx0XHRtYXJnaW5Cb3R0b206IHByb3BzLmZsb2F0aW5nTGFiZWxUZXh0ID8gLTM2IDogLTEyLFxuXHRcdGJveFNpemluZzogJ2JvcmRlci1ib3gnLFxuXHRcdGZvbnQ6ICdpbmhlcml0Jyxcblx0fSk7XG5cblx0Ly8gRG8gbm90IGFzc2lnbiBhIGhlaWdodCB0byB0aGUgdGV4dGFyZWEgYXMgaGUgaGFuZGxlcyBpdCBvbiBoaXMgb3duLlxuXHRpZiAoc3RhdGUuaXNGb2N1c2VkIHx8IHN0YXRlLmhhc1ZhbHVlKSB7XG5cdFx0c3R5bGVzLmZsb2F0aW5nTGFiZWwuY29sb3IgPSAnIzFkMWQxZCc7XG5cdH1cblxuXHRyZXR1cm4gc3R5bGVzO1xufTtcblxuY29uc3Qgc3RyaW5nT3JOb2RlID0gUHJvcFR5cGVzLm9uZU9mVHlwZShbXG5cdFByb3BUeXBlcy5zdHJpbmcsXG5cdFByb3BUeXBlcy5ub2RlXG5dKTtcblxubGV0IGluc3RhbmNlSWQgPSAxO1xuXG5jb25zdCBwcm9wVHlwZXMgPSB7XG5cdGFkZExhYmVsVGV4dDogUHJvcFR5cGVzLnN0cmluZywgICAgICAgLy8gcGxhY2Vob2xkZXIgZGlzcGxheWVkIHdoZW4geW91IHdhbnQgdG8gYWRkIGEgbGFiZWwgb24gYSBtdWx0aS12YWx1ZSBpbnB1dFxuXHQnYXJpYS1kZXNjcmliZWRieSc6IFByb3BUeXBlcy5zdHJpbmcsXHQvLyBIVE1MIElEKHMpIG9mIGVsZW1lbnQocykgdGhhdCBzaG91bGQgYmUgdXNlZCB0byBkZXNjcmliZSB0aGlzIGlucHV0IChmb3IgYXNzaXN0aXZlIHRlY2gpXG5cdCdhcmlhLWxhYmVsJzogUHJvcFR5cGVzLnN0cmluZywgICAgICAgLy8gQXJpYSBsYWJlbCAoZm9yIGFzc2lzdGl2ZSB0ZWNoKVxuXHQnYXJpYS1sYWJlbGxlZGJ5JzogUHJvcFR5cGVzLnN0cmluZyxcdC8vIEhUTUwgSUQgb2YgYW4gZWxlbWVudCB0aGF0IHNob3VsZCBiZSB1c2VkIGFzIHRoZSBsYWJlbCAoZm9yIGFzc2lzdGl2ZSB0ZWNoKVxuXHRhcnJvd1JlbmRlcmVyOiBQcm9wVHlwZXMuZnVuYyxcdFx0XHRcdC8vIENyZWF0ZSBkcm9wLWRvd24gY2FyZXQgZWxlbWVudFxuXHRhdXRvQmx1cjogUHJvcFR5cGVzLmJvb2wsICAgICAgICAgICAgIC8vIGF1dG9tYXRpY2FsbHkgYmx1ciB0aGUgY29tcG9uZW50IHdoZW4gYW4gb3B0aW9uIGlzIHNlbGVjdGVkXG5cdGF1dG9mb2N1czogUHJvcFR5cGVzLmJvb2wsICAgICAgICAgICAgLy8gYXV0b2ZvY3VzIHRoZSBjb21wb25lbnQgb24gbW91bnRcblx0YXV0b3NpemU6IFByb3BUeXBlcy5ib29sLCAgICAgICAgICAgICAvLyB3aGV0aGVyIHRvIGVuYWJsZSBhdXRvc2l6aW5nIG9yIG5vdFxuXHRiYWNrc3BhY2VSZW1vdmVzOiBQcm9wVHlwZXMuYm9vbCwgICAgIC8vIHdoZXRoZXIgYmFja3NwYWNlIHJlbW92ZXMgYW4gaXRlbSBpZiB0aGVyZSBpcyBubyB0ZXh0IGlucHV0XG5cdGJhY2tzcGFjZVRvUmVtb3ZlTWVzc2FnZTogUHJvcFR5cGVzLnN0cmluZywgIC8vIE1lc3NhZ2UgdG8gdXNlIGZvciBzY3JlZW5yZWFkZXJzIHRvIHByZXNzIGJhY2tzcGFjZSB0byByZW1vdmUgdGhlIGN1cnJlbnQgaXRlbSAtIHtsYWJlbH0gaXMgcmVwbGFjZWQgd2l0aCB0aGUgaXRlbSBsYWJlbFxuXHRjbGFzc05hbWU6IFByb3BUeXBlcy5zdHJpbmcsICAgICAgICAgIC8vIGNsYXNzTmFtZSBmb3IgdGhlIG91dGVyIGVsZW1lbnRcblx0Y2xlYXJBbGxUZXh0OiBzdHJpbmdPck5vZGUsICAgICAgICAgICAgICAgICAvLyB0aXRsZSBmb3IgdGhlIFwiY2xlYXJcIiBjb250cm9sIHdoZW4gbXVsdGk6IHRydWVcblx0Y2xlYXJSZW5kZXJlcjogUHJvcFR5cGVzLmZ1bmMsICAgICAgICAvLyBjcmVhdGUgY2xlYXJhYmxlIHggZWxlbWVudFxuXHRjbGVhclZhbHVlVGV4dDogc3RyaW5nT3JOb2RlLCAgICAgICAgICAgICAgIC8vIHRpdGxlIGZvciB0aGUgXCJjbGVhclwiIGNvbnRyb2xcblx0Y2xlYXJhYmxlOiBQcm9wVHlwZXMuYm9vbCwgICAgICAgICAgICAvLyBzaG91bGQgaXQgYmUgcG9zc2libGUgdG8gcmVzZXQgdmFsdWVcblx0ZGVsZXRlUmVtb3ZlczogUHJvcFR5cGVzLmJvb2wsICAgICAgICAvLyB3aGV0aGVyIGJhY2tzcGFjZSByZW1vdmVzIGFuIGl0ZW0gaWYgdGhlcmUgaXMgbm8gdGV4dCBpbnB1dFxuXHRkZWxpbWl0ZXI6IFByb3BUeXBlcy5zdHJpbmcsICAgICAgICAgIC8vIGRlbGltaXRlciB0byB1c2UgdG8gam9pbiBtdWx0aXBsZSB2YWx1ZXMgZm9yIHRoZSBoaWRkZW4gZmllbGQgdmFsdWVcblx0ZGlzYWJsZWQ6IFByb3BUeXBlcy5ib29sLCAgICAgICAgICAgICAvLyB3aGV0aGVyIHRoZSBTZWxlY3QgaXMgZGlzYWJsZWQgb3Igbm90XG5cdGVzY2FwZUNsZWFyc1ZhbHVlOiBQcm9wVHlwZXMuYm9vbCwgICAgLy8gd2hldGhlciBlc2NhcGUgY2xlYXJzIHRoZSB2YWx1ZSB3aGVuIHRoZSBtZW51IGlzIGNsb3NlZFxuXHRmaWx0ZXJPcHRpb246IFByb3BUeXBlcy5mdW5jLCAgICAgICAgIC8vIG1ldGhvZCB0byBmaWx0ZXIgYSBzaW5nbGUgb3B0aW9uIChvcHRpb24sIGZpbHRlclN0cmluZylcblx0ZmlsdGVyT3B0aW9uczogUHJvcFR5cGVzLmFueSwgICAgICAgICAvLyBib29sZWFuIHRvIGVuYWJsZSBkZWZhdWx0IGZpbHRlcmluZyBvciBmdW5jdGlvbiB0byBmaWx0ZXIgdGhlIG9wdGlvbnMgYXJyYXkgKFtvcHRpb25zXSwgZmlsdGVyU3RyaW5nLCBbdmFsdWVzXSlcblx0aWdub3JlQ2FzZTogUHJvcFR5cGVzLmJvb2wsICAgICAgICAgICAvLyB3aGV0aGVyIHRvIHBlcmZvcm0gY2FzZS1pbnNlbnNpdGl2ZSBmaWx0ZXJpbmdcblx0aW5wdXRQcm9wczogUHJvcFR5cGVzLm9iamVjdCwgICAgICAgICAvLyBjdXN0b20gYXR0cmlidXRlcyBmb3IgdGhlIElucHV0XG5cdGlucHV0UmVuZGVyZXI6IFByb3BUeXBlcy5mdW5jLCAgICAgICAgLy8gcmV0dXJucyBhIGN1c3RvbSBpbnB1dCBjb21wb25lbnRcblx0aW5zdGFuY2VJZDogUHJvcFR5cGVzLnN0cmluZywgICAgICAgICAvLyBzZXQgdGhlIGNvbXBvbmVudHMgaW5zdGFuY2VJZFxuXHRpc0xvYWRpbmc6IFByb3BUeXBlcy5ib29sLCAgICAgICAgICAgIC8vIHdoZXRoZXIgdGhlIFNlbGVjdCBpcyBsb2FkaW5nIGV4dGVybmFsbHkgb3Igbm90IChzdWNoIGFzIG9wdGlvbnMgYmVpbmcgbG9hZGVkKVxuXHRqb2luVmFsdWVzOiBQcm9wVHlwZXMuYm9vbCwgICAgICAgICAgIC8vIGpvaW5zIG11bHRpcGxlIHZhbHVlcyBpbnRvIGEgc2luZ2xlIGZvcm0gZmllbGQgd2l0aCB0aGUgZGVsaW1pdGVyIChsZWdhY3kgbW9kZSlcblx0bGFiZWxLZXk6IFByb3BUeXBlcy5zdHJpbmcsICAgICAgICAgICAvLyBwYXRoIG9mIHRoZSBsYWJlbCB2YWx1ZSBpbiBvcHRpb24gb2JqZWN0c1xuXHRtYXRjaFBvczogUHJvcFR5cGVzLnN0cmluZywgICAgICAgICAgIC8vIChhbnl8c3RhcnQpIG1hdGNoIHRoZSBzdGFydCBvciBlbnRpcmUgc3RyaW5nIHdoZW4gZmlsdGVyaW5nXG5cdG1hdGNoUHJvcDogUHJvcFR5cGVzLnN0cmluZywgICAgICAgICAgLy8gKGFueXxsYWJlbHx2YWx1ZSkgd2hpY2ggb3B0aW9uIHByb3BlcnR5IHRvIGZpbHRlciBvblxuXHRtZW51QnVmZmVyOiBQcm9wVHlwZXMubnVtYmVyLCAgICAgICAgIC8vIG9wdGlvbmFsIGJ1ZmZlciAoaW4gcHgpIGJldHdlZW4gdGhlIGJvdHRvbSBvZiB0aGUgdmlld3BvcnQgYW5kIHRoZSBib3R0b20gb2YgdGhlIG1lbnVcblx0bWVudUNvbnRhaW5lclN0eWxlOiBQcm9wVHlwZXMub2JqZWN0LCAvLyBvcHRpb25hbCBzdHlsZSB0byBhcHBseSB0byB0aGUgbWVudSBjb250YWluZXJcblx0bWVudVJlbmRlcmVyOiBQcm9wVHlwZXMuZnVuYywgICAgICAgICAvLyByZW5kZXJzIGEgY3VzdG9tIG1lbnUgd2l0aCBvcHRpb25zXG5cdG1lbnVTdHlsZTogUHJvcFR5cGVzLm9iamVjdCwgICAgICAgICAgLy8gb3B0aW9uYWwgc3R5bGUgdG8gYXBwbHkgdG8gdGhlIG1lbnVcblx0bXVsdGk6IFByb3BUeXBlcy5ib29sLCAgICAgICAgICAgICAgICAvLyBtdWx0aS12YWx1ZSBpbnB1dFxuXHRuYW1lOiBQcm9wVHlwZXMuc3RyaW5nLCAgICAgICAgICAgICAgIC8vIGdlbmVyYXRlcyBhIGhpZGRlbiA8aW5wdXQgLz4gdGFnIHdpdGggdGhpcyBmaWVsZCBuYW1lIGZvciBodG1sIGZvcm1zXG5cdG5vUmVzdWx0c1RleHQ6IHN0cmluZ09yTm9kZSwgICAgICAgICAgICAgICAgLy8gcGxhY2Vob2xkZXIgZGlzcGxheWVkIHdoZW4gdGhlcmUgYXJlIG5vIG1hdGNoaW5nIHNlYXJjaCByZXN1bHRzXG5cdG9uQmx1cjogUHJvcFR5cGVzLmZ1bmMsICAgICAgICAgICAgICAgLy8gb25CbHVyIGhhbmRsZXI6IGZ1bmN0aW9uIChldmVudCkge31cblx0b25CbHVyUmVzZXRzSW5wdXQ6IFByb3BUeXBlcy5ib29sLCAgICAvLyB3aGV0aGVyIGlucHV0IGlzIGNsZWFyZWQgb24gYmx1clxuXHRvbkNoYW5nZTogUHJvcFR5cGVzLmZ1bmMsICAgICAgICAgICAgIC8vIG9uQ2hhbmdlIGhhbmRsZXI6IGZ1bmN0aW9uIChuZXdWYWx1ZSkge31cblx0b25DbG9zZTogUHJvcFR5cGVzLmZ1bmMsICAgICAgICAgICAgICAvLyBmaXJlcyB3aGVuIHRoZSBtZW51IGlzIGNsb3NlZFxuXHRvbkNsb3NlUmVzZXRzSW5wdXQ6IFByb3BUeXBlcy5ib29sLFx0XHQvLyB3aGV0aGVyIGlucHV0IGlzIGNsZWFyZWQgd2hlbiBtZW51IGlzIGNsb3NlZCB0aHJvdWdoIHRoZSBhcnJvd1xuXHRvbkZvY3VzOiBQcm9wVHlwZXMuZnVuYywgICAgICAgICAgICAgIC8vIG9uRm9jdXMgaGFuZGxlcjogZnVuY3Rpb24gKGV2ZW50KSB7fVxuXHRvbklucHV0Q2hhbmdlOiBQcm9wVHlwZXMuZnVuYywgICAgICAgIC8vIG9uSW5wdXRDaGFuZ2UgaGFuZGxlcjogZnVuY3Rpb24gKGlucHV0VmFsdWUpIHt9XG5cdG9uSW5wdXRLZXlEb3duOiBQcm9wVHlwZXMuZnVuYywgICAgICAgLy8gaW5wdXQga2V5RG93biBoYW5kbGVyOiBmdW5jdGlvbiAoZXZlbnQpIHt9XG5cdG9uTWVudVNjcm9sbFRvQm90dG9tOiBQcm9wVHlwZXMuZnVuYywgLy8gZmlyZXMgd2hlbiB0aGUgbWVudSBpcyBzY3JvbGxlZCB0byB0aGUgYm90dG9tOyBjYW4gYmUgdXNlZCB0byBwYWdpbmF0ZSBvcHRpb25zXG5cdG9uT3BlbjogUHJvcFR5cGVzLmZ1bmMsICAgICAgICAgICAgICAgLy8gZmlyZXMgd2hlbiB0aGUgbWVudSBpcyBvcGVuZWRcblx0b25WYWx1ZUNsaWNrOiBQcm9wVHlwZXMuZnVuYywgICAgICAgICAvLyBvbkNsaWNrIGhhbmRsZXIgZm9yIHZhbHVlIGxhYmVsczogZnVuY3Rpb24gKHZhbHVlLCBldmVudCkge31cblx0b3BlbkFmdGVyRm9jdXM6IFByb3BUeXBlcy5ib29sLCAgICAgICAvLyBib29sZWFuIHRvIGVuYWJsZSBvcGVuaW5nIGRyb3Bkb3duIHdoZW4gZm9jdXNlZFxuXHRvcGVuT25Gb2N1czogUHJvcFR5cGVzLmJvb2wsICAgICAgICAgIC8vIGFsd2F5cyBvcGVuIG9wdGlvbnMgbWVudSBvbiBmb2N1c1xuXHRvcHRpb25DbGFzc05hbWU6IFByb3BUeXBlcy5zdHJpbmcsICAgIC8vIGFkZGl0aW9uYWwgY2xhc3MoZXMpIHRvIGFwcGx5IHRvIHRoZSA8T3B0aW9uIC8+IGVsZW1lbnRzXG5cdG9wdGlvbkNvbXBvbmVudDogUHJvcFR5cGVzLmZ1bmMsICAgICAgLy8gb3B0aW9uIGNvbXBvbmVudCB0byByZW5kZXIgaW4gZHJvcGRvd25cblx0b3B0aW9uUmVuZGVyZXI6IFByb3BUeXBlcy5mdW5jLCAgICAgICAvLyBvcHRpb25SZW5kZXJlcjogZnVuY3Rpb24gKG9wdGlvbikge31cblx0b3B0aW9uczogUHJvcFR5cGVzLmFycmF5LCAgICAgICAgICAgICAvLyBhcnJheSBvZiBvcHRpb25zXG5cdHBhZ2VTaXplOiBQcm9wVHlwZXMubnVtYmVyLCAgICAgICAgICAgLy8gbnVtYmVyIG9mIGVudHJpZXMgdG8gcGFnZSB3aGVuIHVzaW5nIHBhZ2UgdXAvZG93biBrZXlzXG5cdHBsYWNlaG9sZGVyOiBzdHJpbmdPck5vZGUsICAgICAgICAgICAgICAgICAgLy8gZmllbGQgcGxhY2Vob2xkZXIsIGRpc3BsYXllZCB3aGVuIHRoZXJlJ3Mgbm8gdmFsdWVcblx0cmVxdWlyZWQ6IFByb3BUeXBlcy5ib29sLCAgICAgICAgICAgICAvLyBhcHBsaWVzIEhUTUw1IHJlcXVpcmVkIGF0dHJpYnV0ZSB3aGVuIG5lZWRlZFxuXHRyZXNldFZhbHVlOiBQcm9wVHlwZXMuYW55LCAgICAgICAgICAgIC8vIHZhbHVlIHRvIHVzZSB3aGVuIHlvdSBjbGVhciB0aGUgY29udHJvbFxuXHRzY3JvbGxNZW51SW50b1ZpZXc6IFByb3BUeXBlcy5ib29sLCAgIC8vIGJvb2xlYW4gdG8gZW5hYmxlIHRoZSB2aWV3cG9ydCB0byBzaGlmdCBzbyB0aGF0IHRoZSBmdWxsIG1lbnUgZnVsbHkgdmlzaWJsZSB3aGVuIGVuZ2FnZWRcblx0c2VhcmNoYWJsZTogUHJvcFR5cGVzLmJvb2wsICAgICAgICAgICAvLyB3aGV0aGVyIHRvIGVuYWJsZSBzZWFyY2hpbmcgZmVhdHVyZSBvciBub3Rcblx0c2ltcGxlVmFsdWU6IFByb3BUeXBlcy5ib29sLCAgICAgICAgICAvLyBwYXNzIHRoZSB2YWx1ZSB0byBvbkNoYW5nZSBhcyBhIHNpbXBsZSB2YWx1ZSAobGVnYWN5IHByZSAxLjAgbW9kZSksIGRlZmF1bHRzIHRvIGZhbHNlXG5cdHN0eWxlOiBQcm9wVHlwZXMub2JqZWN0LCAgICAgICAgICAgICAgLy8gb3B0aW9uYWwgc3R5bGUgdG8gYXBwbHkgdG8gdGhlIGNvbnRyb2xcblx0dGFiSW5kZXg6IFByb3BUeXBlcy5zdHJpbmcsICAgICAgICAgICAvLyBvcHRpb25hbCB0YWIgaW5kZXggb2YgdGhlIGNvbnRyb2xcblx0dGFiU2VsZWN0c1ZhbHVlOiBQcm9wVHlwZXMuYm9vbCwgICAgICAvLyB3aGV0aGVyIHRvIHRyZWF0IHRhYmJpbmcgb3V0IHdoaWxlIGZvY3VzZWQgdG8gYmUgdmFsdWUgc2VsZWN0aW9uXG5cdHZhbHVlOiBQcm9wVHlwZXMuYW55LCAgICAgICAgICAgICAgICAgLy8gaW5pdGlhbCBmaWVsZCB2YWx1ZVxuXHR2YWx1ZUNvbXBvbmVudDogUHJvcFR5cGVzLmZ1bmMsICAgICAgIC8vIHZhbHVlIGNvbXBvbmVudCB0byByZW5kZXJcblx0dmFsdWVLZXk6IFByb3BUeXBlcy5zdHJpbmcsICAgICAgICAgICAvLyBwYXRoIG9mIHRoZSBsYWJlbCB2YWx1ZSBpbiBvcHRpb24gb2JqZWN0c1xuXHR2YWx1ZVJlbmRlcmVyOiBQcm9wVHlwZXMuZnVuYywgICAgICAgIC8vIHZhbHVlUmVuZGVyZXI6IGZ1bmN0aW9uIChvcHRpb24pIHt9XG5cdHdyYXBwZXJTdHlsZTogUHJvcFR5cGVzLm9iamVjdCwgICAgICAgLy8gb3B0aW9uYWwgc3R5bGUgdG8gYXBwbHkgdG8gdGhlIGNvbXBvbmVudCB3cmFwcGVyXG5cdGlucHV0V3JhcHBlclN0eWxlOiBQcm9wVHlwZXMub2JqZWN0LFx0Ly8gb3B0aW9uYWwgc3R5bGUgdG8gYXBwbHkgdG8gdGhlIGlucHV0IHdyYXBwZXJcblx0aW5wdXRTdHlsZTogUHJvcFR5cGVzLm9iamVjdCxcdFx0XHRcdFx0Ly8gb3B0aW9uYWwgc3R5bGUgdG8gYXBwbHkgdG8gdGhlIGlucHV0XG5cdGhpZGVBcnJvdzogUHJvcFR5cGVzLmJvb2wsXHRcdFx0XHRcdFx0Ly8gd2hldGhlciBhcnJvdyBpY29uIGlzIGhpZGRlbiBvciBub3Rcblx0ZmxvYXRpbmdMYWJlbEZpeGVkOiBQcm9wVHlwZXMuYm9vbCxcblx0ZmxvYXRpbmdMYWJlbEZvY3VzU3R5bGU6IFByb3BUeXBlcy5vYmplY3QsXG5cdGZsb2F0aW5nTGFiZWxTaHJpbmtTdHlsZTogUHJvcFR5cGVzLm9iamVjdCxcblx0ZmxvYXRpbmdMYWJlbFN0eWxlOiBQcm9wVHlwZXMub2JqZWN0LFxuXHRmbG9hdGluZ0xhYmVsVGV4dDogUHJvcFR5cGVzLm5vZGUsXHRcdC8vIHRpdGxlIGZvciB0aGUgZXJyb3IgZWxlbWVudFxuXHRlcnJvckNsYXNzTmFtZTogUHJvcFR5cGVzLnN0cmluZyxcdFx0XHQvLyBjbGFzc05hbWUgZm9yIHRoZSBlcnJvciBlbGVtZW50XG5cdGVycm9yU3R5bGU6IFByb3BUeXBlcy5vYmplY3QsXHRcdFx0XHRcdC8vIG9wdGlvbmFsIHN0eWxlIHRvIGFwcGx5IHRvIHRoZSBlcnJvciBlbGVtZW50XG5cdGVycm9yVGV4dDogUHJvcFR5cGVzLm5vZGUsXHRcdFx0XHRcdFx0Ly8gdGl0bGUgZm9yIHRoZSBlcnJvciBlbGVtZW50XG5cbn07XG5jb25zdCBkZWZhdWx0UHJvcHMgPSB7XG5cdGFkZExhYmVsVGV4dDogJ0FkZCBcIntsYWJlbH1cIj8nLFxuXHRhcnJvd1JlbmRlcmVyOiBkZWZhdWx0QXJyb3dSZW5kZXJlcixcblx0YXV0b3NpemU6IHRydWUsXG5cdGJhY2tzcGFjZVJlbW92ZXM6IHRydWUsXG5cdGJhY2tzcGFjZVRvUmVtb3ZlTWVzc2FnZTogJ1ByZXNzIGJhY2tzcGFjZSB0byByZW1vdmUge2xhYmVsfScsXG5cdGNsZWFyYWJsZTogdHJ1ZSxcblx0Y2xlYXJBbGxUZXh0OiAnQ2xlYXIgYWxsJyxcblx0Y2xlYXJSZW5kZXJlcjogZGVmYXVsdENsZWFyUmVuZGVyZXIsXG5cdGNsZWFyVmFsdWVUZXh0OiAnQ2xlYXIgdmFsdWUnLFxuXHRkZWxldGVSZW1vdmVzOiB0cnVlLFxuXHRkZWxpbWl0ZXI6ICcsJyxcblx0ZGlzYWJsZWQ6IGZhbHNlLFxuXHRlc2NhcGVDbGVhcnNWYWx1ZTogdHJ1ZSxcblx0ZmlsdGVyT3B0aW9uczogZGVmYXVsdEZpbHRlck9wdGlvbnMsXG5cdGlnbm9yZUNhc2U6IHRydWUsXG5cdGlucHV0UHJvcHM6IHt9LFxuXHRpc0xvYWRpbmc6IGZhbHNlLFxuXHRqb2luVmFsdWVzOiBmYWxzZSxcblx0bGFiZWxLZXk6ICdsYWJlbCcsXG5cdG1hdGNoUG9zOiAnYW55Jyxcblx0bWF0Y2hQcm9wOiAnYW55Jyxcblx0bWVudUJ1ZmZlcjogMCxcblx0bWVudVJlbmRlcmVyOiBkZWZhdWx0TWVudVJlbmRlcmVyLFxuXHRtdWx0aTogZmFsc2UsXG5cdG5vUmVzdWx0c1RleHQ6ICdObyByZXN1bHRzIGZvdW5kJyxcblx0b25CbHVyUmVzZXRzSW5wdXQ6IHRydWUsXG5cdG9uQ2xvc2VSZXNldHNJbnB1dDogdHJ1ZSxcblx0b3B0aW9uQ29tcG9uZW50OiBPcHRpb24sXG5cdHBhZ2VTaXplOiA1LFxuXHRwbGFjZWhvbGRlcjogJ1NlbGVjdC4uLicsXG5cdHJlcXVpcmVkOiBmYWxzZSxcblx0c2Nyb2xsTWVudUludG9WaWV3OiB0cnVlLFxuXHRzZWFyY2hhYmxlOiB0cnVlLFxuXHRzaW1wbGVWYWx1ZTogZmFsc2UsXG5cdHRhYlNlbGVjdHNWYWx1ZTogdHJ1ZSxcblx0dmFsdWVDb21wb25lbnQ6IFZhbHVlLFxuXHR2YWx1ZUtleTogJ3ZhbHVlJyxcblx0aGlkZUFycm93OiBmYWxzZSxcbn07XG5cbmNsYXNzIFNlbGVjdCBleHRlbmRzIENvbXBvbmVudCB7XG5cdGNvbnN0cnVjdG9yKHByb3BzKSB7XG5cdFx0c3VwZXIocHJvcHMpO1xuXHRcdHRoaXMuc3RhdGUgPSB7XG5cdFx0XHRpbnB1dFZhbHVlOiAnJyxcblx0XHRcdGlzRm9jdXNlZDogZmFsc2UsXG5cdFx0XHRpc09wZW46IGZhbHNlLFxuXHRcdFx0aXNQc2V1ZG9Gb2N1c2VkOiBmYWxzZSxcblx0XHRcdHJlcXVpcmVkOiBmYWxzZSxcblx0XHRcdGhhc1ZhbHVlOiBmYWxzZSxcblx0XHRcdGVycm9yVGV4dDogdW5kZWZpbmVkLFxuXHRcdH07XG5cdFx0dGhpcy5oYW5kbGVNb3VzZURvd24gPSB0aGlzLmhhbmRsZU1vdXNlRG93bi5iaW5kKHRoaXMpO1xuXHRcdHRoaXMuaGFuZGxlTW91c2VEb3duT25BcnJvdyA9IHRoaXMuaGFuZGxlTW91c2VEb3duT25BcnJvdy5iaW5kKHRoaXMpO1xuXHRcdHRoaXMuaGFuZGxlTW91c2VEb3duT25NZW51ID0gdGhpcy5oYW5kbGVNb3VzZURvd25Pbk1lbnUuYmluZCh0aGlzKTtcblx0XHR0aGlzLmNsb3NlTWVudSA9IHRoaXMuY2xvc2VNZW51LmJpbmQodGhpcyk7XG5cdFx0dGhpcy5oYW5kbGVJbnB1dEZvY3VzID0gdGhpcy5oYW5kbGVJbnB1dEZvY3VzLmJpbmQodGhpcyk7XG5cdFx0dGhpcy5oYW5kbGVJbnB1dEJsdXIgPSB0aGlzLmhhbmRsZUlucHV0Qmx1ci5iaW5kKHRoaXMpO1xuXHRcdHRoaXMuaGFuZGxlSW5wdXRDaGFuZ2UgPSB0aGlzLmhhbmRsZUlucHV0Q2hhbmdlLmJpbmQodGhpcyk7XG5cdFx0dGhpcy5oYW5kbGVLZXlEb3duID0gdGhpcy5oYW5kbGVLZXlEb3duLmJpbmQodGhpcyk7XG5cdFx0dGhpcy5oYW5kbGVWYWx1ZUNsaWNrID0gdGhpcy5oYW5kbGVWYWx1ZUNsaWNrLmJpbmQodGhpcyk7XG5cdFx0dGhpcy5oYW5kbGVNZW51U2Nyb2xsID0gdGhpcy5oYW5kbGVNZW51U2Nyb2xsLmJpbmQodGhpcyk7XG5cdFx0dGhpcy5nZXRPcHRpb25MYWJlbCA9IHRoaXMuZ2V0T3B0aW9uTGFiZWwuYmluZCh0aGlzKTtcblx0XHR0aGlzLmdldFZhbHVlQXJyYXkgPSB0aGlzLmdldFZhbHVlQXJyYXkuYmluZCh0aGlzKTtcblx0XHR0aGlzLnNldFZhbHVlID0gdGhpcy5zZXRWYWx1ZS5iaW5kKHRoaXMpO1xuXHRcdHRoaXMuc2VsZWN0VmFsdWUgPSB0aGlzLnNlbGVjdFZhbHVlLmJpbmQodGhpcyk7XG5cdFx0dGhpcy5hZGRWYWx1ZSA9IHRoaXMuYWRkVmFsdWUuYmluZCh0aGlzKTtcblx0XHR0aGlzLnBvcFZhbHVlID0gdGhpcy5wb3BWYWx1ZS5iaW5kKHRoaXMpO1xuXHRcdHRoaXMucmVtb3ZlVmFsdWUgPSB0aGlzLnJlbW92ZVZhbHVlLmJpbmQodGhpcyk7XG5cdFx0dGhpcy5jbGVhclZhbHVlID0gdGhpcy5jbGVhclZhbHVlLmJpbmQodGhpcyk7XG5cdFx0dGhpcy5yZW1vdmVWYWx1ZSA9IHRoaXMucmVtb3ZlVmFsdWUuYmluZCh0aGlzKTtcblx0XHR0aGlzLmdldFJlc2V0VmFsdWUgPSB0aGlzLmdldFJlc2V0VmFsdWUuYmluZCh0aGlzKTtcblx0XHR0aGlzLmZvY3VzT3B0aW9uID0gdGhpcy5mb2N1c09wdGlvbi5iaW5kKHRoaXMpO1xuXHRcdHRoaXMuZm9jdXNBZGphY2VudE9wdGlvbiA9IHRoaXMuZm9jdXNBZGphY2VudE9wdGlvbi5iaW5kKHRoaXMpO1xuXHRcdHRoaXMuZ2V0SW5wdXRWYWx1ZSA9IHRoaXMuZ2V0SW5wdXRWYWx1ZS5iaW5kKHRoaXMpO1xuXHRcdHRoaXMuc2VsZWN0Rm9jdXNlZE9wdGlvbiA9IHRoaXMuc2VsZWN0Rm9jdXNlZE9wdGlvbi5iaW5kKHRoaXMpO1xuXHRcdHRoaXMuZmlsdGVyT3B0aW9ucyA9IHRoaXMuZmlsdGVyT3B0aW9ucy5iaW5kKHRoaXMpO1xuXHRcdHRoaXMub25PcHRpb25SZWYgPSB0aGlzLm9uT3B0aW9uUmVmLmJpbmQodGhpcyk7XG5cdFx0dGhpcy5nZXRGb2N1c2FibGVPcHRpb25JbmRleCA9IHRoaXMuZ2V0Rm9jdXNhYmxlT3B0aW9uSW5kZXguYmluZCh0aGlzKTtcblx0fVxuXG5cdGNvbXBvbmVudFdpbGxNb3VudCAoKSB7XG5cdFx0dGhpcy5faW5zdGFuY2VQcmVmaXggPSAncmVhY3Qtc2VsZWN0LScgKyAodGhpcy5wcm9wcy5pbnN0YW5jZUlkIHx8ICsraW5zdGFuY2VJZCkgKyAnLSc7XG5cdFx0Y29uc3QgdmFsdWVBcnJheSA9IHRoaXMuZ2V0VmFsdWVBcnJheSh0aGlzLnByb3BzLnZhbHVlKTtcblxuXHRcdGlmICh0aGlzLnByb3BzLnJlcXVpcmVkKSB7XG5cdFx0XHR0aGlzLnNldFN0YXRlKHtcblx0XHRcdFx0cmVxdWlyZWQ6IHRoaXMuaGFuZGxlUmVxdWlyZWQodmFsdWVBcnJheVswXSwgdGhpcy5wcm9wcy5tdWx0aSksXG5cdFx0XHRcdGhhc1ZhbHVlOiBpc1ZhbGlkKHRoaXMucHJvcHMudmFsdWUpLFxuXHRcdFx0XHRlcnJvclRleHQ6IHRoaXMucHJvcHMuZXJyb3JUZXh0LFxuXHRcdFx0fSk7XG5cdFx0fVxuXHR9XG5cblx0Y29tcG9uZW50RGlkTW91bnQgKCkge1xuXHRcdGlmICh0aGlzLnByb3BzLmF1dG9mb2N1cykge1xuXHRcdFx0dGhpcy5mb2N1cygpO1xuXHRcdH1cblx0fVxuXG5cdGNvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHMgKG5leHRQcm9wcykge1xuXHRcdGNvbnN0IHZhbHVlQXJyYXkgPSB0aGlzLmdldFZhbHVlQXJyYXkobmV4dFByb3BzLnZhbHVlLCBuZXh0UHJvcHMpO1xuXG5cdFx0aWYgKG5leHRQcm9wcy5yZXF1aXJlZCkge1xuXHRcdFx0dGhpcy5zZXRTdGF0ZSh7XG5cdFx0XHRcdHJlcXVpcmVkOiB0aGlzLmhhbmRsZVJlcXVpcmVkKHZhbHVlQXJyYXlbMF0sIG5leHRQcm9wcy5tdWx0aSksXG5cdFx0XHRcdGhhc1ZhbHVlOiBpc1ZhbGlkKG5leHRQcm9wcy52YWx1ZSksXG5cdFx0XHRcdGVycm9yVGV4dDogbmV4dFByb3BzLmVycm9yVGV4dCxcblx0XHRcdH0pO1xuXHRcdH1cblx0fVxuXG5cdGNvbXBvbmVudFdpbGxVcGRhdGUgKG5leHRQcm9wcywgbmV4dFN0YXRlKSB7XG5cdFx0aWYgKG5leHRTdGF0ZS5pc09wZW4gIT09IHRoaXMuc3RhdGUuaXNPcGVuKSB7XG5cdFx0XHR0aGlzLnRvZ2dsZVRvdWNoT3V0c2lkZUV2ZW50KG5leHRTdGF0ZS5pc09wZW4pO1xuXHRcdFx0Y29uc3QgaGFuZGxlciA9IG5leHRTdGF0ZS5pc09wZW4gPyBuZXh0UHJvcHMub25PcGVuIDogbmV4dFByb3BzLm9uQ2xvc2U7XG5cdFx0XHRoYW5kbGVyICYmIGhhbmRsZXIoKTtcblx0XHR9XG5cdH1cblxuXHRjb21wb25lbnREaWRVcGRhdGUgKHByZXZQcm9wcywgcHJldlN0YXRlKSB7XG5cdFx0Ly8gZm9jdXMgdG8gdGhlIHNlbGVjdGVkIG9wdGlvblxuXHRcdGlmICh0aGlzLm1lbnUgJiYgdGhpcy5zdGF0ZS5mb2N1c2VkICYmIHRoaXMuc3RhdGUuaXNPcGVuICYmICF0aGlzLmhhc1Njcm9sbGVkVG9PcHRpb24pIHtcblx0XHRcdGxldCBmb2N1c2VkT3B0aW9uTm9kZSA9IFJlYWN0RE9NLmZpbmRET01Ob2RlKHRoaXMuc3RhdGUuZm9jdXNlZCk7XG5cdFx0XHRsZXQgbWVudU5vZGUgPSBSZWFjdERPTS5maW5kRE9NTm9kZSh0aGlzLm1lbnUpO1xuXHRcdFx0bWVudU5vZGUuc2Nyb2xsVG9wID0gZm9jdXNlZE9wdGlvbk5vZGUub2Zmc2V0VG9wO1xuXHRcdFx0dGhpcy5oYXNTY3JvbGxlZFRvT3B0aW9uID0gdHJ1ZTtcblx0XHR9IGVsc2UgaWYgKCF0aGlzLnN0YXRlLmlzT3Blbikge1xuXHRcdFx0dGhpcy5oYXNTY3JvbGxlZFRvT3B0aW9uID0gZmFsc2U7XG5cdFx0fVxuXG5cdFx0aWYgKHRoaXMuX3Njcm9sbFRvRm9jdXNlZE9wdGlvbk9uVXBkYXRlICYmIHRoaXMuc3RhdGUuZm9jdXNlZCAmJiB0aGlzLm1lbnUpIHtcblx0XHRcdHRoaXMuX3Njcm9sbFRvRm9jdXNlZE9wdGlvbk9uVXBkYXRlID0gZmFsc2U7XG5cdFx0XHRsZXQgZm9jdXNlZERPTSA9IFJlYWN0RE9NLmZpbmRET01Ob2RlKHRoaXMuc3RhdGUuZm9jdXNlZCk7XG5cdFx0XHRsZXQgbWVudURPTSA9IFJlYWN0RE9NLmZpbmRET01Ob2RlKHRoaXMubWVudSk7XG5cdFx0XHRsZXQgZm9jdXNlZFJlY3QgPSBmb2N1c2VkRE9NLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuXHRcdFx0bGV0IG1lbnVSZWN0ID0gbWVudURPTS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcblx0XHRcdGlmIChmb2N1c2VkUmVjdC5ib3R0b20gPiBtZW51UmVjdC5ib3R0b20gfHwgZm9jdXNlZFJlY3QudG9wIDwgbWVudVJlY3QudG9wKSB7XG5cdFx0XHRcdG1lbnVET00uc2Nyb2xsVG9wID0gKGZvY3VzZWRET00ub2Zmc2V0VG9wICsgZm9jdXNlZERPTS5jbGllbnRIZWlnaHQgLSBtZW51RE9NLm9mZnNldEhlaWdodCk7XG5cdFx0XHR9XG5cdFx0fVxuXHRcdGlmICh0aGlzLnByb3BzLnNjcm9sbE1lbnVJbnRvVmlldyAmJiB0aGlzLm1lbnVDb250YWluZXIpIHtcblx0XHRcdGxldCBtZW51Q29udGFpbmVyUmVjdCA9IHRoaXMubWVudUNvbnRhaW5lci5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcblx0XHRcdGlmICh3aW5kb3cuaW5uZXJIZWlnaHQgPCBtZW51Q29udGFpbmVyUmVjdC5ib3R0b20gKyB0aGlzLnByb3BzLm1lbnVCdWZmZXIpIHtcblx0XHRcdFx0d2luZG93LnNjcm9sbEJ5KDAsIG1lbnVDb250YWluZXJSZWN0LmJvdHRvbSArIHRoaXMucHJvcHMubWVudUJ1ZmZlciAtIHdpbmRvdy5pbm5lckhlaWdodCk7XG5cdFx0XHR9XG5cdFx0fVxuXHRcdGlmIChwcmV2UHJvcHMuZGlzYWJsZWQgIT09IHRoaXMucHJvcHMuZGlzYWJsZWQpIHtcblx0XHRcdHRoaXMuc2V0U3RhdGUoeyBpc0ZvY3VzZWQ6IGZhbHNlIH0pOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIHJlYWN0L25vLWRpZC11cGRhdGUtc2V0LXN0YXRlXG5cdFx0XHR0aGlzLmNsb3NlTWVudSgpO1xuXHRcdH1cblx0fVxuXG5cdGNvbXBvbmVudFdpbGxVbm1vdW50ICgpIHtcblx0XHRpZiAoIWRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIgJiYgZG9jdW1lbnQuZGV0YWNoRXZlbnQpIHtcblx0XHRcdGRvY3VtZW50LmRldGFjaEV2ZW50KCdvbnRvdWNoc3RhcnQnLCB0aGlzLmhhbmRsZVRvdWNoT3V0c2lkZSk7XG5cdFx0fSBlbHNlIHtcblx0XHRcdGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3RvdWNoc3RhcnQnLCB0aGlzLmhhbmRsZVRvdWNoT3V0c2lkZSk7XG5cdFx0fVxuXHR9XG5cblx0dG9nZ2xlVG91Y2hPdXRzaWRlRXZlbnQgKGVuYWJsZWQpIHtcblx0XHRpZiAoZW5hYmxlZCkge1xuXHRcdFx0aWYgKCFkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyICYmIGRvY3VtZW50LmF0dGFjaEV2ZW50KSB7XG5cdFx0XHRcdGRvY3VtZW50LmF0dGFjaEV2ZW50KCdvbnRvdWNoc3RhcnQnLCB0aGlzLmhhbmRsZVRvdWNoT3V0c2lkZSk7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCd0b3VjaHN0YXJ0JywgdGhpcy5oYW5kbGVUb3VjaE91dHNpZGUpO1xuXHRcdFx0fVxuXHRcdH0gZWxzZSB7XG5cdFx0XHRpZiAoIWRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIgJiYgZG9jdW1lbnQuZGV0YWNoRXZlbnQpIHtcblx0XHRcdFx0ZG9jdW1lbnQuZGV0YWNoRXZlbnQoJ29udG91Y2hzdGFydCcsIHRoaXMuaGFuZGxlVG91Y2hPdXRzaWRlKTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3RvdWNoc3RhcnQnLCB0aGlzLmhhbmRsZVRvdWNoT3V0c2lkZSk7XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cblx0aGFuZGxlVG91Y2hPdXRzaWRlIChldmVudCkge1xuXHRcdC8vIGhhbmRsZSB0b3VjaCBvdXRzaWRlIG9uIGlvcyB0byBkaXNtaXNzIG1lbnVcblx0XHRpZiAodGhpcy53cmFwcGVyICYmICF0aGlzLndyYXBwZXIuY29udGFpbnMoZXZlbnQudGFyZ2V0KSkge1xuXHRcdFx0dGhpcy5jbG9zZU1lbnUoKTtcblx0XHR9XG5cdH1cblxuXHRmb2N1cyAoKSB7XG5cdFx0aWYgKCF0aGlzLmlucHV0KSByZXR1cm47XG5cdFx0dGhpcy5pbnB1dC5mb2N1cygpO1xuXHR9XG5cblx0Ymx1cklucHV0ICgpIHtcblx0XHRpZiAoIXRoaXMuaW5wdXQpIHJldHVybjtcblx0XHR0aGlzLmlucHV0LmJsdXIoKTtcblx0fVxuXG5cdGhhbmRsZVRvdWNoTW92ZSAoZXZlbnQpIHtcblx0XHQvLyBTZXQgYSBmbGFnIHRoYXQgdGhlIHZpZXcgaXMgYmVpbmcgZHJhZ2dlZFxuXHRcdHRoaXMuZHJhZ2dpbmcgPSB0cnVlO1xuXHR9XG5cblx0aGFuZGxlVG91Y2hTdGFydCAoZXZlbnQpIHtcblx0XHQvLyBTZXQgYSBmbGFnIHRoYXQgdGhlIHZpZXcgaXMgbm90IGJlaW5nIGRyYWdnZWRcblx0XHR0aGlzLmRyYWdnaW5nID0gZmFsc2U7XG5cdH1cblxuXHRoYW5kbGVUb3VjaEVuZCAoZXZlbnQpIHtcblx0XHQvLyBDaGVjayBpZiB0aGUgdmlldyBpcyBiZWluZyBkcmFnZ2VkLCBJbiB0aGlzIGNhc2Vcblx0XHQvLyB3ZSBkb24ndCB3YW50IHRvIGZpcmUgdGhlIGNsaWNrIGV2ZW50IChiZWNhdXNlIHRoZSB1c2VyIG9ubHkgd2FudHMgdG8gc2Nyb2xsKVxuXHRcdGlmICh0aGlzLmRyYWdnaW5nKSByZXR1cm47XG5cblx0XHQvLyBGaXJlIHRoZSBtb3VzZSBldmVudHNcblx0XHR0aGlzLmhhbmRsZU1vdXNlRG93bihldmVudCk7XG5cdH1cblxuXHRoYW5kbGVUb3VjaEVuZENsZWFyVmFsdWUgKGV2ZW50KSB7XG5cdFx0Ly8gQ2hlY2sgaWYgdGhlIHZpZXcgaXMgYmVpbmcgZHJhZ2dlZCwgSW4gdGhpcyBjYXNlXG5cdFx0Ly8gd2UgZG9uJ3Qgd2FudCB0byBmaXJlIHRoZSBjbGljayBldmVudCAoYmVjYXVzZSB0aGUgdXNlciBvbmx5IHdhbnRzIHRvIHNjcm9sbClcblx0XHRpZiAodGhpcy5kcmFnZ2luZykgcmV0dXJuO1xuXG5cdFx0Ly8gQ2xlYXIgdGhlIHZhbHVlXG5cdFx0dGhpcy5jbGVhclZhbHVlKGV2ZW50KTtcblx0fVxuXG5cdGhhbmRsZU1vdXNlRG93biAoZXZlbnQpIHtcblx0XHQvLyBpZiB0aGUgZXZlbnQgd2FzIHRyaWdnZXJlZCBieSBhIG1vdXNlZG93biBhbmQgbm90IHRoZSBwcmltYXJ5XG5cdFx0Ly8gYnV0dG9uLCBvciBpZiB0aGUgY29tcG9uZW50IGlzIGRpc2FibGVkLCBpZ25vcmUgaXQuXG5cdFx0aWYgKHRoaXMucHJvcHMuZGlzYWJsZWQgfHwgKGV2ZW50LnR5cGUgPT09ICdtb3VzZWRvd24nICYmIGV2ZW50LmJ1dHRvbiAhPT0gMCkpIHtcblx0XHRcdHJldHVybjtcblx0XHR9XG5cblx0XHRpZiAoZXZlbnQudGFyZ2V0LnRhZ05hbWUgPT09ICdJTlBVVCcpIHtcblx0XHRcdHJldHVybjtcblx0XHR9XG5cblx0XHQvLyBwcmV2ZW50IGRlZmF1bHQgZXZlbnQgaGFuZGxlcnNcblx0XHRldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcblx0XHRldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXG5cdFx0Ly8gZm9yIHRoZSBub24tc2VhcmNoYWJsZSBzZWxlY3QsIHRvZ2dsZSB0aGUgbWVudVxuXHRcdGlmICghdGhpcy5wcm9wcy5zZWFyY2hhYmxlKSB7XG5cdFx0XHR0aGlzLmZvY3VzKCk7XG5cdFx0XHRyZXR1cm4gdGhpcy5zZXRTdGF0ZSh7XG5cdFx0XHRcdGlzT3BlbjogIXRoaXMuc3RhdGUuaXNPcGVuLFxuXHRcdFx0fSk7XG5cdFx0fVxuXG5cdFx0aWYgKHRoaXMuc3RhdGUuaXNGb2N1c2VkKSB7XG5cdFx0XHQvLyBPbiBpT1MsIHdlIGNhbiBnZXQgaW50byBhIHN0YXRlIHdoZXJlIHdlIHRoaW5rIHRoZSBpbnB1dCBpcyBmb2N1c2VkIGJ1dCBpdCBpc24ndCByZWFsbHksXG5cdFx0XHQvLyBzaW5jZSBpT1MgaWdub3JlcyBwcm9ncmFtbWF0aWMgY2FsbHMgdG8gaW5wdXQuZm9jdXMoKSB0aGF0IHdlcmVuJ3QgdHJpZ2dlcmVkIGJ5IGEgY2xpY2sgZXZlbnQuXG5cdFx0XHQvLyBDYWxsIGZvY3VzKCkgYWdhaW4gaGVyZSB0byBiZSBzYWZlLlxuXHRcdFx0dGhpcy5mb2N1cygpO1xuXG5cdFx0XHRsZXQgaW5wdXQgPSB0aGlzLmlucHV0O1xuXHRcdFx0aWYgKHR5cGVvZiBpbnB1dC5nZXRJbnB1dCA9PT0gJ2Z1bmN0aW9uJykge1xuXHRcdFx0XHQvLyBHZXQgdGhlIGFjdHVhbCBET00gaW5wdXQgaWYgdGhlIHJlZiBpcyBhbiA8QXV0b3NpemVJbnB1dCAvPiBjb21wb25lbnRcblx0XHRcdFx0aW5wdXQgPSBpbnB1dC5nZXRJbnB1dCgpO1xuXHRcdFx0fVxuXG5cdFx0XHQvLyBjbGVhcnMgdGhlIHZhbHVlIHNvIHRoYXQgdGhlIGN1cnNvciB3aWxsIGJlIGF0IHRoZSBlbmQgb2YgaW5wdXQgd2hlbiB0aGUgY29tcG9uZW50IHJlLXJlbmRlcnNcblx0XHRcdGlucHV0LnZhbHVlID0gJyc7XG5cblx0XHRcdC8vIGlmIHRoZSBpbnB1dCBpcyBmb2N1c2VkLCBlbnN1cmUgdGhlIG1lbnUgaXMgb3BlblxuXHRcdFx0dGhpcy5zZXRTdGF0ZSh7XG5cdFx0XHRcdGlzT3BlbjogdHJ1ZSxcblx0XHRcdFx0aXNQc2V1ZG9Gb2N1c2VkOiBmYWxzZSxcblx0XHRcdH0pO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHQvLyBvdGhlcndpc2UsIGZvY3VzIHRoZSBpbnB1dCBhbmQgb3BlbiB0aGUgbWVudVxuXHRcdFx0dGhpcy5fb3BlbkFmdGVyRm9jdXMgPSB0cnVlO1xuXHRcdFx0dGhpcy5mb2N1cygpO1xuXHRcdH1cblx0fVxuXG5cdGhhbmRsZU1vdXNlRG93bk9uQXJyb3cgKGV2ZW50KSB7XG5cdFx0Ly8gaWYgdGhlIGV2ZW50IHdhcyB0cmlnZ2VyZWQgYnkgYSBtb3VzZWRvd24gYW5kIG5vdCB0aGUgcHJpbWFyeVxuXHRcdC8vIGJ1dHRvbiwgb3IgaWYgdGhlIGNvbXBvbmVudCBpcyBkaXNhYmxlZCwgaWdub3JlIGl0LlxuXHRcdGlmICh0aGlzLnByb3BzLmRpc2FibGVkIHx8IChldmVudC50eXBlID09PSAnbW91c2Vkb3duJyAmJiBldmVudC5idXR0b24gIT09IDApKSB7XG5cdFx0XHRyZXR1cm47XG5cdFx0fVxuXHRcdC8vIElmIHRoZSBtZW51IGlzbid0IG9wZW4sIGxldCB0aGUgZXZlbnQgYnViYmxlIHRvIHRoZSBtYWluIGhhbmRsZU1vdXNlRG93blxuXHRcdGlmICghdGhpcy5zdGF0ZS5pc09wZW4pIHtcblx0XHRcdHJldHVybjtcblx0XHR9XG5cdFx0Ly8gcHJldmVudCBkZWZhdWx0IGV2ZW50IGhhbmRsZXJzXG5cdFx0ZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG5cdFx0ZXZlbnQucHJldmVudERlZmF1bHQoKTtcblx0XHQvLyBjbG9zZSB0aGUgbWVudVxuXHRcdHRoaXMuY2xvc2VNZW51KCk7XG5cdH1cblxuXHRoYW5kbGVNb3VzZURvd25Pbk1lbnUgKGV2ZW50KSB7XG5cdFx0Ly8gaWYgdGhlIGV2ZW50IHdhcyB0cmlnZ2VyZWQgYnkgYSBtb3VzZWRvd24gYW5kIG5vdCB0aGUgcHJpbWFyeVxuXHRcdC8vIGJ1dHRvbiwgb3IgaWYgdGhlIGNvbXBvbmVudCBpcyBkaXNhYmxlZCwgaWdub3JlIGl0LlxuXHRcdGlmICh0aGlzLnByb3BzLmRpc2FibGVkIHx8IChldmVudC50eXBlID09PSAnbW91c2Vkb3duJyAmJiBldmVudC5idXR0b24gIT09IDApKSB7XG5cdFx0XHRyZXR1cm47XG5cdFx0fVxuXHRcdGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuXHRcdGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cblx0XHR0aGlzLl9vcGVuQWZ0ZXJGb2N1cyA9IHRydWU7XG5cdFx0dGhpcy5mb2N1cygpO1xuXHR9XG5cblx0Y2xvc2VNZW51ICgpIHtcblx0XHRpZih0aGlzLnByb3BzLm9uQ2xvc2VSZXNldHNJbnB1dCkge1xuXHRcdFx0dGhpcy5zZXRTdGF0ZSh7XG5cdFx0XHRcdGlzT3BlbjogZmFsc2UsXG5cdFx0XHRcdGlzUHNldWRvRm9jdXNlZDogdGhpcy5zdGF0ZS5pc0ZvY3VzZWQgJiYgIXRoaXMucHJvcHMubXVsdGksXG5cdFx0XHRcdGlucHV0VmFsdWU6ICcnXG5cdFx0XHR9KTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0dGhpcy5zZXRTdGF0ZSh7XG5cdFx0XHRcdGlzT3BlbjogZmFsc2UsXG5cdFx0XHRcdGlzUHNldWRvRm9jdXNlZDogdGhpcy5zdGF0ZS5pc0ZvY3VzZWQgJiYgIXRoaXMucHJvcHMubXVsdGksXG5cdFx0XHRcdGlucHV0VmFsdWU6IHRoaXMuc3RhdGUuaW5wdXRWYWx1ZVxuXHRcdFx0fSk7XG5cdFx0fVxuXHRcdHRoaXMuaGFzU2Nyb2xsZWRUb09wdGlvbiA9IGZhbHNlO1xuXHR9XG5cblx0aGFuZGxlSW5wdXRGb2N1cyAoZXZlbnQpIHtcblx0XHRpZiAodGhpcy5wcm9wcy5kaXNhYmxlZCkgcmV0dXJuO1xuXHRcdGxldCBpc09wZW4gPSB0aGlzLnN0YXRlLmlzT3BlbiB8fCB0aGlzLl9vcGVuQWZ0ZXJGb2N1cyB8fCB0aGlzLnByb3BzLm9wZW5PbkZvY3VzO1xuXHRcdGlmICh0aGlzLnByb3BzLm9uRm9jdXMpIHtcblx0XHRcdHRoaXMucHJvcHMub25Gb2N1cyhldmVudCk7XG5cdFx0fVxuXHRcdHRoaXMuc2V0U3RhdGUoe1xuXHRcdFx0aXNGb2N1c2VkOiB0cnVlLFxuXHRcdFx0aXNPcGVuOiBpc09wZW5cblx0XHR9KTtcblx0XHR0aGlzLl9vcGVuQWZ0ZXJGb2N1cyA9IGZhbHNlO1xuXHR9XG5cblx0aGFuZGxlSW5wdXRCbHVyIChldmVudCkge1xuXHRcdC8vIFRoZSBjaGVjayBmb3IgbWVudS5jb250YWlucyhhY3RpdmVFbGVtZW50KSBpcyBuZWNlc3NhcnkgdG8gcHJldmVudCBJRTExJ3Mgc2Nyb2xsYmFyIGZyb20gY2xvc2luZyB0aGUgbWVudSBpbiBjZXJ0YWluIGNvbnRleHRzLlxuXHRcdC8vIGlmICh0aGlzLm1lbnUgJiYgKHRoaXMubWVudSA9PT0gZG9jdW1lbnQuYWN0aXZlRWxlbWVudCB8fCB0aGlzLm1lbnUuY29udGFpbnMoZG9jdW1lbnQuYWN0aXZlRWxlbWVudCkpKSB7XG5cdFx0Ly8gXHR0aGlzLmZvY3VzKCk7XG5cdFx0Ly8gXHRyZXR1cm47XG5cdFx0Ly8gfVxuXG5cdFx0aWYgKHRoaXMucHJvcHMub25CbHVyKSB7XG5cdFx0XHR0aGlzLnByb3BzLm9uQmx1cihldmVudCk7XG5cdFx0fVxuXHRcdGxldCBvbkJsdXJyZWRTdGF0ZSA9IHtcblx0XHRcdGlzRm9jdXNlZDogZmFsc2UsXG5cdFx0XHRpc09wZW46IGZhbHNlLFxuXHRcdFx0aXNQc2V1ZG9Gb2N1c2VkOiBmYWxzZSxcblx0XHR9O1xuXHRcdGlmICh0aGlzLnByb3BzLm9uQmx1clJlc2V0c0lucHV0KSB7XG5cdFx0XHRvbkJsdXJyZWRTdGF0ZS5pbnB1dFZhbHVlID0gJyc7XG5cdFx0fVxuXHRcdHRoaXMuc2V0U3RhdGUob25CbHVycmVkU3RhdGUpO1xuXHR9XG5cblx0aGFuZGxlSW5wdXRDaGFuZ2UgKGV2ZW50KSB7XG5cdFx0bGV0IG5ld0lucHV0VmFsdWUgPSBldmVudC50YXJnZXQudmFsdWU7XG5cblx0XHRpZiAodGhpcy5zdGF0ZS5pbnB1dFZhbHVlICE9PSBldmVudC50YXJnZXQudmFsdWUgJiYgdGhpcy5wcm9wcy5vbklucHV0Q2hhbmdlKSB7XG5cdFx0XHRsZXQgbmV4dFN0YXRlID0gdGhpcy5wcm9wcy5vbklucHV0Q2hhbmdlKG5ld0lucHV0VmFsdWUpO1xuXHRcdFx0Ly8gTm90ZTogIT0gdXNlZCBkZWxpYmVyYXRlbHkgaGVyZSB0byBjYXRjaCB1bmRlZmluZWQgYW5kIG51bGxcblx0XHRcdGlmIChuZXh0U3RhdGUgIT0gbnVsbCAmJiB0eXBlb2YgbmV4dFN0YXRlICE9PSAnb2JqZWN0Jykge1xuXHRcdFx0XHRuZXdJbnB1dFZhbHVlID0gJycgKyBuZXh0U3RhdGU7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0dGhpcy5zZXRTdGF0ZSh7XG5cdFx0XHRpc09wZW46IHRydWUsXG5cdFx0XHRpc1BzZXVkb0ZvY3VzZWQ6IGZhbHNlLFxuXHRcdFx0aW5wdXRWYWx1ZTogbmV3SW5wdXRWYWx1ZSxcblx0XHRcdGhhc1ZhbHVlOiBpc1ZhbGlkKG5ld0lucHV0VmFsdWUpLFxuXHRcdH0pO1xuXHR9XG5cblx0aGFuZGxlS2V5RG93biAoZXZlbnQpIHtcblx0XHRpZiAodGhpcy5wcm9wcy5kaXNhYmxlZCkgcmV0dXJuO1xuXG5cdFx0aWYgKHR5cGVvZiB0aGlzLnByb3BzLm9uSW5wdXRLZXlEb3duID09PSAnZnVuY3Rpb24nKSB7XG5cdFx0XHR0aGlzLnByb3BzLm9uSW5wdXRLZXlEb3duKGV2ZW50KTtcblx0XHRcdGlmIChldmVudC5kZWZhdWx0UHJldmVudGVkKSB7XG5cdFx0XHRcdHJldHVybjtcblx0XHRcdH1cblx0XHR9XG5cblx0XHRzd2l0Y2ggKGV2ZW50LmtleUNvZGUpIHtcblx0XHRcdGNhc2UgODogLy8gYmFja3NwYWNlXG5cdFx0XHRcdGlmICghdGhpcy5zdGF0ZS5pbnB1dFZhbHVlICYmIHRoaXMucHJvcHMuYmFja3NwYWNlUmVtb3Zlcykge1xuXHRcdFx0XHRcdGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cdFx0XHRcdFx0dGhpcy5wb3BWYWx1ZSgpO1xuXHRcdFx0XHR9XG5cdFx0XHRcdHJldHVybjtcblx0XHRcdGNhc2UgOTogLy8gdGFiXG5cdFx0XHRcdGlmIChldmVudC5zaGlmdEtleSB8fCAhdGhpcy5zdGF0ZS5pc09wZW4gfHwgIXRoaXMucHJvcHMudGFiU2VsZWN0c1ZhbHVlKSB7XG5cdFx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0XHR9XG5cdFx0XHRcdHRoaXMuc2VsZWN0Rm9jdXNlZE9wdGlvbigpO1xuXHRcdFx0XHRyZXR1cm47XG5cdFx0XHRjYXNlIDEzOiAvLyBlbnRlclxuXHRcdFx0XHRpZiAoIXRoaXMuc3RhdGUuaXNPcGVuKSByZXR1cm47XG5cdFx0XHRcdGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuXHRcdFx0XHR0aGlzLnNlbGVjdEZvY3VzZWRPcHRpb24oKTtcblx0XHRcdFx0YnJlYWs7XG5cdFx0XHRjYXNlIDI3OiAvLyBlc2NhcGVcblx0XHRcdFx0aWYgKHRoaXMuc3RhdGUuaXNPcGVuKSB7XG5cdFx0XHRcdFx0dGhpcy5jbG9zZU1lbnUoKTtcblx0XHRcdFx0XHRldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcblx0XHRcdFx0fSBlbHNlIGlmICh0aGlzLnByb3BzLmNsZWFyYWJsZSAmJiB0aGlzLnByb3BzLmVzY2FwZUNsZWFyc1ZhbHVlKSB7XG5cdFx0XHRcdFx0dGhpcy5jbGVhclZhbHVlKGV2ZW50KTtcblx0XHRcdFx0XHRldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcblx0XHRcdFx0fVxuXHRcdFx0XHRicmVhaztcblx0XHRcdGNhc2UgMzg6IC8vIHVwXG5cdFx0XHRcdHRoaXMuZm9jdXNQcmV2aW91c09wdGlvbigpO1xuXHRcdFx0XHRicmVhaztcblx0XHRcdGNhc2UgNDA6IC8vIGRvd25cblx0XHRcdFx0dGhpcy5mb2N1c05leHRPcHRpb24oKTtcblx0XHRcdFx0YnJlYWs7XG5cdFx0XHRjYXNlIDMzOiAvLyBwYWdlIHVwXG5cdFx0XHRcdHRoaXMuZm9jdXNQYWdlVXBPcHRpb24oKTtcblx0XHRcdFx0YnJlYWs7XG5cdFx0XHRjYXNlIDM0OiAvLyBwYWdlIGRvd25cblx0XHRcdFx0dGhpcy5mb2N1c1BhZ2VEb3duT3B0aW9uKCk7XG5cdFx0XHRcdGJyZWFrO1xuXHRcdFx0Y2FzZSAzNTogLy8gZW5kIGtleVxuXHRcdFx0XHRpZiAoZXZlbnQuc2hpZnRLZXkpIHtcblx0XHRcdFx0XHRyZXR1cm47XG5cdFx0XHRcdH1cblx0XHRcdFx0dGhpcy5mb2N1c0VuZE9wdGlvbigpO1xuXHRcdFx0XHRicmVhaztcblx0XHRcdGNhc2UgMzY6IC8vIGhvbWUga2V5XG5cdFx0XHRcdGlmIChldmVudC5zaGlmdEtleSkge1xuXHRcdFx0XHRcdHJldHVybjtcblx0XHRcdFx0fVxuXHRcdFx0XHR0aGlzLmZvY3VzU3RhcnRPcHRpb24oKTtcblx0XHRcdFx0YnJlYWs7XG5cdFx0XHRjYXNlIDQ2OiAvLyBiYWNrc3BhY2Vcblx0XHRcdFx0aWYgKCF0aGlzLnN0YXRlLmlucHV0VmFsdWUgJiYgdGhpcy5wcm9wcy5kZWxldGVSZW1vdmVzKSB7XG5cdFx0XHRcdFx0ZXZlbnQucHJldmVudERlZmF1bHQoKTtcblx0XHRcdFx0XHR0aGlzLnBvcFZhbHVlKCk7XG5cdFx0XHRcdH1cblx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0ZGVmYXVsdDogcmV0dXJuO1xuXHRcdH1cblx0XHRldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXHR9XG5cblx0aGFuZGxlVmFsdWVDbGljayAob3B0aW9uLCBldmVudCkge1xuXHRcdGlmICghdGhpcy5wcm9wcy5vblZhbHVlQ2xpY2spIHJldHVybjtcblx0XHR0aGlzLnByb3BzLm9uVmFsdWVDbGljayhvcHRpb24sIGV2ZW50KTtcblx0fVxuXG5cdGhhbmRsZU1lbnVTY3JvbGwgKGV2ZW50KSB7XG5cdFx0aWYgKCF0aGlzLnByb3BzLm9uTWVudVNjcm9sbFRvQm90dG9tKSByZXR1cm47XG5cdFx0bGV0IHsgdGFyZ2V0IH0gPSBldmVudDtcblx0XHRpZiAodGFyZ2V0LnNjcm9sbEhlaWdodCA+IHRhcmdldC5vZmZzZXRIZWlnaHQgJiYgISh0YXJnZXQuc2Nyb2xsSGVpZ2h0IC0gdGFyZ2V0Lm9mZnNldEhlaWdodCAtIHRhcmdldC5zY3JvbGxUb3ApKSB7XG5cdFx0XHR0aGlzLnByb3BzLm9uTWVudVNjcm9sbFRvQm90dG9tKCk7XG5cdFx0fVxuXHR9XG5cblx0aGFuZGxlUmVxdWlyZWQgKHZhbHVlLCBtdWx0aSkge1xuXHRcdGlmICghdmFsdWUpIHJldHVybiB0cnVlO1xuXHRcdHJldHVybiAobXVsdGkgPyB2YWx1ZS5sZW5ndGggPT09IDAgOiBPYmplY3Qua2V5cyh2YWx1ZSkubGVuZ3RoID09PSAwKTtcblx0fVxuXG5cdGdldE9wdGlvbkxhYmVsIChvcCkge1xuXHRcdHJldHVybiBvcFt0aGlzLnByb3BzLmxhYmVsS2V5XTtcblx0fVxuXG5cdC8qKlxuXHQgKiBUdXJucyBhIHZhbHVlIGludG8gYW4gYXJyYXkgZnJvbSB0aGUgZ2l2ZW4gb3B0aW9uc1xuXHQgKiBAcGFyYW1cdHtTdHJpbmd8TnVtYmVyfEFycmF5fVx0dmFsdWVcdFx0LSB0aGUgdmFsdWUgb2YgdGhlIHNlbGVjdCBpbnB1dFxuXHQgKiBAcGFyYW1cdHtPYmplY3R9XHRcdG5leHRQcm9wc1x0LSBvcHRpb25hbGx5IHNwZWNpZnkgdGhlIG5leHRQcm9wcyBzbyB0aGUgcmV0dXJuZWQgYXJyYXkgdXNlcyB0aGUgbGF0ZXN0IGNvbmZpZ3VyYXRpb25cblx0ICogQHJldHVybnNcdHtBcnJheX1cdHRoZSB2YWx1ZSBvZiB0aGUgc2VsZWN0IHJlcHJlc2VudGVkIGluIGFuIGFycmF5XG5cdCAqL1xuXHRnZXRWYWx1ZUFycmF5ICh2YWx1ZSwgbmV4dFByb3BzKSB7XG5cdFx0LyoqIHN1cHBvcnQgb3B0aW9uYWxseSBwYXNzaW5nIGluIHRoZSBgbmV4dFByb3BzYCBzbyBgY29tcG9uZW50V2lsbFJlY2VpdmVQcm9wc2AgdXBkYXRlcyB3aWxsIGZ1bmN0aW9uIGFzIGV4cGVjdGVkICovXG5cdFx0Y29uc3QgcHJvcHMgPSB0eXBlb2YgbmV4dFByb3BzID09PSAnb2JqZWN0JyA/IG5leHRQcm9wcyA6IHRoaXMucHJvcHM7XG5cdFx0aWYgKHByb3BzLm11bHRpKSB7XG5cdFx0XHRpZiAodHlwZW9mIHZhbHVlID09PSAnc3RyaW5nJykgdmFsdWUgPSB2YWx1ZS5zcGxpdChwcm9wcy5kZWxpbWl0ZXIpO1xuXHRcdFx0aWYgKCFBcnJheS5pc0FycmF5KHZhbHVlKSkge1xuXHRcdFx0XHRpZiAodmFsdWUgPT09IG51bGwgfHwgdmFsdWUgPT09IHVuZGVmaW5lZCkgcmV0dXJuIFtdO1xuXHRcdFx0XHR2YWx1ZSA9IFt2YWx1ZV07XG5cdFx0XHR9XG5cdFx0XHRyZXR1cm4gdmFsdWUubWFwKHZhbHVlID0+IHRoaXMuZXhwYW5kVmFsdWUodmFsdWUsIHByb3BzKSkuZmlsdGVyKGkgPT4gaSk7XG5cdFx0fVxuXHRcdGxldCBleHBhbmRlZFZhbHVlID0gdGhpcy5leHBhbmRWYWx1ZSh2YWx1ZSwgcHJvcHMpO1xuXHRcdHJldHVybiBleHBhbmRlZFZhbHVlID8gW2V4cGFuZGVkVmFsdWVdIDogW107XG5cdH1cblxuXHQvKipcblx0ICogUmV0cmlldmUgYSB2YWx1ZSBmcm9tIHRoZSBnaXZlbiBvcHRpb25zIGFuZCB2YWx1ZUtleVxuXHQgKiBAcGFyYW1cdHtTdHJpbmd8TnVtYmVyfEFycmF5fVx0dmFsdWVcdC0gdGhlIHNlbGVjdGVkIHZhbHVlKHMpXG5cdCAqIEBwYXJhbVx0e09iamVjdH1cdFx0cHJvcHNcdC0gdGhlIFNlbGVjdCBjb21wb25lbnQncyBwcm9wcyAob3IgbmV4dFByb3BzKVxuXHQgKi9cblx0ZXhwYW5kVmFsdWUgKHZhbHVlLCBwcm9wcykge1xuXHRcdGNvbnN0IHZhbHVlVHlwZSA9IHR5cGVvZiB2YWx1ZTtcblx0XHRpZiAodmFsdWVUeXBlICE9PSAnc3RyaW5nJyAmJiB2YWx1ZVR5cGUgIT09ICdudW1iZXInICYmIHZhbHVlVHlwZSAhPT0gJ2Jvb2xlYW4nKSByZXR1cm4gdmFsdWU7XG5cdFx0bGV0IHsgb3B0aW9ucywgdmFsdWVLZXkgfSA9IHByb3BzO1xuXHRcdGlmICghb3B0aW9ucykgcmV0dXJuO1xuXHRcdGZvciAobGV0IGkgPSAwOyBpIDwgb3B0aW9ucy5sZW5ndGg7IGkrKykge1xuXHRcdFx0aWYgKG9wdGlvbnNbaV1bdmFsdWVLZXldID09PSB2YWx1ZSkgcmV0dXJuIG9wdGlvbnNbaV07XG5cdFx0fVxuXHR9XG5cblx0c2V0VmFsdWUgKHZhbHVlKSB7XG5cdFx0aWYgKHRoaXMucHJvcHMuYXV0b0JsdXIpe1xuXHRcdFx0dGhpcy5ibHVySW5wdXQoKTtcblx0XHR9XG5cdFx0aWYgKCF0aGlzLnByb3BzLm9uQ2hhbmdlKSByZXR1cm47XG5cdFx0aWYgKHRoaXMucHJvcHMucmVxdWlyZWQpIHtcblx0XHRcdGNvbnN0IHJlcXVpcmVkID0gdGhpcy5oYW5kbGVSZXF1aXJlZCh2YWx1ZSwgdGhpcy5wcm9wcy5tdWx0aSk7XG5cdFx0XHR0aGlzLnNldFN0YXRlKHsgcmVxdWlyZWQgfSk7XG5cdFx0fVxuXHRcdGlmICh0aGlzLnByb3BzLnNpbXBsZVZhbHVlICYmIHZhbHVlKSB7XG5cdFx0XHR2YWx1ZSA9IHRoaXMucHJvcHMubXVsdGkgPyB2YWx1ZS5tYXAoaSA9PiBpW3RoaXMucHJvcHMudmFsdWVLZXldKS5qb2luKHRoaXMucHJvcHMuZGVsaW1pdGVyKSA6IHZhbHVlW3RoaXMucHJvcHMudmFsdWVLZXldO1xuXHRcdH1cblx0XHR0aGlzLnByb3BzLm9uQ2hhbmdlKHZhbHVlKTtcblx0fVxuXG5cdHNlbGVjdFZhbHVlICh2YWx1ZSkge1xuXHRcdC8vTk9URTogdXBkYXRlIHZhbHVlIGluIHRoZSBjYWxsYmFjayB0byBtYWtlIHN1cmUgdGhlIGlucHV0IHZhbHVlIGlzIGVtcHR5IHNvIHRoYXQgdGhlcmUgYXJlIG5vIHN0eWxpbmcgaXNzdWVzIChDaHJvbWUgaGFkIGlzc3VlIG90aGVyd2lzZSlcblx0XHR0aGlzLmhhc1Njcm9sbGVkVG9PcHRpb24gPSBmYWxzZTtcblx0XHRpZiAodGhpcy5wcm9wcy5tdWx0aSkge1xuXHRcdFx0dGhpcy5zZXRTdGF0ZSh7XG5cdFx0XHRcdGlucHV0VmFsdWU6ICcnLFxuXHRcdFx0XHRmb2N1c2VkSW5kZXg6IG51bGxcblx0XHRcdH0sICgpID0+IHtcblx0XHRcdFx0dGhpcy5hZGRWYWx1ZSh2YWx1ZSk7XG5cdFx0XHR9KTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0dGhpcy5zZXRTdGF0ZSh7XG5cdFx0XHRcdGlzT3BlbjogZmFsc2UsXG5cdFx0XHRcdGlucHV0VmFsdWU6ICcnLFxuXHRcdFx0XHRpc1BzZXVkb0ZvY3VzZWQ6IHRoaXMuc3RhdGUuaXNGb2N1c2VkLFxuXHRcdFx0fSwgKCkgPT4ge1xuXHRcdFx0XHR0aGlzLnNldFZhbHVlKHZhbHVlKTtcblx0XHRcdH0pO1xuXHRcdH1cblx0fVxuXG5cdGFkZFZhbHVlICh2YWx1ZSkge1xuXHRcdGxldCB2YWx1ZUFycmF5ID0gdGhpcy5nZXRWYWx1ZUFycmF5KHRoaXMucHJvcHMudmFsdWUpO1xuXHRcdGNvbnN0IHZpc2libGVPcHRpb25zID0gdGhpcy5fdmlzaWJsZU9wdGlvbnMuZmlsdGVyKHZhbCA9PiAhdmFsLmRpc2FibGVkKTtcblx0XHRjb25zdCBsYXN0VmFsdWVJbmRleCA9IHZpc2libGVPcHRpb25zLmluZGV4T2YodmFsdWUpO1xuXHRcdHRoaXMuc2V0VmFsdWUodmFsdWVBcnJheS5jb25jYXQodmFsdWUpKTtcblx0XHRpZiAodmlzaWJsZU9wdGlvbnMubGVuZ3RoIC0gMSA9PT0gbGFzdFZhbHVlSW5kZXgpIHtcblx0XHRcdC8vIHRoZSBsYXN0IG9wdGlvbiB3YXMgc2VsZWN0ZWQ7IGZvY3VzIHRoZSBzZWNvbmQtbGFzdCBvbmVcblx0XHRcdHRoaXMuZm9jdXNPcHRpb24odmlzaWJsZU9wdGlvbnNbbGFzdFZhbHVlSW5kZXggLSAxXSk7XG5cdFx0fSBlbHNlIGlmICh2aXNpYmxlT3B0aW9ucy5sZW5ndGggPiBsYXN0VmFsdWVJbmRleCkge1xuXHRcdFx0Ly8gZm9jdXMgdGhlIG9wdGlvbiBiZWxvdyB0aGUgc2VsZWN0ZWQgb25lXG5cdFx0XHR0aGlzLmZvY3VzT3B0aW9uKHZpc2libGVPcHRpb25zW2xhc3RWYWx1ZUluZGV4ICsgMV0pO1xuXHRcdH1cblx0fVxuXG5cdHBvcFZhbHVlICgpIHtcblx0XHRsZXQgdmFsdWVBcnJheSA9IHRoaXMuZ2V0VmFsdWVBcnJheSh0aGlzLnByb3BzLnZhbHVlKTtcblx0XHRpZiAoIXZhbHVlQXJyYXkubGVuZ3RoKSByZXR1cm47XG5cdFx0aWYgKHZhbHVlQXJyYXlbdmFsdWVBcnJheS5sZW5ndGgtMV0uY2xlYXJhYmxlVmFsdWUgPT09IGZhbHNlKSByZXR1cm47XG5cdFx0dGhpcy5zZXRWYWx1ZSh2YWx1ZUFycmF5LnNsaWNlKDAsIHZhbHVlQXJyYXkubGVuZ3RoIC0gMSkpO1xuXHR9XG5cblx0cmVtb3ZlVmFsdWUgKHZhbHVlKSB7XG5cdFx0bGV0IHZhbHVlQXJyYXkgPSB0aGlzLmdldFZhbHVlQXJyYXkodGhpcy5wcm9wcy52YWx1ZSk7XG5cdFx0dGhpcy5zZXRWYWx1ZSh2YWx1ZUFycmF5LmZpbHRlcihpID0+IGkgIT09IHZhbHVlKSk7XG5cdFx0dGhpcy5mb2N1cygpO1xuXHR9XG5cblx0Y2xlYXJWYWx1ZSAoZXZlbnQpIHtcblx0XHQvLyBpZiB0aGUgZXZlbnQgd2FzIHRyaWdnZXJlZCBieSBhIG1vdXNlZG93biBhbmQgbm90IHRoZSBwcmltYXJ5XG5cdFx0Ly8gYnV0dG9uLCBpZ25vcmUgaXQuXG5cdFx0aWYgKGV2ZW50ICYmIGV2ZW50LnR5cGUgPT09ICdtb3VzZWRvd24nICYmIGV2ZW50LmJ1dHRvbiAhPT0gMCkge1xuXHRcdFx0cmV0dXJuO1xuXHRcdH1cblx0XHRldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcblx0XHRldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXHRcdHRoaXMuc2V0VmFsdWUodGhpcy5nZXRSZXNldFZhbHVlKCkpO1xuXHRcdHRoaXMuc2V0U3RhdGUoe1xuXHRcdFx0aXNPcGVuOiBmYWxzZSxcblx0XHRcdGlucHV0VmFsdWU6ICcnLFxuXHRcdH0sIHRoaXMuZm9jdXMpO1xuXHR9XG5cblx0Z2V0UmVzZXRWYWx1ZSAoKSB7XG5cdFx0aWYgKHRoaXMucHJvcHMucmVzZXRWYWx1ZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0XHRyZXR1cm4gdGhpcy5wcm9wcy5yZXNldFZhbHVlO1xuXHRcdH0gZWxzZSBpZiAodGhpcy5wcm9wcy5tdWx0aSkge1xuXHRcdFx0cmV0dXJuIFtdO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRyZXR1cm4gbnVsbDtcblx0XHR9XG5cdH1cblxuXHRmb2N1c09wdGlvbiAob3B0aW9uKSB7XG5cdFx0dGhpcy5zZXRTdGF0ZSh7XG5cdFx0XHRmb2N1c2VkT3B0aW9uOiBvcHRpb25cblx0XHR9KTtcblx0fVxuXG5cdGZvY3VzTmV4dE9wdGlvbiAoKSB7XG5cdFx0dGhpcy5mb2N1c0FkamFjZW50T3B0aW9uKCduZXh0Jyk7XG5cdH1cblxuXHRmb2N1c1ByZXZpb3VzT3B0aW9uICgpIHtcblx0XHR0aGlzLmZvY3VzQWRqYWNlbnRPcHRpb24oJ3ByZXZpb3VzJyk7XG5cdH1cblxuXHRmb2N1c1BhZ2VVcE9wdGlvbiAoKSB7XG5cdFx0dGhpcy5mb2N1c0FkamFjZW50T3B0aW9uKCdwYWdlX3VwJyk7XG5cdH1cblxuXHRmb2N1c1BhZ2VEb3duT3B0aW9uICgpIHtcblx0XHR0aGlzLmZvY3VzQWRqYWNlbnRPcHRpb24oJ3BhZ2VfZG93bicpO1xuXHR9XG5cblx0Zm9jdXNTdGFydE9wdGlvbiAoKSB7XG5cdFx0dGhpcy5mb2N1c0FkamFjZW50T3B0aW9uKCdzdGFydCcpO1xuXHR9XG5cblx0Zm9jdXNFbmRPcHRpb24gKCkge1xuXHRcdHRoaXMuZm9jdXNBZGphY2VudE9wdGlvbignZW5kJyk7XG5cdH1cblxuXHRmb2N1c0FkamFjZW50T3B0aW9uIChkaXIpIHtcblx0XHRsZXQgb3B0aW9ucyA9IHRoaXMuX3Zpc2libGVPcHRpb25zXG5cdFx0Lm1hcCgob3B0aW9uLCBpbmRleCkgPT4gKHsgb3B0aW9uLCBpbmRleCB9KSlcblx0XHQuZmlsdGVyKG9wdGlvbiA9PiAhb3B0aW9uLm9wdGlvbi5kaXNhYmxlZCk7XG5cdFx0dGhpcy5fc2Nyb2xsVG9Gb2N1c2VkT3B0aW9uT25VcGRhdGUgPSB0cnVlO1xuXHRcdGlmICghdGhpcy5zdGF0ZS5pc09wZW4pIHtcblx0XHRcdHRoaXMuc2V0U3RhdGUoe1xuXHRcdFx0XHRpc09wZW46IHRydWUsXG5cdFx0XHRcdGlucHV0VmFsdWU6ICcnLFxuXHRcdFx0XHRmb2N1c2VkT3B0aW9uOiB0aGlzLl9mb2N1c2VkT3B0aW9uIHx8IChvcHRpb25zLmxlbmd0aCA/IG9wdGlvbnNbZGlyID09PSAnbmV4dCcgPyAwIDogb3B0aW9ucy5sZW5ndGggLSAxXS5vcHRpb24gOiBudWxsKVxuXHRcdFx0fSk7XG5cdFx0XHRyZXR1cm47XG5cdFx0fVxuXHRcdGlmICghb3B0aW9ucy5sZW5ndGgpIHJldHVybjtcblx0XHRsZXQgZm9jdXNlZEluZGV4ID0gLTE7XG5cdFx0Zm9yIChsZXQgaSA9IDA7IGkgPCBvcHRpb25zLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHRpZiAodGhpcy5fZm9jdXNlZE9wdGlvbiA9PT0gb3B0aW9uc1tpXS5vcHRpb24pIHtcblx0XHRcdFx0Zm9jdXNlZEluZGV4ID0gaTtcblx0XHRcdFx0YnJlYWs7XG5cdFx0XHR9XG5cdFx0fVxuXHRcdGlmIChkaXIgPT09ICduZXh0JyAmJiBmb2N1c2VkSW5kZXggIT09IC0xICkge1xuXHRcdFx0Zm9jdXNlZEluZGV4ID0gKGZvY3VzZWRJbmRleCArIDEpICUgb3B0aW9ucy5sZW5ndGg7XG5cdFx0fSBlbHNlIGlmIChkaXIgPT09ICdwcmV2aW91cycpIHtcblx0XHRcdGlmIChmb2N1c2VkSW5kZXggPiAwKSB7XG5cdFx0XHRcdGZvY3VzZWRJbmRleCA9IGZvY3VzZWRJbmRleCAtIDE7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRmb2N1c2VkSW5kZXggPSBvcHRpb25zLmxlbmd0aCAtIDE7XG5cdFx0XHR9XG5cdFx0fSBlbHNlIGlmIChkaXIgPT09ICdzdGFydCcpIHtcblx0XHRcdGZvY3VzZWRJbmRleCA9IDA7XG5cdFx0fSBlbHNlIGlmIChkaXIgPT09ICdlbmQnKSB7XG5cdFx0XHRmb2N1c2VkSW5kZXggPSBvcHRpb25zLmxlbmd0aCAtIDE7XG5cdFx0fSBlbHNlIGlmIChkaXIgPT09ICdwYWdlX3VwJykge1xuXHRcdFx0bGV0IHBvdGVudGlhbEluZGV4ID0gZm9jdXNlZEluZGV4IC0gdGhpcy5wcm9wcy5wYWdlU2l6ZTtcblx0XHRcdGlmIChwb3RlbnRpYWxJbmRleCA8IDApIHtcblx0XHRcdFx0Zm9jdXNlZEluZGV4ID0gMDtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdGZvY3VzZWRJbmRleCA9IHBvdGVudGlhbEluZGV4O1xuXHRcdFx0fVxuXHRcdH0gZWxzZSBpZiAoZGlyID09PSAncGFnZV9kb3duJykge1xuXHRcdFx0bGV0IHBvdGVudGlhbEluZGV4ID0gZm9jdXNlZEluZGV4ICsgdGhpcy5wcm9wcy5wYWdlU2l6ZTtcblx0XHRcdGlmIChwb3RlbnRpYWxJbmRleCA+IG9wdGlvbnMubGVuZ3RoIC0gMSkge1xuXHRcdFx0XHRmb2N1c2VkSW5kZXggPSBvcHRpb25zLmxlbmd0aCAtIDE7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRmb2N1c2VkSW5kZXggPSBwb3RlbnRpYWxJbmRleDtcblx0XHRcdH1cblx0XHR9XG5cblx0XHRpZiAoZm9jdXNlZEluZGV4ID09PSAtMSkge1xuXHRcdFx0Zm9jdXNlZEluZGV4ID0gMDtcblx0XHR9XG5cblx0XHR0aGlzLnNldFN0YXRlKHtcblx0XHRcdGZvY3VzZWRJbmRleDogb3B0aW9uc1tmb2N1c2VkSW5kZXhdLmluZGV4LFxuXHRcdFx0Zm9jdXNlZE9wdGlvbjogb3B0aW9uc1tmb2N1c2VkSW5kZXhdLm9wdGlvblxuXHRcdH0pO1xuXHR9XG5cblx0Z2V0Rm9jdXNlZE9wdGlvbiAoKSB7XG5cdFx0cmV0dXJuIHRoaXMuX2ZvY3VzZWRPcHRpb247XG5cdH1cblxuXHRnZXRJbnB1dFZhbHVlICgpIHtcblx0XHRyZXR1cm4gdGhpcy5zdGF0ZS5pbnB1dFZhbHVlO1xuXHR9XG5cblx0c2VsZWN0Rm9jdXNlZE9wdGlvbiAoKSB7XG5cdFx0aWYgKHRoaXMuX2ZvY3VzZWRPcHRpb24pIHtcblx0XHRcdHJldHVybiB0aGlzLnNlbGVjdFZhbHVlKHRoaXMuX2ZvY3VzZWRPcHRpb24pO1xuXHRcdH1cblx0fVxuXG5cdHJlbmRlckxvYWRpbmcgKCkge1xuXHRcdGlmICghdGhpcy5wcm9wcy5pc0xvYWRpbmcpIHJldHVybjtcblxuXHRcdHJldHVybiAoXG5cdFx0XHQ8c3BhbiBjbGFzc05hbWU9XCJTZWxlY3QtbG9hZGluZy16b25lXCI+XG5cdFx0XHRcdDxzcGFuIGNsYXNzTmFtZT1cIlNlbGVjdC1sb2FkaW5nXCIgLz5cblx0XHRcdDwvc3Bhbj5cblx0XHQpO1xuXHR9XG5cblx0cmVuZGVyRmxvYXRpbmdMYWJlbCgpIHtcblx0XHRpZiAoIXRoaXMucHJvcHMuZmxvYXRpbmdMYWJlbFRleHQpIHJldHVybjtcblxuXHRcdGNvbnN0IHN0eWxlcyA9IGdldFN0eWxlcyh0aGlzLnByb3BzLCB0aGlzLnN0YXRlKTtcblxuXHRcdHJldHVybiAoXG5cdFx0XHQ8VGV4dEZpZWxkTGFiZWxcblx0XHRcdFx0c3R5bGU9e09iamVjdC5hc3NpZ24oXG5cdFx0XHRcdFx0c3R5bGVzLmZsb2F0aW5nTGFiZWwsXG5cdFx0XHRcdFx0dGhpcy5wcm9wcy5mbG9hdGluZ0xhYmVsU3R5bGUsXG5cdFx0XHRcdFx0dGhpcy5zdGF0ZS5oYXNWYWx1ZSB8fCB0aGlzLnN0YXRlLmlzRm9jdXNlZCA/IHRoaXMucHJvcHMuZmxvYXRpbmdMYWJlbEZvY3VzU3R5bGUgOiBudWxsXG5cdFx0XHRcdCl9XG5cdFx0XHRcdHNocmlua1N0eWxlPXt0aGlzLnByb3BzLmZsb2F0aW5nTGFiZWxTaHJpbmtTdHlsZX1cblx0XHRcdFx0aHRtbEZvcj1cIlRleHRGaWVsZExhYmVsXCJcblx0XHRcdFx0c2hyaW5rPXt0aGlzLnN0YXRlLmhhc1ZhbHVlIHx8IHRoaXMuc3RhdGUuaXNGb2N1c2VkIHx8IHRoaXMucHJvcHMuZmxvYXRpbmdMYWJlbEZpeGVkfVxuXHRcdFx0XHRkaXNhYmxlZD17dGhpcy5wcm9wcy5kaXNhYmxlZH1cblx0XHRcdD5cblx0XHRcdFx0e3RoaXMucHJvcHMuZmxvYXRpbmdMYWJlbFRleHR9XG5cdFx0XHQ8L1RleHRGaWVsZExhYmVsPlxuXHRcdCk7XG5cdH1cblxuXHRyZW5kZXJFcnJvclRleHQoKSB7XG5cdFx0aWYgKCF0aGlzLnByb3BzLmVycm9yVGV4dCkgcmV0dXJuO1xuXHRcdGNvbnN0IHN0eWxlcyA9IGdldFN0eWxlcyh0aGlzLnByb3BzLCB0aGlzLnN0YXRlKTtcblx0XHRyZXR1cm4gKFxuXHRcdFx0PGxhYmVsIGNsYXNzTmFtZT17dGhpcy5wcm9wcy5lcnJvckNsYXNzTmFtZX0gc3R5bGU9e09iamVjdC5hc3NpZ24oc3R5bGVzLmVycm9yLCB0aGlzLnByb3BzLmVycm9yU3R5bGUpfT5cblx0XHRcdFx0e3RoaXMucHJvcHMuZXJyb3JUZXh0fVxuXHRcdFx0PC9sYWJlbD5cblx0XHQpO1xuXHR9XG5cblx0cmVuZGVyVmFsdWUgKHZhbHVlQXJyYXksIGlzT3Blbikge1xuXHRcdGxldCByZW5kZXJMYWJlbCA9IHRoaXMucHJvcHMudmFsdWVSZW5kZXJlciB8fCB0aGlzLmdldE9wdGlvbkxhYmVsO1xuXHRcdGNvbnN0IFZhbHVlQ29tcG9uZW50ID0gdGhpcy5wcm9wcy52YWx1ZUNvbXBvbmVudDtcblx0XHRpZiAoIXZhbHVlQXJyYXkubGVuZ3RoKSB7XG5cdFx0XHRpZiAodGhpcy5wcm9wcy5mbG9hdGluZ0xhYmVsVGV4dCApIHJldHVybiBudWxsO1xuXG5cdFx0XHRyZXR1cm4gIXRoaXMuc3RhdGUuaW5wdXRWYWx1ZSA/IDxkaXYgY2xhc3NOYW1lPVwiU2VsZWN0LXBsYWNlaG9sZGVyXCI+e3RoaXMucHJvcHMucGxhY2Vob2xkZXJ9PC9kaXY+IDogbnVsbDtcblx0XHR9XG5cdFx0bGV0IG9uQ2xpY2sgPSB0aGlzLnByb3BzLm9uVmFsdWVDbGljayA/IHRoaXMuaGFuZGxlVmFsdWVDbGljayA6IG51bGw7XG5cdFx0aWYgKHRoaXMucHJvcHMubXVsdGkpIHtcblx0XHRcdHJldHVybiB2YWx1ZUFycmF5Lm1hcCgodmFsdWUsIGkpID0+IHtcblx0XHRcdFx0Ly8ga2V5PXtgdmFsdWUtJHtpfS0ke3ZhbHVlW3RoaXMucHJvcHMudmFsdWVLZXldfWB9XG5cdFx0XHRcdHJldHVybiAoXG5cdFx0XHRcdFx0PFZhbHVlQ29tcG9uZW50XG5cdFx0XHRcdFx0XHRpZD17dGhpcy5faW5zdGFuY2VQcmVmaXggKyAnLXZhbHVlLScgKyBpfVxuXHRcdFx0XHRcdFx0aW5zdGFuY2VQcmVmaXg9e3RoaXMuX2luc3RhbmNlUHJlZml4fVxuXHRcdFx0XHRcdFx0ZGlzYWJsZWQ9e3RoaXMucHJvcHMuZGlzYWJsZWQgfHwgdmFsdWUuY2xlYXJhYmxlVmFsdWUgPT09IGZhbHNlfVxuXHRcdFx0XHRcdFx0a2V5PXtpfVxuXHRcdFx0XHRcdFx0b25DbGljaz17b25DbGlja31cblx0XHRcdFx0XHRcdG9uUmVtb3ZlPXt0aGlzLnJlbW92ZVZhbHVlfVxuXHRcdFx0XHRcdFx0dmFsdWU9e3ZhbHVlfT5cblx0XHRcdFx0XHRcdHtyZW5kZXJMYWJlbCh2YWx1ZSwgaSl9XG5cdFx0XHRcdFx0XHQ8c3BhbiBjbGFzc05hbWU9XCJTZWxlY3QtYXJpYS1vbmx5XCI+Jm5ic3A7PC9zcGFuPlxuXHRcdFx0XHRcdDwvVmFsdWVDb21wb25lbnQ+XG5cdFx0XHRcdCk7XG5cdFx0XHR9KTtcblx0XHR9IGVsc2UgaWYgKCF0aGlzLnN0YXRlLmlucHV0VmFsdWUpIHtcblx0XHRcdGlmIChpc09wZW4pIG9uQ2xpY2sgPSBudWxsO1xuXHRcdFx0cmV0dXJuIChcblx0XHRcdFx0PFZhbHVlQ29tcG9uZW50XG5cdFx0XHRcdFx0aWQ9e3RoaXMuX2luc3RhbmNlUHJlZml4ICsgJy12YWx1ZS1pdGVtJ31cblx0XHRcdFx0XHRkaXNhYmxlZD17dGhpcy5wcm9wcy5kaXNhYmxlZH1cblx0XHRcdFx0XHRpbnN0YW5jZVByZWZpeD17dGhpcy5faW5zdGFuY2VQcmVmaXh9XG5cdFx0XHRcdFx0b25DbGljaz17b25DbGlja31cblx0XHRcdFx0XHR2YWx1ZT17dmFsdWVBcnJheVswXX1cblx0XHRcdFx0PlxuXHRcdFx0XHRcdHtyZW5kZXJMYWJlbCh2YWx1ZUFycmF5WzBdKX1cblx0XHRcdFx0PC9WYWx1ZUNvbXBvbmVudD5cblx0XHRcdCk7XG5cdFx0fVxuXHR9XG5cblx0cmVuZGVySW5wdXQgKHZhbHVlQXJyYXksIGZvY3VzZWRPcHRpb25JbmRleCkge1xuXHRcdGxldCBjbGFzc05hbWUgPSBjbGFzc05hbWVzKCdTZWxlY3QtaW5wdXQnLCB0aGlzLnByb3BzLmlucHV0UHJvcHMuY2xhc3NOYW1lKTtcblx0XHRjb25zdCBpc09wZW4gPSAhIXRoaXMuc3RhdGUuaXNPcGVuO1xuXG5cdFx0Y29uc3QgYXJpYU93bnMgPSBjbGFzc05hbWVzKHtcblx0XHRcdFt0aGlzLl9pbnN0YW5jZVByZWZpeCArICctbGlzdCddOiBpc09wZW4sXG5cdFx0XHRbdGhpcy5faW5zdGFuY2VQcmVmaXggKyAnLWJhY2tzcGFjZS1yZW1vdmUtbWVzc2FnZSddOiB0aGlzLnByb3BzLm11bHRpXG5cdFx0XHQmJiAhdGhpcy5wcm9wcy5kaXNhYmxlZFxuXHRcdFx0JiYgdGhpcy5zdGF0ZS5pc0ZvY3VzZWRcblx0XHRcdCYmICF0aGlzLnN0YXRlLmlucHV0VmFsdWVcblx0XHR9KTtcblxuXHRcdC8vIFRPRE86IENoZWNrIGhvdyB0aGlzIHByb2plY3QgaW5jbHVkZXMgT2JqZWN0LmFzc2lnbigpXG5cdFx0Y29uc3QgaW5wdXRQcm9wcyA9IE9iamVjdC5hc3NpZ24oe30sIHRoaXMucHJvcHMuaW5wdXRQcm9wcywge1xuXHRcdFx0cm9sZTogJ2NvbWJvYm94Jyxcblx0XHRcdCdhcmlhLWV4cGFuZGVkJzogJycgKyBpc09wZW4sXG5cdFx0XHQnYXJpYS1vd25zJzogYXJpYU93bnMsXG5cdFx0XHQnYXJpYS1oYXNwb3B1cCc6ICcnICsgaXNPcGVuLFxuXHRcdFx0J2FyaWEtYWN0aXZlZGVzY2VuZGFudCc6IGlzT3BlbiA/IHRoaXMuX2luc3RhbmNlUHJlZml4ICsgJy1vcHRpb24tJyArIGZvY3VzZWRPcHRpb25JbmRleCA6IHRoaXMuX2luc3RhbmNlUHJlZml4ICsgJy12YWx1ZScsXG5cdFx0XHQnYXJpYS1kZXNjcmliZWRieSc6IHRoaXMucHJvcHNbJ2FyaWEtZGVzY3JpYmVkYnknXSxcblx0XHRcdCdhcmlhLWxhYmVsbGVkYnknOiB0aGlzLnByb3BzWydhcmlhLWxhYmVsbGVkYnknXSxcblx0XHRcdCdhcmlhLWxhYmVsJzogdGhpcy5wcm9wc1snYXJpYS1sYWJlbCddLFxuXHRcdFx0Y2xhc3NOYW1lOiBjbGFzc05hbWUsXG5cdFx0XHR0YWJJbmRleDogdGhpcy5wcm9wcy50YWJJbmRleCxcblx0XHRcdG9uQmx1cjogdGhpcy5oYW5kbGVJbnB1dEJsdXIsXG5cdFx0XHRvbkNoYW5nZTogdGhpcy5oYW5kbGVJbnB1dENoYW5nZSxcblx0XHRcdG9uRm9jdXM6IHRoaXMuaGFuZGxlSW5wdXRGb2N1cyxcblx0XHRcdHJlZjogcmVmID0+IHRoaXMuaW5wdXQgPSByZWYsXG5cdFx0XHRyZXF1aXJlZDogdGhpcy5zdGF0ZS5yZXF1aXJlZCxcblx0XHRcdHZhbHVlOiB0aGlzLnN0YXRlLmlucHV0VmFsdWUsXG5cdFx0XHRzdHlsZTogdGhpcy5wcm9wcy5pbnB1dFN0eWxlLFxuXHRcdH0pO1xuXG5cdFx0aWYgKHRoaXMucHJvcHMuaW5wdXRSZW5kZXJlcikge1xuXHRcdFx0cmV0dXJuIHRoaXMucHJvcHMuaW5wdXRSZW5kZXJlcihpbnB1dFByb3BzKTtcblx0XHR9XG5cblx0XHRpZiAodGhpcy5wcm9wcy5kaXNhYmxlZCB8fCAhdGhpcy5wcm9wcy5zZWFyY2hhYmxlKSB7XG5cdFx0XHRjb25zdCB7IGlucHV0Q2xhc3NOYW1lLCAuLi5kaXZQcm9wcyB9ID0gdGhpcy5wcm9wcy5pbnB1dFByb3BzO1xuXG5cdFx0XHRyZXR1cm4gKFxuXHRcdFx0XHQ8ZGl2XG5cdFx0XHRcdFx0ey4uLmRpdlByb3BzfVxuXHRcdFx0XHRcdHJvbGU9XCJjb21ib2JveFwiXG5cdFx0XHRcdFx0Y2xhc3NOYW1lPXtjbGFzc05hbWV9XG5cdFx0XHRcdFx0dGFiSW5kZXg9e3RoaXMucHJvcHMudGFiSW5kZXggfHwgMH1cblx0XHRcdFx0XHRvbkZvY3VzPXt0aGlzLmhhbmRsZUlucHV0Rm9jdXN9XG5cdFx0XHRcdFx0cmVmPXtub2RlID0+IHRoaXMuaW5wdXQgPSBub2RlfVxuXHRcdFx0XHRcdHN0eWxlPXt7IGJvcmRlcjogMCwgd2lkdGg6IDEsIGRpc3BsYXk6J2lubGluZS1ibG9jaycgfX0vPlxuXHRcdFx0KTtcblx0XHR9XG5cblx0XHRyZXR1cm4gKFxuXHRcdFx0PGRpdiBjbGFzc05hbWU9eyBjbGFzc05hbWUgfSBzdHlsZT17dGhpcy5wcm9wcy5pbnB1dFdyYXBwZXJTdHlsZX0+XG5cdFx0XHRcdDxpbnB1dCB7Li4uaW5wdXRQcm9wc30gLz5cblx0XHRcdDwvZGl2PlxuXHRcdCk7XG5cdH1cblxuXHRyZW5kZXJDbGVhciAoKSB7XG5cdFx0aWYgKCF0aGlzLnByb3BzLmNsZWFyYWJsZSB8fCB0aGlzLnByb3BzLnZhbHVlID09PSB1bmRlZmluZWQgfHwgdGhpcy5wcm9wcy52YWx1ZSA9PT0gbnVsbCB8fCB0aGlzLnByb3BzLm11bHRpICYmICF0aGlzLnByb3BzLnZhbHVlLmxlbmd0aCB8fCB0aGlzLnByb3BzLmRpc2FibGVkIHx8IHRoaXMucHJvcHMuaXNMb2FkaW5nKSByZXR1cm47XG5cdFx0Y29uc3QgY2xlYXIgPSB0aGlzLnByb3BzLmNsZWFyUmVuZGVyZXIoKTtcblxuXHRcdHJldHVybiAoXG5cdFx0XHQ8c3BhbiBjbGFzc05hbWU9XCJTZWxlY3QtY2xlYXItem9uZVwiIHRpdGxlPXt0aGlzLnByb3BzLm11bHRpID8gdGhpcy5wcm9wcy5jbGVhckFsbFRleHQgOiB0aGlzLnByb3BzLmNsZWFyVmFsdWVUZXh0fVxuXHRcdFx0XHRcdFx0b25Nb3VzZURvd249e3RoaXMuY2xlYXJWYWx1ZX1cblx0XHRcdFx0XHRcdG9uVG91Y2hTdGFydD17dGhpcy5oYW5kbGVUb3VjaFN0YXJ0fVxuXHRcdFx0XHRcdFx0b25Ub3VjaE1vdmU9e3RoaXMuaGFuZGxlVG91Y2hNb3ZlfVxuXHRcdFx0XHRcdFx0b25Ub3VjaEVuZD17dGhpcy5oYW5kbGVUb3VjaEVuZENsZWFyVmFsdWV9PlxuXHRcdFx0XHR7Y2xlYXJ9XG5cdFx0XHQ8L3NwYW4+XG5cdFx0KTtcblx0fVxuXG5cdHJlbmRlckFycm93ICgpIHtcblx0XHRpZiAodGhpcy5wcm9wcy5oaWRlQXJyb3cpIHJldHVybiBudWxsO1xuXG5cdFx0Y29uc3Qgb25Nb3VzZURvd24gPSB0aGlzLmhhbmRsZU1vdXNlRG93bk9uQXJyb3c7XG5cdFx0Y29uc3QgaXNPcGVuID0gdGhpcy5zdGF0ZS5pc09wZW47XG5cdFx0Y29uc3QgYXJyb3cgPSB0aGlzLnByb3BzLmFycm93UmVuZGVyZXIoeyBvbk1vdXNlRG93biwgaXNPcGVuIH0pO1xuXG5cdFx0cmV0dXJuIChcblx0XHRcdDxzcGFuXG5cdFx0XHRcdGNsYXNzTmFtZT1cIlNlbGVjdC1hcnJvdy16b25lXCJcblx0XHRcdFx0b25Nb3VzZURvd249e29uTW91c2VEb3dufT5cblx0XHRcdFx0e2Fycm93fVxuXHRcdFx0PC9zcGFuPlxuXHRcdCk7XG5cdH1cblxuXHRmaWx0ZXJPcHRpb25zIChleGNsdWRlT3B0aW9ucykge1xuXHRcdGxldCBmaWx0ZXJWYWx1ZSA9IHRoaXMuc3RhdGUuaW5wdXRWYWx1ZTtcblx0XHRsZXQgb3B0aW9ucyA9IHRoaXMucHJvcHMub3B0aW9ucyB8fCBbXTtcblx0XHRpZiAodGhpcy5wcm9wcy5maWx0ZXJPcHRpb25zKSB7XG5cdFx0XHQvLyBNYWludGFpbiBiYWNrd2FyZHMgY29tcGF0aWJpbGl0eSB3aXRoIGJvb2xlYW4gYXR0cmlidXRlXG5cdFx0XHRjb25zdCBmaWx0ZXJPcHRpb25zID0gdHlwZW9mIHRoaXMucHJvcHMuZmlsdGVyT3B0aW9ucyA9PT0gJ2Z1bmN0aW9uJ1xuXHRcdFx0XHQ/IHRoaXMucHJvcHMuZmlsdGVyT3B0aW9uc1xuXHRcdFx0XHQ6IGRlZmF1bHRGaWx0ZXJPcHRpb25zO1xuXG5cdFx0XHRyZXR1cm4gZmlsdGVyT3B0aW9ucyhcblx0XHRcdFx0b3B0aW9ucyxcblx0XHRcdFx0ZmlsdGVyVmFsdWUsXG5cdFx0XHRcdGV4Y2x1ZGVPcHRpb25zLFxuXHRcdFx0XHR7XG5cdFx0XHRcdFx0ZmlsdGVyT3B0aW9uOiB0aGlzLnByb3BzLmZpbHRlck9wdGlvbixcblx0XHRcdFx0XHRpZ25vcmVDYXNlOiB0aGlzLnByb3BzLmlnbm9yZUNhc2UsXG5cdFx0XHRcdFx0bGFiZWxLZXk6IHRoaXMucHJvcHMubGFiZWxLZXksXG5cdFx0XHRcdFx0bWF0Y2hQb3M6IHRoaXMucHJvcHMubWF0Y2hQb3MsXG5cdFx0XHRcdFx0bWF0Y2hQcm9wOiB0aGlzLnByb3BzLm1hdGNoUHJvcCxcblx0XHRcdFx0XHR2YWx1ZUtleTogdGhpcy5wcm9wcy52YWx1ZUtleSxcblx0XHRcdFx0fVxuXHRcdFx0KTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0cmV0dXJuIG9wdGlvbnM7XG5cdFx0fVxuXHR9XG5cblx0b25PcHRpb25SZWYocmVmLCBpc0ZvY3VzZWQpIHtcblx0XHRpZiAoaXNGb2N1c2VkKSB7XG5cdFx0XHR0aGlzLnN0YXRlLmZvY3VzZWQgPSByZWY7XG5cdFx0fVxuXHR9XG5cblx0cmVuZGVyTWVudSAob3B0aW9ucywgdmFsdWVBcnJheSwgZm9jdXNlZE9wdGlvbikge1xuXHRcdGlmIChvcHRpb25zICYmIG9wdGlvbnMubGVuZ3RoKSB7XG5cdFx0XHRyZXR1cm4gdGhpcy5wcm9wcy5tZW51UmVuZGVyZXIoe1xuXHRcdFx0XHRmb2N1c2VkT3B0aW9uLFxuXHRcdFx0XHRmb2N1c09wdGlvbjogdGhpcy5mb2N1c09wdGlvbixcblx0XHRcdFx0aW5zdGFuY2VQcmVmaXg6IHRoaXMuX2luc3RhbmNlUHJlZml4LFxuXHRcdFx0XHRsYWJlbEtleTogdGhpcy5wcm9wcy5sYWJlbEtleSxcblx0XHRcdFx0b25Gb2N1czogdGhpcy5mb2N1c09wdGlvbixcblx0XHRcdFx0b25TZWxlY3Q6IHRoaXMuc2VsZWN0VmFsdWUsXG5cdFx0XHRcdG9wdGlvbkNsYXNzTmFtZTogdGhpcy5wcm9wcy5vcHRpb25DbGFzc05hbWUsXG5cdFx0XHRcdG9wdGlvbkNvbXBvbmVudDogdGhpcy5wcm9wcy5vcHRpb25Db21wb25lbnQsXG5cdFx0XHRcdG9wdGlvblJlbmRlcmVyOiB0aGlzLnByb3BzLm9wdGlvblJlbmRlcmVyIHx8IHRoaXMuZ2V0T3B0aW9uTGFiZWwsXG5cdFx0XHRcdG9wdGlvbnMsXG5cdFx0XHRcdHNlbGVjdFZhbHVlOiB0aGlzLnNlbGVjdFZhbHVlLFxuXHRcdFx0XHR2YWx1ZUFycmF5LFxuXHRcdFx0XHR2YWx1ZUtleTogdGhpcy5wcm9wcy52YWx1ZUtleSxcblx0XHRcdFx0b25PcHRpb25SZWY6IHRoaXMub25PcHRpb25SZWYsXG5cdFx0XHR9KTtcblx0XHR9IGVsc2UgaWYgKHRoaXMucHJvcHMubm9SZXN1bHRzVGV4dCkge1xuXHRcdFx0cmV0dXJuIChcblx0XHRcdFx0PGRpdiBjbGFzc05hbWU9XCJTZWxlY3Qtbm9yZXN1bHRzXCI+XG5cdFx0XHRcdFx0e3RoaXMucHJvcHMubm9SZXN1bHRzVGV4dH1cblx0XHRcdFx0PC9kaXY+XG5cdFx0XHQpO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRyZXR1cm4gbnVsbDtcblx0XHR9XG5cdH1cblxuXHRyZW5kZXJIaWRkZW5GaWVsZCAodmFsdWVBcnJheSkge1xuXHRcdGlmICghdGhpcy5wcm9wcy5uYW1lKSByZXR1cm47XG5cdFx0aWYgKHRoaXMucHJvcHMuam9pblZhbHVlcykge1xuXHRcdFx0bGV0IHZhbHVlID0gdmFsdWVBcnJheS5tYXAoaSA9PiBzdHJpbmdpZnlWYWx1ZShpW3RoaXMucHJvcHMudmFsdWVLZXldKSkuam9pbih0aGlzLnByb3BzLmRlbGltaXRlcik7XG5cdFx0XHRyZXR1cm4gKFxuXHRcdFx0XHQ8aW5wdXRcblx0XHRcdFx0XHR0eXBlPVwiaGlkZGVuXCJcblx0XHRcdFx0XHRyZWY9e3JlZiA9PiB0aGlzLnZhbHVlID0gcmVmfVxuXHRcdFx0XHRcdG5hbWU9e3RoaXMucHJvcHMubmFtZX1cblx0XHRcdFx0XHR2YWx1ZT17dmFsdWV9XG5cdFx0XHRcdFx0ZGlzYWJsZWQ9e3RoaXMucHJvcHMuZGlzYWJsZWR9IC8+XG5cdFx0XHQpO1xuXHRcdH1cblx0XHRyZXR1cm4gdmFsdWVBcnJheS5tYXAoKGl0ZW0sIGluZGV4KSA9PiAoXG5cdFx0XHQ8aW5wdXQga2V5PXsnaGlkZGVuLicgKyBpbmRleH1cblx0XHRcdFx0XHRcdCB0eXBlPVwiaGlkZGVuXCJcblx0XHRcdFx0XHRcdCByZWY9eyd2YWx1ZScgKyBpbmRleH1cblx0XHRcdFx0XHRcdCBuYW1lPXt0aGlzLnByb3BzLm5hbWV9XG5cdFx0XHRcdFx0XHQgdmFsdWU9e3N0cmluZ2lmeVZhbHVlKGl0ZW1bdGhpcy5wcm9wcy52YWx1ZUtleV0pfVxuXHRcdFx0XHRcdFx0IGRpc2FibGVkPXt0aGlzLnByb3BzLmRpc2FibGVkfSAvPlxuXHRcdCkpO1xuXHR9XG5cblx0Z2V0Rm9jdXNhYmxlT3B0aW9uSW5kZXggKHNlbGVjdGVkT3B0aW9uKSB7XG5cdFx0bGV0IG9wdGlvbnMgPSB0aGlzLl92aXNpYmxlT3B0aW9ucztcblx0XHRpZiAoIW9wdGlvbnMubGVuZ3RoKSByZXR1cm4gbnVsbDtcblxuXHRcdGNvbnN0IHZhbHVlS2V5ID0gdGhpcy5wcm9wcy52YWx1ZUtleTtcblx0XHRsZXQgZm9jdXNlZE9wdGlvbiA9IHRoaXMuc3RhdGUuZm9jdXNlZE9wdGlvbiB8fCBzZWxlY3RlZE9wdGlvbjtcblx0XHRpZiAoZm9jdXNlZE9wdGlvbiAmJiAhZm9jdXNlZE9wdGlvbi5kaXNhYmxlZCkge1xuXHRcdFx0bGV0IGZvY3VzZWRPcHRpb25JbmRleCA9IC0xO1xuXHRcdFx0b3B0aW9ucy5zb21lKChvcHRpb24sIGluZGV4KSA9PiB7XG5cdFx0XHRcdGNvbnN0IGlzT3B0aW9uRXF1YWwgPSBvcHRpb25bdmFsdWVLZXldID09PSBmb2N1c2VkT3B0aW9uW3ZhbHVlS2V5XTtcblx0XHRcdFx0aWYgKGlzT3B0aW9uRXF1YWwpIHtcblx0XHRcdFx0XHRmb2N1c2VkT3B0aW9uSW5kZXggPSBpbmRleDtcblx0XHRcdFx0fVxuXHRcdFx0XHRyZXR1cm4gaXNPcHRpb25FcXVhbDtcblx0XHRcdH0pO1xuXHRcdFx0aWYgKGZvY3VzZWRPcHRpb25JbmRleCAhPT0gLTEpIHtcblx0XHRcdFx0cmV0dXJuIGZvY3VzZWRPcHRpb25JbmRleDtcblx0XHRcdH1cblx0XHR9XG5cblx0XHRmb3IgKGxldCBpID0gMDsgaSA8IG9wdGlvbnMubGVuZ3RoOyBpKyspIHtcblx0XHRcdGlmICghb3B0aW9uc1tpXS5kaXNhYmxlZCkgcmV0dXJuIGk7XG5cdFx0fVxuXHRcdHJldHVybiBudWxsO1xuXHR9XG5cblx0cmVuZGVyT3V0ZXIgKG9wdGlvbnMsIHZhbHVlQXJyYXksIGZvY3VzZWRPcHRpb24pIHtcblx0XHRsZXQgbWVudSA9IHRoaXMucmVuZGVyTWVudShvcHRpb25zLCB2YWx1ZUFycmF5LCBmb2N1c2VkT3B0aW9uKTtcblx0XHRpZiAoIW1lbnUpIHtcblx0XHRcdHJldHVybiBudWxsO1xuXHRcdH1cblxuXHRcdHJldHVybiAoXG5cdFx0XHQ8ZGl2IHJlZj17cmVmID0+IHRoaXMubWVudUNvbnRhaW5lciA9IHJlZn0gY2xhc3NOYW1lPVwiU2VsZWN0LW1lbnUtb3V0ZXJcIiBzdHlsZT17dGhpcy5wcm9wcy5tZW51Q29udGFpbmVyU3R5bGV9PlxuXHRcdFx0XHQ8ZGl2IHJlZj17cmVmID0+IHRoaXMubWVudSA9IHJlZn0gcm9sZT1cImxpc3Rib3hcIiBjbGFzc05hbWU9XCJTZWxlY3QtbWVudVwiIGlkPXt0aGlzLl9pbnN0YW5jZVByZWZpeCArICctbGlzdCd9XG5cdFx0XHRcdFx0XHQgc3R5bGU9e3RoaXMucHJvcHMubWVudVN0eWxlfVxuXHRcdFx0XHRcdFx0IG9uU2Nyb2xsPXt0aGlzLmhhbmRsZU1lbnVTY3JvbGx9XG5cdFx0XHRcdFx0XHQgb25Nb3VzZURvd249e3RoaXMuaGFuZGxlTW91c2VEb3duT25NZW51fT5cblx0XHRcdFx0XHR7bWVudX1cblx0XHRcdFx0PC9kaXY+XG5cdFx0XHQ8L2Rpdj5cblx0XHQpO1xuXHR9XG5cblx0cmVuZGVyICgpIHtcblx0XHRsZXQgdmFsdWVBcnJheSA9IHRoaXMuZ2V0VmFsdWVBcnJheSh0aGlzLnByb3BzLnZhbHVlKTtcblx0XHRsZXQgb3B0aW9ucyA9IHRoaXMuX3Zpc2libGVPcHRpb25zID0gdGhpcy5maWx0ZXJPcHRpb25zKHRoaXMucHJvcHMubXVsdGkgPyB0aGlzLmdldFZhbHVlQXJyYXkodGhpcy5wcm9wcy52YWx1ZSkgOiBudWxsKTtcblx0XHRsZXQgaXNPcGVuID0gdGhpcy5zdGF0ZS5pc09wZW47XG5cdFx0aWYgKHRoaXMucHJvcHMubXVsdGkgJiYgIW9wdGlvbnMubGVuZ3RoICYmIHZhbHVlQXJyYXkubGVuZ3RoICYmICF0aGlzLnN0YXRlLmlucHV0VmFsdWUpIGlzT3BlbiA9IGZhbHNlO1xuXHRcdGNvbnN0IGZvY3VzZWRPcHRpb25JbmRleCA9IHRoaXMuZ2V0Rm9jdXNhYmxlT3B0aW9uSW5kZXgodmFsdWVBcnJheVswXSk7XG5cblx0XHRsZXQgZm9jdXNlZE9wdGlvbiA9IG51bGw7XG5cdFx0aWYgKGZvY3VzZWRPcHRpb25JbmRleCAhPT0gbnVsbCkge1xuXHRcdFx0Zm9jdXNlZE9wdGlvbiA9IHRoaXMuX2ZvY3VzZWRPcHRpb24gPSBvcHRpb25zW2ZvY3VzZWRPcHRpb25JbmRleF07XG5cdFx0fSBlbHNlIHtcblx0XHRcdGZvY3VzZWRPcHRpb24gPSB0aGlzLl9mb2N1c2VkT3B0aW9uID0gbnVsbDtcblx0XHR9XG5cdFx0bGV0IGNsYXNzTmFtZSA9IGNsYXNzTmFtZXMoJ1NlbGVjdCcsIHRoaXMucHJvcHMuY2xhc3NOYW1lLCB7XG5cdFx0XHQnU2VsZWN0LS1tdWx0aSc6IHRoaXMucHJvcHMubXVsdGksXG5cdFx0XHQnU2VsZWN0LS1zaW5nbGUnOiAhdGhpcy5wcm9wcy5tdWx0aSxcblx0XHRcdCdpcy1jbGVhcmFibGUnOiB0aGlzLnByb3BzLmNsZWFyYWJsZSxcblx0XHRcdCdpcy1kaXNhYmxlZCc6IHRoaXMucHJvcHMuZGlzYWJsZWQsXG5cdFx0XHQnaXMtZm9jdXNlZCc6IHRoaXMuc3RhdGUuaXNGb2N1c2VkLFxuXHRcdFx0J2lzLWxvYWRpbmcnOiB0aGlzLnByb3BzLmlzTG9hZGluZyxcblx0XHRcdCdpcy1vcGVuJzogaXNPcGVuLFxuXHRcdFx0J2lzLXBzZXVkby1mb2N1c2VkJzogdGhpcy5zdGF0ZS5pc1BzZXVkb0ZvY3VzZWQsXG5cdFx0XHQnaXMtc2VhcmNoYWJsZSc6IHRoaXMucHJvcHMuc2VhcmNoYWJsZSxcblx0XHRcdCdoYXMtdmFsdWUnOiB2YWx1ZUFycmF5Lmxlbmd0aCxcblx0XHR9KTtcblxuXHRcdGxldCByZW1vdmVNZXNzYWdlID0gbnVsbDtcblx0XHRpZiAodGhpcy5wcm9wcy5tdWx0aSAmJlxuXHRcdFx0IXRoaXMucHJvcHMuZGlzYWJsZWQgJiZcblx0XHRcdHZhbHVlQXJyYXkubGVuZ3RoICYmXG5cdFx0XHQhdGhpcy5zdGF0ZS5pbnB1dFZhbHVlICYmXG5cdFx0XHR0aGlzLnN0YXRlLmlzRm9jdXNlZCAmJlxuXHRcdFx0dGhpcy5wcm9wcy5iYWNrc3BhY2VSZW1vdmVzKSB7XG5cdFx0XHRyZW1vdmVNZXNzYWdlID0gKFxuXHRcdFx0XHQ8c3BhbiBpZD17dGhpcy5faW5zdGFuY2VQcmVmaXggKyAnLWJhY2tzcGFjZS1yZW1vdmUtbWVzc2FnZSd9IGNsYXNzTmFtZT1cIlNlbGVjdC1hcmlhLW9ubHlcIj5cblx0XHRcdFx0XHR7dGhpcy5wcm9wcy5iYWNrc3BhY2VUb1JlbW92ZU1lc3NhZ2UucmVwbGFjZSgne2xhYmVsfScsIHZhbHVlQXJyYXlbdmFsdWVBcnJheS5sZW5ndGggLSAxXVt0aGlzLnByb3BzLmxhYmVsS2V5XSl9XG5cdFx0XHRcdDwvc3Bhbj5cblx0XHRcdCk7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIChcblx0XHRcdDxkaXYgcmVmPXtub2RlID0+IHRoaXMud3JhcHBlciA9IG5vZGV9XG5cdFx0XHRcdFx0IGNsYXNzTmFtZT17Y2xhc3NOYW1lfVxuXHRcdFx0XHRcdCBzdHlsZT17dGhpcy5wcm9wcy53cmFwcGVyU3R5bGV9PlxuXHRcdFx0XHR7dGhpcy5yZW5kZXJIaWRkZW5GaWVsZCh2YWx1ZUFycmF5KX1cblx0XHRcdFx0PGRpdiByZWY9e25vZGUgPT4gdGhpcy5jb250cm9sID0gbm9kZX1cblx0XHRcdFx0XHRcdCBjbGFzc05hbWU9XCJTZWxlY3QtY29udHJvbFwiXG5cdFx0XHRcdFx0XHQgc3R5bGU9e3RoaXMucHJvcHMuc3R5bGV9XG5cdFx0XHRcdFx0XHQgb25LZXlEb3duPXt0aGlzLmhhbmRsZUtleURvd259XG5cdFx0XHRcdFx0XHQgb25Nb3VzZURvd249e3RoaXMuaGFuZGxlTW91c2VEb3dufVxuXHRcdFx0XHRcdFx0IG9uVG91Y2hFbmQ9e3RoaXMuaGFuZGxlVG91Y2hFbmR9XG5cdFx0XHRcdFx0XHQgb25Ub3VjaFN0YXJ0PXt0aGlzLmhhbmRsZVRvdWNoU3RhcnR9XG5cdFx0XHRcdFx0XHQgb25Ub3VjaE1vdmU9e3RoaXMuaGFuZGxlVG91Y2hNb3ZlfT5cblx0XHRcdFx0XHR7dGhpcy5yZW5kZXJGbG9hdGluZ0xhYmVsKCl9XG5cdFx0XHRcdFx0PHNwYW4gY2xhc3NOYW1lPVwiU2VsZWN0LW11bHRpLXZhbHVlLXdyYXBwZXJcIiBpZD17dGhpcy5faW5zdGFuY2VQcmVmaXggKyAnLXZhbHVlJ30+XG5cdFx0XHRcdFx0XHR7dGhpcy5yZW5kZXJWYWx1ZSh2YWx1ZUFycmF5LCBpc09wZW4pfVxuXHRcdFx0XHRcdFx0e3RoaXMucmVuZGVySW5wdXQodmFsdWVBcnJheSwgZm9jdXNlZE9wdGlvbkluZGV4KX1cblx0XHRcdFx0XHQ8L3NwYW4+XG5cdFx0XHRcdFx0e3JlbW92ZU1lc3NhZ2V9XG5cdFx0XHRcdFx0e3RoaXMucmVuZGVyTG9hZGluZygpfVxuXHRcdFx0XHRcdHt0aGlzLnJlbmRlckNsZWFyKCl9XG5cdFx0XHRcdFx0e3RoaXMucmVuZGVyQXJyb3coKX1cblx0XHRcdFx0PC9kaXY+XG5cdFx0XHRcdHtpc09wZW4gPyB0aGlzLnJlbmRlck91dGVyKG9wdGlvbnMsICF0aGlzLnByb3BzLm11bHRpID8gdmFsdWVBcnJheSA6IG51bGwsIGZvY3VzZWRPcHRpb24pIDogbnVsbH1cblx0XHRcdFx0e3RoaXMucmVuZGVyRXJyb3JUZXh0KCl9XG5cdFx0XHQ8L2Rpdj5cblx0XHQpO1xuXHR9XG59XG5cblNlbGVjdC5wcm9wVHlwZXMgPSBwcm9wVHlwZXM7XG5TZWxlY3QuZGVmYXVsdFByb3BzID0gZGVmYXVsdFByb3BzO1xuU2VsZWN0LkFzeW5jID0gQXN5bmM7XG5cbmV4cG9ydCBkZWZhdWx0IFNlbGVjdDtcbiJdfQ==
