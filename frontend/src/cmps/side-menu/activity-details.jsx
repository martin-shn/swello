import { formatDistance } from 'date-fns';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import _ from 'lodash';
import { utilService } from '../../services/util.service';
import { cardService } from '../../services/board-services/card.service';
import { AppAvatar } from '../general/app-avatar';

function _DynamicActivity ({ createdBy, card, type, values, board }) {
  const cardUrl = `/board/${ board._id }/card/${ card.id }`;
  const CardLink = () => <Link to={cardUrl} className="link">{card.title}</Link>;
  const key = 'AIzaSyDgw0mWmcS4OoFUyLUj5oNbfo4KGzpHiYA';
  switch (type) {
    case 'ADD-CARD':
      return <span>added <CardLink /> to {values.listTitle}</span>;
    case 'ADD-MEMBER':
      if (values.member._id === createdBy._id) return <span>joined to <CardLink /></span>;
      return <span>added <span className="created-by" style={{ margin: 0 }}>{values.member.fullname || values.member.username}</span> to <CardLink /></span>;
    case 'REMOVE-MEMBER':
      if (values.member._id === createdBy._id) return <span>left <CardLink /></span>;
      return <span>removed <span className="created-by" style={{ margin: 0 }}>{values.member.fullname || values.member.username}</span> from <CardLink /></span>;
    case 'ADD-CHECKLIST':
      return <span>added checklist "{values.title}" to <CardLink /></span>;
    case 'CHECKLIST-COMPLETE':
      return <span>completed "{values.title}" on <CardLink /></span>;
    case 'ADD-LOCATION':
      const { lat, lng } = values.location;
      return <div>
        <div>added location {values.title} to <CardLink /></div>
        <img src={`https://maps.googleapis.com/maps/api/staticmap?key=${ key }&libraries=places&zoom=13&size=225x66&markers=icon%3Ahttps://trello.com/images/location-marker.png%7C${ lat },${ lng }`}
          alt='card-location' />
      </div>;
    case 'ADD-ATTACHMENT':
      const isValidImg = utilService.isValidImg(values.attachment.url);
      const AttachmentName = _.truncate(values.attachment.name, { length: 20 }) || _.truncate(values.attachment.url, { length: 20 });
      return <div>
        <div>attached {' '}
          {isValidImg && <a className="link" target="_blank" rel="noreferrer" download href={values.attachment.url}>{AttachmentName} </a>}
          {!isValidImg && <span> {AttachmentName} </span>}
          to <CardLink /></div>
        {isValidImg && <img src={values.attachment.url} alt='attachment' style={{ maxHeight: '100px' }} />}
      </div>;
    case 'ADD-DUE-DATE':
      return <span>set the due date on <CardLink /> to {' '}
        <span className={`due-date ${ cardService.checkDueDate({ date: values.date, isComplete: false }) }`}>
          <span className="due-date-icon"></span>
          <span>{utilService.getFormattedDate(values.date, true)}</span>
        </span>
      </span>;
    case 'MARK-DUE-DATE':
      return <span>marked the due date on <CardLink /> {values.dueDate.isComplete ? 'complete' : 'incomplete'} </span>;
    case 'ADD-COVER':
      return <><div>set cover image on <CardLink /></div> <img src={values.cover.url} alt='cover' style={{ maxHeight: '100px' }} /></>;
    case 'REMOVE-COVER':
      return <span>removed cover image on <CardLink /></span>;
    case 'ADD-LABEL':
      return <span>added label <span className={'label ' + values.label.color}>{values.label.title}</span> on <CardLink /></span>;
    case 'REMOVE-LABEL':
      return <span>removed label <span className={'label ' + values.label.color}>{values.label.title}</span> from <CardLink /></span>;
    default:
      return <span>{card.title}, {type}, {JSON.stringify(values)}</span>; // For development. In production comment this.
    // return <span></span>
  }
}
const mapStateToProps = state => {
  return {
    board: state.boardModule.board,
  };
};

const DynamicActivity = connect(mapStateToProps)(_DynamicActivity);

//

export const ActivityDetails = ({ activity }) => {
  const { id, type, card, createdBy, createdAt, values } = activity;
  return (
    <div className="activity">
      <AppAvatar key={id} member={createdBy} />
      <span className="text">
        <span className="created-by">{createdBy?.fullname || createdBy?.username}</span>
        <DynamicActivity createdBy={createdBy} card={card} type={type} values={values} />
      </span>
      <span className="created-at">
        {formatDistance(createdAt, Date.now(), { addSuffix: true })}
      </span>
    </div>
  );
};
