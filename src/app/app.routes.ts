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
import { SpellDetailsComponent } from "./features/spells/spell-details/spell-details.component";
import { SpellCreateComponent } from "./features/spells/spell-create/spell-create.component";
import { SpellEditComponent } from "./features/spells/spell-edit/spell-edit.component";
import { SpellDeletedListComponent } from "./features/spells/spell-deleted-list/spell-deleted-list.component";
import { CharacterListComponent } from "./features/characters/character-list/character-list.component";
import { CharacterCreationComponent } from "./features/characters/character-creation/character-creation.component";


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
    },
    {
        path:'spells/deleted',
        component:SpellDeletedListComponent,
        title:'Spell list'
    },
    {
        path:'spells/create',
        component:SpellCreateComponent,
        title:'Create spell'
    },
    {
        path:'spells/edit/:id',
        component:SpellEditComponent,
        title:'Save spell'
    },
    {
        path:'spells/:id',
        component:SpellDetailsComponent,
        title:'Spell details'
    },
    {
        path:'characters/create',
        component:CharacterCreationComponent,
        title:'Create your character'
    },
    {
        path:'characters/:id',
        component:CharacterListComponent,
        title:'Characters'
    }
];
