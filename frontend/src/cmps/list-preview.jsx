import React, { Component } from 'react';
// import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import AddIcon from '@mui/icons-material/Add';
import { boardService } from '../services/board.service';
import { updateBoard } from '../store/actions/board.actions';
import { Popover } from './popover';
import { MainPage } from './list-popover-pages/main-page';
import { CopyPage } from './list-popover-pages/copy-page';
import { MovePage } from './list-popover-pages/move-page';
import { MoveAllCards } from './list-popover-pages/move-all-cards-page';
import { SortPage } from './list-popover-pages/sort-page';
import { ReactComponent as CloseIcon } from '../assets/svg/close.svg';
// import { utilService } from '../services/util.service';
import { CardList } from './card-list';
import { Draggable } from 'react-beautiful-dnd';

export class _ListPreview extends Component {
  state = {
    popoverPage: 'main',
    isDragging: true,
    listName: this.props.list.title,
    class: '',
  };

  componentDidMount() {
    setTimeout(() => {
      if (this.elInnerRef?.current) {
        this.setState({
          class:
            this.elInnerRef.current.scrollHeight > this.elInnerRef.current.clientHeight
              ? ' visible-scroll'
              : '',
        });
      }
    }, 10);
  }

  elInnerRef = React.createRef();

  bottomAddRef = React.createRef();
  topAddRef = React.createRef();
  title = React.createRef();

  componentDidUpdate = prevProps => {
    if (prevProps.isPopoverOpen !== this.props.isPopoverOpen) {
      this.setState({ popoverPage: 'main' });
    }
  };

  onAddCard = (ev, isTopAdd) => {
    ev.preventDefault();
    const title = ev.target.title.value;
    const { board, list } = this.props;
    const updatedBoard = boardService.addCard(board, list, title, isTopAdd);
    if (isTopAdd) {
      this.props.onAddingTopCard(false);
    } else {
      this.props.onAddingCard(false);
    }
    this.props.updateBoard(updatedBoard);
  };

  onMovePage = page => {
    this.setState({ popoverPage: page });
  };

  handleChange = ({ target }) => {
    this.setState({ listName: target.value });
  };

  onUpdateTitle = ev => {
    const updatedBoard = boardService.updateList(this.props.board, {
      ...this.props.list,
      title: ev.target.value,
    });
    this.props.updateBoard(updatedBoard);
  };

  render() {
    const {
      idx,
      list,
      lists,
      isAddingCard,
      onAddingCard,
      onAddingTopCard,
      isPopoverOpen,
      onTogglePopover,
      isTopAdd,
      onCopyList,
      onMoveList,
      onMoveAllCardsToList,
      onSortList
      // board
    } = this.props;
    const { popoverPage } = this.state;
    return (
      <Draggable draggableId={list.id} index={idx}>
        {provided => (
          <div
            className={`list-preview flex column${this.state.class}`}
            {...provided.draggableProps}
            ref={provided.innerRef}>
            <div
              className={`list-header flex space-between${this.state.class}`}
              {...provided.dragHandleProps}>
              {!this.state.isDragging && (
                <input
                  type="text"
                  autoCorrect="off"
                  autoComplete="off"
                  value={this.state.listName}
                  onChange={this.handleChange}
                  autoFocus
                  onKeyUp={ev => {
                    if (ev.key === 'Enter') {
                      ev.target.blur();
                    }
                  }}
                  onBlur={ev => {
                    this.setState({ isDragging: true });
                    this.onUpdateTitle(ev);
                  }}
                  style={{ width: '100%' }}
                />
              )}
              {this.state.isDragging && (
                <h2
                  className="list-title content-editable"
                  onClick={() => {
                    this.setState({ isDragging: false });
                  }}>
                  {list.title}
                </h2>
              )}
              <button
                className="btn-more"
                onClick={() => onTogglePopover(isPopoverOpen ? null : list.id)}>
                <MoreHorizIcon />
              </button>
            </div>
            <Popover isVisible={isPopoverOpen}>
              {popoverPage === 'main' && (
                <MainPage
                  onMovePage={this.onMovePage}
                  list={list}
                  onTogglePopover={onTogglePopover}
                  onAddingTopCard={onAddingTopCard}
                />
              )}
              {popoverPage === 'copy' && (
                <CopyPage
                  onMovePage={this.onMovePage}
                  list={list}
                  onTogglePopover={onTogglePopover}
                  onCopyList={onCopyList}
                />
              )}
              {popoverPage === 'move' && (
                <MovePage
                  onMovePage={this.onMovePage}
                  list={list}
                  lists={lists}
                  onTogglePopover={onTogglePopover}
                  onMoveList={onMoveList}
                />
              )}
              {popoverPage === 'sort' && (
                <SortPage
                  onMovePage={this.onMovePage}
                  list={list}
                  onTogglePopover={onTogglePopover}
                  onSortList={onSortList}
                />
              )}
              {popoverPage === 'move-all' && (
                <MoveAllCards
                  onMovePage={this.onMovePage}
                  list={list}
                  lists={lists}
                  onTogglePopover={onTogglePopover}
                  onMoveAllCardsToList={onMoveAllCardsToList}
                />
              )}
            </Popover>
            <div
              ref={this.elInnerRef}
              className={`cards-container flex column visible-scroll${this.state.class}`}
              style={{
                gap: isTopAdd ? '10px' : '0',
                // marginRight: this.elRef.current.scrollHeight > this.elRef.current.clientHeight?'-10px':'0px'
              }}>
              {list.cards && <CardList listId={list.id} cards={list.cards} />}

              <div className="add-card" style={{ order: isTopAdd ? '-1' : '0' }}>
                {!isAddingCard && !isTopAdd && (
                  <button className="content btn-adding" onClick={() => onAddingCard(list.id)}>
                    <AddIcon />
                    <span>Add a card</span>
                  </button>
                )}
                {(isAddingCard || isTopAdd) && (
                  <>
                    <form
                      onSubmit={ev => {
                        this.onAddCard(ev, isTopAdd);
                      }}>
                      <textarea
                        name="title"
                        placeholder="Enter a title for this card..."
                        onKeyDown={ev => ev.key === 'Enter' && this.bottomAddRef.current.click()}
                      />
                      <div className="add-controls">
                        <button ref={this.bottomAddRef} className="btn-add">
                          Add Card
                        </button>
                        <CloseIcon className="close-icon" onClick={() => onAddingCard(false)} />
                      </div>
                    </form>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </Draggable>
    );
  }
}

const mapDispatchToProps = {
  updateBoard,
};

function mapStateToProps(state) {
  return {
    board: state.boardModule.board,
  };
}

export const ListPreview = connect(mapStateToProps, mapDispatchToProps)(_ListPreview);
