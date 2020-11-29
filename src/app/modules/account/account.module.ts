import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { CommonModule } from '@angular/common';

import { AccountRoutingModule } from './account-routing.module';
import { LayoutComponent } from './layout.component';
import { LoginComponent } from './login.component';
import { RegisterComponent } from './register.component';

@NgModule({
    imports: [
        CommonModule,
        SharedModule,
        AccountRoutingModule
    ],
    declarations: [
        LayoutComponent,
        LoginComponent,
        RegisterComponent
    ]
})
export class AccountModule { }