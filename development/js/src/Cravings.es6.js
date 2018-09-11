/**
 * T A B L E   O F   C O N T E N T S
 *
 * @author      Geek Power Web Design
 * @version     1.0
 *
 * 01.    CLASS SET UP
 * 01.01. GET URL DETAILS
 * 01.02. BUILD CRAVING MARKUP
 * 01.03. HIDE ERROR
 * 01.04. REMOVE ITEM
 * 01.05. FETCH CRAVINGS
 * 01.06. GET PREVIEW IMAGE
 */


/**
 * 01. CLASS SET UP
 * Sets up the class
 *
 * @param       user        string      The user id based on local storage
 */
export default class Cravings {


    /**
     * 01. CLASS SET UP
     * Sets up the cravings class
     */
    constructor() {

        this.ajaxPath            = $('#path').val();
        this.mainError           = $('.main-error');
        this.mainOverlay         = $('.main-overlay');
        this.errorInterval       = '';
        this.cravings            = (JSON.parse(localStorage.getItem('cravings')) || {});
        this.cravingsArrayLength = (Object.keys(this.cravings)).length;

        if (this.cravingsArrayLength) {
            setTimeout(() => {
                this.fetch_cravings();
            }, (Math.ceil(Math.random() * 3) * 1000)); // faux loading time
        } else {
            $('.no-items').removeClass('hide');
            $('.fetching-items').addClass('hide');
            this.mainOverlay.hide();
        }
    }

    /**
     * 01.01. GET URL DETAILS
     * Gets the details of the url that was entered
     */
    get_urlDetails(theInput = $('#url-input')) {

        let theURL = theInput.val().trim();
        let formData = {};


        if (theURL.length) {

            if (theURL.indexOf('http') == -1) {
                if (theURL.indexOf('www.') == -1) {
                    theURL = 'http://www.' + theURL;
                } else {
                    theURL = 'http://' + theURL;
                }
                theInput.val(theURL);
            }

            formData.url  = theURL;

            $.ajax({
                type      : "POST",
                url       : this.ajaxPath + 'get_url_details.php',
                data      : formData,
                dataType  : "json",
                beforeSend: () => {
                    $('.spinner, .spinner-overlay').fadeIn(400);
                    clearInterval(this.errorInterval);
                    this.mainError.removeClass('show');
                    document.activeElement.blur();
                },
                success   : (response) => {

                    $('.spinner, .spinner-overlay').fadeOut(400);
                    if (!response.error) {

                        // response.url = theURL;
                        theInput.val('').trigger('input');
                        $('#cravings-wrapper').prepend(this.build_cravingMarkup(response.data));
                        $('#cravings-wrapper').removeClass('hide');
                        $('.no-items').addClass('hide');


                        this.cravings[this.cravingsArrayLength] = {
                            id         : this.cravingsArrayLength,
                            title      : response.data.title,
                            description: response.data.description,
                            images     : response.data.images,
                            url        : response.data.url
                        };

                        this.cravingsArrayLength++;
                        localStorage.setItem('cravings', JSON.stringify(this.cravings));

                    } else {
                        theInput.focus();
                        this.mainError.find('p').text(response.error);
                        this.mainError.addClass('show');
                        this.errorInterval = setInterval(this.hideError.bind(this), 4000);
                    }
                },
                error    : () => {
                    this.mainError.find('p').text('Oh shoot, something went wrong. Try again later.');
                    this.mainError.addClass('show');
                    this.errorInterval = setInterval(this.hideError.bind(this), 4000);
                    $('.spinner, .spinner-overlay').fadeOut(400);
                    theInput.focus();
                }
            });
        }
    }


    /**
     * 01.02. BUILD CRAVING MARKUP
     * Builds the craving markup
     *
     * @param       obj      object      The object containing
     *
     * @return      theMarkup   string      The markup
     */
    build_cravingMarkup(obj = {}) {

        let theMarkup = '';
        let image     = this.get_previewImage((obj.images || []));

        // check if description
        theMarkup = (`
            <div class="craving" ${(!!image ? `style="background-image: url(${image.url});"` : '')} data-id="cravings-${obj.id}">
                <a href="${obj.url}" target="_blank"></a>
                <div>
                    <div>
                        <div class="actions">
                            <a href="${obj.url}" target="_blank"><i class="far fa-external-link"></i></a>
                            <span class="remove"><i class="far fa-trash"></i></span>
                        </div>
                    </div>
        
                    <div class="title">
                        <a href="${obj.url}" target="_blank">${(obj.title || 'Something delicious, I\'m sure!')}</a>
                    </div>
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
     * 01.04. REMOVE ITEM
     * Removes the item from the database
     *
     * @param       craving     element     The craving that is being removed
     */
    remove_item(craving) {

        const id = craving.attr('data-id').split('-')[1];

        $('.spinner, .spinner-overlay').fadeIn(400);

        setTimeout(() => {

            craving.remove();
            delete this.cravings[id];
            this.cravingsArrayLength--;
            localStorage.setItem('cravings', JSON.stringify(this.cravings));
            $('.spinner, .spinner-overlay').fadeOut(400);

            if (!this.cravingsArrayLength) {
                $('#cravings-wrapper').addClass('hide');
                $('.no-items').removeClass('hide');
            }

        }, (Math.ceil(Math.random() * 4) * 500)); // faux loading

    }


    /**
     * 01.05. FETCH CRAVINGS
     * Fetches the cravings for the user
     */
    fetch_cravings() {

        let markup = '';
        const cravingsWrapper = $('#cravings-wrapper');

        for (let craving in this.cravings) {
            markup = this.build_cravingMarkup(this.cravings[craving]) + markup;
        }

        cravingsWrapper.prepend(markup);
        cravingsWrapper.removeClass('hide');
        $('.fetching-items').addClass('hide');
        this.mainOverlay.hide();
    }


    /**
     * 01.06. GET PREVIEW IMAGE
     * Loops through all returned images and returns one that matches the desired size
     *
     * @param       images      array       The images to loop through
     * @param       size        integer     The desired image size
     *
     * @return      image       object      The image that meets the size. If none found, will be false
     */
    get_previewImage(images = [], size = 400) {

        let image = false;

        for (let i of images) {
            if (i.width >= size) {
                image = i;
                break;
            }
        }

        return image;
    }



}