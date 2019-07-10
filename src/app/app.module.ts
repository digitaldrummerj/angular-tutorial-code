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
import { GreetingService } from './shared/services/greeting.service';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faTrashAlt, faSquare, faCheckSquare } from '@fortawesome/free-regular-svg-icons';
import { IsLoggedInGuard } from './shared/guards/is-logged-in.guard';
import { NotFoundComponent } from './not-found/not-found.component';
import { HeaderComponent } from './shared/header/header.component';
import { FooterComponent } from './shared/footer/footer.component';
import { CookieModule } from 'ngx-cookie';
import { ItemTextPipe } from './shared/pipe/item-text.pipe';
import { SimpleComponent } from './simple/simple.component';
import { SimpleComponentWithServiceComponent } from './simple-component-with-service/simple-component-with-service.component';
import { DatePipe } from '@angular/common';

library.add(faTrashAlt, faCheckSquare, faSquare);

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    TodoComponent,
    ItemTextPipe,
    NotFoundComponent,
    HeaderComponent,
    FooterComponent,
    SimpleComponent,
    SimpleComponentWithServiceComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    FontAwesomeModule,
    CollapseModule.forRoot(),
    BrowserAnimationsModule,
    CookieModule.forRoot(),
    AppRoutingModule,
  ],
  providers: [DatePipe, AuthService, TodoService, IsLoggedInGuard, GreetingService],
  bootstrap: [AppComponent]
})
export class AppModule {}
