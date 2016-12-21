import { HistoryComponent } from './history/history.component';
import { HistoryMonthlyComponent } from './history-monthly/history-monthly.component';
import { AccountComponent } from './account.component';
import { EditAccountComponent } from './edit-account/edit-account.component';

import { Routes } from '@angular/router';
import { LoginGuardService } from './login-guard.service';

export const accountRoutes: Routes = [
    {
        path: 'account', component: AccountComponent,

        children: [
            {
                path: '', component: HistoryComponent, canActivate: [LoginGuardService]
            },
            {
                path: 'subscriptions', component: HistoryMonthlyComponent, canActivate: [LoginGuardService]
            },
            {
                path: 'edit', component: EditAccountComponent, canActivate: [LoginGuardService]
            }
        ]

    },

];
