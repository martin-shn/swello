export function RemoveLabel({ label, onTogglePopover, onSetPage, onRemoveLabel }) {
    return (
        <>
            <section className="popper-header">
                <button className="back-btn" onClick={() => onSetPage('edit', label)}></button>
                <div>Delete label?</div>
                <button className="close-btn" onClick={onTogglePopover}></button>
            </section>
            <section className="popper-content remove-label flex column">
                <p>There is no undo. This will remove this label from all cards and destroy its history.</p>
                <button onClick={() => onRemoveLabel(label.id)}>Delete</button>
            </section>
        </>
    )
}