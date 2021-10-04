import { Component } from 'react';
import { ReactComponent as LinkIcon } from '../../assets/svg/icon-link.svg';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { DebounceInput } from 'react-debounce-input';

import { setCardPopover, closeCardPopover } from '../../store/actions/system.actions';
import { QrCode } from './qrcode';
import { userService } from '../../services/user.service';
import { MiniLoader } from '../loader/mini-loader';
import { AppAvatar } from '../general/app-avatar';

class _InviteMain extends Component {
  state = {
    name: '',
    isQrCode: false,
    isLink: false,
    res: null,
  };

  handleChange = ev => {
    if (ev.target.value.length > 0) {
      this.setState({ res: [] });
    }
    if (!ev.target.value.trim().length) {
      this.setState({ name: '', res: null, isLink: false });
    } else {
      this.setState({ name: ev.target.value }, async () => {
        const res = await userService.getUsers({ name: this.state.name });
        this.setState({ res: res.length ? res : null });
      });
    }
  };

  onOpenPopover = (ev, props) => {
    this.props.setCardPopover('', ev.target, props);
  };

  onSendInvitation = () => {
    // send invitation with sockets
    console.log('Invitation was sent with sockets');
    this.props.closeCardPopover();
  };

  createLink = () => {
    this.setState({ isQrCode: !this.state.isQrCode });
  };

  render() {
    // console.log(this.state);
    return (
      <section className="invite-main cards-popper">
        <div className="invite-header popper-header">
          <span>Invite to board</span>
          <button className="close-icon" onClick={this.props.closeCardPopover}></button>
        </div>
        <div className="invite-content popper-content">
          <DebounceInput
            debounceTimeout={500}
            type="search"
            autoComplete="off"
            autoCorrect="off"
            placeholder="Email address or name"
            onChange={ev => {
              this.handleChange(ev);
            }}
            value={this.state.name}
          />
          <div className="invite-link">
            <span>
              <LinkIcon />
              Invite with link
            </span>
            <button className="create-invite-link" onClick={this.createLink}>
              {this.state.isQrCode ? 'Disable link' : 'Create link'}
            </button>
          </div>
          {this.state.isQrCode && <QrCode boardId={this.props.board._id} />}
          <button className={this.state.isLink ? 'invite-active' : 'invite-disable'} onClick={this.onSendInvitation}>
            Send invitation
          </button>
        </div>
        {this.state.res?.length === 0 && (
          <div className="invite-results">
            <MiniLoader />
          </div>
        )}
        {this.state.res?.length > 0 && (
          <div className="invite-results">
            <div>
              {this.state.res.map(user => (
                <div key={user._id} onClick={() => this.setState({ name: user.username, isLink: true, res: [] })}>
                  {/* <img src={user.imgUrl} alt="user image"/> */}
                  <AppAvatar member={user} />
                  <span>{user.fullname}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </section>
    );
  }
}

const mapDispatchToProps = {
  setCardPopover,
  closeCardPopover,
};

const mapStateToProps = state => ({
  cardPopover: state.systemModule.cardPopover,
  board: state.boardModule.board,
});

export const InviteMain = withRouter(connect(mapStateToProps, mapDispatchToProps)(withRouter(_InviteMain)));
