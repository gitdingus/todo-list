import { EventEmitter } from 'event-emitter';
import { createNavWidget } from './nav-widget.js';
import { createProjectPanel } from './projects-panel';
import { ProjectsList } from './projects';
import { createProjectPage } from './display-project-page';
import { createNewTodoForm } from './new-todo-form';
import { displayTodoElement } from './display-todo';
import { createTodo } from './todo';
import './main.css';

const events = EventEmitter;
const projects = ProjectsList();
//loadTestData();
let activeProject;

const navWidgetDiv = document.querySelector("#nav-widget-div");
const navWidget = createNavWidget();
const mainContent = document.querySelector("#main-content");
let projectPanel;

//  mainContent.appendChild(createNewTodoForm());

//  events.addEvent("saveTodo", saveTodo);
//  events.addEvent("deleteTodo", (note) => console.log("Delete: " + note.getTitle()));
//  events.addEvent("todoClicked", (note) => console.log("Click: " + note.getTitle()));

//  function saveTodo(newTodo){
//     mainContent.appendChild(createCollapsedNoteWidget(newTodo).collapsedNoteWidgetElement);
//  }





events.addEvent("addProject", addProject);
events.addEvent("deleteProject", deleteProject);
events.addEvent("deleteTodo", deleteTodo);
events.addEvent("displayProject", displayProject);
events.addEvent("displayTodo", displayTodo);
events.addEvent("newTodo", displayNewTodoPage);
events.addEvent("saveTodo", saveTodo);
events.addEvent("openTodoForEditing", openTodoForEditing);
events.addEvent("editTodo", editTodo);
events.addEvent("deleteTodo", deleteTodo);
events.addEvent("closeTodo", closeTodo);
window.addEventListener("DOMContentLoaded", loadData);
window.addEventListener("beforeunload", saveData);

function addProject(project){
    projects.addProject(project);
    projectPanel.updateProjectPanel(projects.getProjects());
}

function deleteProject(project){
    projects.removeProject(project);
    projectPanel.updateProjectPanel(projects.getProjects());
}

function deleteTodo(todo){
   console.log("deleteTodo was called");
   activeProject.removeTodo(todo.getTitle());

   displayProject(activeProject);
}

function displayProject(project){
   clearMainContent();

   const projectPage = createProjectPage(project);

   activeProject = project;
   mainContent.appendChild(projectPage);

   navWidget.addToNavBar("project", project.getName(), createProjectPage(activeProject));
   // navWidget.setActiveProject(activeProject);
   // navWidget.updateNav();

}

function displayTodo(todo){
   clearMainContent();
   let div = displayTodoElement(todo);
   mainContent.appendChild(div);
   navWidget.addToNavBar("todo", todo.getTitle(), div);
}

function closeTodo(){
   displayProject(activeProject);
}

function openTodoForEditing(todo){
   clearMainContent();
   const editTodoDiv = createNewTodoForm(todo);
   mainContent.appendChild(editTodoDiv);
   navWidget.addToNavBar("edit", "Editing: " + todo.getTitle(), editTodoDiv);
}

function editTodo(oldTodo, newTodo){
   oldTodo.setTitle(newTodo.getTitle());
   oldTodo.setDescription(newTodo.getDescription());
   oldTodo.setPriority(newTodo.getPriority());
   oldTodo.setNotes(newTodo.getNotes());
   oldTodo.setChecklist(newTodo.getChecklist());
   oldTodo.setDueDate(newTodo.getDueDate());

   clearMainContent();
   displayTodo(oldTodo);
}

function displayNewTodoPage(){
   clearMainContent();
   let newTodoForm = createNewTodoForm();

   navWidget.addToNavBar("create", "Create Todo in: " + activeProject.getName(), newTodoForm);
   mainContent.appendChild(newTodoForm);
}

function saveTodo(newTodo){
   clearMainContent();
   activeProject.addTodo(newTodo);
   displayProject(activeProject);

}

function clearMainContent(){
   while(mainContent.firstChild){
      mainContent.removeChild(mainContent.firstChild);
   }
}

function loadTestData(){
   let one = projects.addProject("project one");
   let two = projects.addProject("project 2");

   let todos = [
      createTodo('one tood'),
      createTodo(' second todo'),
      createTodo('third todo'),
      createTodo('fourth todo'),
      createTodo('fifth todo'),
   ];
   one.addTodos(todos);

   let secondTodos = [
      createTodo('another one tood'),
      createTodo(' this is a second todo'),
      createTodo(' and a thirdthird todo'),
      createTodo('fourth todo? no way'),
      createTodo('fifth todo, rock on'),
   ];

   two.addTodos(secondTodos);


}

function loadData(){
   const ds = window.localStorage;
   const projectsData = JSON.parse(ds.getItem("projectsData"));

console.log(projectsData);
   if (projectsData !== null){
      for ( let i = 0; i < projectsData.length; i++){
         let newProject = projects.addProject(projectsData[i].name);

         for ( let j = 0; j < projectsData[i].todos.length; j++ ){
            let newTodo = createTodo(
                              projectsData[i].todos[j].title,
                              projectsData[i].todos[j].description,
                              new Date(projectsData[i].todos[j].dueDate),
                              projectsData[i].todos[j].priority
            );

            newTodo.setNotes(projectsData[i].todos[j].notes);
            newTodo.setChecklist(projectsData[i].todos[j].checklist);
            newProject.addTodo(newTodo);
         }


      }
   }

   loadPage();

}

function saveData(){
   // ds stands for dataStorage
   const ds = window.localStorage;
console.log("saving data");
   ds.setItem("projectsData", JSON.stringify(projects.getProjectsData()));
console.log(ds.getItem("projectsData"));
alert("check console");
}

function loadPage(){

   projectPanel = createProjectPanel(projects.getProjects());
navWidget.initializeNavBar("projects", "projects", projectPanel.projectPanel);

mainContent.appendChild(projectPanel.projectPanel);

}