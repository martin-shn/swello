import React from "react";
import { connect } from 'react-redux';
import { cardService } from "../../../services/board-services/card.service";
import { boardService } from '../../../services/board.service'
import { updateBoard } from '../../../store/actions/board.actions';
import { setQuickEdit } from '../../../store/actions/system.actions';


export class _MoveCard extends React.Component {
    state = {
        listId: cardService.getListOfCard(this.props.board, this.props.card.id).id,
        idx: cardService.getListOfCard(this.props.board, this.props.card.id).cards.findIndex(card => card.id === this.props.card.id)
    }
    initialListId = cardService.getListOfCard(this.props.board, this.props.card.id).id;
    initialCardIdx = cardService.getListOfCard(this.props.board, this.props.card.id).cards.findIndex(card => card.id === this.props.card.id)
    handleChange = ({ target }) => {
        const field = target.name;
        const value = target.name === 'idx' ? parseInt(target.value) : target.value;
        if (field === 'listId') this.setState({ listId: value, idx: 0 })
        else this.setState(prevState => ({ ...prevState, [field]: value }))
    }
    onMoveCard = (ev) => {
        ev.preventDefault()
        const { board } = this.props
        const { listId, idx } = this.state;
        const updatedBoard = boardService.moveCard(board, this.initialListId, this.initialCardIdx, listId, idx)
        this.props.updateBoard(updatedBoard)
        this.props.closeCardPopover()
        if (this.props.cardQuickEdit) this.props.setQuickEdit(null)
    }
    render() {
        const { board, closeCardPopover } = this.props;
        const { idx, listId } = this.state;
        const list = board.lists.find(list => list.id === listId)
        return (
            <>
                <section className="popper-header">
                    <div>Move card</div>
                    <button onClick={closeCardPopover}></button>
                </section>
                <section className="popper-content move-card flex column">
                    <span className="sub-header">select destination</span>
                    <form className="flex column">
                        <div className="select-container flex">
                            <div className="select flex column">
                                <span className="label">List</span>
                                <span className="value">{list.title}</span>
                                <select name="listId" defaultValue={list.id} onChange={this.handleChange}>
                                    {board.lists.map((currList, idx) => (
                                        <option key={currList.id} value={currList.id} >{currList.title + (currList.id === this.initialListId ? ' (current)' : '')}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="select flex column">
                                <span className="label">Position</span>
                                <span className="value">{idx + 1}</span>
                                <select name="idx" defaultValue={idx} onChange={this.handleChange}>
                                    {list.cards.map((currCard, currIdx) => (
                                        <option key={currCard.id} value={currIdx} >{currIdx + 1 + (list.id === this.initialListId && currIdx === this.initialCardIdx ? ' (current)' : '')}</option>
                                    ))}
                                    {list.id !== this.initialListId && <option value={list.cards.length} >{list.cards.length + 1}</option>}
                                </select>
                            </div>
                        </div>
                        <button onClick={ev => this.onMoveCard(ev)}>Move</button>
                    </form>
                </section>
            </>
        )
    }
}

const mapDispatchToProps = {
    updateBoard,
    setQuickEdit
};

const mapStateToProps = state => {
    return {
        cardQuickEdit: state.systemModule.cardQuickEdit,
    };
};


export const MoveCard = connect(mapStateToProps, mapDispatchToProps)(_MoveCard);