import { BoardPreview } from './board-preview'

export function BoardList({boards, isAdd, isStarred, setShowStarred}){
    return (
        <ul className="board-list">
            {boards.map(board=>{
                return <li key={board._id}>
                    <BoardPreview board={board} isStarred={isStarred} setShowStarred={setShowStarred}/>
                </li>
            })}
            {isAdd&&<li><BoardPreview isAdd/></li>}
        </ul>
    )
}
