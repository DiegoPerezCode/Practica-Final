<?php

if(isset($_POST['enviar']))
    if(!empty($_POST['name']) && !empty($_POST['apellido']) && !empty($_POST['telefono']) && !empty($_POST['fecha']) && !empty($_POST['hora']) && !empty($_POST['adicional'])) {
        $nombre = $_POST['nombre'];
        $nombre = $_POST['apellido'];
        $nombre = $_POST['telefono'];
        $nombre = $_POST['fecha'];
        $nombre = $_POST['hora'];
        $nombre = $_POST['adicional'];
        $header = "From: noply@gmail.com" . "\r\n";
        $header = "Reply-To: noply@gmail.com" . "\r\n";
        $header = "X-Mailer: PHP/". phpversion();
        mail('diego_perez480@hotmail.com' $nombre, $apellido, $telefono, $fecha, $hora, $adicional);
    }
>?