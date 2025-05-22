# Providers Library

Biblioteca de providers React com serviços de API e logging.

## Documentação

Acesse a documentação completa em: [https://paulhenrique.github.io/providers-library/#/](https://paulhenrique.github.io/providers-library/#/)

## Instalação

```bash
pnpm add providers-library
```

## Uso

### QueryProvider

O `QueryProvider` é um componente React que fornece endpoints de consulta para componentes filhos através de contexto.

#### Configuração

1. Importe o componente e seus tipos:

```typescript
import { QueryProvider } from 'providers-library';
```

2. Configure os endpoints no seu componente raiz:

```typescript
const endpoints = {
  users: 'https://api.example.com/users',
  posts: 'https://api.example.com/posts',
  // ... outros endpoints
};

function App() {
  return (
    <QueryProvider endpoints={endpoints}>
      {/* Seus componentes aqui */}
    </QueryProvider>
  );
}
```

#### Uso nos componentes filhos

Você pode acessar os endpoints de duas maneiras:

1. Usando o hook `useQueryContext`:

```typescript
import { useQueryContext } from 'providers-library';

function UserList() {
  const { endpoints } = useQueryContext();
  
  // Use endpoints.users para fazer requisições
  return (
    // ... seu componente
  );
}
```

2. Através do contexto diretamente:

```typescript
import { QueryContext } from 'providers-library';

function UserList() {
  const { endpoints } = React.useContext(QueryContext);
  
  // Use endpoints.users para fazer requisições
  return (
    // ... seu componente
  );
}
```

### useGenericService

Hook que facilita a integração com endpoints através do React Query.

```typescript
import { useGenericService } from 'providers-library';

function UserList() {
  const { data, isLoading, error } = useGenericService(endpoints);
  
  if (isLoading) return <div>Carregando...</div>;
  if (error) return <div>Erro: {error.message}</div>;
  
  return (
    <div>{data?.map(user => <div key={user.id}>{user.name}</div>)}</div>
  );
}
```

### Serviços

#### ApiService

Serviço centralizado para chamadas HTTP usando Axios.

```typescript
import { api } from 'providers-library';

// GET
const users = await api.get<User[]>('/users');

// POST
const newUser = await api.post<User, User>('/users', userData);

// PUT
const updatedUser = await api.put<User, User>('/users/1', updatedData);

// DELETE
await api.delete('/users/1');
```

#### LoggerService

Serviço de logging com diferentes níveis de log.

```typescript
import { log } from 'providers-library';

// Logs diferentes
log.debug('Mensagem de debug');
log.info('Informação importante');
log.warn('Aviso importante');
log.error('Erro ocorrido', { error: 'details' });
log.fatal('Erro fatal');
log.trace('Rastreamento');
```

## Tipagem

O componente é tipado para garantir segurança em TypeScript. Você pode especificar o tipo dos endpoints que seu projeto usa:

```typescript
interface MyEndpoints {
  users: string;
  posts: string;
  comments: string;
}

const endpoints: MyEndpoints = {
  users: 'https://api.example.com/users',
  posts: 'https://api.example.com/posts',
  comments: 'https://api.example.com/comments',
};

function App() {
  return (
    <QueryProvider endpoints={endpoints}>
      {/* Seus componentes aqui */}
    </QueryProvider>
  );
}
```

## Desenvolvimento

```bash
# Iniciar o servidor de desenvolvimento
pnpm run watch

# Gerar documentação
pnpm run docs

# Construir a biblioteca
pnpm run build
```

## Contribuição

Contribuições são bem-vindas! Por favor, abra uma issue ou pull request para sugerir melhorias.

## Licença

Este projeto está sob a licença ISC.

## Contribuição

Contribuições são bem-vindas! Por favor, abra uma issue ou pull request para sugerir melhorias.

## Licença

Este projeto está sob a licença ISC.