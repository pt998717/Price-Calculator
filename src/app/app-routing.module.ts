import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ShellComponent } from './shell/shell.component';
import { CalComponent } from './feature/catVac/catVac.component';
import { BomComponent } from './feature/bom/bom.component';
const routes: Routes = [
    {
        path: '', component: ShellComponent,
        children: [
            {
                path: 'hospital',
                loadChildren: () => import('./')

            }
        ]

    },
    { path: 'feature/cal', component: CalComponent },
    { path: 'feature/bom', component: BomComponent }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
