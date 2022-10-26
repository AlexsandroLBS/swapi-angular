import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MenuComponent } from './menu/menu.component';
import { PeopleComponent } from './pages/people/people.component';
import { PlanetsComponent } from './pages/planets/planets.component';
import { SpeciesComponent } from './pages/species/species.component';
import { StarshipsComponent } from './pages/starships/starships.component';
import { VehiclesComponent } from './pages/vehicles/vehicles.component';

const routes: Routes = [
  {path: '', redirectTo: '/menu/films', pathMatch: 'full' },
  {path: 'menu/films',  component: MenuComponent},
  {path: 'menu/films/:id',  component: MenuComponent},
  {path: 'menu/starships', component: StarshipsComponent},
  {path: 'menu/starships/:id', component: StarshipsComponent},
  {path: 'menu/people', component: PeopleComponent},
  {path: 'menu/people/:id', component: PeopleComponent},
  {path: 'menu/vehicles', component: VehiclesComponent},
  {path: 'menu/vehicles/:id', component: VehiclesComponent},
  {path: 'menu/species', component: SpeciesComponent},
  {path: 'menu/species/:id', component: SpeciesComponent},
  {path: 'menu/planets', component:PlanetsComponent},
  {path: 'menu/planets/:id', component:PlanetsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
