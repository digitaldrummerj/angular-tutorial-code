import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { LoginComponent } from './login/login.component';
import { AuthService } from './shared/services/auth.service';
import { SignupComponent } from './signup/signup.component';
import { TodoComponent } from './todo/todo.component';
import { TodoService } from './shared/services/todo.service';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faTrashAlt, faSquare, faCheckSquare } from '@fortawesome/free-regular-svg-icons';

library.add(faTrashAlt, faCheckSquare, faSquare);

@NgModule({
  declarations: [AppComponent, LoginComponent, SignupComponent, TodoComponent],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    FontAwesomeModule,
    CollapseModule.forRoot(),
    BrowserAnimationsModule,
    AppRoutingModule,
    NgbModule.forRoot(),
    FontAwesomeModule,
  ],
  providers: [AuthService, TodoService],
  bootstrap: [AppComponent],
})
export class AppModule {}
