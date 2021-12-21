import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TaskdashboardComponent } from './taskdashboard/taskdashboard.component';
import { AboutusComponent } from './aboutus/aboutus.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './shared/auth.guard';

const routes: Routes = [
  {path:'',redirectTo:'aboutus',pathMatch:'full'},
  {path:'taskdashboard',component:TaskdashboardComponent,canActivate:[AuthGuard]},
  {path:'aboutus',component:AboutusComponent},
  {path:'register',component:RegisterComponent},
  {path:'login',component:LoginComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
