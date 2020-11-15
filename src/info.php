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
    <link rel="stylesheet" href="/styles/info.css">
    <title><?=$lang["info"]["title"]?></title>
</head>
<body>
<body>
    <?php require_once($root . "/fragments/header.php"); ?>
    <main>
        
    </main>
    <?php require_once($root . "/fragments/footer.php"); ?>
</body>
</html>
</body>
</html>