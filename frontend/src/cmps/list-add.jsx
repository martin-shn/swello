import AddIcon from '@mui/icons-material/Add';
import { ReactComponent as CloseIcon } from '../assets/svg/close.svg';

export const ListAdd = props => {
  const { isAddingList, onAddingList, onAddList } = props;
  return (
    <div className={'list-preview list-add' + (isAddingList ? ' adding' : '')}>
      {!isAddingList && (
        <div className="add-placeholder flex align-center" onClick={() => onAddingList(true)}>
          <AddIcon />
          <span>Add a list</span>
        </div>
      )}
      {isAddingList && (
        <form onSubmit={onAddList} className="flex column">
          <div>
            <input autoCorrect="off" autoComplete="off" name="title" placeholder="Enter list title..." />
          </div>
          <div className="add-controls">
            <button className="btn-add">Add List</button>
            <CloseIcon className="close-icon" onClick={() => onAddingList(false)} />
          </div>
        </form>
      )}
    </div>
  );
};
