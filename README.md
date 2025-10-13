# Tap Track Frontend

## Ferramentas

* Angular CLI: 20.3.4 (`ng version`)
* Node: 22.20.0 (`node -v`)
* Package Manager: npm 11.6.1 (`npm -v`)
* OS: win32 x64

### Package

| Package                      | Version             |
|:-----------------------------|:--------------------|
| `@angular-devkit/architect`  | 0.2003.4 (cli-only) |
| `@angular-devkit/core`       | 20.3.4 (cli-only)   |
| `@angular-devkit/schematics` | 20.3.4 (cli-only)   |
| `@schematics/angular`        | 20.3.4 (cli-only)   |

---

## Estrutura de Pastas

```text
tap-track-frontend/
├─ src/
│  ├─ app/
│  │  ├─ core/                     # Serviços globais, guards, interceptors, models globais
│  │  │   ├─ services/
│  │  │   ├─ guards/
│  │  │   ├─ interceptors/
│  │  │   └─ models/
│  │  │
│  │  ├─ shared/                   # Componentes, pipes e diretivas reutilizáveis
│  │  │   ├─ components/
│  │  │   ├─ pipes/
│  │  │   └─ directives/
│  │  │
│  │  ├─ modules/                  # Cada domínio do backend é um módulo Angular
│  │  │   ├─ identity/             # identity-access-domain
│  │  │   │   ├─ login/
│  │  │   │   ├─ profile/
│  │  │   │   └─ identity-routing.module.ts
│  │  │   │
│  │  │   ├─ finance/              # finance-domain
│  │  │   │   ├─ billing/
│  │  │   │   ├─ finance/
│  │  │   │   └─ finance-routing.module.ts
│  │  │   │
│  │  │   ├─ supplier/             # supplier-domain
│  │  │   │   ├─ supplier-list/
│  │  │   │   ├─ supplier-detail/
│  │  │   │   └─ supplier-routing.module.ts
│  │  │   │
│  │  │   ├─ product-beer/         # product-beer-domain
│  │  │   │   ├─ beer/
│  │  │   │   ├─ product/
│  │  │   │   └─ product-beer-routing.module.ts
│  │  │   │
│  │  │   ├─ tap-pos/              # tap-pos-domain
│  │  │   │   ├─ tap/
│  │  │   │   ├─ pos/
│  │  │   │   └─ tap-pos-routing.module.ts
│  │  │   │
│  │  │   └─ app-routing.module.ts # Rotas principais
│  │  │
│  │  ├─ pages/                    # Telas gerais, dashboard, relatórios
│  │  │   ├─ dashboard/
│  │  │   ├─ reports/
│  │  │   └─ home/
│  │  │
│  │  ├─ styles/                   # SCSS global, variáveis, themes
│  │  │   ├─ _variables.scss
│  │  │   ├─ _mixins.scss
│  │  │   └─ main.scss
│  │  │
│  │  └─ app.module.ts
│  │
│  ├─ assets/
│  │   ├─ images/
│  │   ├─ icons/
│  │   └─ i18n/                     # Internacionalização
│  │
│  ├─ environments/
│  │   ├─ environment.ts
│  │   └─ environment.prod.ts
│  │
│  └─ main.ts
│
├─ angular.json
├─ package.json
├─ tsconfig.json
└─ README.md
```

### Observações

1. Core vs Shared
   * `core`: serviços e funcionalidades globais (ex: Auth, Interceptors, Guard).
   * `shared`: componentes, pipes e diretivas reutilizáveis, mas sem dependências de rotas.
2. Módulos por Domínio
   * Cada domínio do backend tem seu módulo Angular próprio
   * Facilita **lazy loading** (carregamento sob demanda)
   * Mantém consistência entre frontend e backend
3. Rotas
   * Módulos de domínio têm seus próprios `RoutingModule`
   * `app-routing.module.ts` gerencia rotas principais e carregamento lazy
4. Pasta `pages`
   * Para dashboards de relatórios, que podem combinar dados de vários domínios
5. Estilo
   * SCSS modularizado
   * Arquivo `styles/_variables.scss` para cores do chopp, branding do Tap Track.

---

## Sugestões

* Exemplo de estrutura real de arquivos Angular CLI com módulos, components e rotas prontos, compatível com Angular 20, incluindo `lazy loading` para cada domínio.

---

## Passo a Passo

Guia passo a passo completo para criar a aplicação Angular do projeto Tap Track, incluindo bibliotecas essenciais, configuração inicial e estrutura de módulos para integração com os microsserviços. Utilizando Angular 20, seguindo boas práticas de escalabilidade e manutenção.

### 1. Pré Requisitos

Certifique-se de ter instalado:

```bash
# Node.js >= 22.20.0
node -v

# npm >= 11.6.1
npm -v

# Angular CLI 20.3.4
ng version
```

Se não tiver Angular CLI instalado:

```bash
npm install -g @angular/cli@20.3.4
```

### 2. Criar o Projeto Angular

```bash
ng new tap-track-frontend --routing --style=scss --strict
```

Opções explicadas:

* `--routing`: cria arquivo de roteamento principal (`app-routing.module.ts`)
* `--style=scss`: SCSS para estilização
* `--strict`: ativa verificação estrita de tipos (boa prática)

Entre na pasta do projeto:

```bash
cd tap-track-frontend
```

### 3. Estrutura Inicial de Pastas

Dentro de `src/app/` crie os módulos principais (domínios do backend):

```bash
ng g module src/app/modules/identity --routing
ng g module src/app/modules/finance --routing
ng g module src/app/modules/supplier --routing
ng g module src/app/modules/product-beer --routing
ng g module src/app/modules/tap-pos --routing
ng g module src/app/pages/dashboard
ng g module src/app/pages/reports
ng g module src/app/pages/home
ng g module src/app/core
ng g module src/app/shared
```

Cada módulo como `--routing` permite `lazy loading`.

### 4. Criar Componentes Principais

Exemplo de alguns componentes iniciais

```bash
ng g component modules/identity/login
ng g component modules/identity/profile

ng g component modules/finance/billing
ng g component modules/finance/finance-dashboard

ng g component modules/supplier/supplier-list
ng g component modules/supplier/supplier-detail

ng g component modules/product-beer/beer
ng g component modules/product-beer/product

ng g component modules/tap-pos/tap
ng g component modules/tap-pos/pos

ng g component pages/dashboard/main
ng g component pages/home/main
```

### 5. Bibliotecas Essenciais

Instale bibliotecas comuns para um sistema corporativo como o Tap Track:

```bash
# Requisições HTTP e autenticação
npm install @auth0/angular-jwt axios

# UI e componentes (Angular Material)
ng add @angular/material

# Estado global opcional (NgRx)
npm install @ngrx/store @ngrx/effects @ngrx/entity @ngrx/store-devtools

# RXJS adicional (já vem com Angular)
npm install rxjs

# Formulários avançados
npm install @angular/forms

# Gráficos e dashboards
npm install chart.js ng2-charts

# Internacionalização (i18n)
npm install @ngx-translate/core @ngx-translate/http-loader
```

### 6. Configurações Essenciais

**a. SCSS Global**

* `src/styles/_variables.scss`: Cores do Tap Track, temas de chopp, fontes
* `src/styles/_mixins.scss`: Mixins reutilizáveis
* `src/styles/main.scss`: Importar variáveis e mixins

```scss
@import 'variables';
@import 'mixins';
```

**b. Interceptador de Auth JWT**

Crie em `core/interceptors/auth.interceptor.ts` para adicionar token em todas as requisições HTTP.

**c. Guardas de Rota**

Crie `core/guards/auth.guard.ts` para proteger rotas privadas.

**d. App Routing (`app-routing.module.ts`)**

Exemplo de lazy loading:

```ts
const routes: Routes = [
  {
    path: 'identity',
    loadChildren: () => import('./modules/identity/identity.module').then(m => m.IdentityModule)
  },
  {
    path: 'finance',
    loadChildren: () => import('./modules/finance/finance.module').then(m => m.FinanceModule)
  },
  {
    path: 'dashboard',
    loadChildren: () => import('./pages/dashboard/dashboard.module').then(m => m.DashboardModule)
  },
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: '**', redirectTo: '/dashboard' }
];
```

### 7. Configurar environment para múltiplos ambientes

```ts
// src/environments/environment.ts
export const environment = {
  production: false,
  apiUrl: 'http://localhost:8080/api'
};

// src/environments/environment.prod.ts
export const environment = {
  production: true,
  apiUrl: 'https://api.taptrack.com.br/api'
};
```

### 8. Integração com Backend

* Cada módulo consome os microsserviços correspondentes (`identity-access-domain`, `finance-domain`, etc.)
* Use `HttpClient` do Angular com `interceptors` e `services` separados por domínio.

Exemplo: `modules/identity/services/auth.service.ts`

```ts
@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(private http: HttpClient) {}
  
  login(credentials: any) {
    return this.http.post(`${environment.apiUrl}/auth/login`, credentials);
  }
}
```

### 9. Scripts úteis no `package.json`

```json
"scripts": {
  "start": "ng serve --open",
  "build": "ng build --prod",
  "lint": "ng lint",
  "test": "ng test",
  "e2e": "ng e2e"
}
```

### Com isso, teremos:

* Estrutura modular refletindo backend
* Lazy loading e organização por domínio
* SCSS modularizado
* Bibliotecas essenciais prontas
* Configuração de ambientes e autenticação

---

## Sugestões

Gerar o blueprint de arquivos e pastas completo do Angular CLI com módulos, rotas, interceptors, guards e components já criados, pronto para clonar e começar a implementar a UI do sistema.

---