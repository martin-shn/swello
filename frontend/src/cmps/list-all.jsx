import { ListPreview } from './list-preview';

export const ListAll = props => {
  const {
    isEditingTitle,
    lists,
    onEditTitle,
    onTogglePopover,
    isPopover,
    onAddingCard,
    isAddingCard,
  } = props;
  return (
    <section className="list-all flex">
      {lists.map(list => (
        <ListPreview
          key={list._id}
          list={list}
          isEditingTitle={isEditingTitle === list._id}
          onEditTitle={onEditTitle}
          onTogglePopover={onTogglePopover}
          isPopover={isPopover === list._id}
          isAddingCard={isAddingCard === list._id}
          onAddingCard={onAddingCard}
        />
      ))}
    </section>
  );
};
