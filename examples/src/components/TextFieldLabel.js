import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Select from '../../../src/Select';

const propTypes = {
	label: PropTypes.string,
};
const defaultProps = {
	label: 'Github users (Async with textFieldLabel)'
};

class TextFieldLabel extends Component {
	constructor(props) {
		super(props);
		this.state = {
			selectValue: ''
		};
		this.onChange = this.onChange.bind(this);
	}

	getUsers(input) {
		if (!input) {
			return Promise.resolve({ options: [] });
		}

		return fetch(`https://api.github.com/search/users?q=${input}`)
		.then((response) => response.json())
		.then((json) => {
			return { options: json.items };
		});
	}

	onChange(selectValue) {
		this.setState({ selectValue });
	}

	render() {
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
		return (
			<div className="section">
				<h3 className="section-heading" style={{ marginBottom: '20px' }}>{this.props.label}</h3>
				<Select.Async
					value={this.state.selectValue}
					style={style}
					floatingLabelText="Github ID"
					valueKey="id"
					labelKey="login"
					clearable={false}
					loadOptions={this.getUsers}
					onChange={this.onChange}
					hideArrow
					/>
			</div>
		);
	}
}

TextFieldLabel.propTypes = propTypes;
TextFieldLabel.defaultProps = defaultProps;

export default TextFieldLabel;
