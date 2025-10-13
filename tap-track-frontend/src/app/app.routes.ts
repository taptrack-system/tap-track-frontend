import { Routes } from '@angular/router';
import { UserCreate } from './features/users/user-create/user-create';
import { UserList } from './features/users/user-list/user-list';
import { UserSearch } from './features/users/user-search/user-search';
import { RoleCreate } from './features/roles/role-create/role-create';
import { RoleListComponent } from './features/roles/role-list/role-list';
import { RoleSearch } from './features/roles/role-search/role-search';
import { LogList } from './features/logs/log-list/log-list';
import { Home } from './features/layout/home/home';

export const routes: Routes = [
  {
    path: '', component: Home, children: [
      { path: '', redirectTo: 'users/list', pathMatch: 'full' },
      // USERS
      { path: 'users/new', component: UserCreate },
      { path: 'users/list', component: UserList },
      { path: 'users/search', component: UserSearch },
      // ROLES
      { path: 'roles/new', component: RoleCreate },
      { path: 'roles/list', component: RoleListComponent },
      { path: 'roles/search', component: RoleSearch },
      // LOGS
      { path: 'logs', component: LogList },
      // LOGIN
      // { path: 'login', component: DummyLogin }
    ]
  },  

  { path: '**', redirectTo: '' }
  
];
