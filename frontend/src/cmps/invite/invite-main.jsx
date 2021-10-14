import { Component } from 'react';
import { ReactComponent as LinkIcon } from '../../assets/svg/icon-link.svg';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { DebounceInput } from 'react-debounce-input';
import { utilService } from '../../services/util.service';
import { setCardPopover, closeCardPopover } from '../../store/actions/system.actions';
import { QrCode } from './qrcode';
import { userService } from '../../services/user.service';
import { MiniLoader } from '../loader/mini-loader';
import { AppAvatar } from '../general/app-avatar';

class _InviteMain extends Component {
  state = {
    name: '',
    invitedUserId: '',
    isQrCode: false,
    isLink: false,
    res: null,
    isRes: false
  };

  componentDidMount () {
    this._ismounted = true;
  }
  componentWillUnmount () {
    this._ismounted = false;
  }

  handleChange = ev => {
    if (!this._ismounted) return;
    if (ev.target.value.length > 0) {
      this.setState({ res: [] });
    }
    if (!ev.target.value.trim().length) {
      if (!this._ismounted) return;
      this.setState({ name: '', res: null, isLink: false });
    } else {
      this.setState({ name: ev.target.value }, async () => {
        const res = await userService.getUsers({ name: this.state.name });
        if (!this._ismounted) return;
        this.setState({ res: res.length ? res : null, isRes: res.length ? true : false });
      });
    }
  };


  onOpenPopover = (ev, props) => {
    this.props.setCardPopover('', ev.target, props);
  };

  onOpenPopover = (ev, props) => {
    this.props.setCardPopover('', ev.target, props);
  };

  onSendInvitation = async () => {
    // send invitation with sockets
    const { invitedUserId } = this.state;
    const { user, board } = this.props;
    const url = `/invite/${ board._id }`;
    const notification = { id: utilService.makeId(), type: 'invite', title: 'Board Invitation', user, isRead: false, txt: `${ user.fullname } invited you to board ${ board.title }`, url, sentAt: Date.now() };
    let userToUpdate = await userService.getById(invitedUserId);
    userToUpdate = { ...userToUpdate, notifications: [notification, ...userToUpdate.notifications] };
    userService.update(userToUpdate, false);
    this.props.closeCardPopover();
  };

  createLink = () => {
    this.setState({ isQrCode: !this.state.isQrCode });
  };

  render () {
    // console.log(this.state);
    return (
      <section className="invite-main cards-popper">
        <div className="invite-header popper-header">
          <span>Invite to board</span>
          <button className="close-icon" onClick={this.props.closeCardPopover}></button>
        </div>
        <div className='invite-content popper-content'>
          <DebounceInput
            debounceTimeout={500}
            type='search'
            autoFocus
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
          {this.state.isQrCode && <QrCode boardId={this.props.board._id} />}
          <button className={this.state.isLink ? 'invite-active' : 'invite-disable'} onClick={this.onSendInvitation}>Send invitation</button>
        </div>
        {this.state.res?.length === 0 && <div className="invite-results"><MiniLoader /></div>}
        {!this.state.isRes && this.state.name.length > 0 && !this.state.res && <div className="invite-results"><span className="no-results">Looks like that person isn't a Swello member yet.</span></div>}
        {this.state.res?.length > 0 && <div className="invite-results">
          <div>
            {this.state.res.map(user => {
              return user._id !== this.props.user._id ? <div key={user._id} onClick={() => this.setState({ name: user.username, invitedUserId: user._id, isLink: true, res: null, isRes: true })}>
                <AppAvatar member={user} />
                <span>{user.fullname}</span>
              </div> : <></>;
            })}
          </div>
        </div>}
      </section>
    );
  }
}

const mapDispatchToProps = {
  setCardPopover,
  closeCardPopover,
};

const mapStateToProps = (state) => ({
  cardPopover: state.systemModule.cardPopover,
  board: state.boardModule.board,
  user: state.userModule.user
});

export const InviteMain = connect(mapStateToProps, mapDispatchToProps)(withRouter(_InviteMain));
