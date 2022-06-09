import { ChatTopBarComponent } from './components/chat-component/chat-top-bar-component/chat-top-bar.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChatComponent } from './components/chat-component/chat.component';
import { StartComponent } from './components/start-component/start.component';
import { ChatFormComponent } from './components/chat-component/chat-form-component/chat-form.component';
const routes: Routes = [
  { path: '', component: StartComponent },
  { path: 'chat', component: ChatComponent },
  { path: 'form', component: ChatFormComponent },
  { path: 'top', component: ChatTopBarComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
