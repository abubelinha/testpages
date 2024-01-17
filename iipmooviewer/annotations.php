<?php
/* SCRIPT TO PROCESS ANNOTATIONS MADE ON IMAGE FILES, RECIBED FROM IIPMOOVIEWER CLIENT:

*/
$values = '';
foreach($_POST as $key=>$value) {
    $values.= $key . "=" . $value . "\t";
}
foreach($_GET as $key=>$value) {
    $values.= $key . "=" . $value . "\t";
}
$filename = 'my_post_data.txt';
$handle = fopen($filename, 'a+');
// https://stackoverflow.com/questions/3066421/writing-a-new-line-to-file-in-php-line-feed/3066426#3066426
fwrite($handle, $values."\n");
fclose($handle);
header("Access-Control-Allow-Origin *");
header('Access-Control-Allow-Methods: GET, POST');
header("Access-Control-Allow-Headers: X-Requested-With");
/* // A BIT MORE RESTRICTIVE:
header("Access-Control-Allow-Origin http://localhost:81");
*/
echo str_replace("\n","<br>",file_get_contents($filename)."\n\nEND OF FILE");
/*
https://stackoverflow.com/questions/43871637/no-access-control-allow-origin-header-is-present-on-the-requested-resource-whe
https://stackoverflow.com/questions/8719276/cross-origin-request-headerscors-with-php-headers
https://stackoverflow.com/questions/48362093/cors-request-blocked-in-locally-opened-html-file
*/
?>
