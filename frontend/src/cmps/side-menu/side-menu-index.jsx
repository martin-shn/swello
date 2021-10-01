import { useRef } from 'react';
import { ActivityDetails } from './activity-details';

export const SideMenuIndex = ({ activities, setPage, isScroll, toggleSideMenu }) => {
  const elInnerRef = useRef();
  const currClass = isScroll ? 'visible-scroll' : 'no-scroll';
  return (
    <section className="side-menu-index">
      <div className={`side-menu-header ${currClass}`}>
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
          <li>
            <span></span>
            <div>Change background</div>
          </li>
          <li onClick={() => setPage('search')}>
            <span></span>
            <div>Search cards</div>
          </li>
        </ul>
        <hr />
        <div className="side-menu-activity-header">
          <span className="icon-activities"></span>
          <span className="title">Activity</span>
        </div>
        {/* HERE COMES THE MAP FOR ACTIVITIES - RETURNES DIV's */}
        {<ActivityList activities={activities} />}
        <a href="#" className="side-menu-show-all-activity">
          View all activity...
        </a>
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
