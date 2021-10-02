import { withRouter } from 'react-router';
import MenuItem from '@mui/material/MenuItem';
import { ReactComponent as StarredImage } from '../../assets/svg/starred-board.svg';
function _StarredBoardsMenuContent({ starredBoards, onClose, history, onStar }) {
    return (
        <>
            <div className='starred-boards list-group'>
                {!starredBoards.length && (
                    <div className='empty-starred-list'>
                        <StarredImage />
                        <p className='empty-starred-message'>Star important boards to access them quickly and easily.</p>
                    </div>
                )}
                <ul>
                    {starredBoards.map((starredBoard) => (
                        <MenuItem
                            key={starredBoard._id}
                            onClick={(ev) => {
                                onClose();
                                history.push(`/board/${starredBoard._id}`);
                            }}
                        >
                            <div>
                                <div
                                    style={{
                                        backgroundImage: `url(${starredBoard?.style?.imgUrl}&w=400)`,
                                        backgroundColor: `${starredBoard?.style?.bgColor}`,
                                    }}
                                ></div>
                                <span>{starredBoard.title}</span>
                                <span
                                    onClick={(ev) => {
                                        onStar(ev, starredBoard._id);
                                    }}
                                    title='Click to unstar this board. It will be removed from your starred list.'
                                ></span>
                            </div>
                        </MenuItem>
                    ))}
                </ul>
            </div>
        </>
    );
}

export const StarredBoardsMenuContent = withRouter(_StarredBoardsMenuContent)
