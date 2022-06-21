import { createHtmlElement } from 'dom-utils';
import { EventEmitter } from 'event-emitter';
import  { DatePicker } from 'date-picker';
import formHtml from './new-todo-form.html';
import trashImage from './icons/close-thick.svg'
import './new-todo-form.css';

function createNewTodoForm() {
    const newTodoDiv = document.createElement("div");
    newTodoDiv.innerHTML = formHtml;

    const datePicker = DatePicker();
    const notesButton = newTodoDiv.querySelector("#notes-button");
    const checklistButton = newTodoDiv.querySelector("#check-button");
    const notesField = newTodoDiv.querySelector("#notes-field");
    const checklistField = newTodoDiv.querySelector("#checklist-field");
    const notesList = newTodoDiv.querySelector("#notes-list");
    const checklist = newTodoDiv.querySelector("#checklist");




    newTodoDiv.querySelector("#date-pane").appendChild(datePicker.datePickerElement);    // const newTodoDiv = createHtmlElement({
    
    notesButton.addEventListener("click", addNoteItem);
    checklistButton.addEventListener("click", addChecklistItem);

    notesField.addEventListener("keydown", keyPress);
    checklistField.addEventListener("keydown", keyPress);

    function addNoteItem(){
        if (notesField.value !== ""){
            notesList.appendChild(createNoteElement(notesField.value));
        }

        notesField.value = "";
        notesField.focus();
    }

    function addChecklistItem(){
        if (checklistField.value !== ""){
            checklist.appendChild(createHtmlElement({
                tag: "li",
                properties: {
                    textContent: checklistField.value,
                },
            }));
        }

        checklistField.value = "";
        checklistField.focus();
    }

    function keyPress(e){

        if (e.key === 'Enter'){
            if (e.target.id === 'checklist-field'){
                addChecklistItem();
            }
            else if (e.target.id === 'notes-field'){
                addNoteItem();
            }
        }
    }

    function createNoteElement(note){
        const noteElement = createHtmlElement({
            tag: "li",
            classes: [ "note-item" ],
            children: [
                createHtmlElement({
                    tag: "p",
                    properties: {
                        textContent: note,
                    }
                }),
                createHtmlElement({
                    tag: "img",
                    properties: {
                        src: trashImage,
                    },
                }),
            ],
        });

        noteElement.querySelector("img").addEventListener("click", function (e){
            const li = e.target.parentNode;

            li.remove(li);
        })

        return noteElement;
    }

    function createChecklistItem(item){
        const itemElement = createHtmlElement({
            tag: "li",
            classes: [ "checklist-item" ],
            children: {
                createHtmlElement({
                    tag: "input",
                    properties: {
                        
                    }
                })
            }
        });
    }

    return newTodoDiv;

}



export { createNewTodoForm }