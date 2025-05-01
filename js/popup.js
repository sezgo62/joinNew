/** 
 * Prerender all popup-windows in the popup div. 
 */
function renderPopups() {
    let container = document.getElementById('popUp');
    container.innerHTML = renderHeaderMenuPopup();
    container.innerHTML += templateCreatedTaskPopUp();
}

/** 
 * Html template popups that are rendered into board.html 
 */
function renderPopupsInBoard() {
    let container = document.getElementById('popUp');
    container.innerHTML = renderHeaderMenuPopup();
    container.innerHTML += renderTemplateTicketInfoPopup();
    container.innerHTML += renderTemplateBoardAddtaskPopup();
    renderTemplateBoardAddtaskPopupContent();
    renderPopupCreatedAddtask();
}

/** 
 * Html template popups that are rendered into contacts.html 
 */
function renderPopupsInContacts() {
    let container = document.getElementById('popUp');
    container.innerHTML = renderHeaderMenuPopup();
    container.innerHTML += renderTemplateBoardAddtaskPopup();
    renderTemplateBoardAddtaskPopupContent();
    container.innerHTML += templateContactsNewContactPopup();
    renderPopupCreatedAddtask();
    let containerResp = document.getElementById('content-container');
    containerResp.innerHTML += renderContactsInfoPopupResponsive();
    let popupResp = document.getElementById(`popUp-responsive`);
    popupResp.innerHTML += templateCreatedContactPopup();
}

/** 
 * That function will be executed when the user clicks on logout popup. It cleares all localstorage data 
 * and after that, it checks if the user is logged in (as registered-user or as guest). 
 */
function logout() {
    localStorage.removeItem('usersEmail');
    localStorage.removeItem('currentUser');
    localStorage.removeItem('currentUserHeaderData');
    localStorage.removeItem('guestUser');
    isLoggedInn();
    console.clear();
}

/** 
 * Adding and removing some classes for a slide-in effect when opening the header menu-popup. 
 */
function openHeaderMenuPopup() {
    removeClasslist('header-menu-container-full',`d-none`);
    headerMenuPopupSlideIn();
}

/** 
 * That function is for letting the header menu-popup slide in, removing the class d-none before.
 */
function headerMenuPopupSlideIn() {
    setTimeout(() => {
        addClasslist('header-menu-container-full',`header-menu-popup-slideIn`);
    }, 1);
}

/** 
 * Adding and removing some classes for a slide-out effect. 
 */
function closeHeaderMenuPopup() {
    removeClasslist('header-menu-container-full',`header-menu-popup-slideIn`);
    addClasslist('header-menu-container-full',`header-menu-popup-slideOut`);
    headerMenuPopupSlideOut();
}

/** 
 * That function is for letting the slideout-effect happen without applying d-none first. 
 */
function headerMenuPopupSlideOut() {
    setTimeout(() => {
        addClasslist('header-menu-container-full',`d-none`);
        removeClasslist('header-menu-container-full', `header-menu-popup-slideOut`); 
    }, 125);
}


//////////////////// BOARD: TICKET ONCLICK POPUP /////////////////////

/** 
 * Returns a template 
 */
function renderTemplateTicketInfoPopup() {
    return `<div class="board-ticket-info-popup-full flex fixed w-100 d-none" id="board-ticket-info-popup-full" onclick="closeTicketInfoPopup()"></div>`;
}

/** 
 * That function renders the content of a ticket info popup window.
 */
function renderTicketInfoPopupContainer(column, ticket) {
    let content;
    content = document.getElementById('board-ticket-info-popup-full');
    content.innerHTML = renderTemplateTicketInfoPopupContainer(column, ticket);
    renderTemplateTicketInfoPopupContainerContent(column, ticket);
    renderTicketInfoPopupTeammembers(column, ticket);
    colorTicketElements(column, ticket);
    content.classList.remove('d-none');
}

/** 
 * That function renders some templates for the ticket-info-popup content 
 */
function renderTemplateTicketInfoPopupContainerContent(column, ticket) {
    let wrapper = document.getElementById(`ticket-info-popup-wrapper`);
    wrapper.innerHTML = templateTicketInfoPopupCategory(column, ticket);
    wrapper.innerHTML += templateTicketInfoPopupTitleAndDescription(column, ticket);
    wrapper.innerHTML +=templateTicketInfoPopupDatePrioTeam();
    let innerWrapper = document.getElementById(`ticket-info-popup-date-and-prio-and-assignedTo`);
    innerWrapper.innerHTML = templateTicketInfoPopupDateAndPrio(column, ticket);
    innerWrapper.innerHTML += templateTicketInfoPopupAssignedTo(column, ticket);
}


/////////////////////// TICKET INFO EDITTING /////////////////////
/** 
 * This function renders the container where tasks can be editted
 * @param {int} column - position/index of the column of the task selected to be edited in boardColumns
 * @param {int} ticket - position/index of the task inside the column that is selected to be edited 
 */
function renderTicketInfoEditting(column, ticket) {
    let content = document.getElementById(`ticket-info-popup-container-${column}-${ticket}`);
    content.innerHTML = `<div class="ticket-info-popup-inner-container flex column h-100 w-100" id="ticket-info-popup-inner-container-${column}-${ticket}"></div>`;
    document.getElementById(`ticket-info-popup-inner-container-${column}-${ticket}`).innerHTML = templateTicketEditing(column, ticket);
    renderAddTaskFormInTicketEditing(column, ticket);
    clearIconArray(); //in edit_task.js
    renderPrioritySelection(); //in add_task.js
    //changeVisibilityNewCategory();
    renderCategoryDropdown();
    renderCategoryColorSelection();
    removeClassOfPriorClickedElem(removeClassOfPriorClickedElemIndex);
    renderContactsDropdown(); //in add_task.js
    selectPrioInEditContainer(column, ticket); //in edit_task.js
    renderAlreadyAssignedContactsAndUsers(column, ticket); //in edit_task.js
    renderSubtasksInEditContainer(column, ticket);
}


function addNewCategoryInEdit() {
    
}


/** 
 * That function renders some templates for the ticket-editing content
 * @param {number} column - column is the column number starting at 0
 * @param {number} ticket - ticket is the row or the ticket-number in that column 
 */
function renderAddTaskFormInTicketEditing(column, ticket) {
    let wrapper = document.getElementById(`add-task-form-style-board`);
    wrapper.innerHTML = templateAddTaskFormInBoardTitleDescription(column, ticket);
    wrapper.innerHTML += templateAddTaskFormInBoardDuedatePrio(column, ticket);
    wrapper.innerHTML += templateAddTaskFormInBoardCategory(column, ticket);
    wrapper.innerHTML += templateAddTaskFormInBoardAssignedToSection();
    wrapper.innerHTML += templateAddTaskFormInBoardSubtasks();
    let dropdownContainer = document.getElementById(`add-task-column-left-child`);
    dropdownContainer.innerHTML = templateAddTaskFormInBoardDropDownContainer();
    dropdownContainer.innerHTML += templateAddTaskFormInBoardContactsiconWarning();
    let dropdown = document.getElementById(`dropdown-container`);
    dropdown.innerHTML = templateAddTaskFormInBoardDropdownContacts();
    dropdown.innerHTML += templateAddTaskFormInBoardInputContainter();
}

/** 
 * That function renders the ticket teammembers when opening the ticket-info.
 * @param {number} column - column is the column number starting at 0
 * @param {number} ticket - ticket is the row or the ticket-number in that column
 */
function renderTicketInfoPopupTeammembers(column, ticket) {
    let name;
    let content = document.getElementById(`ticket-info-popup-assignedTo-${column}-${ticket}`);
    for (let i = 0; i < boardColumns[column][ticket]['team'].length; i++) {
        name = boardColumns[column][ticket]['team'][i]['name'];
        content.innerHTML += `
        <div class="ticket-info-popup-member flex">
            <div class="ticket-contact ticket-info-popup-member-circle" id="ticket-info-popup-member-circle-${column}-${ticket}-${i}">${getNameLetters(name)}</div>
            <p class="cursor-d">${boardColumns[column][ticket]['team'][i]['name']}</p>
        </div>`
    }
}

/** 
 * That functions colors the category, priority and the teammembers of that ticket in ticket-info.
 * @param {number} column - column is the column number starting at 0
 * @param {number} ticket - ticket is the row or the ticket-number in that column 
 */
function colorTicketElements(column, ticket) {
    document.getElementById(`ticket-info-popup-category-${column}-${ticket}`).style.backgroundColor = `${boardColumns[column][ticket]['category']['color']}`;
    document.getElementById(`ticket-info-popup-prio-${column}-${ticket}`).style.backgroundColor = `${boardColumns[column][ticket]['prior']['color']}`;
    for (let i = 0; i < boardColumns[column][ticket]['team'].length; i++) coloringTicketInfoPopupMembers(column, ticket, i);
    document.getElementById(`ticket-info-popup-prio-image-${column}-${ticket}`).style.filter = `brightness(0) invert(1)`;
}

/**
 *  That functions colors the ticketmembers icon-background-color when opening the ticket-info.
 * @param {number} column - column is the column number starting at 0
 * @param {number} ticket - ticket is the row or the ticket-number in that column 
 * @param {number} teamMember - teamMember is the index of teammember in that ticket 
 */
function coloringTicketInfoPopupMembers(column, ticket, teamMember) {
    document.getElementById(`ticket-info-popup-member-circle-${column}-${ticket}-${teamMember}`).style.backgroundColor = `${boardColumns[column][ticket]['team'][teamMember]['color']}`;
}

/** 
 * That function will be executed when closing the ticket-info-popup. 
 *  It renders the board if the variable 'taskEditted' (the ticket has been editted) is true.
 */
function closeTicketInfoPopup() {
    document.getElementById('board-ticket-info-popup-full').classList.add('d-none');
    document.getElementById('board-ticket-info-popup-full').innerHTML = '';
    if(taskEditted) {
        taskEditted = false;
        renderBoard();
        hideSomeTickets();
    }
}


//////////////////// CREATED TASK ANIMATION ///////////////////////////////

/** 
 * This function is responsible for the animation of several pop ups sliding in from the bottom 
 */
function startSlideUPAnimation() {
    if((window.location.pathname == '/board.html') || (window.location.pathname == '/contacts.html')) {
        if(task['prior']['name'] != undefined && task['category']['name'] != undefined) {
            document.getElementById('pop-up-created-task').classList.add('create-task-animation');
            setTimeout(() => {
                endSlideUPAnimation();
            }, 1400);
        }
        } else if(task['prior']['name'] != undefined && task['category']['name'] != undefined) {
            document.getElementById('pop-up-created-task').classList.add('create-task-animation');
        }
        
        
}

/** 
 * This function ends the slide up animation 
 */
function endSlideUPAnimation() {
    document.getElementById('pop-up-created-task').classList.remove('create-task-animation');
}


//////////////////// BOARD: ADD-TASK POPUP ///////////////////////////////
/** 
 * Rendering the AddTask template in board.html 
 */
async function renderAddTaskInBoard(parameterCounter) {
    //document.getElementById('board-addtask-popup-content').innerHTML = '';
    await includeHTML();
    clearTask(parameterCounter);
    clearIconArray();
    renderAddTask();  //in add_task.js
}

/** 
 * Renders the addtask popup content (in board.html and contacts.html) 
 */
function renderTemplateBoardAddtaskPopupContent() {
    let wrapper = document.getElementById(`board-addtask-popup`);
    wrapper.innerHTML = templateBoardAddtaskPopup();
}

/** 
 * Renders the created addtask popup
 */
function renderPopupCreatedAddtask() {
    let content = document.getElementById('board-addtask-popup');
    content.innerHTML +=  templateCreatedTaskPopUp();
}

let parameterForTaskCreation;

/**
 * Render the popup when opening addtask in board. 
 */
async function openBoardAddtaskPopup(parameterForTask, parameterCounter) {
    await renderAddTaskInBoard(parameterCounter)
    removeClasslist(`board-addtask-popup-full`, `hideBackgroundAnimation`);
    removeClasslist(`board-addtask-popup-full`,`d-none`);
    addClasslist(`board-addtask-popup-full`,`showBackgroundAnimation`);
    addClasslist(`board-addtask-popup-full`,`opa-1`);
    boardAddtaskPopupSlideIn(parameterForTask);
}

/** 
 * That function adds a class to slide-in the addtask popup 
 */
function boardAddtaskPopupSlideIn(parameterForTaskParameter) {
    parameterForTaskCreation = parameterForTaskParameter;
    setTimeout(() => {
        addClasslist(`board-addtask-popup`, `board-addtask-popup-slideIn`);
    }, 10);
}

/** 
 * That function closes the addtask popup. 
 */
function closeBoardAddtaskPopup() {
    removeClasslist(`board-addtask-popup`,'board-addtask-popup-slideIn');
    removeClasslist(`board-addtask-popup-full`,'showBackgroundAnimation');
    boardAddtaskPopupSlideOut();
}

/** 
 * That function closes the addtask popup, when it was filled and created. 
 */
function closeBoardAddtaskPopupFilled() {
    if (!URLequalsAddTaskHtml() && task['prior']['name'] != undefined && task['category']['name'] != undefined) {
        closeBoardAddtaskPopupSlideoutAndBackgroundanimation();
        setTimeout(() => {
            addClasslist(`board-addtask-popup-full`, `d-none`);
            document.getElementById('board-addtask-popup-content').innerHTML = ''; //wait until the window is not visible
        }, 960);
        setTimeout(() => {
            //window.location.href = './board.html';
            renderBoard();
        }, 990);
    }
}

/** 
 * That function removes and add some classes for Popup slide-out and background animation. 
 */
function closeBoardAddtaskPopupSlideoutAndBackgroundanimation() {
    setTimeout(() => {
        removeClasslist(`board-addtask-popup`,'board-addtask-popup-slideIn');
        removeClasslist(`board-addtask-popup-full`,'showBackgroundAnimation');
    }, 700);
    setTimeout(() => {
        addClasslist(`board-addtask-popup-full`, `hideBackgroundAnimation`);
        removeClasslist(`board-addtask-popup-full`,`opa-1`);
    }, 830);
}

/** 
 * That function lets the addtask popup slide-out when closing it without filling out 
 */
function boardAddtaskPopupSlideOut() {
    if(window.innerWidth > 800) {
        setTimeout(() => {
            addClasslist(`board-addtask-popup-full`, `hideBackgroundAnimation`);
            removeClasslist(`board-addtask-popup-full`,`opa-1`);
        }, 102);
        setTimeout(() => {
            addClasslist(`board-addtask-popup-full`, `d-none`);
            document.getElementById('board-addtask-popup-content').innerHTML = '';
        }, 230);
    } else boardAddtaskNoSlide();
}

/** 
 * That function closes the addtask popup in (in responsive view) 
 */
function boardAddtaskNoSlide() {
    addClasslist(`board-addtask-popup-full`, `hideBackgroundAnimation`);
    removeClasslist(`board-addtask-popup-full`,`opa-1`);
    setTimeout(() => {
        addClasslist(`board-addtask-popup-full`, `d-none`);
    }, 1);
}


//////////////////// CONTACT: CONTACT INFO POPUP (ONLY RESPONSIVE)///////////////////////////////
/** 
 * Returns a fullscreen template when opening the contact-info popup in (in responsive view).
 */
function renderContactsInfoPopupResponsive() {
        return `<div class="contact-info-popup-responsive-full column flex fixed w-100 d-none" id="contact-info-popup-responsive-full"></div>`;
}

/** 
 * That function shows the contact-info in (in responsive view). It renders templates and color functions.
 * @param {number} contact - contact is the index of a contact in the 'contacts' array
 */
function showContactInfoPopupResponsive(contact) {
    renderTemplateContactInfoPopupResp(contact);
    contactInfoPopupAbbreviationColoring(contact);
    removeClasslist('contact-info-popup-responsive-full', 'd-none');
}

/** 
 * That function renders the contact-info popup template in (in responsive view).
 * @param {number} profil - profil is the index of a contact in the 'contacts' array 
 */
function renderTemplateContactInfoPopupResp(profil) {
    let content = document.getElementById(`contact-info-popup-responsive-full`);
    content.innerHTML = templateContactInfoPopupResp(profil);
    renderTemplateContactInfoPopupInnerWrapper();
    renderTemplateContactInfoPopupRespContactInfo(profil);
}


