import { SocketIoConfig, SocketIoModule } from 'ngx-socket-io';
import { environment } from './../environments/environment';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StartComponentComponent } from './components/start-component/start-component.component';
import { ChatComponentComponent } from './components/chat-component/chat-component.component';
import { ChatService } from './services/chat.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { HttpClientModule } from '@angular/common/http';
import { TopBarComponentComponent } from './components/top-bar-component/top-bar-component.component';

const config: SocketIoConfig = {
  url: 'wss://socketio-chat-h9jt.herokuapp.com',
  options: {},
};

@NgModule({
  declarations: [AppComponent, StartComponentComponent, ChatComponentComponent, TopBarComponentComponent],
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
