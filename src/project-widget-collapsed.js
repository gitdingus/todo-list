import { createHtmlElement } from "dom-utils";
import chevronDown from './icons/chevron-down.svg'
import trash from './icons/trash-can-outline.svg'

function createCollapsedProjectWidget(project){
    const collapsedProjectElement = createHtmlElement({
        tag: "div",
        classes: [ "collapsed-project-widget" ],
        children: [
            createHtmlElement({
                tag: "p",
                classes: [ "project-name" ],
                properties: {
                    textContent: project.getName(),
                },
            }),
            createHtmlElement({
                tag: "button",
                classes: [ "view-project-button" ],
                attributes: {
                    src: chevronDown,
                },
            }),
            createHtmlElement({
                tag: "button",
                classes: [ "delete-project-button" ],
                attributes: {
                    src: trash,
                },
            }),
        ],
    }),


    return { collapsedProjectElement }
}

export { createCollapsedProjectWidget }