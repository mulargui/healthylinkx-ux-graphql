import {gql} from 'apollo-boost'

// minikube ip
const URL = window.location.hostname
// healthylinkx-api-service port 
const PORT = '30100'

export const METHODSEPARATOR = '?'
export const PARAMSEPARATOR = '&'

export const ENDPOINT = 'http://' + URL + ':' + PORT + '/graphql'
export const TAXONOMYAPI = gql `{SpecialityList {name}}`;
export const PROVIDERSAPI = gql ` query searchproviders(
		$distance: Int,
		$postalCode: String,
		$gender: String,
		$classification: String,
		$lastName: [String]
	){
		SearchProviders(
		lastName: $lastName, 
		postalCode: $postalCode, 
		distance: $distance, 
		gender: $gender, 
		classification: $classification
		){
			npi, 
			fullName, 
			fullStreet, 
			fullCity
		}
	}
`;
export const SELECTEDAPI = URL + ':' + PORT + '/shortlist' 
