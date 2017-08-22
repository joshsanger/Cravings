<?php

include_once('../src/OpenGraph/OpenGraph.php');
include_once('../_includes/database.php');

$response;
$graph;
$url = $_POST['url'];

try {

    $db = mysqli_connect(DB_HOST, DB_USER, DB_PASSWORD, DB_NAME);

    if (mysqli_connect_errno()) {
        throw new Exception('Failed to connect to MySQL: ' . mysqli_connect_error());
    }

    if (!filter_var($url, FILTER_VALIDATE_URL)) {
        throw new Exception('Please enter a valid URL');
    }

    $graph = OpenGraph::fetch($url);
    if ($graph === false) {
        throw new Exception('Could not retrieve page info.');
    }

    if (!isset($e)) {

        $title = $graph->__get('title');
        $description = $graph->__get('description');
        $image = (!empty($graph->__get('image')) ? $graph->__get('image') : '');


        $query = $db->prepare(" INSERT INTO
					 urls (url,title,description,image_url)
				   VALUES (?,?,?,?)");
        $query->bind_param('ssss', $url,$title,$description,$image);


        $query->execute();

        if (!$query) {
            throw new Exception('Database Error!');
        }

        $response['title']       = $title;
        $response['description'] = $description;
        $response['image']       = $image;

    }
} catch (Exception $e){
    $response['error'] = $e->getMessage();

} catch (\Exception $e) {
    $db->rollbackTransaction();
} finally {

    echo json_encode($response);
}


