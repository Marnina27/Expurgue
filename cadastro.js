// Quando o form for submetido:
document.getElementById('formCadastro').addEventListener('submit', e => {
  e.preventDefault();

  // 1) Captura valores
  const area         = document.getElementById('area').value;
  const prateleira   = document.getElementById('prateleira').value;
  const ladoElem     = document.querySelector('input[name="lado"]:checked');
  const lado         = ladoElem ? ladoElem.value : '';
  const numeroCaixa  = document.getElementById('numeroCaixa').value;
  const temporalidade= document.getElementById('temporalidade').value;
  const protocoloDig = document.getElementById('protocoloDigital').value;

  // 2) Captura checkboxes de tipos de documento
  const tiposNodes = document.querySelectorAll('#tiposDocumento input[type="checkbox"]:checked');
  const tipos = Array.from(tiposNodes).map(cb => cb.value);

  // 3) Gera um protocolo automático
  const protocolo = 'EXP-' + new Date().getFullYear() + '-' + Date.now();

  // 4) Monta objeto
  const doc = { 
    area,
    prateleira,
    lado,
    numeroCaixa,
    temporalidade,
    tipos,
    protocoloDigital: protocoloDig,
    protocolo,
    dataCadastro: new Date().toISOString()
  };

  // 5) Salva no localStorage
  const docs = JSON.parse(localStorage.getItem('documentos')) || [];
  docs.push(doc);
  localStorage.setItem('documentos', JSON.stringify(docs));

  // 6) Atualiza o campo de protocolo no form e alerta
  document.getElementById('protocolo').value = protocolo;
  alert('Documento cadastrado com sucesso! Protocolo: ' + protocolo);

  // 7) Limpa tudo menos o protocolo (opcional)
  e.target.reset();
  document.getElementById('protocolo').value = protocolo;
});
