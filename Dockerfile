FROM node:16
MAINTAINER Benjamin Knox "bknox.contact@gmail.com"

ENV LC_ALL C.UTF-8
ENV LANG en_US.UTF-8
ENV LANGUAGE en_US:en
ENV TERM screen

RUN useradd --user-group --create-home --shell /bin/false app-user 
# RUN wget -qO - https://raw.githubusercontent.com/yarnpkg/releases/gh-pages/debian/pubkey.gpg | apt-key add -
RUN apt-get update
RUN apt-get install -y python3 python3-venv python3-pip build-essential  autoconf libtool pkg-config nasm 
RUN rm -rf /var/lib/apt/lists/*

ENV HOME=/home/app-user
WORKDIR $HOME/app

COPY package*.json ./

RUN chown -R app-user:app-user $HOME/*
USER app-user

RUN npm install --legacy-peer-deps

ENV VIRTUAL_ENV=/home/app-user/env
RUN python3 -m venv $VIRTUAL_ENV
ENV PATH="$VIRTUAL_ENV/bin:$PATH"

COPY .requirements .
RUN pip3 install -r .requirements

ADD . $HOME/app

WORKDIR $HOME/app
