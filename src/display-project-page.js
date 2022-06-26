import { createHtmlElement } from 'dom-utils';
import { createCollapsedNoteWidget } from './note-widget-collapsed';
import { EventEmitter }from 'event-emitter'
import './display-project-page.css';
import plusImage from './icons/plus-thick.png';

function createProjectPage(project){
    const events = EventEmitter;
    const _project = project;
    const projectElement = createHtmlElement({
        tag: "div",
        properties: {
            id: "project-panel",
        },
        children: [
            createHtmlElement({
                tag: "div",
                properties: {
                    id: "project-bar",
                },
                children: [
                    createHtmlElement({
                        tag: "h1",
                        classes: [ "project-name" ],
                        properties: {
                            textContent: _project.getName(),
                        },
                    }),
                    createHtmlElement({
                        tag: "div",
                        classes: [ "add-todo-button" ],
                        children: [
                            createHtmlElement({
                                tag: "img",
                                attributes: {
                                    src: plusImage,
                                },
                            }),
                        ],
                    }),
                ],
            }),
            createHtmlElement({
                tag: "div",
                classes: [ "todo-display-panel" ],
            }),
        ],
    });

    const addTodoButton = projectElement.querySelector(".add-todo-button");
    const displayPanel = projectElement.querySelector(".todo-display-panel");

    _project.getTodos().forEach( todo => displayPanel.appendChild(createCollapsedNoteWidget(todo).collapsedNoteWidgetElement) );
    addTodoButton.addEventListener("click", raiseEvent);
    
    function raiseEvent(e){
        events.raiseEvent("newTodo", _project); // pass the project to add a todo to
    }

    return projectElement;
}

export { createProjectPage }