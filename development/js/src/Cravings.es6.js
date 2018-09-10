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
        this.cravings      = (JSON.parse(localStorage.getItem('cravings')) || []);

        $('.fetching-items').addClass('hide');
        if (this.cravings.length) {

        } else {
            $('.no-items').removeClass('hide');
        }

        console.log(this.cravings);

        if (!!user) {
            // this.user = user;
            // this.fetchCravings();
        } else {
            // $.ajax({
            //     type      : "POST",
            //     url       : this.ajaxPath + 'set-user-id.php',
            //     data      : {},
            //     dataType  : "json",
            //     beforeSend: () => {
            //
            //     },
            //     success   : (response) => {
            //         localStorage.setItem('user', response.id);
            //         this.user = response.id;
            //         $('.no-items').removeClass('hide');
            //         $('#items-wrap').addClass('hide');
            //         $('.fetching-items').addClass('hide');
            //     }
            // });
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

                    console.log(response);

                    if (!response.error) {

                        // response.url = theURL;
                        theInput.val('').trigger('input');
                        $('#cravings-wrapper').prepend(this.buildItemMarkup(response.data));
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
     * @param       obj      object      The object containing
     *
     * @return      theMarkup   string      The markup
     */
    buildItemMarkup(obj = {}) {

        let theMarkup = '';
        let image     = false;
        
        for (let i of obj.images) {
            if (i.width >= 300) {
                image = i;
                break;
            }
        }

        // check if description
        theMarkup = (`
            <div class="craving" ${(!!image ? `style="background-image: url(${image.url});"` : '')}>
                <a href="${obj.url}"></a>
                <div>
                    <div>
                        <div class="actions">
                            <a href="#"><i class="far fa-external-link"></i></a>
                            <span><i class="far fa-trash"></i></span>
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