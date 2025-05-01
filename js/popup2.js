/**
 * That function renders the inner wrapper of the contact-info popup (in responsive view). 
 */
function renderTemplateContactInfoPopupInnerWrapper() {
    let content = document.getElementById(`contact-info-popup-resp-inner-wrapper`);
    content.innerHTML = templateContactInfoPopupRespInnerWrapper();
}

/** 
 * That function renders the contact-info template part with the contact infos (in responsive view).
 * @param {number} member - member is the index of a contact in the 'contacts' array 
 */
function renderTemplateContactInfoPopupRespContactInfo(member) {
    let content = document.getElementById(`contact-info-popup-resp-contactInfo`);
    content.innerHTML = renderTemplateContactInfoPopupAbbreviationAndName(member);
    content.innerHTML += renderTemplateContactInfoPopupTitleAndEditContactBtn(member);
    content.innerHTML += renderTemplateContactInfoPopupEmailAndPhone(member);
}

/** 
 * That function closes/adds display:none to the contact-info popup container (in responsive view). 
 */
function closeContactInfoPopupResponsive() {
    addClasslist('contact-info-popup-responsive-full', 'd-none');
}

//////////////////// CONTACT: NEW CONTACT BTN - POPUP///////////////////////////////

/** 
 * That function is used for creating a 'new contact', but also for 'editting' a contact. 
 *  When a 'new contact' is created, there is no index necessary.
 *  And when there hasn't been clicked on a contact, there is no index given. So an alternative index, if none is give, is 0.
 * @param {number} index - index of that contact in the array 'contacts'. 
 */
function openContactsNewContactPopup(index = 0) {
    renderContactsNewContactPopup(index);
    removeClasslist(`contacts-new-contact-popup-full`, `hideBackgroundAnimation`);
    removeClasslist(`contacts-new-contact-popup-full`,`d-none`);
    addClasslist(`contacts-new-contact-popup-full`,`showBackgroundAnimation`);
    addClasslist(`contacts-new-contact-popup-full`,`opa-1`);
    contactsNewContactSlideIn();
}

/** 
 * That function renders the popup with the right buttons when clicked on 'new contact' or 'edit contact'.
 * @param {number} index - index of that contact in the array 'contacts'. 
 */
function renderContactsNewContactPopup(index) {
    let wrapper = document.getElementById(`contacts-new-contact-popup-container`);
    wrapper.innerHTML = templateNewContactPopup();
    renderTemplateNewContactPopupContent(index);
    wrapper.innerHTML += templateNewContactCloseCross();
    displayBTNs(index); 
    if(edittingNewContact) document.getElementById(`contacts-new-contact-popup-abbreviation-container`).style.backgroundColor = `${contacts[index]['color']}`;
}



/**
 * Renders the inner templates of the 'new contact' or 'edit contact' popup. 
 */
function renderTemplateNewContactPopupContent(index) {
    let wrapper = document.getElementById(`contacts-new-contact-popup`);
    wrapper.innerHTML = templateNewContactTitleAndLogo();
    wrapper.innerHTML += templateNewContactPopupFormSide();
    let innerWrapper = document.getElementById(`contacts-new-contact-popup-form-side`);
    innerWrapper.innerHTML = templateNewContactPopupAbbreviationWrapper();
    innerWrapper.innerHTML += templateNewContactPopupForm();
    let secondWrapper = document.getElementById(`contacts-new-contact-popup-form-container`);
    secondWrapper.innerHTML = templateNewContactPopupFormInputs();
    secondWrapper.innerHTML += templateNewContactPopupFormBtns(index);
}

/** 
 * That function is for displaying the right buttons for creating or editting a contact in 'new contact' or 'edit contact' popup template.
 * @param {number} index -  index of that contact in the array 'contacts'. 
 */
function displayBTNs(index) {
    if(window.innerWidth > 800) {
        if(!edittingNewContact) showElementsInTemplateForAddingNewContact();
        else showElementsInTemplateForEdittingContact(index);
    } else {
        if (!edittingNewContact) showElementsInTemplateForAddingNewContact_resp();
        else showElementsInTemplateForEdittingContact(index);
    }
}

/** 
 * That function show elements in the 'new contact' or 'edit contact' popup template for adding a new contact. 
 */
function showElementsInTemplateForAddingNewContact() {
    removeClasslist(`contacts-new-contact-popup-title`, `d-none`);
    removeClasslist(`contacts-new-contact-popup-subtitle-container`, `d-none`);
    removeClasslist(`contacts-new-contact-abbreviation`, `d-none`);
    removeClasslist(`new-contact-popup-form-btn-create`, `d-none`);
    removeClasslist(`new-contact-popup-form-btn-cancel`, `d-none`);
}

/** 
 * That function show elements in the 'new contact' or 'edit contact' popup template for adding a new contact (in responsive view). 
 */
function showElementsInTemplateForAddingNewContact_resp() {
    removeClasslist(`contacts-new-contact-popup-title`, `d-none`);
    removeClasslist(`contacts-new-contact-popup-subtitle-container`, `d-none`);
    removeClasslist(`contacts-new-contact-abbreviation`, `d-none`);
    removeClasslist(`new-contact-popup-form-btn-create`, `d-none`);
}


/**
 * That function show elements in the 'new contact' or 'edit contact' popup template for editting a contact. 
 * @param {number} index - index of that contact in the array 'contacts'. 
 */
function showElementsInTemplateForEdittingContact(index) {
    removeClasslist(`contacts-add-contact-popup-title`, `d-none`);
    renderTemplateAbbreviationWrapperOfExistingUser(index);
    removeClasslist(`contacts-new-contact-abbreviation-existing-user`, `d-none`);
    addClasslist(`contacts-new-contact-popup-form-btns`, `justify-center`)
    removeClasslist(`edit-contact-popup-form-btn-save`, `d-none`);
    fillInputFieldsOfEditContactPopupWithExistingData(index);
}



/** 
 * That function fills the input fields with the stored data of that contact, when editting the contact in the edit-form popup. 
 * @param {number} index - index of that contact in the array 'contacts'. 
 */
function fillInputFieldsOfEditContactPopupWithExistingData(index) {
    document.getElementById(`name`).value = contacts[index]['name'];
    document.getElementById(`email`).value = contacts[index]['email'];
    document.getElementById(`phone`).value = contacts[index]['phone'];
}

/** 
 * That function executes a slide-in of the 'new contact' or 'edit contact' popup.
 */
function contactsNewContactSlideIn() {
    setTimeout(() => {
        if(window.innerWidth > 800) openContactPopupSlideIn();
        if(window.innerWidth < 801) openContactPopupSlideUp();
    }, 10);
}

/** 
 * That function executes a slide-out of the "uneditted" 'new contact' or 'edit contact' popup. 
 */
function closeContactsNewContactPopup() {
    if(window.innerWidth > 800) closeContactPopupSlideIn();
    if(window.innerWidth < 801) closeContactPopupSlideUp();
    removeClasslist(`contacts-new-contact-popup-full`,'showBackgroundAnimation');
    contactsNewContactsPopupSlideOut();
    cleanValuesForEdittingContact();
}

/** 
 * That function closes the background of the "uneditted" 'new contact' or 'edit contact' popup.   
 */
function contactsNewContactsPopupSlideOut() {
        setTimeout(() => {
            addClasslist(`contacts-new-contact-popup-full`, `hideBackgroundAnimation`);
            removeClasslist(`contacts-new-contact-popup-full`,`opa-1`);
        }, 102);
        setTimeout(() => {
            addClasslist(`contacts-new-contact-popup-full`, `d-none`);
            document.getElementById('contacts-new-contact-popup-container').innerHTML = '';
        }, 230);
}

/** 
 * That function closes the "filled-out/editted" 'new contact' or 'edit contact' popup. 
 */
function closeContactsNewContactPopupFilled() {
    closeContactsNewContactPopupFilledDnone();
    removeClasslist(`contacts-new-contact-popup-full`,'showBackgroundAnimation');
    addClasslist(`contacts-new-contact-popup-full`, `hideBackgroundAnimation`);
    removeClasslist(`contacts-new-contact-popup-full`,`opa-1`);
    setTimeout(() => {
        addClasslist(`contacts-new-contact-popup-full`, `d-none`);
        document.getElementById('board-addtask-popup-content').innerHTML = ''; //wait until the window is not visible
        document.getElementById(`contacts-new-contact-popup-container`).style = ``;
    }, 100);
    cleanValuesForEdittingContact();
}

/** 
 * That function closes the "filled-out/editted" 'new contact' or 'edit contact' popup (in responsive view).
 * Here without slide-out animation.  
 */
function closeContactsNewContactPopupFilledDnone() {
    document.getElementById(`contacts-new-contact-popup-container`).style.transition = `unset`;
    addContactPopupDnone();
    closeContactPopupSlideIn();
    closeContactPopupSlideUp();
    removeContactPopupDnone();
}

/** 
 * That function makes the "cancel" button in the 'new contact' or 'edit contact' popup to the color lightblue onmouseover. 
 */
function changeColorOfContactsNewContactBtnCancelToLightblue() {
    addClasslist(`new-contact-form-btn-cancel-cross-black`, `d-none`);
    removeClasslist(`new-contact-form-btn-cancel-cross-blue`, `d-none`);
}

/** 
 * That function makes the "cancel" button in the 'new contact' or 'edit contact' popup to the color black onmouseover. 
 */
function changeColorOfContactsNewContactBtnCancelToBlack() {
    removeClasslist(`new-contact-form-btn-cancel-cross-black`, `d-none`);
    addClasslist(`new-contact-form-btn-cancel-cross-blue`, `d-none`);
}

/** 
 * That function adds the slide-in class to the 'new contact' or 'edit contact' popup 
 */
function openContactPopupSlideIn() {
    addClasslist(`contacts-new-contact-popup-container`,'board-addtask-popup-slideIn');
}

/**
 *  That function removes the slide-in class to the 'new contact' or 'edit contact' popup 
 */
function closeContactPopupSlideIn() {
    removeClasslist(`contacts-new-contact-popup-container`,'board-addtask-popup-slideIn');
}

/** 
 * That function adds the slide-up class to the 'new contact' or 'edit contact' popup 
 */
function openContactPopupSlideUp() {
    addClasslist(`contacts-new-contact-popup-container`,'contacts-popup-slideIn-responsive');
}

/** 
 * That function removes the slide-up class to the 'new contact' or 'edit contact' popup 
 */
function closeContactPopupSlideUp() {
    removeClasslist(`contacts-new-contact-popup-container`,'contacts-popup-slideIn-responsive');
}

/** 
 * That function closes the 'new contact' or 'edit contact' popup without animation, when "filled-out/editted" (in responsive view).  
 */
function addContactPopupDnone() {
    addClasslist(`contacts-new-contact-popup-container`,'d-none');
}

/** 
 * That function removes the d-none class of the 'new contact' or 'edit contact' popup, after removing the slide-in and slide-up classes, for further use.
 */
function removeContactPopupDnone() {
    removeClasslist(`contacts-new-contact-popup-container`,'d-none');
}