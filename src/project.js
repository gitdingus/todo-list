function createProject (name){
    let project = {};

    project.name = name;
    project.todos = [];

    function addTodo(todo){
        project.todos.push(todo);
    }

    function addTodos(todos){
        todos.forEach( todo => project.todos.push(todo) );
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
        if (typeof(todo) === 'number'){
            return project.todos.splice(todo, 1);
        }
        else if (typeof(todo) === 'string'){
            let index = project.todos.findIndex( val => val.getTitle() === todo );

            return project.todos.splice(index, 1);
        }

        return undefined;
    }

    function setName(newName){
        project.name = newName;
    }

    function toString(){
        let projectString = `Project Name: ${project.name}\n`
            + `Todos: \n`;
        project.todos.forEach( todo => projectString += `   ${todo.getName}`);

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
        toString
    }

}

export { createProject }