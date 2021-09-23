import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import AddIcon from '@mui/icons-material/Add';
import { CardPreview } from './card-preview';
import { Popover } from './popover';

export const ListPreview = props => {
  const { isEditingTitle, onEditTitle, list, togglePopover, isPopoverVisible } = props;

  return (
    <div className="list-preview flex column">
      <div className="list-header flex space-between">
        <input
          className={'content' + (isEditingTitle ? ' ' : ' disabled')}
          defaultValue="List Title"
          onClick={ev => onEditTitle(list._id, ev)}
        />
        <button className="btn-more" onClick={togglePopover}>
          <MoreHorizIcon />
          {isPopoverVisible && <Popover />}
        </button>
      </div>
      <div className="list-cards">
        <CardPreview />
      </div>
      <div className="add-card">
        <button className="content btn-add" onClick={() => this.setState({ isAddingCard: true })}>
          <AddIcon />
          Add a card
        </button>
      </div>
    </div>
  );
};
