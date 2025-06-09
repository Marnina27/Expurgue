document.getElementById('formEmprestimo').addEventListener('submit', function(e) {
  e.preventDefault();

  const numero = this.numero.value;
  const usuario = this.usuario.value;
  const dataDevolucao = this.data_devolucao.value;
  const hoje = new Date().toISOString().split('T')[0];

  const tbody = document.querySelector('tbody');

  const novaLinha = document.createElement('tr');
  novaLinha.innerHTML = `
    <td>${numero}</td>
    <td>${usuario}</td>
    <td>${hoje}</td>
    <td>${dataDevolucao}</td>
    <td><span class="status pendente">● Pendente</span></td>
    <td><button>Aprovar</button> <button class="rejeitar">Rejeitar</button></td>
  `;

  tbody.appendChild(novaLinha);

  this.reset();
});
