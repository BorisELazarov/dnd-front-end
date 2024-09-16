import { DndClass } from "../../../shared/interfaces/dnd-class";
import { Proficiency } from "../../../shared/interfaces/proficiency";
import { Spell } from "../../../shared/interfaces/spell";
import { User } from "../../../shared/interfaces/user";
import { CharacterProficiency } from "./character-proficiency";


export interface Character {
    name:string,
    user:User,
    level:number,
    strength:number,
    dexterity:number,
    constitution:number,
    intelligence:number,
    wisdom:number,
    charisma:number,
    proficiencies:CharacterProficiency[],
    dndClass:DndClass,
    spells:Spell[]
}
