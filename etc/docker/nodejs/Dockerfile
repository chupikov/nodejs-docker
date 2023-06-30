ARG NODEJS_IMAGE_VERSION=""

FROM node:${NODEJS_IMAGE_VERSION}

ARG HOST_USER=default
ARG HOST_UID=1000
ARG HOST_GID=1000

ENV LANG C.UTF-8
ENV LC_ALL C.UTF-8
ENV USER ${HOST_USER}

USER ${HOST_UID}:${HOST_GID}
# USER ${HOST_USER}

RUN mkdir -p /root/.ssh && ln -s /run/secrets/ssh_key /root/.ssh/id_rsa
RUN mkdir -p /home/${HOST_USER}/.ssh \
    && chown -R ${HOST_UID}:${HOST_GID} /home/${HOST_USER} \
    && ln -s /run/secrets/ssh_key /home/${HOST_USER}/.ssh/id_rsa \
    && chmod 0755 /home/${HOST_USER}/.ssh \
    ;

RUN apk update; \
    apk upgrade;

RUN apk add --update --no-cache \
    bash \
    sudo \
    openssh-client \
    unzip \
    mc \
    curl \
    wget \
    ;

COPY .bashrc /root/.bashrc
COPY .bashrc /home/${HOST_USER}

RUN rm -f /bin/sh && ln -s /bin/bash /bin/sh
SHELL ["/bin/bash", "--rcfile", "/root/.bashrc", "-c"]

RUN echo "${HOST_USER} ALL=(ALL) NOPASSWD: ALL" > /etc/sudoers.d/${HOST_USER} \
    && chmod 0440 /etc/sudoers.d/${HOST_USER} \
    ;
