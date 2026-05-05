export class View{
    static displayModal(){
        const modal = document.querySelector(".modal");
        modal.classList.toggle('is-active');
    }

    static getInputs(){
        const inputs=document.querySelectorAll('.new-task-input');

        return {
            title: inputs[0].value, 
            description:inputs[1].value, 
            priority:inputs[2].value, 
            dueDate:inputs[3].value}
    }

    static fillModal(task){

        console.log("View.fillModal")
        console.log({task});
        const inputs=document.querySelectorAll('.new-task-input');
        inputs[0].value= task.getTitle();
        inputs[1].value=task.getDescription();
        inputs[2].value=task.getPriority();
        inputs[3].value=task.getDueDate();
        const [year,month,day] = [task.getDueDate().getFullYear(), 
                                  ("0"+(task.getDueDate().getMonth()+1)).slice(-2),
                                  ("0"+task.getDueDate().getDate()).slice(-2)]
        let date=year+"-"+month+"-"+day;
        console.log(date);
        inputs[3].value=date;

        //if (updates.description) task.setDescription(updates.description);
        //if (updates.priority) task.setPriority(updates.priority);
        //if (updates.dueDate) task.setDueDate(updates.dueDate);
    }

    static clearModal(){
        const inputs=document.querySelectorAll('.new-task-input');
        inputs.forEach(e=>{
            e.value="";
        });
    }

    static bindAddTask(handler){
        const f=document.querySelector("form");
        
        f.addEventListener("submit",(event)=>{
            event.preventDefault();
            handler();
            
        })
    }

    static renderTask(task){
        const id=task.getId();
        const dynamic = document.querySelector("#dynamic");
        const row = document.createElement('div');
        row.classList.add("row");
        row.innerHTML=`
            <div>${id}</div>
            <div>${task.getTitle()}</div>
            <div>${task.getDescription()}</div>
            <div>${task.getPriority()}</div>
            <div>${task.getDueDate()}</div>
            <div>
                <button class="complete" data-id="${id}">✔</button>
                <button class="edit" data-id="${id}">✏</button>
                <button class="delete" data-id="${id}">🗑</button>
            </div>
            `;
        dynamic.appendChild(row);
    }

    static displayTasks(tasks){
        const dynamic = document.querySelector("#dynamic");
        dynamic.innerHTML=``;
        tasks.forEach(task => {
                const row = this.createTaskElement(task);
                dynamic.appendChild(row);
        });
    }

    static createTaskElement(task){
        
        const div = document.createElement("div");
        div.classList.add("row");

        if(task.isCompleted()){
            div.classList.add("completed");
        }
        
        div.innerHTML=`
            <div>${task.getId()}</div>
            <div>${task.getTitle()}</div>
            <div>${task.getDescription()}</div>
            <div>${task.getPriority()}</div>
            <div>${task.getDueDate()}</div>
            <div>
                <button class="complete" data-id="${task.getId()}">${task.isCompleted() ? "✗" : "✔"}</button>
                <button class="edit" data-id="${task.getId()}">✏</button>
                <button class="delete" data-id="${task.getId()}">🗑</button>
            </div>
            `;
        return div;

    }
    
}