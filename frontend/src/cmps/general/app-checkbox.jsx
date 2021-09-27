export const AppCheckbox = props => {
  const { isDone, onClick } = props;
  return (
    <div className={`checkbox ${isDone ? 'done' : ''}`} onClick={onClick}>
      <span className="checkbox-check"></span>
    </div>
  );
};
