import React from 'react'
import RefreshIcon from '@mui/icons-material/Replay';
import { boardService } from '../../services/board.service';
import { CardPreviewInfo } from '../card-preview'
import CloseIcon from '@mui/icons-material/Close';
import BackIcon from '@mui/icons-material/ArrowBackIosNew';

export class SideMenuArchive extends React.Component {
    state = {
        currItem: 'cards',
        search: ''
    }

    inputRef = React.createRef()

    handleChange = ({ target }) => {
        this.setState({ search: target.value })
    }

    onToggleItemType = () => {
        if (this.state.currItem === 'cards') this.setState({ currItem: 'lists' })
        else this.setState({ currItem: 'cards' })
        this.inputRef.current.focus()
    }
    onUnarchiveList = (archivedList) => {
        const { board } = this.props;
        const updatedBoard = boardService.unarchiveList(board, archivedList)
        this.props.updateBoard(updatedBoard)
    }
    onUnarchiveCard = (cardId) => {
        const { board } = this.props;
        const updatedBoard = boardService.unarchiveCard(board, cardId)
        this.props.updateBoard(updatedBoard)
    }
    onRemoveCard = (cardId) => {
        const { board } = this.props;
        const updatedBoard = boardService.removeCard(board, cardId)
        this.props.updateBoard(updatedBoard)
    }
    render() {
        const { setPage, board, toggleSideMenu } = this.props;
        const { currItem, search } = this.state;
        return (
            <>
                <div className="side-menu-header visible-scroll">
                    <span
                        className="back"
                        onClick={() => {
                            setPage('index');
                        }}
                    ><BackIcon /></span>
                    <h3>Archive</h3>
                    <button className="close-side-menu" onClick={toggleSideMenu}><CloseIcon /></button>
                </div>
                <hr style={{ width: 'calc(100% - 18px)', margin: '0px auto 4px' }} />
                <div className="archive-container">
                    <div className="search flex">
                        <input ref={this.inputRef} type="text" placeholder="Search archive..." value={search} onChange={this.handleChange} autoFocus />
                        <button className="archive-btn" onClick={this.onToggleItemType}>{'Switch to ' + (currItem === 'cards' ? 'lists' : 'cards')}</button>
                    </div>
                    <div className="items-container flex column">
                        {currItem === 'cards' &&
                            <>
                                {!board.archive?.cards?.length ?
                                    <p className="empty-list">No archived cards</p>
                                    : <ul className="clean-list">
                                        {board.archive.cards.map(archivedCard => {
                                            return archivedCard.card.title.toLowerCase().includes(search) &&
                                                <li key={archivedCard.card.id} className="archive-card">
                                                    <CardPreviewInfo card={archivedCard.card} />
                                                    <div className="options">
                                                        <p>
                                                            <button onClick={() => this.onUnarchiveCard(archivedCard.card.id)}>Send to board</button> - <button onClick={() => this.onRemoveCard(archivedCard.card.id)}>Delete</button>
                                                        </p>
                                                    </div>
                                                </li>
                                        })}
                                        {!board.archive.cards.some(archivedCard => archivedCard.card.title.toLowerCase().includes(search))
                                            && <p className="empty-list">No results</p>}
                                    </ul>}
                            </>
                        }
                        {currItem === 'lists' &&
                            <>
                                {!board.archive?.lists?.length ?
                                    <p className="empty-list">No archived lists</p>
                                    : <ul className="clean-list">
                                        {board.archive.lists.map(archivedList => {
                                            return archivedList.list.title.toLowerCase().includes(search) &&
                                                <li key={archivedList.list.id} className="archive-list flex">
                                                    <div className="item-name">{archivedList.list.title}</div>
                                                    <button className="archive-btn" onClick={() => this.onUnarchiveList(archivedList)}><RefreshIcon /> Send to board</button>
                                                </li>
                                        })}
                                        {!board.archive.lists.some(archivedList => archivedList.list.title.toLowerCase().includes(search))
                                            && <p className="empty-list">No results</p>}
                                    </ul>}
                            </>
                        }
                    </div>
                </div>
            </>
        )
    }
}
