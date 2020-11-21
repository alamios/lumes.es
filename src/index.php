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
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/leaflet@1.7.1/dist/leaflet.css">
    <script defer src="https://cdn.jsdelivr.net/npm/leaflet@1.7.1/dist/leaflet.js"></script>
    <link rel="stylesheet" href="/styles/index.css">
    <script defer src="/scripts/index.js"></script>
    <title><?=$lang["index"]["title"]?></title>
    <script>
        var lang = <?php echo json_encode($lang); ?>;
        var params = <?php echo file_get_contents("resources/map.json"); ?>
    </script>
</head>
<body>
    <?php require_once($root . "/fragments/header.php"); ?>
    <main>
        <div id="mapdiv"></div>
    </main>
    <?php require_once($root . "/fragments/modals/login.php"); ?>
    <?php require_once($root . "/fragments/footer.php"); ?>
</body>
</html>