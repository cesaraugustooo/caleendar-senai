const mesHTML = document.querySelector(".mess");
const diasTag = document.querySelector(".dias");
const icones = document.querySelectorAll(".nav-button");

let date = new Date();
let ano = date.getFullYear();
let mes = date.getMonth();
let dia_atual = date.getDate();
let modoVisualizacao = 'mensal';
let flag = 'noite';

const nomesMeses = [
    "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
    "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
];
var ModalSituation = 'fechado';
function OpenFormulario(){
    let modal = document.getElementsByClassName("formulario")[0];
    let ModalColor = document.getElementById('Modal')
    let tudo = document.getElementsByClassName("tudo")[0];
    console.log(ModalSituation);
    console.log(flag)
    if(flag === 'noite'){
        ModalColor.style.backgroundColor = '#577c85';
    }else{
        ModalColor.style.backgroundColor = '#DAAE99';

    }
    if(ModalSituation === 'fechado'){
        modal.style.display = ('block');
        ModalSituation = 'aberto';
        tudo.style.display = ('none')
    }else if(ModalSituation === 'aberto'){
        modal.style.display = 'none';
        tudo.style.display = ('block')
        ModalSituation = 'fechado'; 
    }

}
const renderizarCalendario = () => {
    mesHTML.innerText = `${nomesMeses[mes]} ${ano}`;
    const primeiro_dia = new Date(ano, mes, 1).getDay();
    const ultimo_dia_mes = new Date(ano, mes + 1, 0).getDate();
    const ultimo_dia_mes_anterior = new Date(ano, mes, 0).getDate();
    let lista = ``;

    if (modoVisualizacao === 'mensal') {
        // Visualização mensal
        for (let i = primeiro_dia; i > 0; i--) {
            lista += `<div class="dia anterior apagar">${ultimo_dia_mes_anterior - i + 1}</div>`;
        }
        for (let i = 1; i <= ultimo_dia_mes; i++) {
            let diaAtual = i === dia_atual && mes === new Date().getMonth() && ano === new Date().getFullYear() ? "diaAtual" : "";
            lista += `<div class="dia apagar ${diaAtual}">${i}</div>`;
        }
        const dias_restantes = 7 - ((primeiro_dia + ultimo_dia_mes) % 7);
        if (dias_restantes < 7) {
            for (let i = 1; i <= dias_restantes; i++) {
                lista += `<div class="dia proximo apagar">${i}</div>`;
            }
        }
    } else {
        renderSemana();
    }

    diasTag.innerHTML = lista;

    document.querySelectorAll('.dia').forEach(dia => {
        dia.addEventListener('click', function () {
            document.querySelectorAll('.dia').forEach(d => d.classList.remove('selected'));
            this.classList.add('selected');
            let DataInput = document.getElementById('txtdata')
            const day = this.textContent;
            let mesSelecionado = mes+1;

            if (this.classList.contains('anterior')) {
                mesSelecionado--;
            } else if (this.classList.contains('proximo')) {
                mesSelecionado++;
            }
            const selectedDateDisplay = document.getElementById('selected-date');
            DataInput.value = `${ano}-${String(mesSelecionado).padStart(2,'0')}-${String(day).padStart(2,'0')}`
            selectedDateDisplay.textContent = `Você selecionou o dia ${day} de ${nomesMeses[mesSelecionado-1]}`;
            selectedDateDisplay.innerHTML += `<button style="margin:10px;" onclick="OpenFormulario()">Adicionar Evento</button>`;
        });
    });
};

function view() {
        let tudo = document.getElementsByClassName("tudo");
        let semanal = document.getElementsByClassName("calendar-container")
        if (modoVisualizacao === 'mensal') {
            tudo[0].style.display = 'none';
            semanal[0].style.display = 'block';
            modoVisualizacao = 'semanal';
        } else {
            tudo[0].style.display = 'block';
            semanal[0].style.display = 'none';
            modoVisualizacao = 'mensal';
        }
    }


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
    });
});

function menuNav() {
    const menu = document.getElementById("menuNav");
    const sobrepor = document.getElementById("sobreposicao");
    if (menu.style.display === "none" || menu.style.display === "") {
        menu.style.display = "flex";
        sobrepor.style.display = "flex";
    } else {
        menu.style.display = "none";
        sobrepor.style.display = "none";
    }
}


function mudarTema() {
    const tema = document.getElementById("tema");
    const temaIcon = document.getElementById("tema-i");

    if (flag === 'noite') {
        tema.style.backgroundImage = "url(./images/tarde.jpg)";
        temaIcon.className = "fas fa-sun";
        flag = 'tarde';
    } else if (flag === 'tarde') {
        tema.style.backgroundImage = "url('./images/noite.jpg')";
        temaIcon.className = "fas fa-moon";
        flag = 'noite';
    }
}

const daysOfWeek = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];
const currentDate = new Date();
let displayedDate = new Date(currentDate);

function renderSemana() {
    const diasSemana = document.getElementById("weekDays");
    diasSemana.innerHTML = "";

    const proxiAno = document.getElementById("currentMonthYear");
    proxiAno.textContent = displayedDate.toLocaleString("default", { month: "long", year: "numeric" });

    const comecoSemana = new Date(displayedDate);
    comecoSemana.setDate(displayedDate.getDate() - displayedDate.getDay());

    for (let i = 0; i < 7; i++) {
        const dayDate = new Date(comecoSemana);
        dayDate.setDate(comecoSemana.getDate() + i);

        const dayElement = document.createElement("div");
        dayElement.classList.add("dia");
        if (dayDate.toDateString() === currentDate.toDateString()) dayElement.classList.add("today");

        const diaMes = daysOfWeek[dayDate.getDay()];
        const diaAno = dayDate.getDate();

        dayElement.innerHTML = `<div>${diaMes}</div><div>${diaAno}</div>`;
        diasSemana.appendChild(dayElement);
    }
    document.querySelectorAll('.dia').forEach(dia => {
        dia.addEventListener('click', function () {
            document.querySelectorAll('.dia').forEach(d => d.classList.remove('selected'));
            this.classList.add('selected');
            // console.log("Cicou")
            const day = this.textContent;
            let mesSelecionado = mes;

            const selectedDateDisplay = document.getElementById('selected-date');
            selectedDateDisplay.textContent = `Você selecionou o dia ${day} de ${nomesMeses[mesSelecionado]}`;
            selectedDateDisplay.innerHTML += `<button style="margin:10px;" onclick="OpenFormulario()">Adicionar Evento</button>`;

        });
    });
}

function changeWeek(direction) {
    displayedDate.setDate(displayedDate.getDate() + direction * 7);
    renderSemana();
}

renderizarCalendario();
