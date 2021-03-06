import { createHtmlElement } from 'dom-utils';
import { EventEmitter } from 'event-emitter';
import { createProject } from './project'
import './addProjectWidget.css';
import plusIcon from './icons/plus-thick.svg';
import minusIcon from './icons/minus-thick.svg';

function createAddProjectWidget(){
    const events = EventEmitter;
    let addProjectWidget = createHtmlElement({
        tag: "div",
        properties: {
            id: "add-project-widget",
        },
        children: [
            createHtmlElement({
                tag: "input",
                properties: {
                    id: "add-project-text",
                },
                attributes: {
                    type: "text",
                    placeholder: "Add Project...",
                },
            }),
            createHtmlElement({
                tag: "button",
                properties: {
                    id: "add-project-button",
                },
                children: [
                    createHtmlElement({
                        tag: "img",
                        attributes: {
                            src: plusIcon,
                        },
                    }),
                ],
            }),
            // createHtmlElement({
            //     tag: "button",
            //     properties: {
            //         id: "cancel-add-project-button",
            //     },
            //     children: [
            //         createHtmlElement({
            //             tag: "img",
            //             attributes: {
            //                 src: minusIcon,
            //             }
            //         }),
            //     ],
            // }),
        ],
    });

    const _addProjectText = addProjectWidget.querySelector("#add-project-text");
    const _addProjectButton = addProjectWidget.querySelector("#add-project-button");
    // const _cancelProjectButton = addProjectWidget.querySelector("#cancel-add-project-button");

    _disableButtons();

    _addProjectText.addEventListener("focus", _enableButtons);
    _addProjectText.addEventListener("blur", _disableButtons);
    _addProjectText.addEventListener("keydown", keyPressed);

    _addProjectButton.addEventListener("click", _addProject)
    // _cancelProjectButton.addEventListener("click", _cancelInput);

    function _disableButtons(){
        if (_addProjectText.value === ""){
            _addProjectButton.disabled = true;
            _addProjectButton.classList.add("disabled");

            // _cancelProjectButton.disabled = true;
            // _cancelProjectButton.classList.add("disabled");

            // _addProjectText.classList.add("inactive");
        }

    }

    function _enableButtons(){
        _addProjectButton.disabled = false;
        _addProjectButton.classList.remove("disabled");

        // _cancelProjectButton.disabled = false;
        // _cancelProjectButton.classList.remove("disabled");

        _addProjectText.classList.remove("inactive");
    }

    function keyPressed(e){
        if (e.key === 'Enter' && _addProjectText.value !== ""){
            _addProject();
        }
    }

    function _cancelInput(){
        _addProjectText.value = "";
        _disableButtons();
    }

    function _addProject(){
        let newProject = createProject(getValue());
        events.raiseEvent("addProject", newProject);
        _addProjectText.value = "";
        // _cancelInput();
    }

    function getValue(){
        return _addProjectText.value;
    }
    return { addProjectWidget, getValue };
}

export { createAddProjectWidget }