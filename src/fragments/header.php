<header>
    <nav class="menu">
        <div class="menu menusection">
            <a class="menu-item" href="/"><i class="fa fa-fire icon"></i><?=$lang["common"]["app.name"]?></a>
        </div>
        <a class="menu-item hamburger"><i class="fa fa-bars"></i><i class="fa fa-times hidden"></i></a>
        <div class="menu menusection hamburger-menu">
            <a class="menu-item" href="/alerts"><?=$lang["common"]["menu.alerts"]?></a>
            <a class="menu-item" href="/info"><?=$lang["common"]["menu.info"]?></a>
            <a class="menu-item" href="/stats"><?=$lang["common"]["menu.stats"]?></a>
            <a class="menu-item" href="/about"><?=$lang["common"]["menu.about"]?></a>
            <div class="menu menu-group menusection">
                <a class="menu-item"><i class="fas fa-language"></i></a>
                <!-- <a class="menu-item"><?=$lang["selected"]?><img src="/resources/images/<?=$lang["selected"]?>.png" class="lang"></a> -->
                <nav class="submenu">
                    <?php
                        foreach ($lang["available"] as $lng) {
                            // if ($lng != $lang["selected"])
                                echo '<a class="menu-item" onclick="changeLang(\''. $lng .'\')">'
                                    . $lng . '<img src="/resources/images/'. $lng .'.png" class="lang">' .'</a>';
                        }
                    ?>
                </nav>
            </div>
        </div>
    </nav>
</header>