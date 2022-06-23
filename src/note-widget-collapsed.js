import { createHtmlElement } from 'dom-utils';
import { EventEmitter } from 'event-emitter';
import './note-widget-collapsed.css';
import closeThick from './icons/close-thick.svg';
import exclamation from './icons/exclamation-thick.svg';

function createCollapsedNoteWidget(note){
    const events = EventEmitter;
    const _note = note;
    const pastDueClasses = _buildPastDueClasses();
    const dateString = _buildDateString();
    const collapsedNoteWidgetElement = createHtmlElement({
        tag: "div",
        classes: [ "collapsed-note-widget" ],
        children: [
            createHtmlElement({
                tag: "p",
                classes: [ "note-title" ],
                properties: {
                    textContent: note.getTitle(),
                },
            }),
            createHtmlElement({
                tag: "p",
                classes: [ "due-date" ],
                properties: {
                    textContent: dateString,
                },
            }),
            createHtmlElement({
                tag: "div",
                classes: pastDueClasses,
            }),
            createHtmlElement({
                tag: "img",
                classes: [ "delete-button" ],
                properties: {
                    src: closeThick,
                }
            }),
        ],
    });

    if (note.isPastDue()){
        collapsedNoteWidgetElement.querySelector(".past-due").appendChild(createHtmlElement({
            tag: "img",
            properties: {
                src: exclamation,
            },
        }));
    }
    const titlePara = collapsedNoteWidgetElement.querySelector(".note-title");
    const deleteButton = collapsedNoteWidgetElement.querySelector(".delete-button");

    titlePara.addEventListener("click", _titleClicked);
    deleteButton.addEventListener("click", _deleteClicked);

    function _deleteClicked(e){
        events.raiseEvent("deleteTodo", _note);
        e.target.parentElement.remove();
    }

    function _titleClicked(){
        events.raiseEvent("todoClicked", _note);
    }
    
    function _buildPastDueClasses(){
        let pastDueClasses = [ "past-due" ];
        if (note.getPriority() !== ""){
            pastDueClasses.push(note.getPriority());
        }

        return pastDueClasses;
        
    }

    function _buildDateString(){
        let dateString = "";

        if (note.getDueDate() instanceof Date){
            let date = note.getDueDate();
            let monthStr = (date.getMonth() + 1).toString().padStart(2, '0');
            let dayStr = date.getDate().toString().padStart(2, '0');
            let yearStr = date.getFullYear().toString().padStart(4, '0');
    
            dateString = `${monthStr}/${dayStr}/${yearStr}`;
        }
        else {
            dateString = note.getDueDate();
        }

        return dateString;
    }
    function getNote(){
        return _note;
    }

    return { collapsedNoteWidgetElement, getNote };

}

export { createCollapsedNoteWidget }