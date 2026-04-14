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

    static displayTasks(tasks){
        tasks.forEach(element => {
            console.log(
                element.getId(),
                element.getTitle(), 
                element.getDescription(),
                element.getPriority(),
                element.getDueDate()
            );

        });
    }
    
}