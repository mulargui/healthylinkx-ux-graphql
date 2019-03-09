import  React, { Component } from 'react'

import { SELECTED } from '../actions/actiontypes'
import { NewSearch } from '../actions/action'

export class ProvidersShortList extends Component {
	constructor(props) {
		super(props)
		
		// This bindings are necessary to make `this` work in the callback
		this.SearchClick = this.SearchClick.bind(this)
		this.storeChanged = this.storeChanged.bind(this)

		this.state = {
			transaction: 0
			, shortlist: []
			, visible: false
		}
		
		this.props.store.subscribe(this.storeChanged)
	}

	storeChanged() {
		let v = this.props.store.getState()
		if(v.state === SELECTED)
			this.setState({transaction: v.selected.transaction, shortlist: v.selected.shortlist.slice(), visible:true})
		else 
			this.setState({visible:false})
	}

	SearchClick() {	
		this.props.store.dispatch(NewSearch())
	}
	
	render(){ 
		if (!this.state.visible) return null

		return (
			<div className="container">
				<legend>Short list of Matching Providers</legend>
				<table className="table table-bordered table-striped">
					<thead><tr>
						<th>NPI</th>
						<th>Name</th>
						<th>Street</th>
						<th>City</th>
						<th>Telephone</th>
					</tr></thead>
					<tbody>
					{/* eslint-disable-next-line */}
						{this.state.shortlist.map((entry) => 
							<tr key={entry.npi}>
								<td>{entry.npi}</td>
								<td>{entry.fullName}</td>
								<td>{entry.fullStreet}</td>
								<td>{entry.fullCity}</td>
								<td>{entry.telephone}</td>
							</tr>
						)}
						<tr><td>Transaction number: {this.state.transaction} </td></tr>
					</tbody>	
				</table>
				<button className="btn btn-link" onClick={this.SearchClick}>
					<i className="glyphicon glyphicon-search"></i>&nbsp;New Search</button>
			</div>
		)
	}
}