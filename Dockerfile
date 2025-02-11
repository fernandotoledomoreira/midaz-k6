FROM grafana/k6:latest

WORKDIR /midaz-k6

# Copiar apenas os arquivos necessários
COPY . /midaz-k6

# Definir usuário root para instalar pacotes
USER root

# Instalar dependências necessárias em um único comando para reduzir camadas
RUN apk update && apk upgrade && apk add --no-cache git tzdata go bash

# Definir fuso horário
ENV TZ=America/Sao_Paulo

# Configurar variáveis de ambiente para Go
ENV HOME=/root
ENV GOPATH=$HOME/go
ENV GOBIN=$GOPATH/bin
ENV PATH=$PATH:/usr/local/go/bin:$GOBIN

# Ajustar permissões corretamente
RUN chmod -R u+rwx /midaz-k6

# Instalar xk6 e compilar k6 com o módulo desejado
RUN go install go.k6.io/xk6/cmd/xk6@latest && \
    xk6 build --with github.com/grafana/xk6-faker@latest && \
    mv k6 /usr/local/bin/k6

# Expor porta necessária
EXPOSE 5665 

# Definir ponto de entrada para rodar scripts K6 diretamente
ENTRYPOINT [ "/bin/bash" ]
