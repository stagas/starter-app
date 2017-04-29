PROJECT_NAME=starter
NODE_BIN=./node_modules/.bin

# start service
start:
	@docker-compose up

.PHONY: start

# start in development mode
dev:
	@$(NODE_BIN)/nodemon index

.PHONY: dev

build: Dockerfile
	@docker-compose build $(PROJECT_NAME)

.PHONY: build

# install node.js dependencies
install:
	@yarn install

.PHONY: install

# run test suite
test:
	@$(NODE_BIN)/ava -v

docker-test:
	@docker-compose run $(PROJECT_NAME) make test

.PHONY: test docker-test

# run test suite in watch(development) mode
test-watch:
	@$(NODE_BIN)/ava -v --watch

docker-test-watch:
	@docker-compose run $(PROJECT_NAME) make test-watch

.PHONY: test-watch docker-test-watch

stop:
	@docker-compose stop

.PHONY: stop

clean:
	@docker system prune -f
	@rm -rf node_modules

.PHONY: clean
