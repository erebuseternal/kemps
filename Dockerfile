FROM ubuntu:latest

RUN apt-get -y update && \
	apt-get -y upgrade && \
	apt-get install -y build-essential && \
	apt-get install -y libpq-dev

RUN apt-get -y install npm

RUN apt-get -y install git