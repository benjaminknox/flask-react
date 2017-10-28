FROM node:12
MAINTAINER Benjamin Knox "bknox.contact@gmail.com"

ENV LC_ALL C.UTF-8
ENV LANG en_US.UTF-8
ENV LANGUAGE en_US:en
ENV TERM screen

RUN useradd --user-group --create-home --shell /bin/false app-user ; \
    wget -qO - https://raw.githubusercontent.com/yarnpkg/releases/gh-pages/debian/pubkey.gpg | apt-key add -; \
    apt-get update ; \
    apt-get install -y python3 python3-pip build-essential  autoconf libtool pkg-config nasm ; \
    rm -rf /var/lib/apt/lists/*

ENV HOME=/home/app-user
ADD . $HOME/app

RUN chown -R app-user:app-user $HOME/*

USER app-user


RUN cd $HOME/app ; pip3 install -r .requirements

WORKDIR $HOME/app
RUN npm install
