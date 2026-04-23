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

    handleEditTask(){
        console.log("handle edit")
    }
    handleRemoveTask(){
        console.log("handle remove")
    }

    handleCompleteTask(e){
        
        const row=e.target.parentElement.parentElement;
        
        if(!row.classList.contains('completed')){
            row.classList.add('completed');
            e.target.textContent="✗";
        }else{
            row.classList.remove('completed');
            e.target.textContent="✔";
        }

        this.taskStorage.completeTask(e.target.attributes["data-id"].value);

    }

    static initApp(){
        new App();


    }

}