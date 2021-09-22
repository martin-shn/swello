import EditIcon from '@mui/icons-material/Edit';

export const CardPreview = () => {
  return (
    <div className="card-preview">
      <button className="edit-icon">
        <EditIcon fontSize="small" />
      </button>
      Card Preview
    </div>
  );
};
