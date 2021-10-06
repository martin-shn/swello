import React from 'react';
import { connect } from 'react-redux';
import { onLogin } from '../store/actions/user.actions';
import { updateBoard, loadBoard } from '../store/actions/board.actions';
import { userService } from '../services/user.service';
import { boardService } from '../services/board.service';
import { LoaderPage } from '../cmps/loader/loader-page';
class _InvitePage extends React.Component {
    async componentDidMount () {
        const { boardId } = this.props.match.params;
        const user = userService.getLoggedinUser();
        if (!user) {
            this.props.history.push(`/invite/${boardId}/login`)
            return;
        }
        const board = await boardService.getById(boardId)
        if (!board.members.some(member => member._id === user._id)) {
            const miniUser = {
                _id: user._id,
                fullname: user.fullname,
                imgUrl: user.imgUrl,
                mentions: user.mentions,
                username: user.username
            };
            const updatedBoard = { ...board, members: [...board.members, miniUser] };
            await this.props.updateBoard(updatedBoard);
        }
        this.props.history.push(`/board/${ boardId }`);
    }
    render () {
        return <LoaderPage />;
    }
}

const mapDispatchToProps = {
    updateBoard,
    onLogin,
    loadBoard
};

export const InvitePage = connect(null, mapDispatchToProps)(_InvitePage);
