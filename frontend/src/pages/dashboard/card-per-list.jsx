import { Bar } from 'react-chartjs-2';

export function CardPerList({ board }) {
  const listCards = board.lists.reduce((res, list) => {
    res[list.title] = list.cards?.length || 0;
    return res;
  }, {});

  const data = {
    labels: Object.keys(listCards),
    datasets: [
      {
        label: 'Cards',
        data: Object.values(listCards),
        backgroundColor: 'rgb(66, 82, 110)',
      },
    ],
  };
  return (
    <Bar
      data={data}
      options={{
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { display: false } },
        scales: {
          y: {
            ticks: {
              precision: 0,
            },
          },
        },
      }}
    />
  );
}
