import { createAddProjectWidget } from './addProjectWidget';
import { createProjectList } from './display-project-list';
import { createHtmlElement } from 'dom-utils';

function createProjectPanel(projects){
    const projectsList = createProjectList(projects);
    const projectPanel = createHtmlElement({
        tag: "div",
        properties: {
            id: "project-panel",
        },
        children: [
            createAddProjectWidget().addProjectWidget,
            projectsList.projectListElement,
        ],
    });

    function updateProjectPanel(projects){
        projectsList.updateProjectsList(projects);
    }

    return { projectPanel, updateProjectPanel };
}

export { createProjectPanel }