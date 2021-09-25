import { ListAdd } from './list-add';
import { ListPreview } from './list-preview';

export const ListAll = props => {
  const {
    lists,
    onAddingCard,
    onAddingTopCard,
    activeList,
    popoverListId,
    onTogglePopover,
    isAddingList,
    onAddingList,
    onAddList,
    onListUpdated,
    onCopyList,
    onMoveList
  } = props;
  return (
    <section className="list-all flex full with-main-layout">
      {lists.map(list => (
        <ListPreview
          key={list.id}
          list={list}
          lists={lists}
          isAddingCard={activeList.id === list.id && !activeList.isTopAdd}
          isTopAdd={activeList.isTopAdd && activeList.id === list.id}
          isPopoverOpen={popoverListId === list.id}
          onAddingCard={onAddingCard}
          onAddingTopCard={onAddingTopCard}
          onTogglePopover={onTogglePopover}
          onListUpdated={onListUpdated}
          onCopyList={onCopyList}
          onMoveList={onMoveList}
        />
      ))}
      <ListAdd isAddingList={isAddingList} onAddingList={onAddingList} onAddList={onAddList} />
    </section>
  );
};
