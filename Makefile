SHELL := /bin/zsh

PORT ?= 8000
HOST ?= 127.0.0.1
URL := http://$(HOST):$(PORT)
PID_FILE := /tmp/engaja-http-server.pid
LOG_FILE := /tmp/engaja-http-server.log

.PHONY: help dev serve stop restart status

help:
	@printf "Targets disponiveis:\n"
	@printf "  make dev      # sobe o servidor em background e abre no navegador\n"
	@printf "  make serve    # sobe o servidor em foreground\n"
	@printf "  make stop     # encerra o servidor em background\n"
	@printf "  make restart  # reinicia o servidor em background\n"
	@printf "  make status   # mostra o status do servidor\n"

dev:
	@if [ -f "$(PID_FILE)" ] && kill -0 "$$(cat "$(PID_FILE)")" 2>/dev/null; then \
		printf "Servidor ja esta rodando em $(URL)\n"; \
	else \
		nohup python3 -m http.server "$(PORT)" >"$(LOG_FILE)" 2>&1 & echo $$! >"$(PID_FILE)"; \
		sleep 1; \
		printf "Servidor iniciado em $(URL)\n"; \
	fi
	@open "$(URL)"
	@printf "Navegador aberto em $(URL)\n"
	@printf "Log: $(LOG_FILE)\n"

serve:
	@printf "Subindo servidor em $(URL)\n"
	@python3 -m http.server "$(PORT)"

stop:
	@if [ -f "$(PID_FILE)" ] && kill -0 "$$(cat "$(PID_FILE)")" 2>/dev/null; then \
		kill "$$(cat "$(PID_FILE)")"; \
		rm -f "$(PID_FILE)"; \
		printf "Servidor encerrado.\n"; \
	else \
		rm -f "$(PID_FILE)"; \
		printf "Nenhum servidor em background encontrado.\n"; \
	fi

restart: stop dev

status:
	@if [ -f "$(PID_FILE)" ] && kill -0 "$$(cat "$(PID_FILE)")" 2>/dev/null; then \
		printf "Servidor rodando em $(URL) (pid %s)\n" "$$(cat "$(PID_FILE)")"; \
		printf "Log: $(LOG_FILE)\n"; \
	else \
		printf "Servidor parado.\n"; \
	fi
