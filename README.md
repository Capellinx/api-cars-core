
# PROVA BACKEND NODE.JS

Este repositório contém a implementação do backend do projeto da empresa **BTHU**. A aplicação é construída com **Node.js**, **TypeScript**, **Mongoose**, **Docker** e utiliza **MongoDB** como banco de dados.

## Pré-requisitos

Antes de começar, você precisará ter os seguintes itens instalados na sua máquina:

- [Node.js](https://nodejs.org/) (versão 18 ou superior)
- [Git](https://git-scm.com/)
- [Docker](https://www.docker.com/)

---

## Configuração do Ambiente

### 1. Clonando o Repositório

Clone este repositório em sua máquina local usando o seguinte comando:

```bash
git clone https://github.com/Capellinx/api-cars-core
cd api-cars-core
code .
```

Isso abrirá o repositório no VSCode.

---

### 2. Instalando Dependências

Instale as dependências do projeto usando **npm** ou **pnpm**:

1. **Usando npm**:
```bash
npm install
```

2. **Usando pnpm**:
```bash
pnpm install
```

---

### 3. Configuração das Variáveis de Ambiente

Na raiz do repositório, você precisará criar um arquivo `.env`. Existem duas maneiras de fazer isso:

- **Manualmente**: Crie um arquivo `.env` e copie as variáveis de ambiente do arquivo `.env.example`.
- **Via Terminal**:
  - **Windows**: 
  ```bash
  copy .env.example .env
  ```
  - **Linux/Mac**:
  ```bash
  cp .env.example .env
  ```

**Observação**: Algumas variáveis de ambiente dependem de configurações no `docker-compose.yml`, então verifique as portas e outros detalhes relacionados a serviços no arquivo.

---

### 4. Iniciando os Ambientes no Docker

O `docker-compose` já está configurado e inclui os seguintes serviços:

- **Mongo-express**: Interface gráfica do MongoDB
- **MongoDB**: Banco de dados
- **RabbitMQ**: Fila de mensagens
- **API Node.js**

Para iniciar os serviços no Docker, execute o seguinte comando:

1. **Para ver os logs em tempo real**:
```bash
docker compose up
```

2. **Para rodar os containers em segundo plano** (sem logs no terminal):
```bash
docker compose up -d
```

---

### 5. Acessando os Logs da API no Docker

Para visualizar os logs da API enquanto ela está sendo executada dentro do Docker, use o comando abaixo:

```bash
docker logs -f api-car-service
```

**Observação**: Caso precise acessar o ambiente da API para manipular arquivos dentro da rede do Docker, execute o seguinte comando:

```bash
docker exec -it api-car-service sh
```

Lembre-se de que a aplicação utiliza **live reloading** com o **nodemon**. Isso significa que alterações no código são refletidas automaticamente no ambiente Docker. Contudo, se precisar instalar dependências, será necessário reconstruir a aplicação ou instalar os pacotes dentro do container usando o comando acima.

---

### 6. Documentação da API (Swagger)

A documentação da API está disponível através do **Swagger**, que oferece uma interface interativa para testar os endpoints.

1. **Inicie a API**: Para visualizar a documentação, certifique-se de que o servidor esteja rodando.
2. **Acesse o Swagger**: Após iniciar a API, abra seu navegador e acesse:
```bash
http://localhost:<porta>/api-docs
```
Substitua `<porta>` pela porta configurada na variável de ambiente `PORT`.

---

### 7. Acessando o Mongo-express

Para acessar a interface gráfica do **Mongo-express** e visualizar os dados armazenados no banco `carDB`, acesse o seguinte endereço:

```bash
http://localhost:8081
```

As credenciais de login são:

- **Username**: `admin`
- **Password**: `pass`

---

### 8. Acessando o RabbitMQ

Para visualizar as **exchanges** e **queues** no **RabbitMQ**, acesse:

```bash
http://localhost:15672
```

As credenciais de login são:

- **Username**: `admin`
- **Password**: `admin`

---

### 9. Executando a Aplicação

Agora que a aplicação está configurada, siga os passos abaixo para testar todas as funcionalidades implementadas e verificar o funcionamento.

---

### Informacão sobre o funcionamento do Consumer + Webhook

### 9.1. **Iniciando a Aplicação**

Antes de tudo, certifique-se de que a aplicação está corretamente configurada e todas as dependências foram instaladas. Após isso, inicie a aplicação com o comando adequado, conforme o ambiente (por exemplo, `npm start`, etc.).

### 9.2. **Consumer da Fila**

O **consumer da fila** é responsável por verificar se há informações na fila toda vez que a aplicação é iniciada. Sempre que a aplicação é executada ou reiniciada, o consumer:

- **Verifica a fila**: Ele consulta a fila para ver se há mensagens ou tarefas pendentes.
- **Processa a mensagem**: Se houver dados na fila, ele tenta processá-los. Caso haja um erro ou algum problema, ele loga uma **mensagem de advertência (WARN)** no terminal.
- **Ativa o webhook**: Caso a tarefa seja processada com sucesso, o consumer ativa o **webhook** para realizar uma chamada de callback para o próximo processo.

#### Exemplo de saída do terminal:

- **Se houver uma mensagem e for processada com sucesso:**
    ```
    [INFO] - Car created successfully.
    ```

- **Se houver um erro no processamento ou algum dado inválido:**
    ```
    [WARN] - Queue is empty.
    ```

### 9.3. **Webhook**

O **webhook** é ativado automaticamente após o processamento da fila. Quando o webhook é disparado:

- **Salva dados no banco NoSQL**: O webhook faz uma chamada a um use-case específico da aplicação, que armazena as informações processadas na fila no banco de dados **NoSQL**.
  
- **Chamada para um use-case**: Após a ativação do webhook, a aplicação chama um use-case que executa a lógica para armazenar os dados de forma persistente.


## Contato

Se você tiver alguma dúvida ou sugestão, entre em contato comigo:

- **Nome**: Lucas Capella
- **Email**: capellaaa7@gmail.com
- **LinkedIn**: [Lucas Capella](https://www.linkedin.com/in/lucas-capella-dev/)

---
