import React from 'react';

export default () => {
	return (
		<span
			className="Select-clear"
			dangerouslySetInnerHTML={{ __html: '&times;' }}
		/>
	);
};
