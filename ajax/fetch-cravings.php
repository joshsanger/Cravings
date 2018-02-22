<?php

$response;

include_once('../_includes/database.php');

$user = $_POST['user'] ?? '';
$rows = array();

try {

    $db = mysqli_connect(DB_HOST, DB_USER, DB_PASSWORD, DB_NAME);

    if (mysqli_connect_errno()) {
        throw new Exception('Failed to connect to MySQL: ' . mysqli_connect_error());
    }

    if (empty($user)) {
        throw new Exception('No user passed!');
    }


    if ($query = $db->prepare("SELECT 
                                  id, 
                                  user, 
                                  url, 
                                  title, 
                                  description, 
                                  image_url 
                                FROM urls 
                                WHERE user = ?")
    ) {

        $query->bind_param("s", $user);
        $query->execute();

        if (!$query) {
            throw new Exception('Database Error!');
        }

        $query->bind_result($id, $user, $url, $title, $description, $image_url);

        while ($query->fetch()) {
            $rows[] = array(
                'id' => $id,
                'user' => $user,
                'url' => $url,
                'title' => $title,
                'description' => $description,
                'imageUrl' => $image_url
            );
        }

        $query->close();

    } else {
        throw new Exception('Database Error!');
    }

    $response['cravings'] = $rows;

} catch (Exception $e){
    $response['error'] = $e->getMessage();

} catch (\Exception $e) {
    $db->rollbackTransaction();
} finally {

    usleep(500000);

    echo json_encode($response);
}

?>