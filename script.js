function checarEventoRotativo() {
  const agora = new Date();
  const diffHoras = Math.floor((agora - inicioRotacao) / 3600000);
  const horaUTC = agora.getUTCHours();
  const mostrarSoEspeciais = filtroCheckbox.checked;

  for (let i = 1; i <= eventos.length; i++) {
    const index = (diffHoras + i) % eventos.length;
    const evento = eventos[index];
    const eventoHorario = (horaUTC + i) % 24;

    if (!mostrarSoEspeciais || evento.especial) {
      const textoEvento = `${evento.nome}${evento.especial ? " (Special)" : ""} às ${String(eventoHorario).padStart(2, '0')}:00`;

      // Calcular hora do evento
      const proximaHora = new Date();
      proximaHora.setUTCHours(eventoHorario, 0, 0, 0);
      if (proximaHora < agora) {
        proximaHora.setUTCHours(eventoHorario + 1, 0, 0, 0);
      }

      const diffMs = proximaHora - agora;
      const minutos = Math.floor(diffMs / 60000);
      const segundos = Math.floor((diffMs % 60000) / 1000);
      cronometro.innerText = `⏳ Em: ${String(minutos).padStart(2, '0')}:${String(segundos).padStart(2, '0')}`;

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
