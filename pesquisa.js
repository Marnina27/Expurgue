const tabela = document.getElementById('tabela-resultados');
const campo = document.getElementById('campo-busca');

// Lê do localStorage
let documentos = JSON.parse(localStorage.getItem('documentos')) || [];

function render(dados) {
  tabela.innerHTML = '';

  if (!dados.length) {
    tabela.innerHTML = '<tr><td colspan="5">Nenhum registro encontrado.</td></tr>';
    return;
  }

  dados.forEach(doc => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${doc.numeroCaixa}</td>
      <td>${doc.protocolo}</td>
      <td>${doc.area}</td>
      <td>${Array.isArray(doc.tipos) ? doc.tipos.join(', ') : ''}</td>
      <td>${doc.temporalidade}</td>
    `;
    tabela.appendChild(tr);
  });
}

// Filtra por número de caixa, protocolo ou área
campo.addEventListener('input', () => {
  const termo = campo.value.trim().toLowerCase();

  const filtrados = documentos.filter(d => {
    return (
      String(d.numeroCaixa).toLowerCase().includes(termo) ||
      d.protocolo.toLowerCase().includes(termo) ||
      d.area.toLowerCase().includes(termo)
    );
  });

  render(filtrados);
});

// Renderiza tudo ao carregar
render(documentos);
