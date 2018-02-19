import Cravings from './Cravings.es6';

/**
 * T A B L E   O F   C O N T E N T S
 *
 * @author      Geek Power Web Design
 * @version     1.0
 *
 * XX. ON LOAD
 * XX. ASSIGN FUNCTIONS
 */




$(window).load(function() {

    /**
     * XX. ON LOAD
     * Function to run on load
     */
});


$(document).ready(function() {

    /**
     * XX. ASSIGN FUNCTIONS
     * Runs / assigns functions when the document is ready.
     */

    const cravings = new Cravings();

    $('#url-input').on('keydown', function(e) {
        if (e.keyCode === 13 && $('#url-input').val().trim().length) {
            $('#add-url').trigger('click');
        }
    })
    $('#add-url').on('click', function() {
        cravings.getUrlDetails($('#url-input'));
    });

    $('body').on('click', '.remove', function() {
        cravings.removeItem($(this).parents('.item').attr('data-id'));
    })


});