import { useRef, useState } from 'react';
import { createApi } from 'unsplash-js';
import { ActivityDetails } from './activity-details';

export const SideMenuIndex = ({ activities, setPage, isScroll, toggleSideMenu }) => {
  const elInnerRef = useRef();
  const [actsCount, setActsCount] = useState(15);
  const currClass = isScroll ? 'visible-scroll' : 'no-scroll';
  return (
    <section className="side-menu-index flex column">
      <div className={`side-menu-header ${currClass}`}>
        <span></span>
        <h3>Menu</h3>
        <button className="close-side-menu" onClick={toggleSideMenu}></button>
      </div>
      <hr style={{ width: 'calc(100% - 18px)', margin: '0 auto 4px' }} />
      <div className={`side-menu-bottom-content ${currClass}`} ref={elInnerRef}>
        <ul>
          <li>
            <span></span>
            <div>About this board</div>
          </li>
          <li onClick={() => setPage('change-bg')}>
            <span></span>
            <div>Change background</div>
          </li>
          <li onClick={() => setPage('search')}>
            <span></span>
            <div>Search cards</div>
          </li>
          <li onClick={() => setPage('archive')}>
            <span></span>
            <div>Archive items</div>
          </li>
        </ul>
        <div className="side-menu-activity-header">
          <span className="icon-activities"></span>
          <span className="title">Activity</span>
        </div>
        {activities && <ActivityList activities={activities.slice(0, 15)} />}
        {actsCount < activities.length && (
          <button className="view-all-activity" onClick={() => setActsCount(prevCount => prevCount + 15)}>
            View all activity...
          </button>
        )}
      </div>
    </section>
  );
};

function ActivityList({ activities }) {
  if (!activities) return <></>;

  return (
    /* Each div contain 3 divs: 1. creator avatar, 2. description, 3. time */
    <section className="side-menu-activities">
      {activities.map(activity => (
        <ActivityDetails key={activity.id} activity={activity} />
      ))}
    </section>
  );
}
