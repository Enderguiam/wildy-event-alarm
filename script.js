const eventos = [
  { nome: "Unnatural Outcrop", hora: "00:00" },
  { nome: "Stryke the Wyrm", hora: "01:00", especial: true },
  { nome: "Demon Stragglers", hora: "02:00" },
  { nome: "Butterfly Swarm", hora: "03:00" },
  { nome: "King Black Dragon Rampage", hora: "04:00", especial: true },
  { nome: "Forgotten Soldiers", hora: "05:00" },
  { nome: "Surprising Seedlings", hora: "06:00" },
  { nome: "Hellhound Pack", hora: "07:00" },
  { nome: "Infernal Star", hora: "08:00", especial: true },
  { nome: "Lost Souls", hora: "09:00" },
  { nome: "Ramokee Incursion", hora: "20:00" },
  { nome: "Displaced Energy", hora: "21:00" },
  { nome: "Evil Bloodwood Tree", hora: "22:00", especial: true },
  { nome: "Spider Swarm", hora: "23:00" }
];

const alarme = document.getElementById("alarme");
const exibir = document.getElementById("prox-evento");

function checarEvento() {
  const agora = new Date();
  const horaAtual = agora.getHours();
  const minutoAtual = agora.getMinutes();

  for (let i = 0; i < eventos.length; i++) {
    const [h, m] = eventos[i].hora.split(":").map(Number);
    let eventoHora = new Date();
    eventoHora.setHours(h);
    eventoHora.setMinutes(m);
    eventoHora.setSeconds(0);

    let diff = (eventoHora - agora) / 60000; // minutos até o evento

    if (diff < -55) diff += 1440; // ajusta para eventos do próximo dia

    if (diff > 0 && diff <= 5) {
      const nomeEvento = eventos[i].nome + (eventos[i].especial ? " (Special)" : "");
      exibir.innerText = `⚠️ Alarme: ${nomeEvento} às ${eventos[i].hora}`;
      if (!alarme.played.length || alarme.currentTime === 0) {
        alarme.play();
      }
      break;
    } else if (diff > 5) {
      const nomeEvento = eventos[i].nome + (eventos[i].especial ? " (Special)" : "");
      exibir.innerText = `Próximo evento: ${nomeEvento} às ${eventos[i].hora}`;
      break;
    }
  }
}

setInterval(checarEvento, 10000);
