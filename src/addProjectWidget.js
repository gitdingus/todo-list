import { createHtmlElement } from 'dom-utils';
import plusIcon from './icons/plus-thick.svg';
import minusIcon from './icons/minus-thick.svg';

function createAddProjectWidget(){
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
            createHtmlElement({
                tag: "button",
                properties: {
                    id: "cancel-add-project-button",
                },
                children: [
                    createHtmlElement({
                        tag: "img",
                        attributes: {
                            src: minusIcon,
                        }
                    }),
                ],
            }),
        ],
    });

    const addProjectButton = addProjectWidget.querySelector("#add-project-button");
    const cancelProjectButton = addProjectWidget.querySelector("#cancel-add-project-button");

    function disableButtons(){


    }
    return addProjectWidget;
}

export { createAddProjectWidget }