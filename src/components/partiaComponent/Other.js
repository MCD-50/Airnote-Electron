import React, { Component } from 'react';

class Other extends Component {
	render() {
		const { size, title } = this.props;
		const display = size > -1 ? '' : 'none';

		return (
			<div className="div_other" style={{ marginTop: 16 }}>
				<div className="div-left" style={{ marginTop: -15, marginLeft: 16, marginRight: 16 }}>
					<h1>{title}</h1>
					<p style={{ display: display }}>
						{size + " " + title.toLowerCase()}
					</p>
				</div>
				<div className="div-right" style={{ marginRight: 16 }}>
					<a className="btn-floating btn-large waves-effect waves-light"
						style={{ background: '#868686', marginLeft: 15, padding: 0, borderBottomLeftRadius: 0 }}>
						<i className="material-icons">share</i>
					</a>
					<a className="btn-floating btn-large waves-effect waves-light"
						style={{ background: '#868686', marginLeft: 15, padding: 0, borderBottomLeftRadius: 0 }}>
						<i className="material-icons">star_border</i>
					</a>
				</div>
			</div>);
	}
}


export default Other
