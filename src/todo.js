
function createTodo(title, description, dueDate, priority){
    const todo = {};

    todo.title = title || "(Untitled Note)";
    todo.description = description || "(No Description)";
    setDueDate(dueDate);
    setPriority(priority);
    todo.checklist = [];
    todo.notes = [];

    function getTitle(){
        return todo.title;
    }

    function getDescription(){
        return todo.description;
    }

    
    function getDueDate() {
        return todo.dueDate;
    }

    function getPriority(){
        return todo.priority;
    }

    function setTitle(newTitle){
        todo.title = newTitle;
    }

    function setDescription(newDescription){
        todo.description = newDescription;
    }

    function setDueDate(newDueDate){
        if (newDueDate instanceof Date === true){
            todo.dueDate = newDueDate;
        }
        else {
            todo.dueDate = "(No Due Date)";
        }
    }

    function setPriority(newPriority){
        if (isValidPriority(newPriority) || newPriority === ""){
            todo.priority = newPriority;
        }
        else {
            todo.priority = "";
        }
    }

    function isValidPriority(priority){
        if (priority === "low" || priority === "medium" || priority === "high"){
            return true;
        }
        else{
            return false;
        }
    }

    // takes a string, converts it into a checklist item
    // of the form { item, boolean } where item is a string
    // and boolean is a value determining whether its checked off.
    // returns true or false whether or not item was added
    function addToChecklist(itemName, checked){
        let duplicate = todo.checklist.some( val => val.itemName === itemName );
        
        if (!duplicate){
            let newItem = {
                itemName: itemName,
                checked: checked || false,
            }

            todo.checklist.push(newItem);

            return true;
        }

        return false;
    }

    function getChecklist(){
        return todo.checklist;
    }

    function getChecklistItem(item){
        if (typeof(item) === "number"){
            return checklist[item];
        }
        else if (typeof(item) === "string"){
            let i = todo.checklist.find( val => val.itemName = item);
            return i;
        }
    }

    function getIndexOfChecklistItem(itemName){
        const index = todo.checklist.findIndex( item => item.itemName = itemName );

        return index;
    }

    function toggleChecklistItem(item){
        if (typeof(item) === "number"){
            if (item < todo.checklist.length && item >= 0){
                todo.checklist[item].checked = todo.checklist[item].checked ? false : true;
            }
        }
        else if (typeof(item) === "string"){
            let i = todo.checklist.find( val => val.itemName = item);
            i.checked = i.checked ? false : true;
        }
    }

    function removeChecklistItem(item){
        if (typeof(item) === "number"){
            return todo.checklist.splice(item, 1);
        }
        else if (typeof(item) === "string"){
            let i = todo.checklist.findIndex( val => val.itemName = item);
            
            return todo.checklist.splice(i, 1);
        }
    }

    function sortChecklist(sortBy){

        if (sortBy === "item-name"){
            return todo.checklist.sort(compareByItemName);
        }
        else if (sortBy === "checked"){
            return todo.checklist.sort(compareByCheckedAndItemName);
        }

        // default sort order
        return todo.checklist.sort(compareByByItemName);
    }

    function compareByItemName(a, b){
        if (a.itemName < b.itemName){
            return -1;
        }
        else if (a.itemName > b.itemName){
            return 1;
        }
        else if (a.itemName === b.itemName){
            return 0;
        }
    }

    function compareByCheckedAndItemName(a,b){
        if (a.checked === b.checked){
            return compareByCheckedAndItemName(a,b);
        }
        else if (a.checked === true && b.checked === false){
            return -1;
        }
        else if (a.checked === false && b.checked === true){
            return 1;
        }

        // should never execute
        return 0;
    }

    function addNote(note){
        todo.notes.push(note);
    }

    function getNotes(){
        return todo.notes;
    }

    function getNote(index){
        return todo.notes[index];
    }

    function getIndexOfNote(note){
        return todo.notes.indexOf(note);
    }

    function removeNote(note){
        if (typeof(note) === "number"){
            todo.notes.splice(note, 1);
        }
        else if (typeof(note) === "string"){
            let index = todo.notes.findIndex( val => val.itemName === note);
            todo.notes.splice(index, 1);
        }
    }

    // If a todo.dueDate has a valid Date object it will check to see 
    // if the due date has past. Otherwise it will always return false.
    function isPastDue(){
        // May not be the most robust way of checking the date
        // look into improving this
        if (todo.dueDate instanceof Date  === true){
            if (Date.now() > todo.dueDate.valueOf()){
                return true;
            }
            else{
                return false;
            }
        }
        
        return false;
    }

    function toString(){
        let todoString = `Title: ${todo.title}\n`
        + `Description: ${todo.description}\n`
        + `Due Date: ${todo.dueDate}\n`
        + `Priority: ${todo.priority}\n`
        + `Notes: \n`
        todo.notes.forEach( note => todoString += `  ${note}\n` );
        todoString += `Checklist: \n`;
        todo.checklist.forEach( item => todoString += ` ${item.itemName} ${(item.checked) ? 'complete' : 'incomplete'}\n`);
    
        return todoString;
    }

    return { 
        getTitle,
        getDescription,
        getDueDate,
        getPriority,
        getChecklist,
        getChecklistItem,
        getIndexOfChecklistItem,
        getNotes,
        getNote,
        getIndexOfNote,
        setTitle,
        setDescription,
        setDueDate,
        setPriority,
        addToChecklist,
        addNote,
        removeChecklistItem,
        removeNote,
        toggleChecklistItem,
        sortChecklist,
        isPastDue,
        toString
    }
}

// export { createTodo };