import React from 'react';
import { userService } from '../../services/user.service';
import { utilService } from '../../services/util.service';
import { Modal } from 'react-responsive-modal';
import 'react-responsive-modal/styles.css';

export class BoardPreview extends React.Component {
    state = {
        isModal: false,
    };

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
                          <div className="main"></div>
                          <div className="side">
                            <div style={{backgroundColor: "rgb(0, 121, 191)"}}></div>
                            <div style={{backgroundColor: "rgb(210, 144, 52)"}}></div>
                            <div style={{backgroundColor: "rgb(81, 152, 57)"}}></div>
                            <div style={{backgroundColor: "rgb(176, 70, 50)"}}></div>
                            <div style={{backgroundImage: "url(https://images.unsplash.com/photo-1632269826291-2cb3009bf43d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=Mnw3MDY2fDB8MXxjb2xsZWN0aW9ufDF8MzE3MDk5fHx8fHwyfHwxNjMyNDE5NzU2&ixlib=rb-1.2.1&q=80&w=400)"}}></div>
                            <div style={{backgroundImage: "url(https://images.unsplash.com/photo-1632286988262-dee7280ee48a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=Mnw3MDY2fDB8MXxjb2xsZWN0aW9ufDJ8MzE3MDk5fHx8fHwyfHwxNjMyNDE5NzU2&ixlib=rb-1.2.1&q=80&w=400)"}}></div>
                            <div style={{backgroundImage: "url(https://images.unsplash.com/photo-1632301497603-33fb3d7afdd1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=Mnw3MDY2fDB8MXxjb2xsZWN0aW9ufDN8MzE3MDk5fHx8fHwyfHwxNjMyNDE5NzU2&ixlib=rb-1.2.1&q=80&w=400)"}}></div>
                            <div style={{backgroundImage: "url(https://images.unsplash.com/photo-1632303283130-8a2ec7823251?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=Mnw3MDY2fDB8MXxjb2xsZWN0aW9ufDR8MzE3MDk5fHx8fHwyfHwxNjMyNDE5NzU2&ixlib=rb-1.2.1&q=80&w=400)"}}></div>
                            <div style={{backgroundColor: "rgb(255, 255, 255)"}}></div>
                          </div>
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
