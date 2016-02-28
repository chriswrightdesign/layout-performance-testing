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
    createElem,
    gridCreator,
    add100GridItems,
    getRandomArbitrary,
    getRandomText;

    var actionsList, getCurrentAction;


    /**
     * Utility to create a document element and add classes
     * @return element
     */

    createElem = function(elem, classes){
        var element = document.createElement(elem);
        element.className = classes;
        return element;
    }

    getRandomArbitrary = function(min, max){
        return Math.random() * (max - min) + min;
    }

    /**
     * Not really that random, but allows me to alternate for the text
     * @return String;
     */

    getRandomText = function(){
        var text;
        if(getRandomArbitrary(1, 5) > 3){
            text = "This is some stuff for a grid item that was created dynamically."
        } else {
            text = "This is some stuff for a grid item that was created dynamically. I added a randomizer to make sure some of the boxes were longer than the other to force flexbox to do its flexy thing with stretch."
        }

        return text;
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
            var image = new Image();
            image.className = "image";

        cardHeading.textContent = "New Item";
        cardText.textContent = getRandomText();
        cardButton.textContent = "Also nothing";
        cardImage.appendChild(image);
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
     * usage: var creator50 = gridCreator(50);
     *  creator50(createGridItem);
     * @param  {[type]} count [description]
     * @return {[type]}       [description]
     */

    gridCreator = function(count){
        var MAX_COUNT = count;
        return function(func){
            var docFrag = document.createDocumentFragment();
            var currentCount = 0;
            while(currentCount < MAX_COUNT){
                var item = func();
                docFrag.appendChild(item);
                currentCount++;
            }
            return docFrag;
        }
    }

    add100GridItems = function(){
        var creator100 = gridCreator(100);
        var items = creator100(createGridItem);
        grid.appendChild(items);
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

    actionsList = {
        'js-trigger-add-item': addGridItem,
        'js-trigger-remove-item': removeGridItem,
        'js-trigger-toggle-width': toggleWidth,
        'js-trigger-add-100': add100GridItems
    }

    getCurrentAction = function(target, actions){
        var actionKeys = Object.keys(actions);
        for(var action in actionKeys){
            if(target.classList.contains(actionKeys[action])){
                return actions[actionKeys[action]];
            }
        }
    }

    handleControls = function(event){
        var classes = event.target.classList;
        var trigger = getCurrentAction(event.target, actionsList);
        trigger();
    }

    controls.addEventListener('click', handleControls, false);

})();