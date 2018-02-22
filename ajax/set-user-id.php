


<?php

$response;

include_once('../_includes/database.php');

try {

    $db = mysqli_connect(DB_HOST, DB_USER, DB_PASSWORD, DB_NAME);

    if (mysqli_connect_errno()) {
        throw new Exception('Failed to connect to MySQL: ' . mysqli_connect_error());
    }


    $query = $db->prepare("INSERT INTO users VALUES (NULL, 'cravingsUser');");

    $query->execute();

    if (!$query) {
        throw new Exception('Database Error!');
    }

    $response['id'] = $query->insert_id;


} catch (Exception $e){
    $response['error'] = $e->getMessage();

} catch (\Exception $e) {
    $db->rollbackTransaction();
} finally {

    usleep(500000);

    echo json_encode($response);
}

?>