/** 
 * That function hides tickets (depending on the board searchbar input) with display:none and push's their column- and ticket-number
 * to the array 'hiddenTickets'.
 * @param {number} column - column is the column number starting at 0
 * @param {number} ticket - ticket is the row or the ticket-number in that column 
 */
function hideTicket(column, ticket) {
    addClasslist(`ticket-container-${column}-${ticket}`, 'd-none');
    hiddenTickets.push([column, ticket]);
}

/** 
 * That function is important after searching for a ticket, edit it and let the previews search results staying still there 
 * (after rendering the board again). 
 */
function hideSomeTickets() {
    for (let i = 0; i < hiddenTickets.length; i++) {
        addClasslist(`ticket-container-${hiddenTickets[i][0]}-${hiddenTickets[i][1]}`, 'd-none');
    }
}


////////////////// AREA & TICKET - HIGHLIGHTING //////////////////////////
/**
 * That function highlights all areas where its possible to drop the dragged ticket.
 * @param {number} i - i is the column index in a for-loop
 * @param {number} column - column is the column number starting at 0
 * @param {number} ticket - ticket is the row or the ticket-number in that column
 */
function highlightAllAreas(i,column,ticket) {
    if(i != currentElement['board']) {
        addClasslist(`onhold-container-column-${i}-last`, `highlight-area`);
        if(window.innerWidth > 800 || boardColumns[i].length > 0)
            addClasslist(`onhold-container-column-${i}-first`, `highlight-area`);
        let myDiv = document.getElementById(`ticket-container-${column}-${ticket}`);
        let getHeight = myDiv.offsetHeight;
        document.getElementById(`onhold-container-column-${i}-last`).style.height = `${getHeight}px`;
    }
}

/** 
 * That function removes all highlight areas where its possible to drop the dragged ticket, after 600ms.
 * @param {number} i - i is the column index in a for-loop 
 */
function removeAllHighlightAreas(i) {
    setTimeout( () => {
        if(i != currentElement['board']) {
            addClasslist(`onhold-container-column-${i}-last`, `no-highlight-area`);
            if(window.innerWidth > 800 || boardColumns[i].length > 0)
                addClasslist(`onhold-container-column-${i}-first`, `no-highlight-area`);
        }
    }, 600)
}

/** 
 * That function will be executed ondragover an dropping area and highlights that area where its possible to drop the dragged ticket.
 * @param {number} i - i is the column index in a for-loop 
 */
function highlightAreas(i) {
    if(i != currentElement['board']) {
        addClasslist(`onhold-container-column-${i}-last`, `highlight-area-more`);
        if(window.innerWidth > 800 || boardColumns[i].length > 0)
            addClasslist(`onhold-container-column-${i}-first`, `highlight-area-more`);
    }
}

/** 
 * That function will be executed ondragleave an dropping area and removes the highlighting of that area.
 * @param {number} i - i is the column index in a for-loop 
 */
function removeHighlightAreas(i) {
    removeClasslist(`onhold-container-column-${i}-last`, `highlight-area-more`);
    if(window.innerWidth > 800 || boardColumns[i].length > 0)
        removeClasslist(`onhold-container-column-${i}-first`, `highlight-area-more`);
}

/** 
 * That function will be executed onmousedown on a ticket area and adds the class 'ticket-highlight' to that ticket.
 * @param {number} i - i is the column index in a for-loop 
 */
function highlightTicket(column, ticket) {
    addClasslist(`ticket-container-${column}-${ticket}`, `ticket-highlight`);
}

/** 
 * That function will be executed onmouseup on a ticket area and removes the class 'ticket-highlight' from that ticket.
 * @param {number} i - i is the column index in a for-loop 
 */
function removeHighlightTicket(column, ticket) {
    removeClasslist(`ticket-container-${column}-${ticket}`, `ticket-highlight`);
}
