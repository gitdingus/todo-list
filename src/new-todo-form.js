import { createHtmlElement } from 'dom-utils';
import { EventEmitter } from 'event-emitter';
import  { DatePicker } from 'date-picker';
import { createTodo } from "./todo.js";
import formHtml from './new-todo-form.html';
import trashImage from './icons/close-thick.svg'
import './new-todo-form.css';

function createNewTodoForm() {
    const events = EventEmitter;
    const newTodoDiv = document.createElement("div");
    newTodoDiv.innerHTML = formHtml;

    const datePicker = DatePicker();
    const notesButton = newTodoDiv.querySelector("#notes-button");
    const checklistButton = newTodoDiv.querySelector("#check-button");
    const notesField = newTodoDiv.querySelector("#notes-field");
    const checklistField = newTodoDiv.querySelector("#checklist-field");
    const notesList = newTodoDiv.querySelector("#notes-list");
    const checklist = newTodoDiv.querySelector("#checklist");
    const saveButton = newTodoDiv.querySelector("#save-button");

    newTodoDiv.querySelector("#date-pane").appendChild(datePicker.datePickerElement);    // const newTodoDiv = createHtmlElement({
    
    notesButton.addEventListener("click", addNoteItem);
    checklistButton.addEventListener("click", addChecklistItem);

    notesField.addEventListener("keydown", keyPress);
    checklistField.addEventListener("keydown", keyPress);

    saveButton.addEventListener("click", () => console.log(buildTodo().toString()));

    function buildTodo(){
        console.log(datePicker.getISO8601DateString());
        console.log(datePicker.getFullDate());
        const title = newTodoDiv.querySelector("#title-field").value;
        const description = newTodoDiv.querySelector("#description-field").value;
        const date = new Date(datePicker.getISO8601DateString()+"T00:00:00"); // Buggy without time appended to end
        const notesArr = buildNotesArray();
        const checklistArr = buildChecklistArray();
 
        let priority = newTodoDiv.querySelector("input[name='priority']:checked");
        priority = (priority) ? priority.value : "";

        const newTodo = createTodo(title, description, date, priority);

        notesArr.forEach( note => newTodo.addNote(note) );
        checklistArr.forEach ( item => newTodo.addToChecklist(item.itemName, item.checked));

        return newTodo;

    }

    function buildNotesArray(){
        const notesList = document.querySelectorAll(".note-item");
        const notes = [];

        notesList.forEach( (note) => {
            let text = note.querySelector("p").textContent;
            notes.push(text);
        });

        return notes;
    }

    function buildChecklistArray(){
        const checklistItems = document.querySelectorAll(".checklist-item");
        const checklist = [];

        checklistItems.forEach( (item) => {
            let newItem = {};
            newItem.checked = item.firstChild.checked;
            newItem.itemName = item.firstChild.nextSibling.textContent;

            checklist.push(newItem);
        });

        return checklist;
    }

    function addNoteItem(){
        if (notesField.value !== ""){
            notesList.appendChild(createNoteElement(notesField.value));
        }

        notesField.value = "";
        notesField.focus();
    }

    function addChecklistItem(){
        if (checklistField.value !== ""){
            checklist.appendChild(createChecklistElement(checklistField.value));
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

    function createChecklistElement(item){
        const checklistElement = createHtmlElement({
            tag: "li",
            classes: [ "checklist-item" ],
            children: [
                createHtmlElement({
                    tag: "input",
                    attributes: {
                        type: "checkbox",
                    },
                }),
                createHtmlElement({
                    tag: "label",
                    properties: {
                        textContent: item,
                    },
                }),
                createHtmlElement({
                    tag: "img",
                    properties: {
                        src: trashImage,
                    },
                }),
            ],
        });

        checklistElement.querySelector("img").addEventListener("click", function(e) {
            const li = e.target.parentNode;

            li.remove();
        });
        return checklistElement;
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

            li.remove();
        })

        return noteElement;
    }


    return newTodoDiv;

}



export { createNewTodoForm }