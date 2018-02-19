<?php

$response;

include_once('../_includes/database.php');

$response;
$id = $_POST['id'] ?? '';

try {

    $db = mysqli_connect(DB_HOST, DB_USER, DB_PASSWORD, DB_NAME);

    if (mysqli_connect_errno()) {
        throw new Exception('Failed to connect to MySQL: ' . mysqli_connect_error());
    }

    if (is_empty($id)) {
        throw new Exception('No ID passed!');
    }


    $query = $db->prepare(" DELETE FROM urls
                 WHERE id = ?");
    $query->bind_param('s', $id);


    $query->execute();

    if (!$query) {
        throw new Exception('Database Error!');
    }

    $response['id'] = $id;


} catch (Exception $e){
    $response['error'] = $e->getMessage();
    usleep(500000);

} catch (\Exception $e) {
    $db->rollbackTransaction();
} finally {

    echo json_encode($response);
}

?>