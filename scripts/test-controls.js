(function(){
    "use strict";
    var d = document,
    $ = function(selector){ return d.querySelector(selector); },
    controls = $('.js-controls'),
    grid = $('.js-grid'),
    stage = $('.js-stage'),
    handleControls,
    addGridItem,
    createGridItem,
    removeGridItem,
    toggleWidth,
    createElem;

    var controlTypes = {
        add: 'js-trigger-add-item',
        remove: 'js-trigger-remove-item',
        toggleWidth: 'js-trigger-toggle-width'
    }


    /**
     * Utility to create a document element and add classes
     * @return element
     */

    createElem = function(elem, classes){
        var element = document.createElement(elem);
        element.className = classes;
        return element;
    }

    /**
     * Creates the markup for the grid item
     * @return document fragment
     */

    createGridItem = function(){
        var frag = document.createDocumentFragment();
        var listItem = createElem('li', 'grid__item'),
            card = createElem('div', 'card'),
            cardImage = createElem('div', 'card__image'),
            cardContent = createElem('div', 'card__content'),
            cardHeading = createElem('h3', 'card__heading'),
            cardText = createElem('p', 'card__text'),
            cardButton = createElem('button', 'card__button');

        cardHeading.textContent = "New Item";
        cardText.textContent = "This is some stuff for a grid item that was created dynamically.";
        cardButton.textContent = "Also nothing";

        cardContent.appendChild(cardHeading);
        cardContent.appendChild(cardText);
        cardContent.appendChild(cardButton);
        card.appendChild(cardImage);
        card.appendChild(cardContent);

        listItem.appendChild(card);
        frag.appendChild(listItem);
        return frag;
    }

    /**
     * Appends a grid item to the current grid
     * @return {[type]} [description]
     */

    addGridItem = function addGridItem(){
        var item = createGridItem();
        grid.appendChild(item);
    }

    /**
     * Deletes the last grid item from the grid
     * @return {[type]} [description]
     */
    removeGridItem = function(){
        grid.removeChild(grid.lastChild);
    }

    toggleWidth = function(){
        stage.classList.toggle('is-reduced');
    }

    handleControls = function(event){
        if(event.target.classList.contains('js-trigger-add-item')){
            addGridItem();
            console.log("added");
        } else if(event.target.classList.contains('js-trigger-remove-item')){
            removeGridItem();
            console.log("removed");
        } else if(event.target.classList.contains('js-trigger-toggle-width')){
            toggleWidth();
        }

    }

    controls.addEventListener('click', handleControls, false);

})();