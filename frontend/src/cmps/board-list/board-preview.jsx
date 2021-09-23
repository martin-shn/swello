import React from 'react';
import { userService } from '../../services/user.service';
import { utilService } from '../../services/util.service';
import { Modal } from 'react-responsive-modal';
import 'react-responsive-modal/styles.css';

export class BoardPreview extends React.Component {
    state = {
        isModal: false,
        markedId: 0,
        boardName: '',
        isAllowed: 'not-allowed',
    };

    bgcs = [
      {bgc:'url(https://images.unsplash.com/photo-1632269826291-2cb3009bf43d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=Mnw3MDY2fDB8MXxjb2xsZWN0aW9ufDF8MzE3MDk5fHx8fHwyfHwxNjMyNDE5NzU2&ixlib=rb-1.2.1&q=80&w=400)'},
      {bgc:'url(https://images.unsplash.com/photo-1632286988262-dee7280ee48a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=Mnw3MDY2fDB8MXxjb2xsZWN0aW9ufDJ8MzE3MDk5fHx8fHwyfHwxNjMyNDE5NzU2&ixlib=rb-1.2.1&q=80&w=400)'},
      {bgc:'url(https://images.unsplash.com/photo-1632301497603-33fb3d7afdd1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=Mnw3MDY2fDB8MXxjb2xsZWN0aW9ufDN8MzE3MDk5fHx8fHwyfHwxNjMyNDE5NzU2&ixlib=rb-1.2.1&q=80&w=400)'},
      {bgc:'url(https://images.unsplash.com/photo-1632303283130-8a2ec7823251?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=Mnw3MDY2fDB8MXxjb2xsZWN0aW9ufDR8MzE3MDk5fHx8fHwyfHwxNjMyNDE5NzU2&ixlib=rb-1.2.1&q=80&w=400)'},
      {bgc:'rgb(0, 121, 191)'},
      {bgc:'rgb(210, 144, 52)'},
      {bgc:'rgb(81, 152, 57)'},
      {bgc:'rgb(176, 70, 50)'}
    ]

    onStar = (ev) => {
        ev.preventDefault();
        let user = userService.getLoggedinUser();
        user.starredBoards.push({
            id: utilService.makeId(),
            boardId: this.props.board._id,
        });
        this.props.updateUser(user);
    };

    onNew = () => {
        this.setState({ isModal: !this.state.isModal });
    };

    onCloseModal = (ev) => {
        this.setState({ isModal: false });
    };

    handleBgc = (targetId) => {
      this.setState({markedId:targetId})
    }

    handleChange = ({target}) => {
      this.setState({boardName: target.value, isAllowed: target.value.length>0?'allowed':'not-allowed'})
    }

    render() {
        const { isAdd, isStarred, board } = this.props;
        const imgUrl = board?.style.imgUrl ? board.style.imgUrl : '';
        const bgColor = board?.style.bgColor ? board.style.bgColor : 'inherit';

        if (isAdd) {
            return (
                <>
                    <a href='#' onClick={this.onNew} className='board-preview new-board' style={{ backgroundColor: '#f0f2f4' }}>
                        <span></span>
                        <div>Create new board</div>
                        {}
                    </a>
                    <Modal showCloseIcon={false} open={this.state.isModal} onClose={this.onCloseModal}>
                        <div className="new-board">
                          {this.state.markedId<4 && <div className="main img" style={{backgroundImage: this.bgcs[this.state.markedId].bgc}}></div>}
                          {this.state.markedId>3 && <div className="main" style={{backgroundColor: this.bgcs[this.state.markedId].bgc}}></div>}
                          <input autocomplete="off" autocorrect="off" spellcheck="false" type="text" class="new-board-name" placeholder="Add board title" aria-label="Add board title" data-test-id="create-board-title-input" value={this.state.boardName} onChange={this.handleChange}/>
                          <div className="side">
                            <div className={`${this.state.markedId===0?'marked':''}`} onClick={(ev)=>{this.handleBgc(0)}} style={{backgroundImage: `${this.bgcs[0].bgc}`}}></div>
                            <div className={`${this.state.markedId===1?'marked':''}`} onClick={(ev)=>{this.handleBgc(1)}} style={{backgroundImage: `${this.bgcs[1].bgc}`}}></div>
                            <div className={`${this.state.markedId===2?'marked':''}`} onClick={(ev)=>{this.handleBgc(2)}} style={{backgroundImage: `${this.bgcs[2].bgc}`}}></div>
                            <div className={`${this.state.markedId===3?'marked':''}`} onClick={(ev)=>{this.handleBgc(3)}} style={{backgroundImage: `${this.bgcs[3].bgc}`}}></div>
                            <div className={`${this.state.markedId===4?'marked':''}`} onClick={(ev)=>{this.handleBgc(4)}} style={{backgroundColor: `${this.bgcs[4].bgc}`}}></div>
                            <div className={`${this.state.markedId===5?'marked':''}`} onClick={(ev)=>{this.handleBgc(5)}} style={{backgroundColor: `${this.bgcs[5].bgc}`}}></div>
                            <div className={`${this.state.markedId===6?'marked':''}`} onClick={(ev)=>{this.handleBgc(6)}} style={{backgroundColor: `${this.bgcs[6].bgc}`}}></div>
                            <div className={`${this.state.markedId===7?'marked':''}`} onClick={(ev)=>{this.handleBgc(7)}} style={{backgroundColor: `${this.bgcs[7].bgc}`}}></div>
                            <div style={{backgroundColor: "rgb(255, 255, 255)"}}></div>
                          </div>
                        </div>
                        <div className="btn">
                          <button className={this.state.isAllowed}>Create board</button>
                        </div>
                    </Modal>
                </>
            );
        } else
            return (
                <a href={`/board/${board._id}`} className='board-preview' style={{ backgroundImage: `url(${imgUrl})`, backgroundColor: bgColor }}>
                    <span></span>
                    <div>
                        {board.title}
                        {isStarred === 'true' && <span>{board.title}</span>}
                    </div>
                    <span className={`${isStarred === 'true' ? 'starred' : ''} star`} onClick={(ev) => this.onStar(ev)}></span>
                </a>
            );
    }
}