# healthylinkx-ux-graphql
Rewrite of the healthylinkx-ux-react to use apollo graphql client and connect to the api in graphql

Healthylinkx is a 3 tiers app: ux, api and datastore. Healthylinkx creates and runs a container for each tier.

This repo implements the ux tier in a single page web app using bootstrap and react-redux.

Directories:\
Src. the code of the react-redux app organized in various folders in a quite standard way.\
fonts. several fonts used by the app.\
public. standard react index template.\
docker. how to create and manage the container.\
k8s. templates to create the service in kubernetes. tested with minikube. Edit setup.bat to point to the directory where you cloned the repo\
You can see how I set up minikube in the repo http://github.com/mulargui/healthylinkx-k8s \

Note: Keep in mind if you clone this repo in Windows that shellscripts' line breaks will be adjusted to Windows and will not work in minikube. You will need to edit the files.
