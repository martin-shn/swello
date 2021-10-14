import React, { Component } from 'react';
// import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { boardService } from '../services/board.service';
import { updateBoard } from '../store/actions/board.actions';
import { Popover } from './popover';
import { MainPage } from './list-popover-pages/main-page';
import { CopyPage } from './list-popover-pages/copy-page';
import { MovePage } from './list-popover-pages/move-page';
import { MoveAllCards } from './list-popover-pages/move-all-cards-page';
import { SortPage } from './list-popover-pages/sort-page';
// import { utilService } from '../services/util.service';
import { CardList } from './card-list';
import { Draggable } from 'react-beautiful-dnd';
import { AddCard } from './add-card';

export class _ListPreview extends Component {
  state = {
    popoverPage: 'main',
    isDragging: true,
    listName: this.props.list.title,
    class: '',
  };

  elInnerRef = React.createRef();

  bottomAddRef = React.createRef();
  topAddRef = React.createRef();
  title = React.createRef();

  componentDidMount() {
    this.setScrollClass()
  }

  componentDidUpdate = prevProps => {
    if (prevProps.isPopoverOpen !== this.props.isPopoverOpen) {
      this.setState({ popoverPage: 'main' });
    }
    if (prevProps.list.cards.length !== this.props.list.cards.length) {
      this.setScrollClass()
    }
  };

  componentWillUnmount() {
    clearTimeout(this.timeout)
  }

  setScrollClass = () => {
    this.timeout = setTimeout(() => {
      if (this.elInnerRef?.current) {
        this.setState({
          class: this.elInnerRef.current.scrollHeight > this.elInnerRef.current.clientHeight ? ' visible-scroll' : '',
        });
      }
    }, 100);
  }

  onAddCard = (title, isTopAdd) => {
    if (!title) return;
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
      onSortList,
      onArchiveList,
      // board
    } = this.props;
    const { popoverPage } = this.state;
    // setTimeout(() => {
    //   if (this.elInnerRef?.current) {
    //     this.setState({
    //       class: this.elInnerRef.current.scrollHeight > this.elInnerRef.current.clientHeight ? ' visible-scroll' : '',
    //     });
    //   }
    // }, 100);
    return (
      <Draggable draggableId={list.id} index={idx}>
        {provided => (
          <div
            className={`list-preview flex column${ this.state.class}`}
            {...provided.draggableProps}
            ref={provided.innerRef}>
            <div className={`list-header flex space-between${ this.state.class}`} {...provided.dragHandleProps}>
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
              <button className="btn-more transperant" onClick={() => onTogglePopover(isPopoverOpen ? null : list.id)}>
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
                  onArchiveList={onArchiveList}
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
              className={`cards-container flex column ${this.state.class}${this.props.cardQuickEdit ? ' quick-edit-open' : ''}`}
              style={{
                marginTop: isTopAdd ? '10px' : '0',
              }}>
              {list.cards && <CardList listId={list.id} cards={list.cards} isScroll={this.state.class === ' visible-scroll'} />}
              {list.cards && list.cards.length === 0 && <AddCard scrollClass={this.state.class} isTopAdd={isTopAdd} isAddingCard={isAddingCard} onAddCard={this.onAddCard} onAddingCard={onAddingCard} listId={list.id} />}
            </div>
            {list.cards && list.cards.length > 0 && <AddCard scrollClass={this.state.class} isTopAdd={isTopAdd} isAddingCard={isAddingCard} onAddCard={this.onAddCard} onAddingCard={onAddingCard} listId={list.id} />}
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
    cardQuickEdit: state.systemModule.cardQuickEdit
  };
}

export const ListPreview = connect(mapStateToProps, mapDispatchToProps)(_ListPreview);
