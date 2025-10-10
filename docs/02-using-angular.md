# Using Angular

Learn how to use Angular in the JAQ Stack ecosystem for building modern web applications.

## Overview

Angular provides the frontend framework for JAQ Stack, offering a powerful and scalable solution for building single-page applications.

## Getting Started

### Prerequisites

- Node.js 18 or higher
- npm or yarn
- Angular CLI

### Installation

```bash
# Install Angular CLI globally
npm install -g @angular/cli

# Clone the repository
git clone https://github.com/jaqstack/jaqstack-angular.git

# Navigate to the project
cd jaqstack-angular

# Install dependencies
npm install

# Start the development server
ng serve
```

## Core Features

- **Component-Based Architecture**: Modular and reusable components
- **TypeScript Support**: Type-safe development
- **Routing**: Client-side navigation
- **HTTP Client**: API integration
- **Forms**: Reactive and template-driven forms
- **Testing**: Unit and integration testing

## Project Structure

```
src/
├── app/
│   ├── components/          # Reusable components
│   ├── services/           # Business logic and API calls
│   ├── models/             # TypeScript interfaces
│   ├── guards/             # Route guards
│   ├── interceptors/       # HTTP interceptors
│   └── shared/             # Shared utilities
├── assets/                 # Static assets
├── environments/           # Environment configurations
└── styles/                 # Global styles
```

## Configuration

### Environment Setup

```typescript
// src/environments/environment.ts
export const environment = {
  production: false,
  apiUrl: 'http://localhost:8080/api',
  appName: 'JAQ Stack',
  version: '1.0.0'
};
```

### Angular Module

```typescript
// src/app/app.module.ts
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

## Best Practices

1. **Component Design**: Keep components small and focused
2. **Service Layer**: Use services for business logic
3. **Type Safety**: Leverage TypeScript features
4. **Performance**: Use OnPush change detection strategy
5. **Accessibility**: Follow WCAG guidelines

## Examples

### Creating a Component

```typescript
// src/app/components/user-list/user-list.component.ts
import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  users: User[] = [];
  loading = false;

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.loading = true;
    this.userService.getUsers().subscribe({
      next: (users) => {
        this.users = users;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading users:', error);
        this.loading = false;
      }
    });
  }
}
```

### Service Implementation

```typescript
// src/app/services/user.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://localhost:8080/api/users';

  constructor(private http: HttpClient) { }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.apiUrl);
  }

  getUser(id: string): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/${id}`);
  }

  createUser(user: User): Observable<User> {
    return this.http.post<User>(this.apiUrl, user);
  }

  updateUser(id: string, user: User): Observable<User> {
    return this.http.put<User>(`${this.apiUrl}/${id}`, user);
  }

  deleteUser(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
```

### Model Definition

```typescript
// src/app/models/user.model.ts
export interface User {
  id?: string;
  name: string;
  email: string;
  role: UserRole;
  createdAt?: Date;
  updatedAt?: Date;
}

export enum UserRole {
  ADMIN = 'admin',
  USER = 'user',
  GUEST = 'guest'
}
```

## Routing

```typescript
// src/app/app-routing.module.ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserListComponent } from './components/user-list/user-list.component';
import { UserDetailComponent } from './components/user-detail/user-detail.component';

const routes: Routes = [
  { path: '', redirectTo: '/users', pathMatch: 'full' },
  { path: 'users', component: UserListComponent },
  { path: 'users/:id', component: UserDetailComponent },
  { path: '**', redirectTo: '/users' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
```

## Testing

### Unit Test Example

```typescript
// src/app/services/user.service.spec.ts
import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { UserService } from './user.service';

describe('UserService', () => {
  let service: UserService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(UserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
```

## Troubleshooting

### Common Issues

1. **Module Not Found**: Check import paths and module declarations
2. **CORS Errors**: Configure CORS on the backend
3. **Build Errors**: Ensure all dependencies are installed
4. **Performance Issues**: Use Angular DevTools for profiling

### Getting Help

- Check the [GitHub Issues](https://github.com/jaqstack/jaqstack-angular/issues)
- Join our [Discord Community](https://discord.gg/jaqstack)
- Read the [Angular Documentation](https://angular.io/docs)

## Next Steps

- [Using Java](./01-using-java.md) - Backend development
- [Using NoSQL](./03-using-nosql.md) - Database integration
- [DevOps](./04-devops.md) - Deployment and operations
