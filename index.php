<?php

    require_once('./_includes/config.php');
    require_once('./_includes/header.php');
?>

    <input type="text" id="url-input" placeholder="Enter or paste the URL"/>
    <button id="add-url">Go</button>
    <input type="hidden" value="<?php echo BASE_URL;?>/ajax/" id="path">

<?php
    require_once('./_includes/footer.php');
?>