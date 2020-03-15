import React from 'react';
import PropTypes from 'prop-types';


export class CheckBox extends React.PureComponent {
	render() {
		return (
			<label className="container">
				<input type="checkbox"
					id={'check_id' + this.props.value}
					name={this.props.name}
					value={this.props.value}
					checked={this.props.checked}
					onChange={this.props.onChange}
				/>
				<span className="checkmark">{this.props.value}</span>
			</label>
		)
	}
}

CheckBox.propTypes = {
	value : PropTypes.oneOfType([
		PropTypes.number,
		PropTypes.string,
		PropTypes.element.isRequired,
	])
}