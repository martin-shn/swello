import React from "react";
import { connect } from 'react-redux';
import { cardService } from "../../../services/board-services/card.service";
import { boardService } from '../../../services/board.service'
import { updateBoard } from '../../../store/actions/board.actions';
import { setQuickEdit } from '../../../store/actions/system.actions'


export class _CopyCard extends React.Component {
    state = {
        listId: cardService.getListOfCard(this.props.board, this.props.card.id).id,
        idx: cardService.getListOfCard(this.props.board, this.props.card.id).cards.findIndex(card => card.id === this.props.card.id),
        title: this.props.card.title,
        keep: {
            checklists: true,
            labels: true,
            members: true,
            attachments: true
        }
    }
    initialListId = cardService.getListOfCard(this.props.board, this.props.card.id).id;
    initialCardIdx = cardService.getListOfCard(this.props.board, this.props.card.id).cards.findIndex(card => card.id === this.props.card.id)

    handleChange = ({ target }) => {
        this.setState({ title: target.value })
    }
    checkboxHandleChange = ({ target }) => {
        const field = target.name;
        const value = target.checked;
        this.setState(prevState => ({ keep: { ...prevState.keep, [field]: value } }))
    }
    selectHandleChange = ({ target }) => {
        const field = target.name;
        const value = target.name === 'idx' ? parseInt(target.value) : target.value;
        if (field === 'listId') this.setState({ listId: value, idx: 0 })
        else this.setState(prevState => ({ ...prevState, [field]: value }))
    }
    onCopyCard = (ev) => {
        ev.preventDefault()
        const { idx, listId, title, keep } = this.state;
        const { board, card } = this.props;
        const updatedBoard = boardService.copyCard(board, card, listId, idx, title, keep)
        this.props.updateBoard(updatedBoard)
        this.props.closeCardPopover()
        this.props.setQuickEdit(null)
    }
    render() {
        const { board, card, closeCardPopover } = this.props;
        const { idx, listId, title, keep } = this.state;
        const list = board.lists.find(list => list.id === listId)
        return (
            <>
                <section className="popper-header">
                    <div>Copy card</div>
                    <button onClick={closeCardPopover}></button>
                </section>
                <section className="popper-content copy-card flex column">
                    <form className="flex column">

                        <label htmlFor="title" className="sub-header">Title</label>
                        <textarea name="title" id="title" autoFocus value={title} onChange={this.handleChange}></textarea>

                        <span className="sub-header">Keep...</span>
                        {card.checklists?.length > 0 &&
                            <div className="checkbox-container">
                                <input type="checkbox" id="keepChecklists" name="checklists" checked={keep.checklists} onChange={this.checkboxHandleChange} />
                                <label htmlFor="keepChecklists"><span>Checklists{` (${card.checklists.length})`}</span></label>
                            </div>}
                        {card.labelIds?.length > 0 &&
                            <div className="checkbox-container">
                                <input type="checkbox" id="keepLabels" name="labels" checked={keep.labels} onChange={this.checkboxHandleChange} />
                                <label htmlFor="keepLabels"><span>Labels{` (${card.labelIds.length})`}</span></label>
                            </div>}
                        {card.members?.length > 0 &&
                            <div className="checkbox-container">
                                <input type="checkbox" id="keepMembers" name="members" checked={keep.members} onChange={this.checkboxHandleChange} />
                                <label htmlFor="keepMembers"><span>Members{` (${card.members.length})`}</span></label>
                            </div>}
                        {card.attachments?.length > 0 &&
                            <div className="checkbox-container">
                                <input type="checkbox" id="keepAttachments" name="attachments" checked={keep.attachments} onChange={this.checkboxHandleChange} />
                                <label htmlFor="keepAttachments"><span>Attachments{` (${card.attachments.length})`}</span></label>
                            </div>}

                        <span className="sub-header">Copy to...</span>
                        <div className="select-container flex">
                            <div className="select flex column">
                                <span className="label">List</span>
                                <span className="value">{list.title}</span>
                                <select name="listId" defaultValue={list.id} onChange={this.selectHandleChange}>
                                    {board.lists.map((currList) => (
                                        <option key={currList.id} value={currList.id} >{currList.title + (currList.id === this.initialListId ? ' (current)' : '')}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="select flex column">
                                <span className="label">Position</span>
                                <span className="value">{idx + 1}</span>
                                <select name="idx" defaultValue={idx} onChange={this.selectHandleChange}>
                                    {list.cards.map((currCard, currIdx) => (
                                        <option key={currCard.id} value={currIdx} >{currIdx + 1 + (list.id === this.initialListId && currIdx === this.initialCardIdx ? ' (current)' : '')}</option>
                                    ))}
                                    {list.id !== this.initialListId && <option value={list.cards.length} >{list.cards.length + 1}</option>}
                                </select>
                            </div>
                        </div>
                        <button onClick={ev => this.onCopyCard(ev)}>Create card</button>
                    </form>
                </section>
            </>
        )
    }
}

const mapDispatchToProps = {
    updateBoard,
    setQuickEdit,
};


export const CopyCard = connect(null, mapDispatchToProps)(_CopyCard);
