import { Doughnut as DoughnutChart } from 'react-chartjs-2';

function getSegments(baseData) {
  let labels = [];
  let data = [];
  let backgroundColor = [];

  // TODO: Implement this in a better way. Enum maybe?
  for (const [name, amount] of baseData) {
    data.push(amount);

    switch (name) {
      case 'payment':
        labels.push('Pago');
        backgroundColor.push('#5EEAD4');
        break;
      case 'food':
        labels.push('Comida');
        backgroundColor.push('#FDE68A');
        break;

      case 'entertainment':
        labels.push('Entretenimiento');
        backgroundColor.push('#D8B4FE');
        break;

      case 'car':
        labels.push('Carro');
        backgroundColor.push('#FECDD3');
        break;

      case 'home':
        labels.push('Casa');
        backgroundColor.push('#BFDBFE');
        break;

      case 'card':
        labels.push('Tarjeta');
        backgroundColor.push('#67E8F9');
        break;

      case 'other':
        labels.push('Otro');
        backgroundColor.push('#D4D4D8');
        break;
    }
  }

  return { labels, data, backgroundColor };
}

export function Doughnut({ data }) {
  const segments = getSegments(data);

  return (
    <DoughnutChart
      data={{
        labels: segments.labels,
        datasets: [
          {
            data: segments.data,
            backgroundColor: segments.backgroundColor
          }
        ]
      }}
      options={{
        plugins: {
          legend: {
            position: 'bottom',
            pointStyle: 'circle',
            usePointStyle: true
          }
        }
      }}
    />
  );
}
