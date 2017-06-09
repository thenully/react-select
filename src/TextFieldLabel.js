import React from 'react';
import PropTypes from 'prop-types';
import transitions from './styles/transitions';

function getStyles(props) {
	const defaultStyles = {
		color: '#1d1d1d',
		position: 'absolute',
		lineHeight: '36px',
		zIndex: 1,
		transition: transitions.easeOut(),
		transform: 'scale(1) translate(0, 0)',
		transformOrigin: 'left top',
		pointerEvents: 'auto',
		userSelect: 'none',
		margin: 0,
		fontWeight: 'normal'
	};

	const shrinkStyles = props.shrink ? Object.assign({
			transform: 'scale(0.8) translate(0, -25px)',
			pointerEvents: 'none',
		}, props.shrinkStyle) : null;

	return {
		root: Object.assign(defaultStyles, props.style, shrinkStyles),
	};
}

const propTypes = {
	children: PropTypes.node,							// The label contents.
	className: PropTypes.string,					// The css class name of the root element.
	disabled: PropTypes.bool,							// Disables the label if set to true.
	htmlFor: PropTypes.string,						// The id of the target element that this label should refer to.
	shrink: PropTypes.bool,								// True if the floating label should shrink.
	shrinkStyle: PropTypes.object,				// Override the inline-styles of the root element when shrunk.
	style: PropTypes.object,							// Override the inline-styles of the root element.
};
const defaultProps = {
	disabled: false,
	shrink: false,
};

const TextFieldLabel = (props) => {
	const {
		className,
		children,
		htmlFor,
	} = props;

	const styles = getStyles(props);

	return (
		<label
			className={className}
			style={styles.root}
			htmlFor={htmlFor}
		>
			{children}
		</label>
	);
};

TextFieldLabel.propTypes = propTypes;
TextFieldLabel.defaultProps = defaultProps;

export default TextFieldLabel;
