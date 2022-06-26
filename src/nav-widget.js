import { createHtmlElement } from 'dom-utils';
import { createProjectPanel } from './projects-panel';
import { createProjectPage } from './display-project-page';
import chevronRight from './icons/chevron-right.svg';
import './nav-widget.css';

function createNavWidget(){
    const mainContent = document.querySelector("#main-content");
    const navWidget = document.querySelector("#nav-widget-div");

    const _projects = { };
    const _project = {  };
    const _todo = {};

    let _chain = { };

    function navigateTo(type){
        if (_chain.type !== "type" && !isEmpty(_chain.nextLink) ){
            navigateTo(_chain.nextLink);
        }
        else{
            link.nextLink = {};
            _clearNav();
            _buildChain(_chain);
            _displayDiv(link.div);
        }
    }

    function addToNavBar(type, displayText, div){
        const link = { type, displayText, div };
        _addLink(_chain, link);
    }

    function initializeNavBar(type, displayText, div){
        _chain = { type, displayText, div, nextLink: {} };
        _buildChain(_chain);
    }

    function _addLink(currentLink, newLink){

        if (currentLink.nextLink.type === newLink.type){
            newLink.nextLink = {};
            currentLink.nextLink = newLink;

            _clearNav();
            _buildChain(_chain);
        }
        else if (isEmpty(currentLink.nextLink)){
            currentLink.nextLink = newLink;
            newLink.nextLink = {};

            _clearNav();
            _buildChain(_chain);
        }
        else{
            _addLink(currentLink.nextLink, newLink);
        
        }
    }
    
    function _buildChain(chain){
        if (!isEmpty(chain)){
            navWidget.appendChild(_getLinkElement(chain));
        }

        if (!isEmpty(chain.nextLink)){
            navWidget.appendChild(_getArrow());
            _buildChain(chain.nextLink);
        }
    }

    function _getLinkElement(link){
        const element = createHtmlElement({
            tag: "p",
            properties: {
                textContent: link.displayText,
            },
        });
        element.addEventListener("click", function (){
            link.nextLink = {};
            _clearNav();
            _buildChain(_chain);
            _displayDiv(link.div);
        });

        return element;
    }

    function _displayDiv(div){
        _clearMainContent();
        mainContent.appendChild(div);
    }

    function setProjectsPage(div){
        _projects.div = div;
    }

    function setActiveProject(project){
        if (project){
            _project.project = project;
        }

    }

    function setActiveTodo(todo){
        if (todo){
            _todo.todo = todo;
        }

    }

    function getNavElement(level, text){
        const element = createHtmlElement({
            tag: "p",
            properties: {
                id: level,
                textContent: text,
            },
        });

        element.addEventListener("click", navItemClicked);

        return element;
    }

    function _getArrow(){
        const arrow = createHtmlElement({
            tag: "img",
            properties: {
                src: chevronRight,
            },
        });

        return arrow;
    }

    function _clearNav(){
        while (navWidget.firstChild){
            navWidget.firstChild.remove();
        }
    }

    function _clearMainContent(){
        while (mainContent.firstChild){
            mainContent.firstChild.remove();
        }
    }

    function updateNav(){
        clearNav();

        navWidget.appendChild(getNavElement("projects", "projects"));

        if (!isEmpty(_project.project)){
            navWidget.appendChild(getArrow());
            navWidget.appendChild(getNavElement("project", _project.project.getName()));
        }
        
    }

    function navItemClicked(e){
        if (e.target.id === "projects"){
            console.log("clicked projects");
            setActiveTodo({});
            setActiveProject({});
            clearMainContent();
            mainContent.appendChild(_projects.div);

        }

        if (e.target.id === "project"){
            console.log("clicked project");
            setActiveTodo({});
            setActiveProject(_project.project);
            clearMainContent();
            mainContent.appendChild(createProjectPage(_project.project));
        }

        updateNav();

    }

    function isEmpty(object){
        for (let i in object ){
            return false;
        }

        return true;
    }

    function getActiveProject(){
        return _project.project;
    }

    return {
        addToNavBar,
        initializeNavBar,
        navigateTo,
    }
}


export { createNavWidget };