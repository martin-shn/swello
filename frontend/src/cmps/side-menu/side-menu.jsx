import React from 'react'
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import {toggleSideMenu} from '../../store/actions/system.actions'

class _SideMenu extends React.Component{
    state={
        class: '',
        dummyActivity: true
    }

    componentDidMount() {
        setTimeout(() => {
            if (this.elInnerRef?.current) {
              this.setState({ class: this.elInnerRef.current.scrollHeight > this.elInnerRef.current.clientHeight ? ' visible-scroll' : ' no-scroll' })
            }
          }, 10)
    }
    
    elInnerRef = React.createRef();

    render(){
        return (
            <aside className={`side-menu${this.props.isSideMenuOpen?' open':''}${this.state.class}`}>
                <div className='side-menu-container'>
                    <div className='side-menu-content'>
                        <div className={`side-menu-header${this.state.class}`}>
                            <h3>Menu</h3>
                            <button className='close-side-menu' onClick={this.props.toggleSideMenu}></button>
                        </div>
                        <hr style={{width: 'calc(100% - 18px)', margin: '0 auto 4px'}}/>
                        <div className={`side-menu-bottom-content${this.state.class}`} ref={this.elInnerRef}>
                            <ul>
                                <li><span></span><div>About this board</div></li>
                                <li><span></span><div>Change background</div></li>
                                <li><span></span><div>Archived items</div></li>
                            </ul>
                            <hr />
                            <div className='side-menu-activity-header'>
                                <span></span>
                                <span>Activity</span>
                            </div>
                            <div className='side-menu-activity'>
                                {/* HERE COMES THE MAP FOR ACTIVITIES - RETURNES DIV's */}
                                {/* Each div contain 3 divs: 1. creator avatar, 2. description, 3. time */}
                                {this.state.dummyActivity&&<>
                                <div>
                                    <div><img/></div>
                                    <div><span>Martin</span> added a new card</div>
                                    <div>6 minutes ago</div>
                                </div>
                                <div>
                                    <div><img/></div>
                                    <div><span>Martin</span> added a new card</div>
                                    <div>6 minutes ago</div>
                                </div>
                                <div>
                                    <div><img/></div>
                                    <div><span>Martin</span> added a new card</div>
                                    <div>6 minutes ago</div>
                                </div>
                                <div>
                                    <div><img/></div>
                                    <div><span>Martin</span> added a new card</div>
                                    <div>6 minutes ago</div>
                                </div>
                                <div>
                                    <div><img/></div>
                                    <div><span>Martin</span> added a new card</div>
                                    <div>6 minutes ago</div>
                                </div>
                                <div>
                                    <div><img/></div>
                                    <div><span>Martin</span> added a new card</div>
                                    <div>6 minutes ago</div>
                                </div>
                                <div>
                                    <div><img/></div>
                                    <div><span>Martin</span> added a new card</div>
                                    <div>6 minutes ago</div>
                                </div>
                                <div>
                                    <div><img/></div>
                                    <div><span>Martin</span> added a new card</div>
                                    <div>6 minutes ago</div>
                                </div>
                                <div>
                                    <div><img/></div>
                                    <div><span>Martin</span> added a new card</div>
                                    <div>6 minutes ago</div>
                                </div>
                                <div>
                                    <div><img/></div>
                                    <div><span>Martin</span> added a new card</div>
                                    <div>6 minutes ago</div>
                                </div>
                                <div>
                                    <div><img/></div>
                                    <div><span>Martin</span> added a new card</div>
                                    <div>6 minutes ago</div>
                                </div></>}
                            </div>
                            <a href='#' className='side-menu-show-all-activity'>View all activity...</a>
                        </div>
                    </div>
                </div>
            </aside>
        )
    }
}

const mapDispatchToProps = {
    toggleSideMenu
};

const mapStateToProps = (state) => ({
    isSideMenuOpen: state.systemModule.isSideMenuOpen
});

export const SideMenu = withRouter(connect(mapStateToProps, mapDispatchToProps)(withRouter(_SideMenu)));