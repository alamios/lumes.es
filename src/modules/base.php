<?php
    //$ERROR$//
    $root = $_SERVER['DOCUMENT_ROOT'];
    require_once($root . "/libraries/php/alamios/someutils-php/src/langutils.php");
    if (!isset($_SESSION)) session_start(); 
    setLang();
?>