// Função para abrir área (simulação)
function abrirArea(area) {
  alert("Abrindo arquivos da área: " + area);
}

// Inicialização e simulação de dados (um único disparo)
if (!localStorage.getItem('expurgueData')) {
  const data = {
    totalCaixas: 1030,
    documentosPorArea: {
      "ADMINISTRATIVO": 120,
      "ENGENHARIA": 85,
      "FAIXA DE DOMÍNIO": 60,
      "FROTAS": 40,
      "JURÍDICO": 110,
      "MEIO AMBIENTE": 95,
      "OUVIDORIA": 45,
      "PCO/CCO": 78,
      "PRAÇAS DE PEDÁGIO": 55,
      "QUALIDADE": 64,
      "RECURSOS HUMANOS": 150,
      "SSO": 38,
      "TI": 90
    },
    entradasPorMes: {
      "Jan": 20,
      "Fev": 35,
      "Mar": 40,
      "Abr": 25,
      "Mai": 50,
      "Jun": 30
    }
  };
  localStorage.setItem('expurgueData', JSON.stringify(data));
}

const dados = JSON.parse(localStorage.getItem('expurgueData'));

// Contador animado de caixas
const contador = new countUp.CountUp('caixasFisicas', dados.totalCaixas, { duration: 2 });
if (!contador.error) {
  contador.start();
}

// Gráfico: Documentos por área
const ctxArea = document.getElementById('chartArea').getContext('2d');
new Chart(ctxArea, {
  type: 'bar',
  data: {
    labels: Object.keys(dados.documentosPorArea),
    datasets: [{
      label: 'Documentos',
      data: Object.values(dados.documentosPorArea),
      backgroundColor: '#2e3c95'
    }]
  },
  options: {
    responsive: true,
    plugins: {
      tooltip: {
        callbacks: {
          label: ctx => `Total: ${ctx.raw} documentos`
        }
      },
      legend: { display: false }
    }
  }
});

// Gráfico: Entradas por período
const ctxPeriodo = document.getElementById('chartPeriodo').getContext('2d');
new Chart(ctxPeriodo, {
  type: 'line',
  data: {
    labels: Object.keys(dados.entradasPorMes),
    datasets: [{
      label: 'Entradas',
      data: Object.values(dados.entradasPorMes),
      backgroundColor: '#00969f',
      borderColor: '#00969f',
      fill: false,
      tension: 0.3
    }]
  },
  options: {
    responsive: true,
    plugins: {
      tooltip: {
        callbacks: {
          label: ctx => `${ctx.raw} documentos`
        }
      }
    },
    scales: { y: { beginAtZero: true } }
  }
});
