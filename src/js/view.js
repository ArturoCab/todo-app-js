export class View{
    static displayModal(){
        const modal = document.querySelector(".modal");
        modal.classList.toggle('is-active');
    }

    static getInputs(){
        const inputs=document.querySelectorAll('.new-task-input');

        console.log(inputs[2]);
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
        const dynamic = document.querySelector("#dynamic");
        dynamic.innerHTML=``;
        tasks.forEach(e => {
            const div = document.createElement("div");
            div.classList.add("row")
            let id= e.getId()
            div.innerHTML=`
                <div>${id}</div>
                <div>${e.getTitle()}</div>
                <div>${e.getDescription()}</div>
                <div>${e.getPriority()}</div>
                <div>${e.getDueDate()}</div>
                <div>
                    <button class="complete" data-id="${id}">✔</button>
                    <button class="edit" data-id="${id}">✏</button>
                    <button class="delete" data-id="${id}">🗑</button>
                </div>
                `;
                dynamic.appendChild(div);
        });

    }
    
}