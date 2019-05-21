<?php

require_once('../../vendor/autoload.php');
use Embed\Embed;

$response = array();
$info = false;
$data = json_decode(file_get_contents('php://input'));
$url = $data->url ? $data->url : '';

try {


    if (!filter_var($url, FILTER_VALIDATE_URL)) {
        throw new Exception('Aw dang, please enter a valid URL!');
    }

    $info = Embed::create($url);

    if (!$info) {
        throw new Exception('Oh snap, Could not retrieve page info! Please try another url.');
    }

    if (!isset($e)) {

        $response['data']['title'] = $info->title;
        $response['data']['description'] = $info->description;
        $response['data']['url'] = $info->url;
        $response['data']['image']['url'] = $info->image;
        $response['data']['image']['width'] = $info->imageWidth;
        $response['data']['image']['height'] = $info->imageHeight;
        $response['data']['images'] = $info->images;
    }
} catch (Exception $e){
    $response['error'] = $e->getMessage();
} catch (\Exception $e) {
    $response['error'] = $e->getMessage();
} catch (\Throwable $e) {
    $response['error'] = $e->getMessage();
} finally {
    usleep(500000);
    echo json_encode($response);
}



