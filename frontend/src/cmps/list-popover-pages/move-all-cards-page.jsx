import ArrowBackIcon from '@mui/icons-material/ArrowBackIosNew';
import CloseIcon from '@mui/icons-material/Close';
export function MoveAllCards({ onMovePage, list, lists, onTogglePopover, onMoveAllCardsToList }) {
    return (
        <>
            <div className="popover-header flex align-center">
                <button onClick={() => onMovePage('main')}><ArrowBackIcon/></button>
                <span>Move all cards in list</span>
                <button onClick={() => {
                    onTogglePopover(null)
                }
                }><CloseIcon /></button>
            </div>
            <div className="popover-content">
                <ul className="popover-list clean-list">
                    {lists.map(currList => {
                        const isCurrent = currList.id === list.id;
                        if (isCurrent) {
                            return <li key={currList.id}><button className="list-title disabled">{currList.title + ' (current)'}</button></li>
                        }
                        return <li key={currList.id}><button className="list-title" onClick={() => {
                            onMoveAllCardsToList(list.id, currList.id)
                            onTogglePopover(null)
                        }}
                        >{currList.title}</button></li>
                    })}
                </ul>
            </div>
        </>
    )
}