import { Routes } from "@angular/router";
import { ClassCreateComponent } from "./features/classes/class-create/class-create.component";
import { ClassDeletedListComponent } from "./features/classes/class-deleted-list/class-deleted-list.component";
import { ClassDetailsComponent } from "./features/classes/class-details/class-details.component";
import { ClassEditComponent } from "./features/classes/class-edit/class-edit.component";
import { ClassListComponent } from "./features/classes/class-list/class-list.component";
import { CreateProficiencyComponent } from "./features/proficiencies/create-proficiency/create-proficiency.component";
import { EditProficiencyComponent } from "./features/proficiencies/edit-proficiency/edit-proficiency.component";
import { ProficiencyDeletedListComponent } from "./features/proficiencies/proficiency-deleted-list/proficiency-deleted-list.component";
import { ProficiencyDetailsComponent } from "./features/proficiencies/proficiency-details/proficiency-details.component";
import { ProficiencyListComponent } from "./features/proficiencies/proficiency-list/proficiency-list.component";
import { SpellListComponent } from "./features/spells/spell-list/spell-list.component";


export const routes: Routes = [
    {
        path:'proficiencies',
        component:ProficiencyListComponent,
        title:'Proficiency list'
    },
    {
        path:'proficiencies/deleted',
        component:ProficiencyDeletedListComponent,
        title:'Deleted proficiency list'
    },
    {
        path:'proficiencies/create',
        component:CreateProficiencyComponent,
        title:'Create proficiency'
    },
    {
        path:'proficiencies/edit/:id',
        component:EditProficiencyComponent,
        title:'Save proficiency'
    },
    {
        path:'proficiencies/:id',
        component:ProficiencyDetailsComponent,
        title:'Proficiency details'
    },
    {
        path:'classes',
        component:ClassListComponent,
        title:'Class list'
    },
    {
        path:'classes/deleted',
        component:ClassDeletedListComponent,
        title:'Deleted class list'
    },
    {
        path:'classes/create',
        component:ClassCreateComponent,
        title:'Create class'
    },
    {
        path:'classes/edit/:id',
        component:ClassEditComponent,
        title:'Save class'
    },
    {
        path:'classes/:id',
        component:ClassDetailsComponent,
        title:'Class details'
    },
    {
        path:'spells',
        component:SpellListComponent,
        title:'Spell list'
    }
];
