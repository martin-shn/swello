import { Pie } from 'react-chartjs-2';

export function CardPerMember ({ cards }) {
  const membersMap = cards.reduce((res, card) => {
    card.members?.forEach(member => {
      const name = member.fullname || member.username || 'John Doe';
      if (!res[name]) res[name] = 0;
      res[name]++;
    });
    return res;
  }, {});
  const data = {
    labels: Object.keys(membersMap),
    datasets: [
      {
        label: '# of cards',
        data: Object.values(membersMap),
        // prettier-ignore
        backgroundColor: ['#61bd4f', '#f2d600', '#ff9f1a', '#eb5a46', '#c377e0', '#0079bf', '#00c2e0',
          '#51e898', '#ff78cb', '#344563', '#b3bac5'],
      },
    ],
  };
  // console.log('🚀 ~ file: card-per-member.jsx ~ line 22 ~ CardPerMember ~ membersMap', membersMap);
  if (!Object.keys(membersMap).length) return <div>No cards assigned to members</div>;
  return <Pie data={data} options={{ responsive: true, maintainAspectRatio: false, plugins: { legend: { position: 'right' } } }} />;
}
