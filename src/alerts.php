<?php
    $root = $_SERVER['DOCUMENT_ROOT'];
    require_once($root . "/modules/base.php");
    if (!isset($_SESSION)) session_start(); 
    $lang = $_SESSION["lang"];
?>
<!DOCTYPE html>
<html lang=<?=$lang["selected"]?>>
<head>
    <?php require_once($root . "/modules/base.html"); ?>
    <link rel="stylesheet" href="/styles/alerts.css">
    <title><?=$lang["alerts"]["title"]?></title>
</head>
<body>
    <?php require_once($root . "/fragments/header.php"); ?>
    <main>
        
    </main>
    <?php require_once($root . "/fragments/footer.php"); ?>
</body>
</html>