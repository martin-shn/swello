export function RemoveLocation({ closeCardPopover, onSetPage, onRemoveLocation }) {
    return (
        <>
            <section className="popper-header">
                <button className="back-btn" onClick={() => onSetPage('main')}></button>
                <div>Remove location?</div>
                <button className="close-btn" onClick={closeCardPopover}></button>
            </section>
            <section className="popper-content remove-label flex column">
                <p>Removing a location is permanent. There is no undo.</p>
                <button onClick={onRemoveLocation}>Delete</button>
            </section>
        </>
    );
}
