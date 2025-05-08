# 🧠 Hábitos e Organização Pessoal  
## ✨ Equilíbrio AI

**Equilíbrio AI** é um sistema que utiliza **PostgreSQL** (hospedado na Supabase) para armazenar dados de usuários, hábitos e seus tipos, recomendações personalizadas geradas por IA, e registros diários de hábitos realizados.  

Foi utilizado a API de IA da Google, Gemini.

Você pode acessá-la pelo link: https://ai.google.dev/aistudio?hl=pt-br

📁 A modelagem do banco de dados está disponível em:  
`/backend/modelagem.pdf`

---

## 🚀 Como rodar o projeto

### 🔁 Clone o repositório

```bash
git clone https://github.com/Arthu085/backend-projeto
cd backend-projeto 
```

### 🖥️ Rodando o Backend (Spring Boot)

**Necessário ter instalado Java 17**

Acesse a pasta do backend:
```bash
cd backend
```

✅ Opções de execução

Windows:
```bash
mvnw.cmd spring-boot:run
```

Linux/Mac:
```bash
./mvnw spring-boot:run
```
💡 Você também pode rodar o backend diretamente pela sua IDE (IntelliJ, VS Code, Eclipse, etc.)

### 🌐 Rodando o Frontend (React)

Acesse a pasta do frontend:
```bash
cd ../frontend
```

Instale as dependências:
```bash
npm install
```

Execute o servidor de desenvolvimento:
```bash
npm run dev
```

## Rotas para Testes no Backend

**Importante:** TODAS AS ROTAS, EXCETO AS QUE INICIAM COM `/auth` E `/sobre`, REQUEREM UM TOKEN DE AUTENTICAÇÃO NO HEADER, FORNECIDO NO RETORNO DO LOGIN.

### Exemplo de uso do Token

1. Ao testar as rotas, adicione um novo **Header** com a chave chamada `Authorization`.
2. O valor deste header deve ser `Bearer {token}`, substituindo `{token}` pelo seu token de autenticação.

Alternativamente, caso o software de testes tenha uma seção chamada "Authorization":
1. Selecione o tipo de autenticação como **Bearer Token**.
2. Insira o token na área correspondente.
   
### Rotas

- **URL:** `http://localhost:8000/sobre`  
  **Método:** `GET`  
  **Descrição:** Rota para pegar as informações do projeto.  

  ---
  
- **URL:** `http://localhost:8000/auth/register`  
  **Método:** `POST`  
  **Descrição:** Rota para criação de um novo usuário.  

  **Body:**  
  - `name` (string): Nome do usuário  
  - `email` (string): Endereço de e-mail do usuário  
  - `password` (string): Senha do usuário  
  - `city` (string): Cidade do usuário

  ---
  
- **URL:** `http://localhost:8000/auth/login`  
  **Método:** `POST`  
  **Descrição:** Rota para autenticar o usuário.  

  **Body:**  
  - `email` (string): Endereço de e-mail do usuário  
  - `password` (string): Senha do usuário
    
  ---
  
- **URL:** `http://localhost:8000/user/me`  
  **Método:** `GET`  
  **Descrição:** Rota para trazer informações do usuário.  

  **Apenas o Token no header é necessário**
  
  ---
  
- **URL:** `http://localhost:8000/habit/create`  
  **Método:** `POST`  
  **Descrição:** Rota para criar hábito.  

  **Body:**  
  - `name` (string): Nome do hábito  
  - `type_habit` (int): 1	saúde, 2	produtividade, 3	emocional, 4	hobby, 5	sono, 6	espiritual, 7	social, 8	autocuidado, 9	criatividade, 10	aprendizado
      
  ---
  
- **URL:** `http://localhost:8000/habit/fetch`  
  **Método:** `GET`  
  **Descrição:** Rota para consultar hábitos do usuário logado.  

  **Apenas o Token no header é necessário**
        
  ---
  
- **URL:** `http://localhost:8000/habit/delete/{id}`  
  **Método:** `DELETE`  
  **Descrição:** Rota para deletar hábito.  

  **ID do hábito encontrado na rota de fetch habit na URL**
          
  ---
  
- **URL:** `http://localhost:8000/habit/edit/{id}`  
  **Método:** `PUT`  
  **Descrição:** Rota para editar hábito.  

  **ID do hábito encontrado na rota fetch habit na URL**
  
  **Body (ambos são opcionais):**
  - `name` (string): Nome do hábito  
  - `type_habit` (int): 1	saúde, 2	produtividade, 3	emocional, 4	hobby, 5	sono, 6	espiritual, 7	social, 8	autocuidado, 9	criatividade, 10	aprendizado
    
  ---
  
- **URL:** `http://localhost:8000/record/create`  
  **Método:** `POST`  
  **Descrição:** Rota para gravar hábito feito.  

  **Body:**
  - `id_habit` (int): ID do hábito selecionado na URL de fetch habit
        
  ---
  
- **URL:** `http://localhost:8000/record/fetch`  
  **Método:** `GET`  
  **Descrição:** Rota para visualizar hábitos feitos pelo usuário autenticado.  

  **Apenas o Token no header é necessário**
          
  ---
  
- **URL:** `http://localhost:8000/record/delete/{id}`  
  **Método:** `DELETE`  
  **Descrição:** Rota para deletar hábitos feitos.  

  **ID do record encontrado na rota de fetch record na URL**
            
  ---
  
- **URL:** `http://localhost:8000/api/google-ai/sugestao-habito`  
  **Método:** `POST`  
  **Descrição:** Rota para buscar sugestão de hábito da IA.  

  **Body:**
  - `clima` (string): Clima atual
  - `estadoEmocional` (string): Estado emocional do usuário
               
  ---
  
- **URL:** `http://localhost:8000/recommendation/create`  
  **Método:** `POST`  
  **Descrição:** Rota para salvar sugestão da IA no banco, porém funciona somente se usado no frontend na tela "/Suggestions", pela rota é possível criar recomendação manualmente.  

  **Body:**
  - `description` (string): Descrição da recomendação
  
  ---
  
- **URL:** `http://localhost:8000/recommendation/fetch`  
  **Método:** `GET`  
  **Descrição:** Rota para buscar recomendações feitas para o usuário autenticado.  

  **Apenas o Token no header é necessário**
    
  ---
  
- **URL:** `http://localhost:8000/recommendation/delete/{id}`  
  **Método:** `DELETE`  
  **Descrição:** Rota para deletar recomendações.  

  **ID do recommendation encontrado na rota de fetch recommendation na URL**
    
  ---
  
- **URL:** `http://localhost:8000/recommendation/edit/{id}`  
  **Método:** `PUT`  
  **Descrição:** Rota para editar recomendações.  

  **ID do recommendation encontrado na rota de fetch recommendation na URL**
  
  **Body:**
  - `description` (string): Descrição da sugestão

 ---

 ## Grupo
 **Arthur Ghizi e Eduardo Domingos**
