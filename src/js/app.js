import {View} from "./view.js"
import {Task} from "./task.js";
import {TaskStorage} from "./taskStorage.js";

export class App{

    constructor(){
        View.bindAddTask(this.handleAddTask.bind(this));
        this.taskStorage=new TaskStorage();
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
        View.displayTasks(this.taskStorage.getTasks())
        View.clearModal();
        //View.displayModal();
    }

    handleRemoveTask(){

    }

    handleCompleteTask(){

    }

    static initApp(){
        new App();
    }

}