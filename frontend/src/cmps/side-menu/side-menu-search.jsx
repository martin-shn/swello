import React, { Component } from 'react';
import { LabelFilters } from './label-filters';
import { connect } from 'react-redux';
import { setFilter, clearFilter } from '../../store/actions/board.actions';
import { MemberFilters } from './member-filters';
import { DateFilters } from './date-filters';
import CloseIcon from '@mui/icons-material/Close';
import BackIcon from '@mui/icons-material/ArrowBackIosNew';


class _SideMenuSearch extends Component {
  updateFilter = field => {
    const filterBy = { ...this.props.filterBy, ...field };
    this.props.setFilter(filterBy);
  };

  render () {
    const { setPage, board, toggleSideMenu, filterBy, clearFilter } = this.props;
    return (
      <section className="side-menu-search flex column">
        <div className={`side-menu-header visible-scroll`}>
          <span className="back" onClick={() => setPage('index')}><BackIcon /></span>
          <h3>Menu</h3>
          <button className="close-side-menu" onClick={toggleSideMenu}><CloseIcon /></button>
        </div>
        <hr style={{ width: 'calc(100% - 18px)', margin: '0px auto 4px' }} />
        <div className="search-container">
          <div className="search-content">
            <input
              className="search"
              type="text"
              value={filterBy.text}
              onChange={ev => this.updateFilter({ text: ev.target.value.replace('\\', '') })}
            />
            <div className="filter">
              <p>Search by term, label, member, or due time.</p>
              <hr />
              <LabelFilters
                filterLabelIds={filterBy.labelIds}
                boardLabels={board.labels}
                updateFilter={this.updateFilter}
              />
              <hr />
              <MemberFilters
                filterMemberIds={filterBy.memberIds}
                boardMembers={board.members}
                updateFilter={this.updateFilter}
              />
              <hr />
              <DateFilters filterDate={filterBy.dueDate} boardDate={board.dueDate} updateFilter={this.updateFilter} />
              <hr />
              <ul className="bottom">
                <li onClick={clearFilter}>
                  <button>Clear search</button>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

const mapDispatchToProps = {
  setFilter,
  clearFilter,
};

const mapStateToProps = state => {
  return {
    filterBy: state.boardModule.filterBy,
  };
};

export const SideMenuSearch = connect(mapStateToProps, mapDispatchToProps)(_SideMenuSearch);
