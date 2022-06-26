import { EventEmitter } from 'event-emitter';
import displayContents from './display-todo.html';
import './display-todo.css';
import {createHtmlElement} from 'dom-utils'

function displayTodoElement(todo){
    let changed = false;
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
    const dueDate = displayTodoDiv.querySelector(".due-date");
    const priority = displayTodoDiv.querySelector(".priority");
    const checklist = displayTodoDiv.querySelector(".checklist");
    const editButton = displayTodoDiv.querySelector(".edit");
    const deleteButton = displayTodoDiv.querySelector(".delete");
    const doneButton = displayTodoDiv.querySelector(".done");

    title.textContent = todo.getTitle();
    description.textContent = todo.getDescription();
    dueDate.textContent = buildDateString();
    priority.textContent = todo.getPriority();
    todo.getNotes().forEach( (note, index) => notes.appendChild(_buildNotesListItem(note, index)));
    todo.getChecklist().forEach( (item, index) => checklist.appendChild(_buildChecklistItem(item, index)));

    editButton.addEventListener("click", () => events.raiseEvent("openTodoForEditing", todo));
    deleteButton.addEventListener("click", () => events.raiseEvent("deleteTodo", todo));
    doneButton.addEventListener("click", checkForChanges);

    function checkForChanges(){
        if (changed){
            let checklistItems = checklist.querySelectorAll(".checklist-item");
            let checklistArr = [];

            checklistArr = Array.from(checklistItems).map( item => {
                return {
                    itemName: item.firstChild.nextSibling.textContent,
                    checked: item.firstChild.checked,
                }
            });
            

            todo.setChecklist(checklistArr);
        }

        events.raiseEvent("closeTodo");
    }
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
            // dateString = todo.getDueDate();
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
            classes: [ "checklist-item" ],
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

        checklistItem.querySelector("input").addEventListener("click", () => changed = true);
        return checklistItem;
    }

    return displayTodoDiv;
}

export { displayTodoElement };
