import { useEffect, useRef } from 'react';
import { ReactComponent as CloseIcon } from '../../assets/svg/close.svg';
import { cardService } from '../../services/board-services/card.service';

export const CardHeader = props => {
  const titleRef = useRef();
  useEffect(() => {
    titleRef.current.blur();
  }, []);
  const { board, card } = props;
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
        <p className="in-list">
          in list: {cardService.getListOfCard(board, card.id).title || 'General'}
        </p>
      </div>
      <button className="btn-close" onClick={props.onCloseCard}>
        <CloseIcon />
      </button>
    </header>
  );
};
