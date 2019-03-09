import {gql} from 'apollo-boost'

// minikube ip
const URL = window.location.hostname
// healthylinkx-api-service port 
const PORT = '30100'

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
export const SELECTEDAPI = gql ` mutation bookproviders(
		$npi: [String!]!
	){
		BookProviders(
			npi: $npi
		){
			id,
			providers{
				npi,
				fullName,
				fullStreet,
				fullCity,
				telephone
			}
		}
	}
`;
