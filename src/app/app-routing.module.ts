import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ShellComponent } from './shell/shell.component';

const routes: Routes = [
    {
        path: '', component: ShellComponent,
        children: [
            {
                path: 'hospital',
                loadChildren: () => import('./feature/hospital/hospital.module').then(m => m.HospitalModule)

            },
            {
                path: '',
                redirectTo: 'hospital',
                pathMatch: 'full',

            }
        ]

    },
];

@NgModule({
    imports: [
        RouterModule.forRoot(
            routes,
            {
                useHash: true,
                onSameUrlNavigation: 'reload'
            }
        )],
    exports: [RouterModule]
})
export class AppRoutingModule { }
