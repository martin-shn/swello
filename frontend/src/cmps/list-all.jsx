import React from 'react';
// import ReactDOM from 'react-dom';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import { ListAdd } from './list-add';
import { ListPreview } from './list-preview';
import { boardService } from '../services/board.service';

export const ListAll = props => {
  const {
    board,
    updateBoard,
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
  const onDragEnd = ({ destination, source, type }) => {
    if (!destination) return;
    let updatedBoard = board;
    if (type === 'list') {
      updatedBoard = boardService.moveList(board, source.index, destination.index)
    } else if (type === 'card') {
      updatedBoard = boardService.moveCard(board, source.droppableId, source.index, destination.droppableId, destination.index)
    }
    updateBoard(updatedBoard)
  };

  return (
    <div className="flex list-all full with-main-layout">
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="all-lists" direction="horizontal" type="list">
          {(provided, snapshot) => (
            <section
              className={`flex lists-container${snapshot.isDraggingOver?' dragging-over':''}`}
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
