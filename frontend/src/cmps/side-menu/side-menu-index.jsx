import { useRef, useState } from 'react';
import { createApi } from 'unsplash-js';
import { ActivityDetails } from './activity-details';

export const SideMenuIndex = ({ activities, setPage, isScroll, toggleSideMenu }) => {
    const elInnerRef = useRef();
    const [actsCount, setActsCount] = useState(15);
    const currClass = isScroll ? 'visible-scroll' : 'no-scroll';
    return (
        <section className='side-menu-index'>
            <div className={`side-menu-header ${currClass}`}>
                <span></span>
                <h3>Menu</h3>
                <button className='close-side-menu' onClick={toggleSideMenu}></button>
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
                        <div onClick={changeBgc}>Change background</div>
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
                <div className='side-menu-activity-header'>
                    <span className='icon-activities'></span>
                    <span className='title'>Activity</span>
                </div>
                {activities && <ActivityList activities={activities.slice(0, 15)} />}
                {actsCount < activities.length && (
                    <button className='view-all-activity' onClick={() => setActsCount((prevCount) => prevCount + 15)}>
                        View all activity...
                    </button>
                )}
            </div>
            <button className='view-all-activity'>View all activity...</button>
            {/* This button is not showing :( whyyy */}
        </section>
    );
};

function ActivityList({ activities }) {
    if (!activities) return <></>;

    return (
        /* Each div contain 3 divs: 1. creator avatar, 2. description, 3. time */
        <section className='side-menu-activities'>
            {activities.map((activity) => (
                <ActivityDetails key={activity.id} activity={activity} />
            ))}
        </section>
    );
}

function changeBgc() {
    const unsplash = createApi({
        accessKey: 'GBdwEwdCsGYu-ay4ZcEIHFD-DRgy64uBLLBeygcpdRg',
        secret: '-At2GW76s69GAFJffBa9OE0TrJ4ZoldzwMs5hTLFwhs',
        // headers: { 'X-Custom-Header': 'foo' },
    });

    unsplash.search
        .getPhotos({
            query: 'cat',
            page: 1,
            perPage: 10,
            // color: 'green',
            orientation: 'landscape',
        })
        .then((res) => {
            // color: "#404026"
            // description: "We found this beautiful cat on our way into the woods. What a masterpiece."
            // likes: 98
            // links: {self: 'https://api.unsplash.com/photos/ZWpRsi2lbC8', html: 'https://unsplash.com/photos/ZWpRsi2lbC8', download: 'https://unsplash.com/photos/ZWpRsi2lbC8/download', download_location: 'https://api.unsplash.com/photos/ZWpRsi2lbC8/downlo…lYXJjaHwyfHxjYXR8ZW58MHwwfHxncmVlbnwxNjMzMjU1NTU3'}
            // id: 'ZWpRsi2lbC8';
            // urls: {raw: 'https://images.unsplash.com/photo-1542279836-8369a…R8ZW58MHwwfHxncmVlbnwxNjMzMjU1NTU3&ixlib=rb-1.2.1', full: 'https://images.unsplash.com/photo-1542279836-8369a…8MHwwfHxncmVlbnwxNjMzMjU1NTU3&ixlib=rb-1.2.1&q=85', regular: 'https://images.unsplash.com/photo-1542279836-8369a…xncmVlbnwxNjMzMjU1NTU3&ixlib=rb-1.2.1&q=80&w=1080', small: 'https://images.unsplash.com/photo-1542279836-8369a…HxncmVlbnwxNjMzMjU1NTU3&ixlib=rb-1.2.1&q=80&w=400', thumb: 'https://images.unsplash.com/photo-1542279836-8369a…HxncmVlbnwxNjMzMjU1NTU3&ixlib=rb-1.2.1&q=80&w=200'}
            // user: {id: 'Y5Z6AG7bF_g', updated_at: '2021-10-01T14:59:56-04:00', username: 'sangia', name: 'Sangia', first_name: 'Sangia', …}
            res.response.results.forEach((result) => {
                delete result.alt_description;
                delete result.blur_hash;
                delete result.categories;
                delete result.created_at;
                delete result.current_user_collections;
                delete result.height;
                delete result.liked_by_user;
                delete result.promoted_at;
                delete result.sponsorship;
                delete result.tags;
                delete result.topic_submissions;
                delete result.updated_at;
                delete result.width;
            });
            console.log(res.response.results);
        });

    // createApi.search.photos('cats', 1)
    // .then(toJson)
    // .then(json => {
    //   console.log('unsplash:',json);
    // });
}
