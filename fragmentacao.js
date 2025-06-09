// Carrega os docs selecionados para expurgo
const docs = JSON.parse(localStorage.getItem('documentosParaFormulario')) || [];
const tabela = document.getElementById('tabela-fragmentacao');

docs.forEach(d => {
  const tr = document.createElement('tr');
  tr.innerHTML = `
    <td>${d.caixa}</td>
    <td>${d.protocolo}</td>
    <td>${d.area}</td>
    <td><input type="text" class="metodo" placeholder="Método"></td>
  `;
  tabela.appendChild(tr);
});

// Exemplo de botão para “confirmar fragmentação”
document.getElementById('btn-fragmentar').addEventListener('click', () => {
  const registros = [];
  document.querySelectorAll('#tabela-fragmentacao tr').forEach((tr,i) => {
    const metodo = tr.querySelector('.metodo').value;
    if (metodo) {
      registros.push({ ...docs[i], metodo, protocoloFrag: Date.now() });
    }
  });
  localStorage.setItem('fragmentacoes', JSON.stringify(registros));
  alert('Fragmentação registrada!');
});
