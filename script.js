document.addEventListener('DOMContentLoaded', function () {
    const mesHTML = document.querySelector(".mess");
    const diasTag = document.querySelector(".dias");
    const icones = document.querySelectorAll(".mes button"); 
    
    let date = new Date();
    let ano = date.getFullYear();
    let mes = date.getMonth();
    let dia_atual = date.getDate();

    const nomesMeses = [
        "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", 
        "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
    ];

    const renderizarCalendario = () => {
        mesHTML.innerText = `${nomesMeses[mes]} ${ano}`;
        const primeiro_dia = new Date(ano, mes, 1).getDay();
        const ultimo_dia_mes = new Date(ano, mes + 1, 0).getDate(); 
        const ultimo_dia_mes_anterior = new Date(ano, mes, 0).getDate(); 
        let lista = ``;

        for (let i = primeiro_dia; i > 0; i--) {
            lista += `<div class="dia anterior apagar">${ultimo_dia_mes_anterior - i + 1}</div>`;
        }
        for (let i = 1; i <= ultimo_dia_mes ; i++) {
            let diaAtual = i === dia_atual && mes === new Date().getMonth() && ano === new Date().getFullYear() ? "diaAtual" : "";
            lista += `<div class="dia apagar ${diaAtual}">${i}</div>`;
        }
        const dias_restantes = 7 - ((primeiro_dia + ultimo_dia_mes) % 7);
        if (dias_restantes < 7) {
            for (let i = 1; i <= dias_restantes; i++) {
            lista += `<div class="dia proximo apagar">${i}</div>`;
            }
        }
        
        diasTag.innerHTML = lista;

        document.querySelectorAll('.dia').forEach(dia => {
            dia.addEventListener('click', function () {
                document.querySelectorAll('.dia').forEach(d => d.classList.remove('selected'));
                this.classList.add('selected'); 
                
                const day = this.textContent;
                let mesSelecionado = mes; 
        
                if (this.classList.contains('anterior')) {
                    mesSelecionado--; 
     
                } else if (this.classList.contains('proximo')) {
                    mesSelecionado++;
    
                }
                const selectedDateDisplay = document.getElementById('selected-date');
                selectedDateDisplay.textContent = `Você selecionou o dia ${day} de ${nomesMeses[mesSelecionado]}`;
            });
        });
    };
    renderizarCalendario();

    icones.forEach(icon => {
        icon.addEventListener("click", () => {
            const animacao = diasTag;
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
});
function menuNav() {
    // console.log('oi')
    const menu = document.getElementById("menuNav");
    const sobrepor = document.getElementById("sobreposicao")
    if (menu.style.display === "none" || menu.style.display === "") {
        menu.style.display = "flex";  
        sobrepor.style.display = "flex";  
    } else {
        menu.style.display = "none";
        sobrepor.style.display = "none";  
    }
}

let flag = 'noite';

function mudarTema(){
    const tema = document.getElementById("tema");
    if(flag === 'noite'){
        tema.style.backgroundImage = "url(./images/tarde.jpg)"
        flag = 'tarde';
    }
    else{
        tema.style.backgroundImage = "url(../images/noite.jpg)"
        flag = 'noite'
    }
}


// mesHTML.innerText = `${nomesMeses[mes]} ${ano}`;
// const primeiro_dia = new Date(ano, mes, 1).getDay();
// const ultimo_dia_semana = new Date(ano, primeiro_dia + 7).getDate(); 
// const ultimo_dia_mes_anterior = new Date(ano, mes, 0).getDate(); 