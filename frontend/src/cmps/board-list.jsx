import { BoardPreview } from './board-preview'

export function BoardList({isAdd, isStarred}){
    return (
        <ul className="board-list">
            <li><BoardPreview isStarred={`${isStarred?true:false}`}/></li>
            <li><BoardPreview isStarred={`${isStarred?true:false}`}/></li>
            <li><BoardPreview isStarred={`${isStarred?true:false}`}/></li>
            {isAdd&&<li><BoardPreview isAdd/></li>}
        </ul>
    )
}
