document.addEventListener('DOMContentLoaded', function () {
    const mesHTML = document.querySelector(".mess");
    const diasTag = document.querySelector(".dias");
    const icones = document.querySelectorAll(".mes button"); 
    

    let date = new Date();
    let ano = date.getFullYear();
    let mes = date.getMonth();

    const nomesMeses = [
        "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", 
        "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
    ];

    const renderizarCalendario = () => {
        mesHTML.innerText = `${nomesMeses[mes]} ${ano}`;
        const primeiro_dia = new Date(ano, mes, 1).getDay();
        const ultimo_dia_mes = new Date(ano, mes + 1, 0).getDate(); 
        const ultimo_dia_mes_anterior = new Date(ano, mes, 0).getDate(); 
        let lista=``

        for (let i = 1; i <= ultimo_dia_mes; i++) {
            lista += `<div class="dia">${i}</div>`
        }
        diasTag.innerHTML = lista; 
    };
    renderizarCalendario();

    icones.forEach(icon => {
        icon.addEventListener("click", () => {
            mes = icon.id === "voltar" ? mes - 1 : mes + 1;
            if (mes < 0) {
                mes = 11;
                ano--;
            } else if (mes > 11) {
                mes = 0;
                ano++;
            }
            renderizarCalendario();

        })
    });






















    const selectedDateDisplay = document.getElementById('selected-date');


    document.querySelectorAll('.dia').forEach(dia => {
        dia.addEventListener('click', function () {
            this.classList.add('selected'); 
            const day = this.textContent;
            selectedDateDisplay.textContent = `Você selecionou o dia ${day}`;
        });
    });
});