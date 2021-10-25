import ArrowBackIcon from '@mui/icons-material/ArrowBackIosNew';
import CloseIcon from '@mui/icons-material/Close';
export function SortPage({ onMovePage, list, onTogglePopover, onSortList }) {
    return (
        <>
            <div className="popover-header flex align-center">
                <button onClick={() => onMovePage('main')}><ArrowBackIcon /></button>
                <span>Sort list</span>
                <button onClick={() => {
                    onTogglePopover(null)
                }
                }><CloseIcon /></button>
            </div>
            <div className="popover-content">
                <ul className="popover-list clean-list">
                    <li><button onClick={() => { onSortList(list, 'date-new'); onTogglePopover(null) }}>Date created (newest first)</button></li>
                    <li><button onClick={() => { onSortList(list, 'date-old'); onTogglePopover(null) }}>Date created (oldest first)</button></li>
                    <li><button onClick={() => { onSortList(list, 'title'); onTogglePopover(null) }}>Card name (alphabetically)</button></li>
                </ul>
            </div>
        </>
    )
}