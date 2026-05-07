export class Task{
    #id;
    #title;
    #description;
    #priority;
    #dueDate;
    #completed;
    /*$asignedTo;
    $comments;
    $state;
    $openDate;
    $openedBy;
    $closedBy;*/

    constructor(titleOrObj, description="", priority="P4", dueDate=new Date()){
        if(typeof titleOrObj==="object"){
            const obj = titleOrObj;
            this.#id=obj.id;
            this.#title=obj.title;
            this.#description=obj.description;
            this.#priority=obj.priority;
            this.#dueDate=new Date(obj.dueDate);
            this.#completed=obj.completed??false;
            return;
        }
        this.#id=crypto.randomUUID();
        this.#title=titleOrObj;
        this.#description=description;
        this.#priority=priority;
        this.#dueDate=dueDate;
        this.#completed=false;
    }

    getId(){
        return this.#id;
    }

    getTitle(){
        return this.#title;
    }

    setTitle(value){
        this.#title=value;
    }
    getCompleted(){
        return this.#completed;
    }
    getDescription(){
        return this.#description;
    }

    getPriority(){
        return this.#priority;
    }
    setPriority(value){
        this.#priority=value;
    }

    getDueDate(){
        return this.#dueDate;
    }
    toggleCompleted(){
        this.#completed=!this.#completed;
    }

    isCompleted(){
        return this.#completed;
    }

    toJSON(){
        return{
            id:this.#id,
            title:this.#title,
            description: this.#description,
            priority: this.#priority,
            dueDate: this.#dueDate,
            completed: this.#completed
        };
    }
}

