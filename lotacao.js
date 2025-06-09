const capacidadeSalaA = 784;
const capacidadeSalaB = 392;
const capacidadeTotal = capacidadeSalaA + capacidadeSalaB;

let ocupacaoSalaA = 600;
let ocupacaoSalaB = 350;

const dados = {
    A: {
        categorias: ['Financeiro', 'RH', 'Jurídico', 'TI'],
        barras: [24, 18, 12, 9],
        pizza: [30, 25, 20]
    },
    B: {
        categorias: ['Financeiro', 'RH', 'Jurídico', 'TI'],
        barras: [12, 8, 6, 5],
        pizza: [20, 30, 30]
    },
    Total: {
        categorias: ['Financeiro', 'RH', 'Jurídico', 'TI'],
        barras: [36, 26, 18, 14],
        pizza: [50, 55, 50]
    }
};

const ctxBarras = document.getElementById('graficoBarras').getContext('2d');
const graficoBarras = new Chart(ctxBarras, {
    type: 'bar',
    data: {
        labels: [],
        datasets: [{
            label: 'Quantidade de Documentos',
            data: [],
            backgroundColor: '#3F51B5'
        }]
    },
    options: {
        scales: { y: { beginAtZero: true } }
    }
});

const ctxPizza = document.getElementById('graficoPizza').getContext('2d');
const graficoPizza = new Chart(ctxPizza, {
    type: 'doughnut',
    data: {
        labels: [],
        datasets: [{
            data: [],
            backgroundColor: ['#009688', '#FFC107', '#3F51B5', '#FF5252', '#e6e6e6']
        }]
    },
    options: {
        plugins: { legend: { position: 'top' } }
    }
});

const ctxMedidor = document.getElementById('medidorCapacidade').getContext('2d');
const medidorChart = new Chart(ctxMedidor, {
    type: 'bar',
    data: {
        labels: ['Capacidade'],
        datasets: [
            {
                label: 'Ocupado',
                data: [0],
                backgroundColor: '#4CAF50',
                stack: 'Stack 0'
            },
            {
                label: 'Espaço Vazio',
                data: [0],
                backgroundColor: '#e6e6e6',
                stack: 'Stack 0'
            }
        ]
    },
    options: {
        responsive: true,
        plugins: {
            legend: { display: false }
        },
        scales: {
            y: {
                stacked: true,
                beginAtZero: true
            },
            x: {
                stacked: true
            }
        }
    }
});

function atualizaGraficos(sala) {
    let ocupados = 0;
    let capacidade = 0;
    const categorias = dados[sala].categorias.slice();
    const barras = dados[sala].barras.slice();
    const pizza = dados[sala].pizza.slice();

    if (sala === 'A') {
        ocupados = ocupacaoSalaA;
        capacidade = capacidadeSalaA;
    } else if (sala === 'B') {
        ocupados = ocupacaoSalaB;
        capacidade = capacidadeSalaB;
    } else {
        ocupados = ocupacaoSalaA + ocupacaoSalaB;
        capacidade = capacidadeTotal;
    }

    const vazio = capacidade - ocupados;

    // Atualiza gráfico de barras
    categorias.push('Espaço Vazio');
    barras.push(vazio);
    graficoBarras.data.labels = categorias;
    graficoBarras.data.datasets[0].data = barras;
    graficoBarras.update();

    // Atualiza gráfico de pizza
    graficoPizza.data.labels = [...dados[sala].categorias, 'Espaço Vazio'];
    graficoPizza.data.datasets[0].data = [...pizza, vazio];
    graficoPizza.update();

    // Atualiza medidor
    atualizaMedidor(ocupados, capacidade);
}

function atualizaMedidor(ocupado, capacidade) {
    const livre = capacidade - ocupado;
    let cor = '#4CAF50';
    const porcentagem = ocupado / capacidade;

    if (porcentagem > 0.8) cor = '#FF5252';
    else if (porcentagem > 0.5) cor = '#FFC107';

    medidorChart.data.datasets[0].data = [ocupado];
    medidorChart.data.datasets[0].backgroundColor = cor;
    medidorChart.data.datasets[1].data = [livre];
    medidorChart.options.scales.y.max = capacidade;
    medidorChart.update();
}

// Inicialização
atualizaGraficos('A');
