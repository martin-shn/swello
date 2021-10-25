import _ from 'lodash';
import { Doughnut } from 'react-chartjs-2';

export function CardPerLabel ({ cards, labels }) {
  const cardsWithLabel = label =>
    cards.reduce((count, card) => (card.labelIds?.includes(label.id) ? count + 1 : count), 0);
  const colors = {
    green: '#61bd4f', yellow: '#f2d600', orange: '#ff9f1a', red: '#eb5a46', purple: '#c377e0', blue: '#0079bf',
    sky: '#00c2e0', lime: '#51e898', pink: '#ff78cb', black: '#344563', gray: '#b3bac5'
  };
  const data = {
    labels: [],
    datasets: [
      {
        label: '# of cards',
        data: [],
        backgroundColor: [],
      },
    ],
  };
  labels.forEach(label => {
    data.labels.push(label.title || _.capitalize(label.color));
    data.datasets[0].backgroundColor.push(colors[label.color]);
    data.datasets[0].data.push(cardsWithLabel(label));
  });
  if (!_.sum(data.datasets[0].data)) return <div>No cards with labels</div>;
  return <Doughnut data={data} options={{ responsive: true, maintainAspectRatio: false, plugins: { legend: { position: 'right' } } }} />;
}
