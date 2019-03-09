FROM node:8.15-alpine

RUN yarn create react-app theapp 
RUN cd /theapp \
	&& yarn add \		
		bootstrap@3 \
		react-bootstrap \
		redux \
		react-fontawesome \
		react-select \
		# react-redux
		graphql \
		apollo-boost \
		react-apollo
COPY public/ /theapp/public/
COPY fonts /theapp/src/fonts
COPY src/ /theapp/src/
		
EXPOSE 3000

# By default, simply start the app
CMD cd /theapp && yarn start
