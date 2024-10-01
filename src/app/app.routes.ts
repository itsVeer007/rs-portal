import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { ForgotPasswordComponent } from './auth/forgot-password/forgot-password.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LiveViewComponent } from './nav/live-view/live-view.component';
import { AdvertisementsComponent } from './nav/advertisements/advertisements.component';
import { ServiceRequestsComponent } from './nav/service-requests/service-requests.component';
import { AlertsComponent } from './nav/alerts/alerts.component';

export const routes: Routes = [
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'forgot-password',
        component: ForgotPasswordComponent
    },
    {
        path: 'dashboard',
        component: DashboardComponent,
        children: [
            {
                path: 'live-view',
                component:LiveViewComponent
            },
            {
                path: 'advertisements',
                component: AdvertisementsComponent
            },
            {
                path: 'service-requests',
                component: ServiceRequestsComponent
            },
            {
                path: 'alerts',
                component: AlertsComponent
            },
            {
                path: '',
                redirectTo: '/dashboard/live-view',
                pathMatch: 'full'
            }
        ]
    },
    {
        path: '',
        redirectTo: '/login',
        pathMatch: 'full'
    }
    
];
