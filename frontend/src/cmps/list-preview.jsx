import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import AddIcon from '@mui/icons-material/Add';
import { CardPreview } from './card-preview';
import { Popover } from './popover';
import { ReactComponent as CloseIcon } from '../assets/svg/close.svg';

export const ListPreview = props => {
  const {
    isEditingTitle,
    onEditTitle,
    list,
    onTogglePopover,
    isPopover,
    isAddingCard,
    onAddingCard,
  } = props;

  return (
    <div className="list-preview flex column">
      <div className="list-header flex space-between">
        <input
          className={'content' + (isEditingTitle ? ' ' : ' disabled')}
          defaultValue="List Title"
          onClick={ev => onEditTitle(list._id, ev)}
        />
        <button className="btn-more" onClick={ev => onTogglePopover(list._id, ev)}>
          <MoreHorizIcon />
          {isPopover && <Popover>some menu</Popover>}
        </button>
      </div>
      <div className="list-cards">
        <CardPreview />
      </div>
      <div className="add-card">
        {!isAddingCard && (
          <button className="content btn-adding" onClick={() => onAddingCard(list._id)}>
            <AddIcon />
            <span>Add a card</span>
          </button>
        )}
        {isAddingCard && (
          <>
            <textarea placeholder="Enter a title for this card..." />
            <div className="flex align-center" style={{ gap: '10px' }}>
              <button className="btn-add">Add Card</button>
              <CloseIcon
                style={{ width: '25px', height: '25px', cursor: 'pointer' }}
                onClick={() => onAddingCard(false)}
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
};
