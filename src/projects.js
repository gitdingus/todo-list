import { createProject } from './project';

function createTodoList(){
    let todoList = [];
    
    function addProject(projectName){
        let newProject = createProject(projectName);
        todoList.push(newProject);

        return newProject;
    }

    function getProject(project){
        if (typeof(project) === 'number'){
            return todoList[project];
        }
        else if (typeof(project) === 'string'){
            return todoList.find( val => val.getName(project) === project);
        }
    }

    function removeProject(project){
        if (typeof(project) === 'number'){
            return todoList.splice(project, 1);
        }
        else if (typeof(project) === 'string'){
            let index =  todoList.findIndex( val => val.getName(project) === project);
            return todoList.splice(index, 1);
        }
    }

    function addTodoToProject(project, todo){
        return getProject(project).addTodo(todo);
    }

    function getTodoFromProject(project, todo){
        return getProject(project).getTodo(todo);
    }

    function getTodosFromProject(project){
        return getProject(project).getTodos();
    }

    function removeTodoFromProject(project, todo){
        return getProject(project).removeTodo(todo);
    }

    return {
        addProject,
        getProject,
        removeProject,
        addTodoToProject,
        getTodoFromProject,
        getTodosFromProject,
        removeTodoFromProject
    }
}

export { createTodoList }