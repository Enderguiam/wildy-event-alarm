
const eventos = [
  { nome: "Spider Swarm", especial: false },
  { nome: "Unnatural Outcrop", especial: false },
  { nome: "Stryke the Wyrm", especial: true },
  { nome: "Demon Stragglers", especial: false },
  { nome: "Butterfly Swarm", especial: false },
  { nome: "King Black Dragon Rampage", especial: true },
  { nome: "Forgotten Soldiers", especial: false },
  { nome: "Surprising Seedlings", especial: false },
  { nome: "Hellhound Pack", especial: false },
  { nome: "Infernal Star", especial: true },
  { nome: "Lost Souls", especial: false },
  { nome: "Ramokee Incursion", especial: false },
  { nome: "Displaced Energy", especial: false },
  { nome: "Evil Bloodwood Tree", especial: true }
];

const exibir = document.getElementById("evento");
const cronometro = document.getElementById("cronometro");
const filtroCheckbox = document.getElementById("filtroEspecial");
const alarme = new Audio("campainha.mp3");

const inicioRotacao = new Date(Date.UTC(2025, 5, 27, 9, 0, 0)); // Spider Swarm às 09:00 UTC em 27/jun/2025

function checarEventoRotativo() {
  const agora = new Date();
  const diffHoras = Math.floor((agora - inicioRotacao) / 3600000);
  const horaUTC = agora.getUTCHours();
  const minutoUTC = agora.getUTCMinutes();
  const segundoUTC = agora.getUTCSeconds();

  const mostrarSoEspeciais = filtroCheckbox.checked;

  for (let i = 1; i <= eventos.length; i++) {
    const index = (diffHoras + i) % eventos.length;
    const evento = eventos[index];
    const eventoHorario = (horaUTC + i) % 24;

    if (!mostrarSoEspeciais || evento.especial) {
      const textoEvento = `${evento.nome}${evento.especial ? " (Special)" : ""} às ${String(eventoHorario).padStart(2, '0')}:00`;

      // Cronômetro para o horário exato do próximo evento exibido
      const proximaTroca = new Date();
      proximaTroca.setUTCHours(eventoHorario, 0, 0, 0);
      if (proximaTroca < agora) {
        proximaTroca.setUTCHours(eventoHorario + 1, 0, 0, 0);
      }

      const diffMs = proximaTroca - agora;
      const minutos = Math.floor(diffMs / 60000);
      const segundos = Math.floor((diffMs % 60000) / 1000);
      const tempoTexto = `${minutos.toString().padStart(2, '0')}:${segundos.toString().padStart(2, '0')}`;
      cronometro.innerText = `⏳ Em: ${tempoTexto}`;

      // Alarme se estiver dentro de 5 min do próximo evento
      if (minutos < 5) {
        exibir.innerText = `⚠️ Alarme: ${textoEvento}`;
        if (alarme.paused) alarme.play();
      } else {
        exibir.innerText = `Próximo evento: ${textoEvento}`;
      }
      return;
    }
  }

  exibir.innerText = `⏭️ Aguardando próximo evento especial...`;
  cronometro.innerText = `⏳ Em: --:--`;
}

setInterval(checarEventoRotativo, 1000);
checarEventoRotativo();
