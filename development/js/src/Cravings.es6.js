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
 */
export default class Cravings {

    constructor() {

        this.ajaxPath = $('#path').val();

    }

    /**
     * 01.01. GET URL DEATILS
     * Gets the details of the url that was entered
     */
    getUrlDetails(theInput = $('#url-input')) {

        const theURL = theInput.val().trim();
        let formData = {};


        if (theURL.length) {

            formData.url = theURL;

            $.ajax({
                type      : "POST",
                url       : this.ajaxPath + 'get_url_details.php',
                data      : formData,
                dataType  : "json",
                beforeSend: () => {
                    // TODO: show loading icon
                    // TODO: Hide error if it exists
                },
                success   : (response) => {

                    console.log(response);

                    if (!response.error) {

                        response.url = theURL;
                        theInput.val('').trigger('input');
                        $('#items-wrap').prepend(this.buildItemMarkup(response));
                    } else {
                        // TODO: show error
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

        if (!theObj.hasOwnProperty('description') || theObj.description == '') {
            theObj.description = `No description available, but I bet it's delicious!`;
        }

        if (!theObj.hasOwnProperty('image') || theObj.image == '') {

            theObj.image = '';
            hasImage = false;
        }

        theMarkup = (`
            <div class="item">
                <a href="${theObj.url}" target="_blank" class="image ${(!hasImage ? 'no-image' : '')}">
                    ${(hasImage ? `<img src="${theObj.image}"/>` : '')}
                </a>
                <div class="text">
                    <h2><a href="${theObj.url}" target="_blank">${theObj.title}</a></h2>
                    <p>${theObj.description}</p>
                </div>
                <div class="controls">
                    <span class="remove"><i class="material-icons">&#xE872;</i> Remove</span>
                </div>
            </div>            
        `);

        return theMarkup;
    }
}