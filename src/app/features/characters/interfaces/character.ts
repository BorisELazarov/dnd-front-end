import { DndClass } from "../../../shared/interfaces/dnd-class";
import { Proficiency } from "../../../shared/interfaces/proficiency";
import { Spell } from "../../../shared/interfaces/spell";
import { User } from "../../../shared/interfaces/user";
import { CharacterProficiency } from "./character-proficiency";


export interface Character {
    name:string,
    user:User,
    level:number,
    baseStr:number,
    baseDex:number,
    baseCon:number,
    baseInt:number,
    baseWis:number,
    baseCha:number,
    proficiencies:CharacterProficiency[],
    dndClass:DndClass,
    spells:Spell[]
}
