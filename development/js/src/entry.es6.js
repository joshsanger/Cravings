import Cravings from './Cravings.es6';

/**
 * T A B L E   O F   C O N T E N T S
 *
 * @author      Joshua Sanger
 * @version     1.0
 *
 * XX. ON LOAD
 * XX. ASSIGN FUNCTIONS
 */


$(document).ready(function() {

    /**
     * XX. ASSIGN FUNCTIONS
     * Runs / assigns functions when the document is ready.
     */
    const cravings = new Cravings();

    $('#url-input').on({
        keydown: function(e) {
            if (e.keyCode === 13 && $('#url-input').val().trim().length) {
                $('#add-url').trigger('click');
            }
        },
        input: function() {
            $('#add-url').prop('disabled', !($(this).val().trim().length));
        },
        paste: function() {
            $('#add-url').prop('disabled', !($(this).val().trim().length));
        }
    });

    $('#add-url').on('click', function() {
        cravings.get_urlDetails($('#url-input'));
    });

    $('body').on('click', '.remove', function() {
        cravings.remove_item($(this).parents('.craving'));
    });
});