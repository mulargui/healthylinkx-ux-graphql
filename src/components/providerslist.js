import  React, { Component } from 'react'
import { SELECTEDAPI } from '../graphql/constants'
import { LIST } from '../actions/actiontypes'
import { NewSearch, SelectDoctors, ErrorMessage } from '../actions/action'

export class ProvidersList extends Component {
	constructor(props) {
		super(props)
		
		// This bindings are necessary to make `this` work in the callback
		this.SelectClick = this.SelectClick.bind(this)
		this.SearchClick = this.SearchClick.bind(this)
		this.checkBoxChanged = this.checkBoxChanged.bind(this)
		this.storeChanged = this.storeChanged.bind(this)

		//most of the state is kept in the controls of the form
		this.state = { doctorslist: []
			, visible: false
			, options: []
		}
		
		this.props.store.subscribe(this.storeChanged)
	}

	storeChanged() {
		let v = this.props.store.getState()
		if(v.state === LIST)
			this.setState({doctorslist: v.doctorslist.slice(), options: [], visible:true})
		else 
			this.setState({visible:false})
	}

	SelectClick() {	
		const options = this.state.options

		//no doctor selected
		if(options.length === 0) {
			this.props.store.dispatch(ErrorMessage('Please select up to three doctors'))
			return
		}
		
		//no more than 3 doctors selected
		if(options.length > 3) {
			this.props.store.dispatch(ErrorMessage('You cannot select more than 3 doctors'))
			return
		}

		//get the list of npis selected
		var npis = []
		options.map(function(entry, index) {
			npis.push(entry.toString());
		})

		//lets call the api, collect the data and dispath the result to the store
		let store = this.props.store

		return this.props.client.mutate({mutation: SELECTEDAPI, variables: {npi: npis}})
			.then(function(response) {
				return response.data.BookProviders
			})
			.then(function(response) {
				if (response.length === 0)
					throw new Error("No matching providers were found.")
				return store.dispatch(SelectDoctors(response))
			})
			.catch(function(error) {
				store.dispatch(ErrorMessage(error.message))
			})
	}
	
	SearchClick() {	
		this.props.store.dispatch(NewSearch())
	}

	checkBoxChanged(e) {
		// current array of options
		const options = this.state.options
		let index

		// check if the check box is checked or unchecked
		if (e.target.checked) {
		  // add the numerical value of the checkbox to options array
		  options.push(+e.target.value)
		} else {
		  // or remove the value from the unchecked checkbox from the array
		  index = options.indexOf(+e.target.value)
		  options.splice(index, 1)
		}

		// update the state with the new array of options
		this.setState({ options: options })
	}

	render(){ 
		if (!this.state.visible) return null

		return (
			<div className="container">
				<legend>List of Matching Providers</legend>
				<table className="table table-bordered table-striped">
					<thead><tr>
						<th>&nbsp;</th>	
						<th>Name</th>
						<th>Street</th>
						<th>City</th>
					</tr></thead>
					<tbody> 
						{this.state.doctorslist.map((entry) => 
							<tr key={entry.npi}>
								<td><input type="checkbox" value={entry.npi} onChange={this.checkBoxChanged}></input></td>
								<td>{entry.fullName}</td>
								<td>{entry.fullStreet}</td>
								<td>{entry.fullCity}</td>
							</tr>
						)}
					</tbody>
				</table>
				<button className="btn btn-link" onClick={this.SelectClick}>
					<i className="glyphicon glyphicon-list-alt"></i>&nbsp;Select Providers</button>
				<button className="btn btn-link" onClick={this.SearchClick}>
					<i className="glyphicon glyphicon-search"></i>&nbsp;New Search</button>
			</div>
		)
	}
}
