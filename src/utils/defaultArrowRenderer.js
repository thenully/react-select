import React from 'react';

export default ({ onMouseDown }) => {
	return (
		<span
			className="Select-arrow"
			onMouseDown={onMouseDown}
		/>
	);
};
