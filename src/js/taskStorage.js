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

    toggleComplete(id){
        this.editTask(id,{"completed":true})
    }


    editTask(id, t){
        const task=this.#storage.find((x)=>x.getId()===id);
        if(!task){
            console.error("task",id,"not found");
            return;
        }
        
        if(t["title"])
            task.setTitle(t["title"]);
        if(t["description"])
            task.setDescription(t["description"]);
        if(t["priority"])
            task.setPriority(t["priority"]);
        if(t["dueDate"])
            task.setDueDate(t["dueDate"]);
        if(t["completed"])
            task.toggleCompleted();
        
    }

    removeTask(id){
        const task=this.#storage.findIndex((x)=>x.getId()===id);
        if(task<0){
            console.error("task",id,"not found");
            return;
        }
        this.#storage.splice(task,1);
        
    }
};