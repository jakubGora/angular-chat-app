import { TopBarComponentComponent } from './components/top-bar-component/top-bar-component.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChatComponentComponent } from './components/chat-component/chat-component.component';
import { StartComponentComponent } from './components/start-component/start-component.component';
import { ChatFormComponentComponent } from './components/chat-form-component/chat-form-component.component';
const routes: Routes = [
  { path: '', component: StartComponentComponent },
  { path: 'chat', component: ChatComponentComponent },
  { path: 'form', component: ChatFormComponentComponent },
  { path: 'top', component: TopBarComponentComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
