import {View} from "./view.js"
import {Task} from "./task.js";
import {TaskStorage} from "./taskStorage.js";

export class App{

    addListeners(){
        const d = document.querySelector("#dynamic");
        d.addEventListener("click",e=>{
            e.preventDefault();
            const cls=e.target.classList;

            if(cls.contains('complete'))
                this.handleCompleteTask(e);
            if(cls.contains('edit'))
                this.handleEditTask(e);
            if(cls.contains('delete'))
                this.handleRemoveTask(e);
        });
    }


    constructor(){

        View.bindAddTask(this.handleAddTask.bind(this));
        this.taskStorage=new TaskStorage();
        this.addListeners();
    }

    handleAddTask(){
        let test=true;
        const {title,description,priority,dueDate} = View.getInputs();
        

        if(!title && !test){
            console.error("need title");
            return;
        }

        //if date is null, then set it to next monday. 
        let t;
        if(dueDate==''){
            t=new Date();
            
            t=new Date(t.getFullYear(), t.getMonth(), t.getDate()+(7-t.getDay()+1))
            
            t.setHours(0,0,0)
            
        }else{
            t=dueDate.split("-");
            t=new Date(t[0],t[1]-1,t[2]);
        }
        
        const task = new Task(
            title,
            description,
            priority===''?"P4":priority,
            t);
        
        this.taskStorage.add(task);
        View.renderTask(task)
        View.clearModal();
        //View.displayModal();
    }

    handleEditTask(e){
        console.log("handle edit")
        const id=e.target.attributes["data-id"].value;
        //fill modal

        const tasks = this.taskStorage.getTasks();
        const task = tasks.find(t=> t.getId() ==id);

        if(!task){
            console.error("task not found");
            return;
        }

        View.fillModal(task);

        

        View.displayTasks(tasks);
        //console.log("edited", id, updates);        
    }

    handleRemoveTask(e){
        console.log("handle remove");
        this.taskStorage.removeTask(e.target.attributes["data-id"].value);
        View.displayTasks(this.taskStorage.getTasks())
        
        

    }

    handleCompleteTask(e){
        
        const row=e.target.parentElement.parentElement;

        this.taskStorage.toggleComplete(e.target.attributes["data-id"].value);

        View.displayTasks(this.taskStorage.getTasks());

    }

    static initApp(){
        const app = new App();
        window.app=app;
    }

}


window.debug={
    add(data={}){
        const defaultData= {
            title: "test",
            description: "debug task",
            prioirty: "P4",
            dueDate: new Date()
        };

        const final={...defaultData, ...data};

        const task = new Task(
            final.title,
            final.description,
            final.prioirty,
            final.dueDate
        );

        app.taskStorage.add(task);
        View.displayTasks(app.taskStorage.getTasks());

        console.log("task added", task);
    },
    list(){
        const tasks = app.taskStorage.getTasks();
        console.table(tasks.map(t=>({
            id: t.getId(),
            complted: t.getCompleted(),
            title: t.getTitle(),
            prioirty: t.getPriority(),
            dueDate: t.getDueDate()
        })));
    },

    remove(id){
        app.taskStorage.remove(id);
        View.displayTasks(app.taskStorage.getTasks());
        console.log("removed",id);
    },

    complete(id){
        app.taskStorage.toggleComplete(id);
        View.displayTasks(app.taskStorage.getTasks());
        console.log("toggled",id);
    },

    edit(id, updates={}){
        const tasks = app.taskStorage.getTasks();
        const task = tasks.find(t=> t.getId() ==id);

        if(!tasks){
            console.error("task not found");
            return;
        }

        if (updates.title) task.setTitle(updates.title);
        if (updates.description) task.setDescription(updates.description);
        if (updates.priority) task.setPriority(updates.priority);
        if (updates.dueDate) task.setDueDate(updates.dueDate);

        View.displayTasks(tasks);
        console.log("edited", id, updates);
    },

    clear(){
        app.taskStorage.clear?.();
        View.displayTasks([]);
        console.log("all tasks cleared");
    },
    last() {
        const tasks = app.taskStorage.getTasks();
        return tasks[tasks.length - 1]?.getId();
    }
}