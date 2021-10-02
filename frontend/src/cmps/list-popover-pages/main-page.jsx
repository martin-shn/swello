import CloseIcon from '@mui/icons-material/Close';
export function MainPage({ onMovePage, list, onTogglePopover, onAddingTopCard }) {
    return (
        <>
            <div className="popover-header flex align-center">
                <span>List actions</span>
                <button onClick={() => onTogglePopover(null)}><CloseIcon /></button>
            </div>
            <div className="popover-content">
                <ul className="popover-list clean-list">
                    <li><button className="add-card" onClick={() => onAddingTopCard(true, list.id)}>Add card…</button></li>
                    <li><button className="copy-list" onClick={() => onMovePage('copy')}>Copy list…</button></li>
                    <li><button className="move-list" onClick={() => onMovePage('move')}>Move list…</button></li>
                </ul>
                <hr />
                <ul className="popover-list clean-list">
                    <li><button className="sort-list" onClick={() => onMovePage('sort')}>Sort by…</button></li>
                </ul>
                <hr />
                <ul className="popover-list clean-list">
                    <li><button className="move-cards" onClick={() => onMovePage('move-all')}>Move all cards in this list…</button></li>
                </ul>
                <hr />
                <ul className="popover-list clean-list">
                    <li><button className="archive-list">Archive this list</button></li>
                </ul>
            </div>
        </>
    )
}