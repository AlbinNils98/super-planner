FROM ubuntu:latest
LABEL authors="albin"

ENTRYPOINT ["top", "-b"]