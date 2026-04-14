import {App} from './js/app.js'; //this is the controller
import './style.css';

App.initApp();

const newTask=document.querySelector("#newTask");
const modal=document.querySelector(".modal");

newTask.addEventListener("click",(event)=>{
    event.preventDefault();
    modal.classList.toggle("is-active")
})