import { Bar } from 'react-chartjs-2';
import { differenceInHours, isPast } from 'date-fns';

export function CardStatus({ cards }) {
  const statusMap = cards.reduce(
    (obj, card) => {
      if (!card.dueDate || !card.dueDate.date) obj['No due date'].val++;
      else if (card.dueDate.isComplete) obj['Complete'].val++;
      else if (isPast(card.dueDate.date)) obj['Overdue'].val++;
      else if (differenceInHours(card.dueDate.date, Date.now()) < 24) obj['Due soon'].val++;
      else obj['Due later'].val++;
      return obj;
    },
    {
      Complete: { val: 0, clr: '#61bd4f' },
      'Due soon': { val: 0, clr: '#f2d600' },
      'Due later': { val: 0, clr: '#ff9f1a' },
      Overdue: { val: 0, clr: '#eb5a46' },
      'No due date': { val: 0, clr: 'rgb(223, 225, 230)' },
    }
  );
  const data = {
    labels: Object.keys(statusMap),
    datasets: [
      {
        label: 'Cards',
        data: Object.values(statusMap).map(status => status.val),
        backgroundColor: Object.values(statusMap).map(status => status.clr),
      },
    ],
  };
  return (
    <Bar
      data={data}
      options={{
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: {
            ticks: {
              precision: 0,
            },
          },
        },
        plugins: { legend: { display: false } },
      }}
    />
  );
}
