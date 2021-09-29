import { createRef, Component } from 'react';
import {ReactComponent as LinkIcon} from '../../assets/svg/icon-link.svg';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import { setCardPopover, closeCardPopover } from '../../store/actions/system.actions';
import { updateBoard } from '../../store/actions/board.actions';
import { boardService } from '../../services/board.service';

class _InviteMain extends Component {
    state = {
        name: '',
        isLink: false,
    };
    // inputRef = createRef();

    componentDidMount() {}

    handleChange = (ev) => {
        this.setState({ name: ev.target.value },()=>{
            // this.onOpenPopover(ev, { name: this.state.name, updateField:this.updateField, isFromNav: false });
        });
    };

    onOpenPopover = (ev, props) => {
        // const { name } = ev.target;
        this.props.setCardPopover('', ev.target, props);
    };

    onInviteClick = (url) => {
        window.open(url, '_blank');
    };

    // onSaveLocation = (location) => {
    //     const { updateField } = this.props;
    //     updateField({ location });
    //     this.props.closeCardPopover()
    // }

    updateField = (data) => {
        const { board } = this.props;
        const { card } = this.state;
        const updatedCard = { ...card, ...data };
        const updatedBoard = boardService.updateCard(board, updatedCard);
        this.props.updateBoard(updatedBoard);
    };

    createLink = () => {
        this.setState({ isLink: !this.state.isLink });
    };

    render() {
        const { board, onOpenPopover, cardPopover } = this.props;
        if (!board) {
            this.props.history.push('/');
            return <></>;
        }
        return (
            <>
            {cardPopover.name==='invite-main' && <section className='invite-main cards-popper'>
                <div className='invite-header popper-header'>
                    <span>Invite to board</span>
                    <button className='close-icon' onClick={this.props.closeCardPopover}></button>
                </div>
                <div className='invite-content popper-content'>
                    <input
                        type='search'
                        autoComplete='off'
                        autoCorrect='off'
                        placeholder='Email address or name'
                        onChange={(ev) => {
                            this.handleChange(ev);
                        }}
                        value={this.state.name}
                    />
                    <div className='invite-link'>
                        <span>
                            <LinkIcon />
                            Invite with link
                        </span>
                        <button className='create-invite-link' onClick={this.createLink}>
                            {this.state.isLink ? 'Disable link' : 'Create link'}
                        </button>
                    </div>
                    {this.state.isLink && <div>HERE COMES NEW CMP TO CREATE AND SHOW QRCODE</div>}
                    <button className={this.state.isLink ? 'invite-active' : 'invite-disable'}>Send invitation</button>
                </div>
            </section>}
            </>
        );
    }
}

const mapDispatchToProps = {
    updateBoard,
    setCardPopover,
    closeCardPopover
};

const mapStateToProps = (state) => ({
    board: state.boardModule.board,
    cardPopover: state.systemModule.cardPopover,
});

export const InviteMain = withRouter(connect(mapStateToProps, mapDispatchToProps)(withRouter(_InviteMain)));
