
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

const inicioRotacao = new Date(Date.UTC((2025, 5, 27, 9, 0, 0));

function checarEventoRotativo() {
  const agora = new Date();
  const diffHoras = Math.floor((agora - inicioRotacao) / 3600000);
  const eventoAtualIndex = diffHoras % eventos.length;
  const eventoProximoIndex = (eventoAtualIndex + 1) % eventos.length;

  const evento = eventos[eventoProximoIndex];
  const mostrarEvento = !filtroCheckbox.checked || evento.especial;

  const horaUTC = agora.getUTCHours();
  const minutoUTC = agora.getUTCMinutes();
  const segundoUTC = agora.getUTCSeconds();

  const horaProximo = (horaUTC + 1) % 24;
  const tempoRestanteMin = 59 - minutoUTC;
  const tempoRestanteSeg = 59 - segundoUTC;
  const tempoTexto = `${tempoRestanteMin.toString().padStart(2, '0')}:${tempoRestanteSeg.toString().padStart(2, '0')}`;

  cronometro.innerText = `⏳ Em: ${tempoTexto}`;

  if (mostrarEvento) {
    if (tempoRestanteMin < 5) {
      exibir.innerText = `⚠️ Alarme: ${evento.nome}${evento.especial ? " (Special)" : ""} às ${String(horaProximo).padStart(2, '0')}:00`;
      if ((!filtroCheckbox.checked || evento.especial) && alarme.paused) {
        alarme.play();
      }
    } else {
      exibir.innerText = `Próximo evento: ${evento.nome}${evento.especial ? " (Special)" : ""} às ${String(horaProximo).padStart(2, '0')}:00`;
    }
  } else {
    exibir.innerText = `⏭️ Aguardando próximo evento especial...`;
  }
}

setInterval(checarEventoRotativo, 1000);
checarEventoRotativo();
