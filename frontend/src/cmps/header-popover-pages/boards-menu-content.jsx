import { withRouter } from 'react-router';
import MenuItem from '@mui/material/MenuItem';
function _BoardsMenuContent({ boards, board, user, history, onClose }) {
    const hasBoards = boards.some((board) => board.createdBy._id === user._id);
    const hasStarredBoards = boards.some(
        (board) =>
            board.members.some((member) => member._id === user._id) && !user.starredBoardsIds.includes(board._id) && board.createdBy._id !== user._id
    );
    return (
        <>
            {board && (
                <div className='current-board list-group'>
                    <div>CURRENT BOARD</div>
                    <div>
                        <div
                            style={{
                                backgroundImage: `url(${board?.style?.imgUrl}&w=400)`,
                                backgroundColor: `${board?.style?.bgColor}`,
                            }}
                        >
                            {board.createdBy.fullname.charAt(0)}
                        </div>
                        <span>{board.title}</span>
                    </div>
                </div>
            )}
            <div className="board-menu-container">
                {hasBoards && (
                    <div className='your-boards list-group'>
                        <div>YOUR BOARDS</div>
                        <ul>
                            {boards
                                .filter((board) => board.createdBy._id === user._id)
                                .map((board) => (
                                    <MenuItem
                                        key={board._id}
                                        onClick={(ev) => {
                                            onClose();
                                            history.push(`/board/${board._id}`);
                                        }}
                                    >
                                        <div>
                                            <div
                                                style={{
                                                    backgroundImage: `url(${board?.style?.imgUrl}&w=400)`,
                                                    backgroundColor: `${board?.style?.bgColor}`,
                                                }}
                                            >
                                                {board.createdBy.fullname.charAt(0)}
                                            </div>
                                            <span>{board.title}</span>
                                        </div>
                                    </MenuItem>
                                ))}
                        </ul>
                    </div>
                )}
                {hasStarredBoards && (
                    <div className='guest-boards your-boards list-group'>
                        <div>GUEST BOARDS</div>
                        <ul>
                            {boards
                                .filter(
                                    (board) =>
                                        board.members.some((member) => member._id === user._id) &&
                                        !user.starredBoardsIds.includes(board._id) &&
                                        board.createdBy._id !== user._id
                                )
                                .map((board) => (
                                    <MenuItem
                                        key={board._id}
                                        onClick={(ev) => {
                                            onClose();
                                            history.push(`/board/${board._id}`);
                                        }}
                                    >
                                        <div>
                                            <div
                                                style={{
                                                    backgroundImage: `url(${board?.style?.imgUrl}&w=400)`,
                                                    backgroundColor: `${board?.style?.bgColor}`,
                                                }}
                                            >
                                                {board.createdBy.fullname.charAt(0)}
                                            </div>
                                            <span>{board.title}</span>
                                        </div>
                                    </MenuItem>
                                ))}
                        </ul>
                    </div>
                )}
            </div>
        </>
    );
}

export const BoardsMenuContent = withRouter(_BoardsMenuContent);
