<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Administrador de Pacientes</title>
    <link rel="stylesheet" href="css/bootstrap.css">
    <link rel="stylesheet" href="css/estilos.css">
</head>
<body>

    <section class="color-menu">
        <div class="c-menu contenedor">
            <div class="logo">
                <img src="https://img.icons8.com/ios-filled/50/DEA917/restaurant-building--v1.png"/>
                <div class="titulos-logo">
                    <span class="titulo-logo">Amaretto</span>
                    <span class="sub-titulo-logo">Restaurante <span class="slogan">Bar</span></span>
                </div>
            </div>
            <div class="menu">
                <a href="index.html" class="enlace-menu">Inicio</a>
                <a href="restaurante.html" class="enlace-menu">Restaurante</a>
                <a href="bar.html" class="enlace-menu">Bar</a>
                <a href="reservas.html" class="enlace-menu reserva">Reserva</a>
            </div>
        </div>
    </section>

    <div class="banner-carta">
        <div class="info-banner-carta">
            <h1 class="titulo-banner-carta">Reservas</h1>
        </div>
    </div>


    <h2 class="text-center my-5 titulo">Haz tu reserva con nosotros</h2>
    <div class="container mt-5 p-5">
        <div id="contenido" class="row">
            <div class="col-md-6 agregar-cita">
                <form  method="POST" id="nueva-cita" class="formulario-citas" >
                    <legend class="mb-4">Datos del Cliente</legend>

                    <div class="form-group row">
                        <label class="col-sm-4 col-lg-4 col-form-label">Nombres:</label>
                        <div class="col-sm-8 col-lg-8">
                            <input type="text" id="nombre" name="nombre" class="form-control" placeholder="Nombres" require>
                        </div>
                    </div>
                    <div class="form-group row">
                        <label class="col-sm-4 col-lg-4 col-form-label">Apellidos:</label>
                        <div class="col-sm-8 col-lg-8">
                            <input type="text" id="apellido" name="apellido" class="form-control"  placeholder="Apellidos" require>
                        </div>
                    </div>
                    <div class="form-group row">
                        <label class="col-sm-4 col-lg-4 col-form-label">Teléfono:</label>
                        <div class="col-sm-8 col-lg-8">
                            <input type="tel" id="telefono" name="telefono" class="form-control"  placeholder="Número de Teléfono" require>
                        </div>
                    </div>
                    <div class="form-group row">
                        <label class="col-sm-4 col-lg-4 col-form-label">Fecha:</label>
                        <div class="col-sm-8 col-lg-8">
                            <input type="date" id="fecha" name="fecha" class="form-control" require>
                        </div>
                    </div>

                    <div class="form-group row">
                        <label class="col-sm-4 col-lg-4 col-form-label">Hora:</label>
                        <div class="col-sm-8 col-lg-8">
                            <input type="time" id="hora" name="hora" class="form-control" require>
                        </div>
                    </div>

                    <div class="form-group row">
                        <label class="col-sm-4 col-lg-4 col-form-label">Adicional:</label>
                        <div class="col-sm-8 col-lg-8">
                            <textarea id="adicional" name="adicional" class="form-control" ></textarea>
                        </div>
                    </div>
                    <div class="form-group">
                            <button type="submit" class="btn w-100 d-block" name="enviar">Crear Reserva</button>
                    </div>
                </form>
            </div>
            <div class="col-md-6">
                <h2 id="administra" class="mb-4">Administra tu Reserva</h2>
                <ul id="citas" class="list-group lista-citas"></ul>
            </div>
        </div> <!--.row-->
    </div><!--.container-->

    <?php
    include("correo.php");
    >?

    <script src="js/app.js"></script>

    
</body>
</html>