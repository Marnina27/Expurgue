
// Ajustar altura dos gráficos
document.getElementById('graficoArea').height = 300;
document.getElementById('graficoCategoria').height = 300;

// Barra de busca
document.querySelector('.search-icon').addEventListener('click', () => {
  const termo = document.querySelector('.search-bar input').value.trim();
  if (termo) alert(`Buscando por: "${termo}"`);
  else alert("Digite um termo para buscar.");
});


// Avisos - clique em documento
document.querySelectorAll('.aviso li a').forEach(item => {
  item.addEventListener('click', (e) => {
    e.preventDefault();
    const titulo = e.target.textContent;
    alert(`Abrindo cadastro do documento: "${titulo}"`);
  });
});

// Gráfico de Área
const ctxArea = document.getElementById('graficoArea').getContext('2d');
new Chart(ctxArea, {
  type: 'bar',
  data: {
    labels: ['Financeiro', 'RH', 'Jurídico', 'TI', 'Compras'],
    datasets: [{
      label: 'Quantidade de Documentos',
      data: [24, 18, 12, 9, 14],
      backgroundColor: '#2e3c95'
    }]
  },
  options: {
    responsive: true,
    plugins: {
      title: { display: true, text: 'Documentos por Área' }
    }
  }
});

// Gráfico de Categorias
const dadosCategorias = {
  RH: { labels: ['Contratos', 'Relatórios', 'Atestados', 'Folhas de Pagamento'], data: [5, 7, 3, 3] },
  Financeiro: { labels: ['Faturas', 'Recibos', 'Notas Fiscais', 'Balanços'], data: [10, 4, 6, 8] },
  TI: { labels: ['Licenças', 'Protocolos', 'Acessos', 'Inventário'], data: [2, 5, 3, 4] },
  Jurídico: { labels: ['Ações', 'Contratos', 'Pareceres', 'Petições'], data: [6, 4, 2, 5] }
};

const ctxCategoria = document.getElementById('graficoCategoria').getContext('2d');
let categoriaChart = new Chart(ctxCategoria, {
  type: 'doughnut',
  data: {
    labels: dadosCategorias['RH'].labels,
    datasets: [{ data: dadosCategorias['RH'].data, backgroundColor: ['#00969f', '#ddbf6e', '#2e3c95', '#ef5350'] }]
  },
  options: {
    responsive: true,
    plugins: {
      title: { display: true, text: 'Categorias de Documentos - RH' }
    }
  }
});

document.querySelectorAll('.filtro-area').forEach(btn => {
  btn.addEventListener('click', () => {
    const area = btn.getAttribute('data-area');
    const dados = dadosCategorias[area];
    categoriaChart.data.labels = dados.labels;
    categoriaChart.data.datasets[0].data = dados.data;
    categoriaChart.options.plugins.title.text = `Categorias de Documentos - ${area}`;
    categoriaChart.update();
  });
});

const maisDocumentos = {
  '1 mês': ['CAIXA-2025-0003', 'CAIXA-2025-0004', 'CAIXA-2025-0005'],
  '1 semana': ['CAIXA-2025-0006', 'CAIXA-2025-0007', 'CAIXA-2025-0008'],
  '1 dia': ['CAIXA-2025-0009', 'CAIXA-2025-0010', 'CAIXA-2025-0011']
};

const modal = document.getElementById("modalAviso");
const modalTitulo = document.getElementById("modalTitulo");
const modalLista = document.getElementById("modalLista");
const fecharBtn = document.querySelector(".fechar");

document.querySelectorAll(".ver-mais").forEach(btn => {
  btn.addEventListener("click", () => {
    const periodo = btn.dataset.periodo;
    modalTitulo.textContent = `Documentos com vencimento em ${periodo}`;
    modalLista.innerHTML = "";
    maisDocumentos[periodo].forEach(doc => {
      const li = document.createElement("li");
      li.textContent = doc;
      modalLista.appendChild(li);
    });
    modal.style.display = "block";
  });
});

fecharBtn.onclick = () => modal.style.display = "none";
window.onclick = (e) => { if (e.target === modal) modal.style.display = "none"; };
