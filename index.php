<?php


include("conexao.php");


if(isset($_POST['txtevento']) && isset($_POST['txtdata'])){
    $nome_evento = $_POST['txtevento'];
    $data_evento = $_POST['txtdata'];
    $sql = $pdo->prepare("INSERT INTO eventos(nome_evento,data_evento) VALUES(?,?)");
    $sql->execute([$nome_evento,$data_evento]);

}



?>


<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Calendário</title>
    <link rel="stylesheet" href="css/style.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.6.0/css/all.min.css"integrity="sha512-Kc323vGBEqzTmouAECnVceyQqyqdsSiqLQISBL29aUW4U/M7pSPA/gEUZQqv1cwx4OnYxTxve5UMg5GT6L4JJg==" crossorigin="anonymous" referrerpolicy="no-referrer" />
    <style>
    .formulario {
        display: none; 
    }

</style>
</head>
<body id="tema">
    <header>
        <div class="menu">
            <div class="menu-icon" id="menu-icon" onclick="menuNav()">
                <div class="linha"></div>
                <div class="linha"></div>
                <div class="linha"></div>
            </div>
        </div>
        <section id="sobreposicao">
            <nav id="menuNav">
                <i class="fa-solid fa-x"  onclick="menuNav()"></i>
                <div style="color: aliceblue; margin-top: 40px; margin-left: 30px; height: 20px; display: flex; align-items: center; cursor: pointer;" onclick="mudarTema()">
                    <i id="tema-i" class="fas fa-moon"></i>
                    <span style="margin-left: 8px;">Mudar tema</span>
                </div>
                <i style="color: aliceblue; margin-top: 0px;margin-left: 30px;cursor: pointer;height: 20px;" onclick=" view()" id="visualizacao">Visualização</i>
                <ul>
                </ul>
            </nav>
        </section>
    </header>
    <main>
        <section class="tudo">
            <div class="mes">
                <button id="voltar" class="nav-button">&lt;</button>
                <p class="mess"></p>
                <button id="passar" class="nav-button">&gt;</button>
            </div>
            <section class="section">
                <div class="dias-semana grid">
                    <div style="color: brown;">Domingo</div>
                    <div>Segunda</div>
                    <div>Terça</div>
                    <div>Quarta</div>
                    <div>Quinta</div>
                    <div>Sexta</div>
                    <div style="color: brown;">Sábado</div>
                </div>
                <div class="dias">
                </div>
                <div class="selected-date" id="selected-date"></div>
            </section>
        </section>
        <div class="calendar-container">
            <div class="week-display">
                <button style="background-color: green;" onclick="changeWeek(-1)"><</button>
                <div id="currentMonthYear"></div>
                <button style="background-color: green;" onclick="changeWeek(1)">></button>
            </div>
            <div class="week-days" id="weekDays"></div>
            <div class="selected-date" id="selected-date2"></div>
        </div>
        <section class="formulario">
            <div id="Modal">
                <i class="fa-solid fa-x" style="position: relative;bottom: 20%;right: 45%;"  onclick=" OpenFormulario()"></i>
                <h1>Eventos</h1>

                <form action="" method="POST">
                        <input type="text" id="txtevento" name="txtevento" aria-label="Nome do evento" placeholder="Nome do evento">
                        <label for="txtdata"></label>
                        <input type="date" id="txtdata" name="txtdata" aria-label="Data do evento">
                        <button type="submit">Cadastrar</button>

                </form>
            </div>
        </section>
    </main>
    <script src="script.js"></script>
</body>
</html>
