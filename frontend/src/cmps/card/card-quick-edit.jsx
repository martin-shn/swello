import React from 'react'
import { Link } from 'react-router-dom'
import CloseIcon from '@mui/icons-material/Close';
import CoverIcon from '@mui/icons-material/VideoLabel';
import MemberIcon from '@mui/icons-material/PersonOutlineOutlined';
import DateIcon from '@mui/icons-material/Schedule';
import LabelIcon from '@mui/icons-material/LabelOutlined';
import CopyIcon from '@mui/icons-material/ContentCopy';
import MoveIcon from '@mui/icons-material/ArrowForward';
import VideoLabelIcon from '@mui/icons-material/VideoLabel';
import { ReactComponent as ArchiveIcon } from '../../assets/svg/archive-icon.svg';
import { boardService } from '../../services/board.service';
import { CardPopover } from './card-popover';

export class CardQuickEdit extends React.Component {
    state = {
        top: null,
        left: null,
        fade: false
    }
    componentDidMount() {
        const { pos } = this.props;
        this.setState({ top: pos.top, left: pos.left + pos.width })
        setTimeout(() => {
            this.setState({ fade: true })
        }, 50)
    }
    componentDidUpdate(prevProps) {
        if (prevProps.card !== this.props.card) {
            const { pos } = this.props;
            this.setState({ top: pos.top, left: pos.left + pos.width })
        }
    }
    componentWillUnmount() {
        this.props.closeCardPopover()
    }
    onOpenPopover = (ev, props) => {
        const { name } = ev.target.parentElement;
        console.log(ev);
        this.props.setCardPopover(name, ev.target, props);
    };
    updateField = (data, activityType, activityValues) => {
        const { board } = this.props;
        const { card } = this.props;
        const updatedCard = { ...card, ...data };
        const activity = activityType
            ? boardService.createActivity(updatedCard, activityType, activityValues)
            : null;
        const updatedBoard = boardService.updateCard(board, updatedCard, activity, false);
        this.props.updateBoard(updatedBoard);
    };
    onArchiveCard = () => {
        const updatedBoard = boardService.archiveCard(this.props.board, this.props.card)
        this.props.updateBoard(updatedBoard)
        this.props.setQuickEdit(null);
    }
    render() {
        const { top, left, fade } = this.state;
        if (!top || !left) return <div></div>;
        const { card, setQuickEdit, board, cardPopover } = this.props;
        const { updateField, onOpenPopover } = this;
        return (
            <>
                <div className="editor-screen" onClick={() => { setQuickEdit(null) }}>
                    <CloseIcon className="close-icon" onClick={(ev) => { ev.stopPropagation(); setQuickEdit(null) }} />
                    <section className={`card-quick-edit${fade ? ' fade-in' : ''}`} style={{ top: `${top}px`, left: `${left}px` }}>
                        <Link to={`/board/${board._id}/card/${card.id}`}>
                            <div className="flex">
                                <VideoLabelIcon />
                                Open card
                            </div>
                        </Link>
                        <button name="add-labels" onClick={ev => { ev.stopPropagation(); onOpenPopover(ev, { board, card, updateField }) }}>
                            <div className="flex">
                                <LabelIcon />
                                Edit label
                            </div>
                        </button>
                        <button name="add-members" onClick={ev => { ev.stopPropagation(); onOpenPopover(ev, { card, board, updateField, }) }}>
                            <div className="flex">
                                <MemberIcon />
                                Change members
                            </div>
                        </button>
                        <button name="add-cover" onClick={ev => { ev.stopPropagation(); onOpenPopover(ev, { card, updateField }) }}>
                            <div className="flex">
                                <CoverIcon />
                                Change cover
                            </div>
                        </button>
                        <button name="move-card" onClick={ev => { ev.stopPropagation(); onOpenPopover(ev, { board, card }) }}>
                            <div className="flex">
                                <MoveIcon />
                                Move
                            </div>
                        </button>
                        <button name="copy-card" onClick={ev => { ev.stopPropagation(); onOpenPopover(ev, { board, card }) }}>
                            <div className="flex">
                                <CopyIcon />
                                Copy
                            </div>
                        </button>
                        <button name="add-due-date" onClick={ev => { ev.stopPropagation(); onOpenPopover(ev, { card, dueDate: card.dueDate, updateField }) }}>
                            <div className="flex">
                                <DateIcon />
                                Edit dates
                            </div>
                        </button>
                        <button name="archive-card" onClick={ev => { ev.stopPropagation(); this.onArchiveCard() }}>
                            <div className="flex">
                                <ArchiveIcon />
                                Archive
                            </div>
                        </button>
                    </section>
                </div>
                {cardPopover.name && cardPopover.anchorEl && <CardPopover />}
            </>
        )
    }
}
