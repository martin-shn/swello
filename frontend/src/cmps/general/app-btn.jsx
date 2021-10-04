export const AppBtn = props => {
  return (
    <button {...props} className={`app-btn ${props.className || ''}`}>
      {props.children}
    </button>
  );
};
