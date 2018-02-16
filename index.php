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
<section id="top">
    <div class="container">
        <h1>What are you craving, Rebecca?</h1>
        <div id="input-wrap">
            <div>
                <input type="text" id="url-input" placeholder="Enter or paste the URL"/>
            </div>
            <button id="add-url"><i class="material-icons">&#xE145;</i> <span>Add</span></button>
        </div>
    </div>
</section>



<section id="items-wrap">

    <?php

        if ($result = mysqli_query($db, $query)) {

            /* fetch associative array */
            while ($row = mysqli_fetch_row($result)) {?>
            <div class="item">
                <a href="<?php echo $row[1];?>" target="_blank" class="image <?php echo (empty($row[4]) ? 'no-image' : ''); ?>">
                    <?php echo (!empty($row[4]) ? '<img src="'.$row[4].'"/>' : '');?>

                </a>
                <div class="text">
                    <h2><a href="<?php echo $row[1];?>" target="_blank"><?php echo $row[2];?></a></h2>
                    <p><?php echo (empty($row[3]) ? 'No description available, but I bet it\'s delicious! You should definitely post more yummy things!' : $row[3]);?></p>
                </div>
                <div class="controls">
                    <span class="remove"><i class="material-icons">&#xE872;</i> Remove</span>
                </div>
            </div>

            <?php

            }

            mysqli_free_result($result);
        }

        mysqli_close($db);
    ?>


</section>
<input type="hidden" value="<?php echo BASE_URL;?>/ajax/" id="path">
<input type="hidden" value="<?php echo BASE_URL;?>/assets/" id="assets">

<?php
    require_once('./_includes/footer.php');
?>