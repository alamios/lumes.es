<?php
    $root = $_SERVER['DOCUMENT_ROOT'];
    $langPath = $_SERVER['DOCUMENT_ROOT'] . "/resources/strings/";
    $langExt = ".ini";

    require_once($root . "/libraries/phputils/src/fileutils.php");
    if (!isset($_SESSION)) session_start(); 

    $choose = chooseLang($langPath);
    $_SESSION["lang"] = parse_ini_file($langPath . $choose . $langExt, true);
    $_SESSION["lang"]["name"] = $choose;

    function supportedLangs($langPath) { 
        $langFiles = getFiles($langPath);
        $langs = [];
        foreach ($langFiles as $lfile) {
            $p = explode("/", $lfile);
            $langs[] = explode(".", $p[count($p)-1])[0];
        }
        return $langs;
    }

    function preferredLangs() {
        $langs = [];
        foreach (explode(",", $_SERVER['HTTP_ACCEPT_LANGUAGE']) as $p) {
            $langs[] = explode(";", $p)[0];
        }
        return $langs;
    }

    function selectedLangs() {

    }
    
    function chooseLang($langPath) {
        $supported = supportedLangs($langPath);
        $preferences = preferredLangs();
        foreach ($preferences as $pref) {
            if (in_array($pref, $supported)) {
                return $pref;
            }
        }
    }
?>