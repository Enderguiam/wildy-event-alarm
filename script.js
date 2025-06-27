const eventos = [
  { nome: "Spider Swarm", hora: "23:00" },
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
  { nome: "Evil Bloodwood Tree", hora: "22:00", especial: true }
];

const exibir = document.getElementById("evento");
const alarme = new Audio("campainha.mp3");

function checarEvento() {
  const agora = new Date();
  const horaAtual = agora.getUTCHours();
  const minutoAtual = agora.getUTCMinutes();

  for (let i = 0; i < eventos.length; i++) {
    const [h, m] = eventos[i].hora.split(":").map(Number);
    let eventoHora = new Date();
    eventoHora.setUTCHours(h);
    eventoHora.setUTCMinutes(m);
    eventoHora.setUTCSeconds(0);
    eventoHora.setUTCMilliseconds(0);

    let diff = (eventoHora - agora) / 60000; // diferença em minutos

    if (diff < -55) diff += 1440; // se passou do dia, ajusta para o próximo

    if (diff > 0 && diff <= 5) {
      const nomeEvento = eventos[i].nome + (eventos[i].especial ? " (Special)" : "");
      exibir.innerText = `⚠️ Alarme: ${nomeEvento} às ${eventos[i].hora}`;
      if (alarme.paused) {
        alarme.play();
      }
      return;
    }

    if (diff > 5) {
      const nomeEvento = eventos[i].nome + (eventos[i].especial ? " (Special)" : "");
      exibir.innerText = `Próximo evento: ${nomeEvento} às ${eventos[i].hora}`;
      return;
    }
  }

  exibir.innerText = "Nenhum evento encontrado.";
}

setInterval(checarEvento, 10000);
checarEvento();
