import { createHtmlElement } from 'dom-utils';
import { createProjectPanel } from './projects-panel';
import { createProjectPage } from './display-project-page';
import './nav-widget.css';

function createNavWidget(){
    const mainContent = document.querySelector("#main-content");
    const navWidget = document.querySelector("#nav-widget-div");

    const _projects = { };
    const _project = {  };
    const _todo = {};
    // const todo = {type: "todo", createDiv: , todo:};
    

    function setProjectsPage(div){
        _projects.div = div;
    }

    function setActiveProject(project){
        if (project){
            _project.project = project;
        }

    }

    function setActiveTodo(todo){
        if (todo){
            _todo.todo = todo;
        }

    }

    function getNavElement(level, text){
        const element = createHtmlElement({
            tag: "p",
            properties: {
                id: level,
                textContent: text,
            },
        });

        element.addEventListener("click", navItemClicked);

        return element;
    }

    function getArrow(){
        const arrow = createHtmlElement({
            tag: "p",
            properties: {
                textContent: ">",
            },
        });

        return arrow;
    }

    function clearNav(){
        while (navWidget.firstChild){
            navWidget.firstChild.remove();
        }
    }

    function clearMainContent(){
        while (mainContent.firstChild){
            mainContent.firstChild.remove();
        }
    }

    function updateNav(){
        clearNav();

        navWidget.appendChild(getNavElement("projects", "projects"));
console.log(_project.project);
console.log(_project.project == true);
        if (!isEmpty(_project.project)){
            navWidget.appendChild(getArrow());
            navWidget.appendChild(getNavElement("project", _project.project.getName()));
        }
        
    }

    function navItemClicked(e){
        console.log(e.target.id);
        if (e.target.id === "projects"){
            console.log("clicked projects");
            setActiveTodo({});
            setActiveProject({});
            clearMainContent();
            mainContent.appendChild(_projects.div);

        }

        if (e.target.id === "project"){
            console.log("clicked project");
            setActiveTodo({});
            setActiveProject(_project.project);
            clearMainContent();
            mainContent.appendChild(createProjectPage(_project.project));
        }

        updateNav();

    }

    function isEmpty(object){
        for (let i in object ){
            return false;
        }

        return true;
    }

    function getActiveProject(){
        return _project.project;
    }

    return {
        navWidget, 
        updateNav,
        setActiveProject, 
        setProjectsPage,
        getActiveProject 
    }
}


export { createNavWidget };