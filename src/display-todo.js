import { EventEmitter } from 'event-emitter';
import displayContents from './display-todo.html';
import './display-todo.css';
import {createHtmlElement} from 'dom-utils'

function displayTodoElement(todo){
    const events = EventEmitter;
    const displayTodoDiv = createHtmlElement({
        tag: "div",
        properties:{
            id: "full-todo",
            innerHTML: displayContents,
        },
    });

    const title = displayTodoDiv.querySelector(".title");
    const description = displayTodoDiv.querySelector(".description");
    const notes = displayTodoDiv.querySelector(".notes");
    const dueDate = displayTodoDiv.querySelector(".due-date span");
    const priority = displayTodoDiv.querySelector(".priority span");
    const checklist = displayTodoDiv.querySelector(".checklist");
    const editButton = displayTodoDiv.querySelector(".edit");

    title.textContent = todo.getTitle();
    description.textContent = todo.getDescription();
    dueDate.textContent = buildDateString();
    priority.textContent = todo.getPriority();
    todo.getNotes().forEach( (note, index) => notes.appendChild(_buildNotesListItem(note, index)));
    todo.getChecklist().forEach( (item, index) => checklist.appendChild(_buildChecklistItem(item, index)));

    editButton.addEventListener("click", () => events.raiseEvent("editTodo", todo));

    function buildDateString(){
        let dateString = "";

        if (todo.getDueDate() instanceof Date){
            let date = todo.getDueDate();
            let monthStr = (date.getMonth() + 1).toString().padStart(2, '0');
            let dayStr = date.getDate().toString().padStart(2, '0');
            let yearStr = date.getFullYear().toString().padStart(4, '0');
    
            dateString = `${monthStr}/${dayStr}/${yearStr}`;
        }
        else {
            dateString = todo.getDueDate();
        }

        return dateString;
    }
    function _buildNotesListItem(note,index){
        let noteItem = createHtmlElement({
            tag: "li",
            properties:{
                textContent: note,
            }
        });

        return noteItem;
    }

    function _buildChecklistItem(item, index){

        let checklistItem = createHtmlElement({
            tag: "li",
            children: [
                createHtmlElement({
                    tag: "input",
                    properties: {
                        id: index,
                        checked: item.checked,
                    },
                    attributes: {
                        type: "checkbox",
                        ["data-index"]: index,
                    },
                }),
                createHtmlElement({
                    tag: "label",
                    properties: {
                        textContent: item.itemName,
                    },
                    attributes: {
                        for: index,
                    },
                }),
            ],
        });

        return checklistItem;
    }

    return displayTodoDiv;
}

export { displayTodoElement };
