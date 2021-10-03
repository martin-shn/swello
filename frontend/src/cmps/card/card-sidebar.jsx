import CoverIcon from '@mui/icons-material/VideoLabel';
import MemberIcon from '@mui/icons-material/PersonOutlineOutlined';
import CheckBoxIcon from '@mui/icons-material/CheckBoxOutlined';
import LocationIcon from '@mui/icons-material/Room';
import DateIcon from '@mui/icons-material/Schedule';
import AttachmentIcon from '@mui/icons-material/AttachFileOutlined';
import LabelIcon from '@mui/icons-material/LabelOutlined';
import CopyIcon from '@mui/icons-material/ContentCopy';
import MoveIcon from '@mui/icons-material/ArrowForward';
import RefreshIcon from '@mui/icons-material/Replay';
import RemoveIcon from '@mui/icons-material/Remove';

import { constService } from '../../services/const.service';

export const CardSidebar = (props) => {
  const { board, card, updateField, onOpenPopover, dueDate, isArchived, onArchiveCard, onUnarchivedCard, onRemoveCard } = props;
  return (
    <aside className="card-sidebar flex column">
      <span className="sub-header">Add to card</span>
      <button
        name="add-members"
        onClick={ev =>
          onOpenPopover(ev, {
            card,
            board,
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
      <button name="add-due-date" onClick={ev => onOpenPopover(ev, { card, dueDate, updateField })}>
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

      <span className="sub-header actions">Actions</span>
      {!isArchived &&
        <>
          <button name="copy-card" onClick={ev => onOpenPopover(ev, { board, card })}>
            <CopyIcon />
            Copy
          </button>
          <button name="move-card" onClick={ev => onOpenPopover(ev, { board, card })}>
            <MoveIcon />
            Move
          </button>
          <button name="archive-card" onClick={onArchiveCard}>
            Archive
          </button>
        </>
      }
      {isArchived &&
        <>
          <button name="unarchive-card" onClick={onUnarchivedCard}><RefreshIcon /> Send to board</button>
          <button name="remove-item" onClick={ev => onOpenPopover(ev, { item: card, onRemoveItem: onRemoveCard, msg: constService.MSG_REMOVE_CARD, itemType: 'card' })}><RemoveIcon /> Delete</button>
        </>
      }
    </aside >
  );
};
