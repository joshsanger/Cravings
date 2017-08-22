<?php
    require_once('./_includes/database.php');
    require_once('./_includes/config.php');
    require_once('./_includes/header.php');

    try {
        $db = mysqli_connect(DB_HOST, DB_USER, DB_PASSWORD, DB_NAME);
        $query = " SELECT * FROM urls ORDER BY id DESC";
        $result = $db->query($query);

        if (mysqli_connect_errno()) {
            throw new Exception('Failed to connect to MySQL: ' . mysqli_connect_error());
        }

        if (!$result) {
            throw new Exception('Database Error!');
        }

    } catch (Exception $e) {

    } finally {

    }
?>

<input type="text" id="url-input" placeholder="Enter or paste the URL"/>
<button id="add-url">Go</button>


<div id="items-wrap">

    <?php

        if ($result = mysqli_query($db, $query)) {

            /* fetch associative array */
            while ($row = mysqli_fetch_row($result)) {?>
            <a href="<?php echo $row[1];?>" class="item">
                <div class="image">
                    <img src="<?php echo $row[4];?>"/>
                </div>
                <div class="text">
                    <h2><?php echo $row[2];?></h2>
                    <p><?php echo $row[3];?></p>
                </div>
                <div class="controls">
                    <span class="remove">Remove <i class="material-icons">&#xE872;</i></span>
                </div>
            </a>

            <?php

            }

            mysqli_free_result($result);
        }

        mysqli_close($db);
    ?>


</div>
<input type="hidden" value="<?php echo BASE_URL;?>/ajax/" id="path">
<input type="hidden" value="<?php echo BASE_URL;?>/assets/" id="assets">

<?php
    require_once('./_includes/footer.php');
?>