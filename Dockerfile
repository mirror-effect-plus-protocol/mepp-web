FROM python:3.8
EXPOSE 8000

ENV DEBIAN_FRONTEND=noninteractive \
    LANG=en_US.UTF-8 \
    LANGUAGE=en_US:en \
    LC_ALL=en_US.UTF-8 \
    VIRTUAL_ENV=/opt/venv \
    MEPP_SRC_DIR=/usr/src/app \
    UWSGI_USER=mepp \
    UWSGI_GROUP=mepp

WORKDIR $MEPP_SRC_DIR/

COPY . ./

RUN apt-get -qq update && \
    apt-get -qq -y install \
        vim \
        locales \
        wait-for-it && \
    apt-get clean && \
        rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/*

RUN echo 'en_US.UTF-8 UTF-8' > /etc/locale.gen
RUN locale-gen && dpkg-reconfigure locales -f noninteractive

RUN adduser --disabled-password --gecos '' "$UWSGI_USER"

RUN python3 -m venv "$VIRTUAL_ENV"
ENV PATH="$VIRTUAL_ENV/bin:$PATH"
RUN pip install --quiet --upgrade pip && \
    pip install --quiet -r "$MEPP_SRC_DIR/requirements.txt" 1>/dev/null && \
    rm -rf ~/.cache/pip

CMD [ "/bin/bash", "-c", "exec /entrypoint.sh" ]
