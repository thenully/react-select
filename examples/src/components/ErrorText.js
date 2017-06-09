import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Select from '../../../src/Select';

const STATES = require('../data/states');

const propTypes = {
	label: PropTypes.string,
};
const defaultProps = {};

class ErrorText extends Component {
	constructor(props) {
		super(props);
		this.state = {
			selectValue: '',
			errorText: ''
		};
		this.onChange = this.onChange.bind(this);
		this.onBlur = this.onBlur.bind(this);
	}

	onChange(selectValue) {
		this.setState({ selectValue });
	}

	onBlur() {
		this.setState({
			errorText: `This is error text. ${JSON.stringify(this.state.selectValue)}`
		});
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
		const options = STATES['US'];
		return (
			<div className="section">
				<h3 className="section-heading" style={{ marginBottom: '20px' }}>{this.props.label}</h3>
				<Select
					value={this.state.selectValue}
					errorText={this.state.errorText}
					style={style}
					clearable={false}
					options={options}
					onChange={this.onChange}
					onBlur={this.onBlur}
					hideArrow
					autofocus
				/>
			</div>
		);
	}
}

ErrorText.propTypes = propTypes;
ErrorText.defaultProps = defaultProps;

export default ErrorText;
