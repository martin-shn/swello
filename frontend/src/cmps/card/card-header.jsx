import { Link } from 'react-router-dom';

export const CardHeader = props => {
  return (
    <header className="card-section card-header">
      <div> Img </div>
      <div>
        <h2
          className="card-title content-editable"
          contentEditable
          suppressContentEditableWarning
          onBlur={ev => props.updateField({ title: ev.target.innerText })}>
          {props.title}
        </h2>
        <p className="in-list">in list: List Name</p>
      </div>
    </header>
  );
};
