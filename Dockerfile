FROM grafana/k6:latest

WORKDIR /midaz-k6
COPY . /midaz-k6

USER root
RUN apk update
RUN apk upgrade

# Instalar Git e outras dependências
RUN apk add --no-cache git tzdata go

ENV TZ=America/Sao_Paulo

ENV HOME=/root
ENV PATH=$PATH:/usr/local/go/bin
ENV GOPATH=$HOME/go
ENV GOBIN=$GOPATH/bin
ENV PATH=$PATH:$GOBIN

RUN chmod 777 -R /midaz-k6

RUN mkdir -p /home/usr/local

# Instalar xk6
RUN go install go.k6.io/xk6/cmd/xk6@latest
RUN xk6 build --with github.com/szkiba/xk6-faker@latest

ENTRYPOINT [ "/bin/sh" ]
