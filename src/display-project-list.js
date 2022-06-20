import { createHtmlElement } from 'dom-utils';
import { createCollapsedProjectWidget } from './project-widget-collapsed';

const createProjectList(projects){
    const projectListElement = createHtmlElement({
        tag: "div",
        classes: [ "project-list" ],

    });

    projects.forEach( project => addProjectToList(project));

    function addProjectToList(project){
        let newProject = createCollapsedProjectWidget(project);
        projectListElement.appendChild(newProject);
    }

    return projectListElement;

}

export {createProjectList}