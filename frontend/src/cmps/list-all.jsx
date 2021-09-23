import { ListPreview } from './list-preview';

export const ListAll = props => {
  const { lists, onAddingCard, activeListId } = props;
  return (
    <section className="list-all flex">
      {lists.map(list => (
        <ListPreview
          key={list._id}
          list={list}
          isAddingCard={activeListId === list._id}
          onAddingCard={onAddingCard}
        />
      ))}
    </section>
  );
};
