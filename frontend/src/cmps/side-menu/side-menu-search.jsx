import { Avatar } from '@mui/material';
export const SideMenuSearch = ({ setPage, board, toggleSideMenu }) => {
    return (
        <div>
            <div className={`side-menu-header visible-scroll`}>
                <span
                    className='back'
                    onClick={() => {
                        setPage('index');
                    }}
                ></span>
                <h3>Menu</h3>
                <button className='close-side-menu' onClick={toggleSideMenu}></button>
            </div>
            <hr style={{ width: 'calc(100% - 18px)', margin: '0px auto 4px' }} />
            <div className='search-container'>
                <div className='search-content'>
                    <input type='text' />
                    <div className='filter'>
                        <p>Search by term, label, member, or due time.</p>
                        <hr />
                        <ul>
                          {/* map all labels return li */}
                          <li>
                          <button>
                            <div></div>
                            <span>No labels</span>
                            <span></span>
                          </button>
                          </li>
                          </ul>
                        <hr />
                        <ul>
                            {/* map all members */}
                            <li>
                              <button>
                                <span>?</span>
                                <span>No members</span>
                                <span></span>
                              </button>
                            </li>
                            <li>
                              <button>
                                <span><Avatar /></span>
                                <span>Guest</span>
                                <span className="checkmark"></span>
                              </button>
                            </li>
                            <li>
                              <button>
                                <span><Avatar alt="M">M</Avatar></span>
                                <span>Martin Sh</span>
                                <span className="checkmark"></span>
                              </button>
                            </li>
                        </ul>
                        <hr />
                        <ul>
                            <li>
                                <button>Has no due date</button>
                                <span className="checkmark"></span>
                            </li>
                            <li>
                                <button>Due in the next day</button>
                                <span className="checkmark"></span>
                            </li>
                            <li>
                                <button>Due in the next week</button>
                                <span></span>
                            </li>
                            <li>
                                <button>Due in the next month</button>
                                <span></span>
                            </li>
                            <li>
                                <button>Overdue</button>
                                <span></span>
                            </li>
                            <li>
                                <button>Marked as complete</button>
                                <span></span>
                            </li>
                            <li>
                                <button>Marked as incomplete</button>
                                <span></span>
                            </li>
                        </ul>
                        <hr />
                        <ul>
                            <li><button>Clear search</button></li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};
