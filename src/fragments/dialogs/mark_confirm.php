<?php
    if (!isset($_SESSION)) session_start(); 
    $lang = $_SESSION["lang"];
?>
<div class="confirm">
    <p><?=$lang["map"]["mark.confirm"]?></p>
    <button class="button accept" onclick="addAlert()"><?=$lang["common"]["msg.yes"]?></button>
    <button class="button cancel" onclick="closePopup()"><?=$lang["common"]["msg.no"]?></button>
</div>