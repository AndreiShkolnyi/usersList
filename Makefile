run:
	docker run -d -p 8080:8080 --name userslist --rm userslist
stop:
	docker stop userslist