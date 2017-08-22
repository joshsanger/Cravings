/**
 * T A B L E   O F   C O N T E N T S
 *
 * @author      Joshua Sanger
 * @version     1.0
 *
 * 01. GLOBAL VARIABLES
 * 02. GET URL DETAILS
 * XX. ON LOAD
 * XX. ASSIGN FUNCTIONS
 */

/**
 * 01. GLOBAL VARIABLES
 * Variables used throughout the application
 */
var ajaxPath;

/**
 * 02. GET URL DETAILS
 * Gets the details for the url
 */
function getUrlDetails() {

    var theURL   = $('#url-input').val().trim();
    var formData = {};


    if (theURL.length) {

        formData.url = theURL;

        $.ajax({
            type      : "POST",
            url       : ajaxPath + 'get_url_details.php',
            data      : formData,
            dataType  : "json",
            beforeSend: function() {

            },
            success   : function(response) {

                console.log(response);

                if (!response.error) {
                    response.url = theURL;
                    $('#items-wrap').prepend(buildItemMarkup(response));
                } else {

                }
            }
        });
    }
}


/**
 * 03. BUILD ITEM MARKUP
 * Builds the item markup
 *
 * @param       theObj      object      The object containing
 *
 * @return      theMarkup   string      The markup
 */
function buildItemMarkup(theObj) {

    var theMarkup = '';

    if (!theObj.hasOwnProperty('description') || theObj.description == '') {
        theObj.description = 'No description available';
    }

    if (!theObj.hasOwnProperty('image') || theObj.image == '') {
        // theObj.image = $('#assets').val() + 'images/default.png';
        theObj.image = 'https://static.comicvine.com/uploads/original/11116/111163466/4571231-2792561597-Cooki.png';
    }

    theMarkup  = '<a href="' + theObj.url + '" class="item" target="_blank">';
    theMarkup +=    '<div class="image">';
    theMarkup +=        '<img src="' + theObj.image + '"/>';
    theMarkup +=    '</div>';
    theMarkup +=    '<div class="text">';
    theMarkup +=        '<h2>' + theObj.title + '</h2>';
    theMarkup +=        '<p>' + theObj.description + '</p>';
    theMarkup +=    '</div>';
    theMarkup +=    '<div class="controls">';
    theMarkup +=        '<span class="remove">Remove <i class="material-icons">&#xE872;</i></span>';
    theMarkup +=    '</div>';
    theMarkup += '</a>';

    return theMarkup;
}


$(window).load(function(){
    /**
     * XX. ON LOAD
     * Function to run on load
     */
});

$(document).ready(function(){

    /**
     * XX. ASSIGN FUNCTIONS
     * Assigns the functions to run the page once the document has loaded
     */
    ajaxPath = $('#path').val();
    $('#add-url').on('click', getUrlDetails);
});