import React, { Component } from 'react';

class Empty extends Component {
	render() {
		return <div>{this.props.emptyText}</div>;
	}
}

Empty.propTypes = {
	emptyText: React.PropTypes.string.isRequired
}

export default Empty
