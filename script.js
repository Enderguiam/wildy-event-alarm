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
const btnToggleAlarme = document.getElementById("toggleAlarme");
const tempoAvisoInput = document.getElementById("tempoAviso");
const alarme = new Audio("campainha.mp3");
const volumeSlider = document.getElementById("volumeSlider");
alarme.volume = parseFloat(volumeSlider.value);

// Atualiza o visual do gradiente do slider
function updateSliderBackground(value) {
  const percent = (parseFloat(value) * 100) + "%";
  volumeSlider.style.background = `linear-gradient(to right, #00f2b6 ${percent}, #ffffff ${percent})`;
}

volumeSlider.addEventListener("input", () => {
  alarme.volume = parseFloat(volumeSlider.value);
  localStorage.setItem("volumeSlider", volumeSlider.value);
  updateSliderBackground(volumeSlider.value);
});

let alarmeAtivado = true;

btnToggleAlarme.addEventListener("click", () => {
  alarmeAtivado = !alarmeAtivado;
  localStorage.setItem("alarmeAtivado", alarmeAtivado); // ← salvar estado
  btnToggleAlarme.innerText = alarmeAtivado ? "🔔 Alarme: Ativado" : "🔕 Alarme: Desativado";
  if (!alarmeAtivado) {
    alarme.pause();
    alarme.currentTime = 0;
  }
});

const inicioRotacao = new Date(Date.UTC(2025, 5, 27, 9, 0, 0));

function checarEventoRotativo() {
  const agora = new Date();
  const diffHoras = Math.floor((agora - inicioRotacao) / 3600000);
  const mostrarSoEspeciais = filtroCheckbox.checked;

  for (let i = 1; i <= eventos.length; i++) {
    const index = (diffHoras + i) % eventos.length;
    const evento = eventos[index];
    const eventoHorario = (inicioRotacao.getUTCHours() + diffHoras + i) % 24;

    if (!mostrarSoEspeciais || evento.especial) {
      const textoEvento = `${evento.nome}${evento.especial ? " (Special)" : ""} às ${String(eventoHorario).padStart(2, '0')}:00`;

      const proximaHora = new Date(Date.UTC(
        agora.getUTCFullYear(),
        agora.getUTCMonth(),
        agora.getUTCDate(),
        eventoHorario, 0, 0
      ));

      if (proximaHora <= agora) {
        proximaHora.setUTCDate(proximaHora.getUTCDate() + 1);
      }

      const diffMs = proximaHora - agora;
      const totalSegundos = Math.floor(diffMs / 1000);
      const horas = Math.floor(totalSegundos / 3600);
      const minutos = Math.floor((totalSegundos % 3600) / 60);
      const segundos = totalSegundos % 60;

      const tempoFormatado = horas > 0
        ? `${horas}:${String(minutos).padStart(2, '0')}:${String(segundos).padStart(2, '0')}`
        : `${String(minutos).padStart(2, '0')}:${String(segundos).padStart(2, '0')}`;

      cronometro.innerText = `⏳ Em: ${tempoFormatado}`;

      const tempoAvisoSegundos = parseInt(tempoAvisoInput.value, 10) || 300;

      if (totalSegundos <= tempoAvisoSegundos) {
        exibir.innerText = `⚠️ Alarme: ${textoEvento}`;
        if (alarmeAtivado && alarme.paused) alarme.play();
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

// Salvar configurações quando forem alteradas
filtroCheckbox.addEventListener("change", e => {
  localStorage.setItem("filtroEspecial", e.target.checked);
});

tempoAvisoInput.addEventListener("input", e => {
  localStorage.setItem("tempoAviso", e.target.value);
});

// Restaurar configurações ao carregar
window.addEventListener("DOMContentLoaded", () => {
  const filtroEspecialSalvo = localStorage.getItem("filtroEspecial");
  const tempoAvisoSalvo = localStorage.getItem("tempoAviso");
  const volumeSalvo = localStorage.getItem("volumeSlider");
  const alarmeAtivadoSalvo = localStorage.getItem("alarmeAtivado");

  if (filtroEspecialSalvo !== null) {
    filtroCheckbox.checked = filtroEspecialSalvo === "true";
  }

  if (tempoAvisoSalvo !== null) {
    tempoAvisoInput.value = tempoAvisoSalvo;
  }

  if (volumeSalvo !== null) {
    volumeSlider.value = volumeSalvo;
    alarme.volume = parseFloat(volumeSalvo);
    updateSliderBackground(volumeSalvo);
  } else {
    updateSliderBackground(volumeSlider.value); // fallback visual
  }

  if (alarmeAtivadoSalvo !== null) {
    alarmeAtivado = alarmeAtivadoSalvo === "true";
    btnToggleAlarme.innerText = alarmeAtivado ? "🔔 Alarme: Ativado" : "🔕 Alarme: Desativado";
  }
});
