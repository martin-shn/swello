import { ListAdd } from './list-add';
import { ListPreview } from './list-preview';

export const ListAll = props => {
  const {
    lists,
    onAddingCard,
    activeListId,
    popoverListId,
    onTogglePopover,
    isAddingList,
    onAddingList,
    onAddList,
    onListUpdated,
  } = props;
  return (
    <section className="list-all flex full with-main-layout">
      {lists.map(list => (
        <ListPreview
          key={list.id}
          list={list}
          isAddingCard={activeListId === list.id}
          isPopoverOpen={popoverListId === list.id}
          onAddingCard={onAddingCard}
          onTogglePopover={onTogglePopover}
          onListUpdated={onListUpdated}
        />
      ))}
      <ListAdd isAddingList={isAddingList} onAddingList={onAddingList} onAddList={onAddList} />
    </section>
  );
};
