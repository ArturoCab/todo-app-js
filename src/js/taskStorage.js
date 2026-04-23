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

    completeTask(id){
        this.editTask(id,{"completed":true})
    }

    editTask(id, t){
        console.log(id)
        console.table(this.getTasks());
        const task=this.#storage.find((x)=>x.getId()===id);
        if(!task){
            console.error("task",id,"not found");
            return;
        }
        console.log({task})
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
};