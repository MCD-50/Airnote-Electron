import React, { Component } from 'react';

class Other extends Component {
	render() {
		const { size, title } = this.props;
		const display = size > -1 ? '' : 'none';

		return (
			<div className="div_other">
				<div className="div-left">
					<h1>{title}</h1>
					<p style={{ display: display, color:'#737373' }}>
						{size + " " + title.toLowerCase()}
					</p>
				</div>
			</div>);
	}
}


export default Other
