FROM ubuntu:latest

RUN apt-get -y update && \
	apt-get -y upgrade && \
	apt-get install -y build-essential && \
	apt-get install -y libpq-dev

RUN apt-get -y install curl

RUN curl -fsSL https://deb.nodesource.com/setup_15.x | bash - && \
	apt-get install -y nodejs

RUN apt-get -y install git