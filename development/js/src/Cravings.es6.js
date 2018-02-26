/**
 * T A B L E   O F   C O N T E N T S
 *
 * @author      Geek Power Web Design
 * @version     1.0
 *
 * 01. CLASS SET UP
 */


/**
 * 01. CLASS SET UP
 * Sets up the class
 *
 * @param       user        string      The user id based on local storage
 */
export default class Cravings {

    constructor(user) {

        this.ajaxPath      = $('#path').val();
        this.mainError     = $('.main-error');
        this.mainOverlay   = $('.main-overlay');
        this.fetchCravings = this.fetchCravings.bind(this);
        this.errorInterval = '';

        if (!!user) {
            this.user = user;
            this.fetchCravings();
        } else {
            $.ajax({
                type      : "POST",
                url       : this.ajaxPath + 'set-user-id.php',
                data      : {},
                dataType  : "json",
                beforeSend: () => {

                },
                success   : (response) => {
                    localStorage.setItem('user', response.id);
                    this.user = response.id;
                    $('.no-items').removeClass('hide');
                    $('#items-wrap').addClass('hide');
                    $('.fetching-items').addClass('hide');
                }
            });
        }
    }

    /**
     * 01.01. GET URL DEATILS
     * Gets the details of the url that was entered
     */
    getUrlDetails(theInput = $('#url-input')) {

        const theURL = theInput.val().trim();
        let formData = {};


        if (theURL.length) {

            formData.url  = theURL;
            formData.user = parseFloat(this.user);

            $.ajax({
                type      : "POST",
                url       : this.ajaxPath + 'get_url_details.php',
                data      : formData,
                dataType  : "json",
                beforeSend: () => {
                    $('.spinner, .spinner-overlay').fadeIn(400);
                    clearInterval(this.errorInterval);
                    this.mainError.removeClass('show');
                },
                success   : (response) => {
                    $('.spinner, .spinner-overlay').fadeOut(400);

                    if (!response.error) {

                        response.url = theURL;
                        theInput.val('').trigger('input');
                        $('#items-wrap').prepend(this.buildItemMarkup(response));
                        $('#items-wrap').removeClass('hide');
                        $('.no-items').addClass('hide');
                    } else {
                        this.mainError.find('p').text(response.error);
                        this.mainError.addClass('show');
                        this.errorInterval = setInterval(this.hideError.bind(this), 4000);
                    }
                }
            });
        }
    }


    /**
     * 01.02. BUILD ITEM MARKUP
     * Builds the item markup
     *
     * @param       theObj      object      The object containing
     *
     * @return      theMarkup   string      The markup
     */
    buildItemMarkup(theObj = {}) {

        let theMarkup = '';
        let hasImage = true;

        if (!theObj.hasOwnProperty('description') || !theObj.description) {
            theObj.description = `No description available, but I bet it's delicious! You should definitely post more yummy things!`;
        }

        if (!theObj.hasOwnProperty('image') || !theObj.image) {

            theObj.image = '';
            hasImage = false;
        }

        theMarkup = (`
            <div class="item" data-id="${theObj.id}" id="item${theObj.id}">
                <a href="${theObj.url}" target="_blank" class="image ${(!hasImage ? 'no-image' : '')}">
                    ${(hasImage ? `<img src="${theObj.image}"/>` : '')}
                </a>
                <div class="text">
                    <h2><a href="${theObj.url}" target="_blank">${(theObj.title || 'Something delicious')}</a></h2>
                    <p>${theObj.description}</p>
                </div>
                <div class="controls">
                    <span class="remove"><i class="material-icons">&#xE872;</i> Remove</span>
                </div>
            </div>            
        `);

        return theMarkup;
    }


    /**
     * 01.03. HIDE ERROR
     * Hides the error
     */
    hideError() {

        this.mainError.removeClass('show');
        clearInterval(this.errorInterval);
    }


    /**
     * 01.04.REMOVE ITEM
     * Removes the item from the database
     *
     * @param       id      string      The id of the url entry
     */
    removeItem(id) {

        var formData = {id};

        $.ajax({
            type      : "POST",
            url       : this.ajaxPath + 'delete-entry.php',
            data      : formData,
            dataType  : "json",
            beforeSend: () => {
                $('.spinner, .spinner-overlay').fadeIn(400);
                clearInterval(this.errorInterval);
                this.mainError.removeClass('show');
            },
            success   : (response) => {

                $('.spinner, .spinner-overlay').fadeOut(400);
                if (!response.error) {

                    $(`#item${response.id}`).remove();
                    // TODO: check if table is empty
                } else {
                    this.mainError.find('p').text(response.error);
                    this.mainError.addClass('show');
                    this.errorInterval = setInterval(this.hideError.bind(this), 4000);
                }
            }
        });
    }


    /**
     * 01.05. FETCH CRAVINGS
     * Fetches the cravings for the user
     */
    fetchCravings() {

        const formData = {user: this.user};
        let markup     = '';

        $.ajax({
            type      : "POST",
            url       : this.ajaxPath + 'fetch-cravings.php',
            data      : formData,
            dataType  : "json",
            beforeSend: () => {

            },
            success   : (response) => {
                $('.fetching-items').addClass('hide');
                this.mainOverlay.hide();

                if (response.cravings.length) {

                    for (let cravings of response.cravings) {
                        markup += buildItemMarkup(cravings);
                    }
                    $('#items-wrap').prepend(markup);
                    $('#items-wrap').removeClass('hide');
                } else {

                    $('.no-items').removeClass('hide');
                    $('#items-wrap').addClass('hide');
                }
            }
        });
    }


}