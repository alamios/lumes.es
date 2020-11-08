<?php
    require_once($_SERVER['DOCUMENT_ROOT'] . "/modules/base.php");
    if (!isset($_SESSION)) session_start(); 
    $lang = $_SESSION["lang"]["index"];
?>
<!DOCTYPE html>
<html lang=<?=$_SESSION["lang"]["name"]?>>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title><?=$lang["title"]?></title>
</head>
<body>
    <p>wtf</p>
    <?php
        echo $_SERVER['SERVER_NAME'];
    ?>
</body>
</html>