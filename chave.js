// === chave.js ===
function mostrarFormulario(tipo) {
  document.getElementById('formulario-imediato').style.display = tipo === 'imediato' ? 'block' : 'none';
  document.getElementById('formulario-agendar').style.display = tipo === 'agendar' ? 'block' : 'none';
}

function registrarEmprestimo() {
  const nome = document.getElementById('nome').value;
  const area = document.getElementById('area').value;

  const solicitacao = {
    nome,
    area,
    acao: 'Retirada',
    data: new Date().toLocaleDateString(),
    hora: new Date().toLocaleTimeString(),
    status: 'Pendente'
  };

  const chaves = JSON.parse(localStorage.getItem('solicitacoesChave')) || [];
  chaves.push(solicitacao);
  localStorage.setItem('solicitacoesChave', JSON.stringify(chaves));
  alert('Solicitação registrada com sucesso!');
  atualizarTabela();
}

function registrarDevolucao() {
  const nome = document.getElementById('nome').value;
  const area = document.getElementById('area').value;

  const solicitacao = {
    nome,
    area,
    acao: 'Devolução',
    data: new Date().toLocaleDateString(),
    hora: new Date().toLocaleTimeString(),
    status: 'Pendente'
  };

  const chaves = JSON.parse(localStorage.getItem('solicitacoesChave')) || [];
  chaves.push(solicitacao);
  localStorage.setItem('solicitacoesChave', JSON.stringify(chaves));
  alert('Devolução registrada com sucesso!');
  atualizarTabela();
}

function agendarChave() {
  const nome = document.getElementById('agendar-nome').value;
  const area = document.getElementById('agendar-area').value;
  const data = document.getElementById('data-agendada').value;

  const solicitacao = {
    nome,
    area,
    acao: 'Agendamento',
    data,
    hora: '-',
    status: 'Agendado'
  };

  const chaves = JSON.parse(localStorage.getItem('solicitacoesChave')) || [];
  chaves.push(solicitacao);
  localStorage.setItem('solicitacoesChave', JSON.stringify(chaves));
  alert('Chave agendada com sucesso!');
  atualizarTabela();
}

function atualizarTabela() {
  const corpo = document.getElementById('tabela-movimentos');
  corpo.innerHTML = '';
  const registros = JSON.parse(localStorage.getItem('solicitacoesChave')) || [];

  registros.forEach(e => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${e.nome}</td>
      <td>${e.area}</td>
      <td>${e.acao}</td>
      <td>${e.data}</td>
      <td>${e.hora}</td>
      <td>${e.status}</td>
    `;
    corpo.appendChild(tr);
  });
}

window.onload = atualizarTabela;

