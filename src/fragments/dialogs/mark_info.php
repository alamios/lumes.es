<?php
    if (!isset($_SESSION)) session_start(); 
    $lang = $_SESSION["lang"];
?>
<div class="info">
    <p><label><?=$lang["map"]["mark.user"]?>&nbsp;</label><span id="markUser"></span></p>
    <p><label><?=$lang["map"]["mark.date"]?>&nbsp;</label><span id="markDate"></span></p>
</div>