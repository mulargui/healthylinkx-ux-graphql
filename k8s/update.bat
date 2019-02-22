
kubectl scale deployment healthylinkx-ux-deployment --replicas 0

rem create the containers
minikube ssh "/home/docker/healthylinkx-ux-graphql/docker/container.sh BUILD"

kubectl scale deployment healthylinkx-ux-deployment --replicas 1

exit /B 0

