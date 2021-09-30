import CoverIcon from '@mui/icons-material/VideoLabel';
import MemberIcon from '@mui/icons-material/PersonOutlineOutlined';
import CheckBoxIcon from '@mui/icons-material/CheckBoxOutlined';
import LocationIcon from '@mui/icons-material/Room';
import DateIcon from '@mui/icons-material/Schedule';
import AttachmentIcon from '@mui/icons-material/AttachFileOutlined';
import LabelIcon from '@mui/icons-material/LabelOutlined';

export const CardSidebar = ({ board, card, updateField, onOpenPopover, dueDate }) => {
  return (
    <aside className="card-sidebar">
      <span className="sub-header">Add to card</span>
      <button
        name="add-members"
        onClick={ev =>
          onOpenPopover(ev, {
            board,
            card,
            updateField,
          })
        }>
        <MemberIcon />
        Members
      </button>
      <button name="add-labels" onClick={ev => onOpenPopover(ev, { board, card, updateField })}>
        <LabelIcon />
        Labels
      </button>
      <button name="add-checklist" onClick={ev => onOpenPopover(ev, { card, updateField })}>
        <CheckBoxIcon />
        Checklist
      </button>
      <button name="add-due-date" onClick={ev => onOpenPopover(ev, { dueDate, updateField })}>
        <DateIcon />
        Date
      </button>
      <button name="add-attachment" onClick={ev => onOpenPopover(ev, { card, updateField })}>
        <AttachmentIcon />
        Attachment
      </button>
      <button
        name="add-location"
        onClick={ev => onOpenPopover(ev, { card, updateField, currPage: 'save', isFromNav: true })}>
        <LocationIcon />
        Location
      </button>
      <button name="add-cover" onClick={ev => onOpenPopover(ev, { card, updateField })}>
        <CoverIcon />
        Cover
      </button>
    </aside>
  );
};
