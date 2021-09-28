import React from 'react';
import ReactDOM from 'react-dom';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
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
    onMoveList,
  } = props;

  // DRAG DROP :
  const onDragEnd = () => {
    console.log('drag end');
  };

  return (
    <div className="flex list-all full with-main-layout">
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="all-lists" direction="horizontal" type="list">
          {provided => (
            <section
              className="flex lists-container"
              {...provided.droppableProps}
              ref={provided.innerRef}>
              {lists.map((list, idx) => (
                <ListPreview
                  key={list.id}
                  idx={idx}
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
              {provided.placeholder}
            </section>
          )}
        </Droppable>
      </DragDropContext>
      <ListAdd isAddingList={isAddingList} onAddingList={onAddingList} onAddList={onAddList} />
    </div>
  );
};
