import { createProject } from './project';

function ProjectsList(){
    let projects = [];
    
    function getProjectsData(){
        let projectsData = projects.map( project => project.buildProjectData() );

        return projectsData;
    }
    function addProject(project){
        let duplicate = false;
        if (typeof(project) === 'string'){
            duplicate = projects.some( existingProject => existingProject.getName() === project);
            if (!duplicate){
                project = createProject(project);
            }

        }

        else {
            duplicate = projects.some( existingProject => existingProject.getName() === project.getName());
            if (!duplicate){
                projects.push(project);
            }
        }

        if (!duplicate){
            return project;
        }

        return undefined;
    }

    function getProject(project){
        if (typeof(project) === 'number'){
            return projects[project];
        }
        else if (typeof(project) === 'string'){
            return projects.find( val => val.getName(project) === project);
        }
    }
    
    function getProjects(){
        return projects;
    }

    function removeProject(project){
        if (typeof(project) === 'number'){
            return projects.splice(project, 1);
        }
        else if (typeof(project) === 'string'){
            let index =  projects.findIndex( val => val.getName(project) === project);
            return projects.splice(index, 1);
        }
        else {
            if (project.getName()){
                removeProject(project.getName());
            }
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
        getProjects,
        getProjectsData,
        removeProject,
        addTodoToProject,
        getTodoFromProject,
        getTodosFromProject,
        removeTodoFromProject
    }
}

export { ProjectsList }