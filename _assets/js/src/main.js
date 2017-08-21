/**
 * T A B L E   O F   C O N T E N T S
 *
 * @author      Joshua Sanger
 * @version     1.0
 *
 * 01. GLOBAL VARIABLES
 * XX. ON LOAD
 * XX. ASSIGN FUNCTIONS
 */

var ajaxPath;

/**
 * 02. GET URL DETAILS
 * Gets the details for the url
 */
function getUrlDetails() {

    var theURL   = $(this).val().trim();
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

                } else {

                }
            }
        });
    }
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
    $('#url-input').on('paste, input', getUrlDetails);
});