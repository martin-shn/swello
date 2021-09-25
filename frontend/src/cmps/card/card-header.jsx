import { useEffect, useRef } from 'react';

export const CardHeader = props => {
  const titleRef = useRef();
  useEffect(() => {
    titleRef.current.blur();
  }, []);
  return (
    <header className="card-section card-header">
      <div> Img </div>
      <div>
        <h2
          ref={titleRef}
          className="card-title content-editable"
          onKeyDown={ev => ev.key === 'Enter' && ev.target.blur()}
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
