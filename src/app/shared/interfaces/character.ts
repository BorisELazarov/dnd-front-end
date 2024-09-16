import { DndClass } from "./dnd-class";
import { Proficiency } from "./proficiency";
import { Spell } from "./spell";
import { User } from "./user";

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
    proficiencies:Proficiency[],
    dndClass:DndClass,
    spells:Spell[]
}
