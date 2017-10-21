FROM node:8.6.0
MAINTAINER Benjamin Knox "bknox.contact@gmail.com"
RUN useradd --user-group --create-home --shell /bin/false app-user ; \
    apt-get update ; \
    apt-get install -y python-pip python-dev build-essential ; \
    rm -rf /var/lib/apt/lists/*

ENV HOME=/home/app-user
ADD . $HOME/app

RUN cd $HOME/app ; pip install -r .requirements ; chown -R app-user:app-user $HOME/*

USER app-user
WORKDIR $HOME/app
RUN cd $HOME/app ; npm install

