export function RemoveItem({ item, closeCardPopover, onSetPage, onRemoveItem, msg, itemType }) {
  return (
    <>
      <section className="popper-header">
        {onSetPage && (
          <button className="back-btn" onClick={() => onSetPage('edit', item)}></button>
        )}
        <div>Delete {itemType || 'item'}?</div>
        <button className="close-btn" onClick={closeCardPopover}></button>
      </section>
      <section className="popper-content remove-label flex column">
        <p>{msg || 'Deleting an item is permanent. There is no undo.'}</p>
        <button onClick={() => onRemoveItem(item)}>Delete</button>
      </section>
    </>
  );
}
