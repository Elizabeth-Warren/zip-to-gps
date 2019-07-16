build:
	docker build . -t zip-to-gps

tests:
	make build
	docker run --rm zip-to-gps
