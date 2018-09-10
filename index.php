<?php
    require_once('./_includes/config.php');
    require_once('./_includes/header.php');
?>

<section id="top">
    <div class="container">
        <h1>What are you craving, Rebecca?</h1>
        <div id="input-wrap">
            <div>
                <input type="text" id="url-input" placeholder="Enter or paste the URL"/>
                <span>
                    <i class="far fa-link"></i>
                </span>
            </div>
            <button id="add-url" disabled><i class="far fa-plus"></i> <span>Add</span></button>
        </div>
    </div>
</section>

<section class="no-items hide">
    <i class="far fa-info-circle"></i>
    <p>Hm, it looks like there aren't any cravings yet. <span class="faux-link" id="focus-on-field">Try adding some</span>!</p>
</section> <!-- /no-items -->
<section class="fetching-items">
    <div class="spinner slow">
        <div class="double-bounce1"></div>
        <div class="double-bounce2"></div>
    </div>
    <p>Hang on a quick sec, collecting your cravings. Thank you for your patience.</p>
</section> <!-- /no-items -->
<dection id="cravings-wrapper">

</dection>
<input type="hidden" value="<?php echo BASE_URL;?>/ajax/" id="path">
<input type="hidden" value="<?php echo BASE_URL;?>/assets/" id="assets">

<?php
    require_once('./_includes/footer.php');
?>