import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { SideMenuIndex } from './side-menu-index';
import { toggleSideMenu } from '../../store/actions/system.actions';
import { SideMenuSearch } from './side-menu-search';

class _SideMenu extends React.Component {
  state = {
    class: '',
    isScroll: false,
    currPage: 'index',
  };

  componentDidMount() {
    setTimeout(() => {
      if (this.elInnerRef?.current) {
        this.setState({
          isScroll:
            this.elInnerRef.current.scrollHeight > this.elInnerRef.current.clientHeight
              ? true
              : false,
        });
      }
    }, 10);
  }

  setPage = currPage => {
    this.setState({ currPage });
  };

  render() {
    const { currPage, isScroll } = this.state;
    const { board, toggleSideMenu } = this.props;
    return (
      <aside className={`side-menu${this.props.isSideMenuOpen ? ' open' : ''}${this.state.class}`}>
        <div className="side-menu-container">
          <div className="side-menu-content">
            {currPage === 'index' && (
              <SideMenuIndex
                activities={board.activities}
                setPage={this.setPage}
                isScroll={isScroll}
                toggleSideMenu={toggleSideMenu}
              />
            )}
            {currPage === 'search' && (
              <SideMenuSearch setPage={this.setPage} toggleSideMenu={toggleSideMenu} />
            )}
          </div>
        </div>
      </aside>
    );
  }
}

const mapDispatchToProps = {
  toggleSideMenu,
};

const mapStateToProps = state => ({
  isSideMenuOpen: state.systemModule.isSideMenuOpen,
  board: state.boardModule.board,
});

export const SideMenu = withRouter(
  connect(mapStateToProps, mapDispatchToProps)(withRouter(_SideMenu))
);
