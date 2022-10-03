# healthylinkx-ux-graphql

Healthylinkx helps you find doctors with the help of your social network. Think of Healthylinkx as a combination of Yelp, Linkedin and Facebook. 

This is an early prototype that combines open data of doctors and specialists from the US Department of Health. It allows you to search for doctors based on location, specialization, genre or name. You can choose up to three doctors in the result list and Healthylinkx (theoretically) will book appointments for you.

Healthylinx is a classic three tiers app: front-end (ux), service API and data store. It also integrates with a third-party API from RedLine13 (https://www.redline13.com) to find zip codes in an area. Healthylinkx creates and runs a container for each tier.

This architecture makes it very adequate to test different technologies and I use it for getting my hands dirty on new stuff. You might need to combine what is in this repo with other repos if you want to build the app end to end. It is like a lego where you can pick and choose different technologies as you see fit. Enjoy!

This repo implements the ux tier in a single page web app using bootstrap and react-redux. It is a rewrite of the healthylinkx-ux-react to use apollo graphql client and connect to the api in graphql.

Directories:\
Src. the code of the react-redux app organized in various folders in a quite standard way.\
fonts. several fonts used by the app.\
public. standard react index template.\
docker. how to create and manage the container.\
k8s. templates to create the service in kubernetes. tested with minikube. Edit setup.bat to point to the directory where you cloned the repo\
You can see how I set up minikube in the repo http://github.com/mulargui/healthylinkx-k8s \

Note: Keep in mind if you clone this repo in Windows that shellscripts' line breaks will be adjusted to Windows and will not work in minikube. You will need to edit the files.
