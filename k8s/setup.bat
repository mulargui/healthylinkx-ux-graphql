
rem edit this if you cloned the repo in a different directory
minikube ssh "ln -s /c/Users/Mauricio/Documents/healthylinkx-ux-graphql /home/docker/healthylinkx-ux-graphql"

rem create the containers
minikube ssh "/home/docker/healthylinkx-ux-graphql/docker/container.sh BUILD"

rem create resources
kubectl create -f %~dp0.\ux-service.yaml
kubectl create -f %~dp0.\ux-deployment.yaml

exit /B 0
