import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { AuthService } from './shared/services/auth.service';
import { SignupComponent } from './signup/signup.component';
import { TodoComponent } from './todo/todo.component';
import { TodoService } from './shared/services/todo.service';
import { IsLoggedInGuard } from './shared/guards/is-logged-in.guard';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    TodoComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    AppRoutingModule
  ],
  providers: [AuthService, TodoService, IsLoggedInGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
