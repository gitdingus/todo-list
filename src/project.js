function createProject (name){
    let project = {};

    project.name = name;
    project.todos = [];

    function buildProjectData(){
        let projectData = {
            name: project.name,
            todos: [],
        };
        projectData.todos = project.todos.map( todo => todo.getTodoDataCopy() );         

        return projectData;
    }
    function addTodo(todo){
        let duplicate = project.todos.some( existingTodo => existingTodo.getTitle() === todo.getTitle());

        if (!duplicate){
            project.todos.push(todo);
            return todo;
        }

        return undefined;

    }

    function addTodos(todos){
        todos.forEach( todo => project.todos.push(todo) );
        return todos;
    }

    function getName(){
        return project.name;
    }

    function getTodos(){
        return project.todos;
    }

    function getTodo(todo){
        if (typeof(todo) === 'number'){
            return project.todos[todo];
        }
        else if (typeof(todo) === 'string'){
            return project.todos.find( val => val.getTitle() === todo );
        }

        return undefined;
    }

    function removeTodo(todo){
        if (todo === undefined || todo === -1){
            return;
        }
        if (typeof(todo) === 'number'){
            return project.todos.splice(todo, 1);
        }
        else if (typeof(todo) === 'string'){
            let index = project.todos.findIndex( val => val.getTitle() === todo );
            
            if (index !== -1) { removeTodo(index) };
            
        }

        return undefined;
    }

    function setName(newName){
        project.name = newName;
    }

    function hasPastDue(){
        return project.todos.some( todo => todo.isPastDue() );
    }

    function toString(){
        let projectString = `Project Name: ${project.name}\n`
            + `Todos: \n`;
        project.todos.forEach( todo => projectString += `   ${todo.getTitle()}`);

        return projectString;
    }

    return {
        addTodo,
        addTodos,
        getName,
        getTodos,
        getTodo,
        removeTodo,
        setName,
        hasPastDue,
        buildProjectData,
        toString
    }

}

export { createProject }