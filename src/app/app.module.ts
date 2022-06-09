import { SocketIoConfig, SocketIoModule } from 'ngx-socket-io';
import { environment } from './../environments/environment';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StartComponent } from './components/start-component/start.component';
import { ChatComponent } from './components/chat-component/chat.component';
import { ChatService } from './services/chat.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { HttpClientModule } from '@angular/common/http';
import { ChatTopBarComponent } from './components/chat-component/chat-top-bar-component/chat-top-bar.component';
import { ChatFormComponent } from './components/chat-component/chat-form-component/chat-form.component';

const config: SocketIoConfig = {
  url: environment.socketUrl,
};

@NgModule({
  declarations: [
    AppComponent,
    StartComponent,
    ChatComponent,
    ChatTopBarComponent,
    ChatFormComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    FormsModule,
    HttpClientModule,
    SocketIoModule.forRoot(config),
  ],
  providers: [ChatService],
  bootstrap: [AppComponent],
})
export class AppModule {}
