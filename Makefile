.PHONY: compose start

compose:
	@echo "composing docker image..."
	docker-compose up -d
destroy:
	@echo "stopping docker image..."
	docker-compose down --remove-orphans --rmi "all" -v
rebuild:
	@echo "rebuilding docker image..."
	docker-compose up --build