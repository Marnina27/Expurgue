// Retenção conforme categoria (você pode usar isso para validar status)
const prazos = {
  administrativo: null,       // enquanto úteis
  juridico:       5 * 365,     // em dias
  fiscal:         5 * 365,
  historico:      Infinity
};

let docs = JSON.parse(localStorage.getItem('documentos')) || [];
let vencidos = docs.filter(d => d.status === 'vencido');

const tabela = document.getElementById('tabela-expurgo');
const btnSel = document.getElementById('selecionarTodos');
const btnExp = document.getElementById('btn-expurgar');
const btnForm= document.getElementById('btn-gerar-formulario');

function render() {
  tabela.innerHTML = '';
  if (!vencidos.length) {
    tabela.innerHTML = '<tr><td colspan="5">Nenhum vencido.</td></tr>';
    return;
  }
  vencidos.forEach((d,i) => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td><input type="checkbox" class="chk" data-i="${i}"></td>
      <td>${d.caixa}</td>
      <td>${d.protocolo}</td>
      <td>${d.area}</td>
      <td>${d.status}</td>
    `;
    tabela.appendChild(tr);
  });
}

btnSel.addEventListener('click', () => {
  document.querySelectorAll('.chk').forEach(c => c.checked = !c.checked);
});

btnExp.addEventListener('click', () => {
  const sel = [...document.querySelectorAll('.chk:checked')]
    .map(c => +c.dataset.i);
  if (!sel.length) return alert('Selecione ao menos um.');
  // remove do array principal
  const protRem = [];
  docs = docs.filter((d,i) => {
    if (d.status==='vencido' && sel.includes(i)) {
      protRem.push(d.protocolo);
      return false;
    }
    return true;
  });
  localStorage.setItem('documentos', JSON.stringify(docs));
  vencidos = docs.filter(d => d.status==='vencido');
  render();
  alert('Expurgados:\n' + protRem.join('\n'));
});

btnForm.addEventListener('click', () => {
  const selDocs = [...document.querySelectorAll('.chk:checked')]
    .map(c => vencidos[+c.dataset.i]);
  if (!selDocs.length) return alert('Selecione ao menos um.');
  // armazena e redireciona
  localStorage.setItem('documentosParaFormulario', JSON.stringify(selDocs));
  window.location.href = 'formulario.html';
});

render();
