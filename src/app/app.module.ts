import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StartComponentComponent } from './start-component/start-component.component';
import { ChatComponentComponent } from './chat-component/chat-component.component';

@NgModule({
  declarations: [AppComponent, StartComponentComponent, ChatComponentComponent],
  imports: [BrowserModule, AppRoutingModule, ReactiveFormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
