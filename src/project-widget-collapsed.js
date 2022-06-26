import { createHtmlElement } from "dom-utils";
import {EventEmitter} from 'event-emitter'
import './project-widget-collapsed.css';
import exclamation from './icons/exclamation-thick.svg';
import trash from './icons/trash-can-outline.svg';

function createCollapsedProjectWidget(project){
    const events = EventEmitter;
    const _project = project;
    const collapsedProjectElement = createHtmlElement({
        tag: "div",
        classes: [ "collapsed-project-widget" ],
        children: [
            createHtmlElement({
                tag: "p",
                classes: [ "project-name", "clickable" ],
                properties: {
                    textContent: _project.getName(),
                },
            }),
            createHtmlElement({
                tag: "button",
                classes: [ "delete-project-button", "clickable" ],
                children: [
                    createHtmlElement({
                        tag: "img",
                        attributes: {
                            src: trash,
                        },
                    }),
                ],
            }),
        ],
    });

    const _deleteButton = collapsedProjectElement.querySelector('.delete-project-button');
    const _projectButton = collapsedProjectElement.querySelector('.project-name');

    _projectButton.addEventListener("click", _projectClicked);
    _deleteButton.addEventListener("click", _deleteClicked);

    if (_project.hasPastDue()){
        collapsedProjectElement.insertBefore(createHtmlElement({
            tag: "img",
            attributes: {
                src: exclamation,
            },
        }), _deleteButton);
    }

    function _deleteClicked(){
        events.raiseEvent("deleteProject", _project);
    }

    function _projectClicked(){
        events.raiseEvent("displayProject", _project);
    }

    function getProjectName(){
        return _project.getName();
    }

    function getProjectTodos(){
        return _project.getTodos();
    }

    let collapsedProjectWidget = { collapsedProjectElement, getProjectName, getProjectTodos };
    return collapsedProjectWidget;
}

export { createCollapsedProjectWidget }