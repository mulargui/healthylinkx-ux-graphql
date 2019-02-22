FROM ubuntu:latest

# Install node.js, and supplementary programs
RUN DEBIAN_FRONTEND=noninteractive apt-get update
RUN DEBIAN_FRONTEND=noninteractive apt-get -y install  nodejs npm 
RUN DEBIAN_FRONTEND=noninteractive npm install -g npm@latest
RUN DEBIAN_FRONTEND=noninteractive npm install -g npx 
RUN DEBIAN_FRONTEND=noninteractive npx create-react-app theapp 
RUN DEBIAN_FRONTEND=noninteractive cd /theapp \
	&& npm install --save \		
		bootstrap@3 \
		react-bootstrap \
		redux \
		react-fontawesome \
		isomorphic-fetch \
		es6-promise \
		react-select
		# react-redux
# COPY public/ /theapp/public/
COPY fonts /theapp/src/fonts
COPY src/ /theapp/src/
		
EXPOSE 3000

# By default, simply start the app
CMD cd /theapp && npm start
