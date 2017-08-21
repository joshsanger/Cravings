<?php

include_once('../src/OpenGraph/OpenGraph.php');

$response;
$graph;
$url = $_POST['url'];

try {

    if (!filter_var($url, FILTER_VALIDATE_URL)) {
        $response['error']['invalidUrl'] = true;
        throw new Exception('Please enter a valid URL');
    }

    $graph = OpenGraph::fetch($url);

    if( $graph === false ) {
        $response['error']['noDetails'] = true;
        throw new Exception('Could not retrieve page info.');
    }
} catch (Exception $e){
    $response['error']['message'] = $e->getMessage();

} finally {

    if(!isset($e)) {
        $response['title']       = $graph->__get('title');
        $response['description'] = $graph->__get('description');
        $response['image']       = (!empty($graph->__get('image')) ? $graph->__get('image') : '');
    }
    echo json_encode($response);
}


