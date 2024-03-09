# Projeto node + react + mysql

### Instalar versão LTS do node
https://nodejs.org/en/download

### Criar base no mysql
```
monitoraentregas
```
### no diretório backend criar arquivo .env para definir as credencias do mysql
```
TZ = 'America/Sao_Paulo'

NODE_ENV=development 
DB_HOST=localhost
DB_BASE=nome_base_criada 
DB_USER=usuario_mysql 
DB_PASS=senha_mysql 
DB_DIALECT=mysql
```
### Executar no diretório backend 
```
npm install
npx sequelize-cli db:migrate
node app.js
```
### Executar no diretório frontend 
```
npm install
npm run dev
```
### Acessar no navegador
http://localhost:3000


