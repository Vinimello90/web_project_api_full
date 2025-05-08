# Web Project API Full - Around the U.S. - EUA Afora

O projeto **Web Project API Full - Around the U.S. - EUA Afora** é uma plataforma interativa que desenvolvi com **frontend em React.js**, consumindo uma **API RESTful** criada com **Node.js** e **MongoDB**. Implementei tanto o **frontend** quanto o **backend** em uma máquina virtual na nuvem, configurando todos os serviços necessários para garantir o funcionamento completo da aplicação em ambiente de produção.

https://github.com/user-attachments/assets/0dfef3fe-5e12-4a23-b0fa-250becdf39ef

## Tecnologias e Metodologias

### Frontend

- HTML5 semântico
- Metodologia BEM
- Flexbox
- Grid
- Text-overflow
- Hover
- Pseudo-classes
- Unidades de medida relativas
- Media queries
- React JS
- Consumo de API

### Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- Bcryptjs
- Jsonwebtoken
- Cors
- Winston
- Joi / Celebrate
- PM2
- Nginx
- Testes automatizados

## Descrição das Tecnologias e Técnicas Utilizadas

### Frontend

Desenvolvi uma plataforma onde o usuário pode criar uma conta, personalizar o perfil, publicar e remover fotos, além de curtir fotos compartilhadas por outros usuários. Usei **React.js** e **HTML5 semântico** para otimizar o **SEO**, e adotei a **Metodologia BEM** para tornar o código mais organizado e reutilizável. O frontend consome uma API para persistência e recuperação de dados.

Para mais detalhes técnicos e metodológicos sobre o frontend, acesse o **[README do repositório](https://github.com/Vinimello90/web_project_around_auth/tree/main#readme)**.

### Backend

Desenvolvi uma **API RESTful** usando **Node.js** com **Express.js** para gerenciar as requisições. Conectei a API ao **MongoDB** utilizando o **Mongoose**. Para proteger as senhas dos usuários, usei o **bcryptjs** para encriptá-las em hash, e gerei tokens de autenticação com o **jsonwebtoken**.
Implementei a validação dos dados das requisições com **Joi** e **Celebrate**, e configurei o **Cors** para controlar o acesso às rotas. Para gerar logs e monitorar a aplicação, utilizei a biblioteca **Winston**. Mantive a API sempre ativa com o **PM2**, e configurei o **Nginx** como proxy reverso, redirecionando os acessos conforme os subdomínios.

Para mais detalhes sobre a arquitetura do backend, consulte o **[README do repositório](https://github.com/Vinimello90/web_project_around_express#readme)**.

---

**Domínio da aplicação web: [aroundus.protechadvanced.com](https://aroundus.protechadvanced.com)**  
**Domínio da API: [api.aroundus.protechadvanced.com](https://api.aroundus.protechadvanced.com)**
