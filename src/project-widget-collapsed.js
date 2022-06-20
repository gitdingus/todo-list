import { createHtmlElement } from "dom-utils";
import './project-widget-collapsed.css';
import exclamation from './icons/exclamation-thick.svg';
import trash from './icons/trash-can-outline.svg';

function createCollapsedProjectWidget(project){
    const _project = project;
    const collapsedProjectElement = createHtmlElement({
        tag: "div",
        classes: [ "collapsed-project-widget" ],
        children: [
            createHtmlElement({
                tag: "p",
                classes: [ "project-name" ],
                properties: {
                    textContent: _project.getName(),
                },
            }),
            createHtmlElement({
                tag: "button",
                classes: [ "delete-project-button" ],
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

    const _deleteButtonEvents = [];
    const _deleteButton = collapsedProjectElement.querySelector('.delete-project-button');

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
        _deleteButtonEvents.forEach( fn => fn(collapsedProjectWidget));
    }

    function addDeleteEvent(fn){
        _deleteButtonEvents.push(fn);
    }

    function getProjectName(){
        return _project.getName();
    }

    function getProjectTodos(){
        return _project.getTodos();
    }

    let collapsedProjectWidget = { collapsedProjectElement, getProjectName, getProjectTodos, addDeleteEvent };
    return collapsedProjectWidget;
}

export { createCollapsedProjectWidget }