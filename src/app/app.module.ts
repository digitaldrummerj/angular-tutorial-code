import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { AuthService } from './shared/services/auth.service';
import { SignupComponent } from './signup/signup.component';
import { TodoComponent } from './todo/todo.component';
import { TodoService } from './shared/services/todo.service';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faTrashAlt, faSquare, faCheckSquare } from '@fortawesome/free-regular-svg-icons';
import { IsLoggedInGuard } from './shared/guards/is-logged-in.guard';
import { NotFoundComponent } from './not-found/not-found.component';
import { HeaderComponent } from './shared/header/header.component';
import { FooterComponent } from './shared/footer/footer.component';
import { CookieModule } from 'ngx-cookie';

library.add(faTrashAlt, faCheckSquare, faSquare);

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    TodoComponent,
    NotFoundComponent,
    HeaderComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    CookieModule.forRoot(),
    NgbModule.forRoot(),
    FontAwesomeModule,
  ],
  providers: [AuthService, TodoService, IsLoggedInGuard],
  bootstrap: [AppComponent]
})
export class AppModule {}
