import { createHtmlElement } from 'dom-utils';
import { createCollapsedProjectWidget } from './project-widget-collapsed';

const createProjectList = function (projects){

    const projectListElement = createHtmlElement({
        tag: "div",
        classes: [ "project-list" ],

    });

    populateProjectsList(projects);

    function populateProjectsList(projects){
        projects = projects || [];

        projects.forEach( project =>{
                addProjectToList(project);
            }
        );
    }
    function addProjectToList(project){
        let newProject = createCollapsedProjectWidget(project).collapsedProjectElement;
        projectListElement.appendChild(newProject);
    }

    function updateProjectsList(projects) {
        _clearProjectPanel();
        populateProjectsList(projects);
    }

    function _clearProjectPanel(){
        while (projectListElement.firstChild){
            projectListElement.removeChild(projectListElement.firstChild);
        }
    }

    return { projectListElement, updateProjectsList } ;

}

export {createProjectList}