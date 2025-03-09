import { Routes } from '@angular/router';
import { PocketDexComponent } from './pocket-dex/pocket-dex.component';
import { TypeComponent } from './type/type.component';
import { AbilitieComponent } from './abilitie/abilitie.component';

export const routes: Routes = [
    {path: '', component: PocketDexComponent},
    {path: 'type', component: TypeComponent},
    {path: 'abilitie', component: AbilitieComponent}
];
