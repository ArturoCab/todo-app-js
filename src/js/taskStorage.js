import { Task } from "./task";
import {Project} from "./project"

export class TaskStorage{
    #storage;
    #projects;
    #currentProject;


    constructor(){
        this.#storage=[];
        this.#projects=[];
        this.#currentProject=null;
    }

    addProject(project){
        this.#projects.push(project);
    }

    removeProject(projectId){
        const project=this.#projects.findIndex(p=>p.getId()==projectId);
        if(project<0){
            console.log(projectId, "wasn't found");
            return;
        }

        this.#projects.splice(project,1);
    }

    /**
     * @param {*} projectId 
     * @param {Object} p: changes
     * @returns null
     */
    editProject(projectId,p){
        const project=this.#projects.findIndex(p=>p.getId()==projectId);
        if(project<0){
            console.log(projectId, "wasn't found");
            return;
        }

        /**aqui van los cambios */

    }

    add(task){
        if(this.#currentProject===null){
            this.#currentProject=new Project();
            this.#projects.push(this.#currentProject);
        }
        this.#currentProject.addTask(task);
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

    save(){
        console.log("saving")
        console.log(this.#storage, JSON.stringify(this.#storage))
        localStorage.setItem("tasks",JSON.stringify(this.#storage));
        console.log("saved")
    }

    load(){
        console.log("loading...");
        const data = localStorage.getItem("tasks");

        if(!data) {
            console.log("no saved data")
            return;
        }

        const parsed = JSON.parse(data);
        this.#storage = parsed.map(t=>new Task(t));
        console.log(this.#storage)

        console.log("data loaded");

    }
};