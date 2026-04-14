function* foo(){
    let i=1;
    while(i+1<Infinity){
        yield i;
        i++;
    }
}

const Gen=foo();

export class Task{
    #id;
    #title;
    #description;
    #priority;
    #dueDate;
    /*$asignedTo;
    $comments;
    $state;
    $openDate;
    $openedBy;
    $closedBy;*/

    constructor(title, description="", priority="P4", dueDate=new Date()){
        this.#id="TASK"+Gen.next().value;
        this.#title=title;
        this.#description=description;
        this.#priority=priority;
        this.#dueDate=dueDate;
    }

    getId(){
        return this.#id;
    }

    getTitle(){
        return this.#title;
    }

    getDescription(){
        return this.#description;
    }

    getPriority(){
        return this.#priority;
    }

    getDueDate(){
        return this.#dueDate;
    }
}

