import  React, { Component } from 'react'
import AsyncSelect from 'react-select/lib/Async';
import { TAXONOMYAPI, PROVIDERSAPI } from '../graphql/constants'
import { UNIVERSE } from '../actions/actiontypes'
import { SearchDoctors, ErrorMessage } from '../actions/action'

export class Search extends Component {
	constructor(props) {
		super(props)
		
		// This bindings are necessary to make `this` work in the callback
		this.handleClick = this.handleClick.bind(this)
		this.loadSpecialities = this.loadSpecialities.bind(this)
		this.storeChanged = this.storeChanged.bind(this)

		//most of the state is kept in the controls of the form
		this.state = {specialty : '', visible: true}
		
		this.props.store.subscribe(this.storeChanged)
	}
	
	storeChanged() {
		//the state is kept in the controls of the form, nothing to do
		//this.setState(store.getState())
		let v = this.props.store.getState()
		if(v.state === UNIVERSE) this.setState({visible: true})
		else this.setState({visible: false})	
	}

	loadSpecialities(input) {
		let store = this.props.store
		return this.props.client.query({query: TAXONOMYAPI})
			.then(function(response) {
				return response.data.SpecialityList
			})
			.then(function(response) {
				if (!response.length === 0)
					throw new Error("No taxonomies!")
				var taxonomyTags = []
				response.forEach(function(entry) {
					taxonomyTags.push({ value: entry.name, label: entry.name })
				})
				return taxonomyTags
			})
			.catch(function(error) {
				store.dispatch(ErrorMessage(error.message))
			})	
	}
	
	handleClick() {	

		//lets call the api, collect the data and dispath the result to the store
		let store = this.props.store
		let specialty = this.state.specialty.value
		let gender = this.gender.value
		let zipcode = this.zipcode.value
		let distance = this.distance.value
		var lastname = this.lastname.value.trim().split(/ +/)
		
		// no speciality selected
		if (typeof this.state.specialty.value === "undefined")
			specialty=""

		//no lastname
		if (lastname[0] === "")
			lastname = []
		
		return this.props.client.query({query: PROVIDERSAPI, variables: {distance: parseInt(distance), postalCode: zipcode,
			gender: gender, classification: specialty, lastName: lastname}})
			.then(function(response) {
				return response.data.SearchProviders
			})
			.then(function(response) {
				if (response.length === 0)
					throw new Error("No matching providers were found.")
				return store.dispatch(SearchDoctors( specialty, lastname, gender, zipcode, distance, response))
			})
			.catch(function(error) {
				store.dispatch(ErrorMessage(error.message))
			})
	}

	render(){ 
		if (!this.state.visible) return null

		return (
				<div className="container">
					<legend>Providers Search</legend>
					<div className="row">
						<AsyncSelect 
							name="form-field-name" 
							onChange={value => this.setState({specialty:value})} 
							value={this.state.specialty}
							defaultOptions
							cacheOptions
							isSearchable 
							loadOptions={this.loadSpecialities} 
							placeholder="Type a Medical Specialty" 
						/>
						<p></p>
					</div>
					<div className="row">
						<input type="text" className="form-control" ref={(e) => this.lastname = e} placeholder="Last Name" maxLength="30" pattern="\w+"></input>
						<p></p>
					</div>
					<div className="row">
						<select className="form-control" ref={(e) => this.gender = e}>
							<option value="">No gender preference</option>
							<option value="F">Female only</option>
							<option value="M">Male only</option>
						</select>
						<p></p>
					</div>
					<div className="row">
						<input type="text" className="form-control" ref={(e) => this.zipcode = e} placeholder="Zip Code" autoComplete="off" maxLength="5" pattern="\d{5}"></input> 
						<p></p>
					</div>
					<div className="row">
						<select className="form-control" ref={(e) => this.distance = e}>
							<option value="5">Within 5 miles</option>
							<option value="10">Within 10 miles</option>
							<option value="25">Within 25 miles</option>
						</select>
						<p></p>
					</div>
					<div className="row">
						<button className="btn btn-link" onClick={this.handleClick}>
							<i className="glyphicon glyphicon-search"></i>&nbsp;Search</button>
					</div>
				</div>
		)
	}
}