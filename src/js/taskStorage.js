export class TaskStorage{
    #storage;

    constructor(){
        this.#storage=[];
    }

    add(task){
        this.#storage.push(task);
    }

    getTasks(filter="All"){

        return this.#storage;
    }
};