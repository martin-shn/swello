import EditIcon from '@mui/icons-material/Edit';

export const CardPreview = props => {
  const { title } = props.card;
  return (
    <div className="content card-preview">
      <button className="edit-icon">
        <EditIcon fontSize="small" />
      </button>
      {title}
    </div>
  );
};
