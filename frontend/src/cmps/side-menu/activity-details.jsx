import { Avatar } from '@mui/material';
import { formatDistance } from 'date-fns';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import _ from 'lodash';
import { utilService } from '../../services/util.service';

function _DynamicActivity({ card, type, values, board }) {
    const cardUrl = `/board/${ board._id }/card/${ card.id }`;
    const CardLink = () => <Link to={cardUrl} className="link">{card.title}</Link>;
    const key = 'AIzaSyDgw0mWmcS4OoFUyLUj5oNbfo4KGzpHiYA';
  switch (type) {
    case 'ADD-CARD':
        return <span>added <CardLink /> to {values.listTitle}</span>;
    case 'ADD-MEMBER':
        return <span>added <span className="created-by">{values.member.fullname || values.member.username}</span> to <CardLink /></span>;
    case 'ADD-CHECKLIST':
        return <span>added checklist "{values.title}" to <CardLink /></span>;
    case 'CHECKLIST-COMPLETE':
        return <span>completed "{values.title}" on <CardLink /></span>;
    case 'ADD-LOCATION':
        const { lat, lng } = values.location;
        return  <div>
                <div>added location {values.title} to <CardLink /></div>
                <img src={`https://maps.googleapis.com/maps/api/staticmap?key=${key}&libraries=places&zoom=13&size=225x66&markers=icon%3Ahttps://trello.com/images/location-marker.png%7C${lat},${lng}`}
                alt='card-location'/>
                </div>;
      case 'ADD-ATTACHMENT':
          const isValidImg = utilService.isValidImg(values.attachment.url);
          return <div>
              <div>attached
                  {isValidImg && <a className="link" target="_blank" download href={values.attachment.url}> {values.attachment.name || _.truncate(values.attachment.url)} </a>}
                  {!isValidImg && <span> {values.attachment.name || _.truncate(values.attachment.url)} </span>}
                  to <CardLink /></div>
              {isValidImg && <img src={values.attachment.url} alt='attachment' style={{maxHeight:'100px'}} />}
              </div>
    default:
          return <span>{card.title}, {type}, {JSON.stringify(values)}</span>; // For development. In production comment this.
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
      <Avatar key={id} className="avatar" alt={createdBy?.fullname} src={createdBy?.imgUrl} />
      <span className="text">
        <span className="created-by">{createdBy?.fullname || createdBy?.username}</span>
        <DynamicActivity card={card} type={type} values={values} />
      </span>
      <span className="created-at">
        {formatDistance(createdAt, Date.now(), { addSuffix: true })}
      </span>
    </div>
  );
};
