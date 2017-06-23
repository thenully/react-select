import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Select from './Select';
import defaultFilterOptions from './utils/defaultFilterOptions';
import defaultMenuRenderer from './utils/defaultMenuRenderer';

const propTypes = {
	children: PropTypes.func,
	filterOptions: PropTypes.any,
	isOptionUnique: PropTypes.func,
	isValidNewOption: PropTypes.func,
	menuRenderer: PropTypes.any,
	newOptionCreator: PropTypes.func,
	onInputChange: PropTypes.func,
	onInputKeyDown: PropTypes.func,
	onNewOptionClick: PropTypes.func,
	options: PropTypes.array,
	promptTextCreator: PropTypes.func,
	shouldKeyDownEventCreateNewOption: PropTypes.func,
};
const defaultProps = {
	filterOptions: defaultFilterOptions,
	isOptionUnique,
	isValidNewOption,
	menuRenderer: defaultMenuRenderer,
	newOptionCreator,
	promptTextCreator,
	shouldKeyDownEventCreateNewOption,
};

function defaultChildren(props) {
	return (
		<Select {...props} />
	);
}

function isOptionUnique({ option, options, labelKey, valueKey }) {
	return options
		.filter((existingOption) =>
			existingOption[labelKey] === option[labelKey] ||
			existingOption[valueKey] === option[valueKey]
		)
			.length === 0;
};

function isValidNewOption({ label }) {
	return !!label;
};

function newOptionCreator({ label, labelKey, valueKey }) {
	const option = {};
	option[valueKey] = label;
	option[labelKey] = label;
	option.className = 'Select-create-option-placeholder';
	return option;
};

function promptTextCreator(label) {
	return `Create option "${label}"`;
}

function shouldKeyDownEventCreateNewOption({ keyCode }) {
	switch (keyCode) {
		case 9:   // TAB
		case 13:  // ENTER
		case 188: // COMMA
			return true;
	}
	
	return false;
};

class Creatable extends Component {
	constructor(props) {
		super(props);
		this.createNewOption = this.createNewOption.bind(this);
		this.filterOptions = this.filterOptions.bind(this);
		this.isOptionUnique = this.isOptionUnique.bind(this);
		this.menuRenderer = this.menuRenderer.bind(this);
		this.onInputChange = this.onInputChange.bind(this);
		this.onInputKeyDown = this.onInputKeyDown.bind(this);
		this.onOptionSelect = this.onOptionSelect.bind(this);
		this.focus = this.focus.bind(this);
	}

	createNewOption() {
		const {
			isValidNewOption,
			newOptionCreator,
			onNewOptionClick,
			options = [],
			shouldKeyDownEventCreateNewOption
		} = this.props;

		if (isValidNewOption({ label: this.inputValue })) {
			const option = newOptionCreator({ label: this.inputValue, labelKey: this.labelKey, valueKey: this.valueKey });
			const isOptionUnique = this.isOptionUnique({ option });

			// Don't add the same option twice.
			if (isOptionUnique) {
				if (onNewOptionClick) {
					onNewOptionClick(option);
				} else {
					options.unshift(option);
					this.select.selectValue(option);
				}
			}
		}
	}

	filterOptions(...params) {
		const { filterOptions, isValidNewOption, options, promptTextCreator } = this.props;
		const excludeOptions = params[2] || [];
		const filteredOptions = filterOptions(...params) || [];

		if (isValidNewOption({ label: this.inputValue })) {
			const { newOptionCreator } = this.props;
			const option = newOptionCreator({
				label: this.inputValue,
				labelKey: this.labelKey,
				valueKey: this.valueKey
			});
			const isOptionUnique = this.isOptionUnique({
				option,
				options: excludeOptions.concat(filteredOptions)
			});

			if (isOptionUnique) {
				const prompt = promptTextCreator(this.inputValue);
				this._createPlaceholderOption = newOptionCreator({
					label: prompt,
					labelKey: this.labelKey,
					valueKey: this.valueKey
				});
				filteredOptions.unshift(this._createPlaceholderOption);
			}
		}

		return filteredOptions;
	}

	isOptionUnique({ option, options }) {
		const { isOptionUnique } = this.props;
		options = options || this.select.filterOptions();

		return isOptionUnique({
			labelKey: this.labelKey,
			option,
			options,
			valueKey: this.valueKey
		});
	}

	menuRenderer(params) {
		const { menuRenderer } = this.props;

		return menuRenderer({
			...params,
			onSelect: this.onOptionSelect,
			selectValue: this.onOptionSelect
		});
	}

	onInputChange(input) {
		const { onInputChange } = this.props;

		if (onInputChange) {
			onInputChange(input);
		}

		// This value may be needed in between Select mounts (when this.select is null)
		this.inputValue = input;
	}

	onInputKeyDown(event) {
		const { shouldKeyDownEventCreateNewOption, onInputKeyDown } = this.props;
		const focusedOption = this.select.getFocusedOption();

		if (
			focusedOption &&
			focusedOption === this._createPlaceholderOption &&
			shouldKeyDownEventCreateNewOption({ keyCode: event.keyCode })
		) {
			this.createNewOption();

			// Prevent decorated Select from doing anything additional with this keyDown event
			event.preventDefault();
		} else if (onInputKeyDown) {
			onInputKeyDown(event);
		}
	}

	onOptionSelect(option, event) {
		if (option === this._createPlaceholderOption) {
			this.createNewOption();
		} else {
			this.select.selectValue(option);
		}
	}

	focus () {
		this.select.focus();
	}

	render () {
		const {
			newOptionCreator,
			shouldKeyDownEventCreateNewOption,
			...restProps
		} = this.props;
		// const children = this.props.children ? this.props.children : defaultChildren;
		let { children } = this.props;
		if (!children) {
			children = defaultChildren;
		}

		const props = {
			...restProps,
			allowCreate: true,
			filterOptions: this.filterOptions,
			menuRenderer: this.menuRenderer,
			onInputChange: this.onInputChange,
			onInputKeyDown: this.onInputKeyDown,
			ref: (ref) => {
				this.select = ref;
				if (ref) {
					this.labelKey = ref.props.labelKey;
					this.valueKey = ref.props.valueKey;
				}
			}
		};

		return children(props);
	}
}

Creatable.propTypes = propTypes;
Creatable.defaultProps = defaultProps;

export default Creatable;
