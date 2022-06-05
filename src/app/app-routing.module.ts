import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChatComponentComponent } from './chat-component/chat-component.component';
import { StartComponentComponent } from './start-component/start-component.component';

const routes: Routes = [
  { path: '', component: StartComponentComponent },
  { path: 'chat', component: ChatComponentComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
