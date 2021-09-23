export function PopoverScreen({ isOpen, onTogglePopover }) {
    return <div className={`popover-screen` + (isOpen ? ' open' : '')} onClick={() => onTogglePopover(null)}></div>
}