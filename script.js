
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
  try {
    const agora = new Date();
    const agoraUTC = Date.UTC(
      agora.getUTCFullYear(),
      agora.getUTCMonth(),
      agora.getUTCDate(),
      agora.getUTCHours(),
      agora.getUTCMinutes(),
      0, 0
    );

    for (let i = 0; i < eventos.length; i++) {
      const [h, m] = eventos[i].hora.split(":").map(Number);
      let eventoUTC = Date.UTC(
        agora.getUTCFullYear(),
        agora.getUTCMonth(),
        agora.getUTCDate(),
        h, m, 0, 0
      );

      if (eventoUTC < agoraUTC) {
        eventoUTC += 86400000; // +24h
      }

      let diff = (eventoUTC - agoraUTC) / 60000; // minutos

      if (diff > 0 && diff <= 5) {
        const nomeEvento = eventos[i].nome + (eventos[i].especial ? " (Special)" : "");
        exibir.innerText = `⚠️ Alarme: ${nomeEvento} às ${eventos[i].hora}`;
        if (alarme.paused) alarme.play();
        return;
      }

      if (diff > 5) {
        const nomeEvento = eventos[i].nome + (eventos[i].especial ? " (Special)" : "");
        exibir.innerText = `Próximo evento: ${nomeEvento} às ${eventos[i].hora}`;
        return;
      }
    }

    exibir.innerText = "Nenhum evento encontrado.";
  } catch (erro) {
    exibir.innerText = "Erro ao calcular evento.";
    console.error(erro);
  }
}

setInterval(checarEvento, 10000);
checarEvento();
