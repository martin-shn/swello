import { createRef, Component } from 'react';
import {ReactComponent as LinkIcon} from '../../assets/svg/icon-link.svg';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import { setCardPopover, closeCardPopover } from '../../store/actions/system.actions';
import { updateBoard } from '../../store/actions/board.actions';
import {QrCode} from './qrcode'
import { userService } from '../../services/user.service';

class _InviteMain extends Component {
    state = {
        name: '',
        isQrCode: false,
        isLink:false,
        res: []
    };
    // inputRef = createRef();

    componentDidMount() {}

    handleChange = (ev) => {
        if (!ev.target.value.trim().length){
            this.setState({ name: '', res:[], isLink: false });
        }else{
            this.setState({ name: ev.target.value }, async ()=>{
                const res = await userService.getUsers({name:ev.target.value})
                this.setState({res})
            });
        }
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

    onSendInvitation = () => {
        // send invitation with sockets
        console.log('Invitation was sent with sockets');
        this.props.closeCardPopover()
    };

    createLink = () => {
        this.setState({ isQrCode: !this.state.isQrCode });
    };

    render() {
        const { board, onOpenPopover, cardPopover } = this.props;
        return (
            <section className='invite-main cards-popper'>
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
                            {this.state.isQrCode ? 'Disable link' : 'Create link'}
                        </button>
                    </div>
                    {this.state.isQrCode && <QrCode />}
                    <button className={this.state.isLink ? 'invite-active' : 'invite-disable'} onClick={this.onSendInvitation}>Send invitation</button>
                </div>

                {this.state.res.length>0&&<div className="invite-results">
                    <div>
                        {this.state.res.map(user=><div key={user._id} onClick={()=>this.setState({name:user.username, isLink:true, res:[]})}>
                                <img src={user.imgUrl} alt="user image"/>
                                <span>{user.fullname}</span>
                            </div>)}
                        </div>
                    </div>}
            </section>
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
