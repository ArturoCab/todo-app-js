import { Task } from "./task";

export class Project{
    #id;
    #name;
    #tasks;

    constructor(obj){
        this.#id=crypto.randomUUID()
        this.#name=obj.name;
        this.#tasks=[];
    }

    modifyProject(obj){
        this.#id=obj.id;
        this.#name=obj.name;
    }

    addTask(t){
        this.#tasks.push(t);
    }

    removeTask(id){}

    modifyTask(id,t){}

    getTasks(){
        return this.#tasks;
    }

    toggleComplete(id){
        this.modifyTask(id,{})
    }
    
}