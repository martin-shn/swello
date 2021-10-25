import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import { CardPerLabel } from './card-per-label';
import { CardStatus } from './card-status';
import { CardPerList } from './card-per-list';
import { CardPerMember } from './card-per-member';

class _Dashboard extends React.Component {
  state = {
    isScroll: null,
  };
  innerRef = React.createRef();

  componentDidMount () {
    setTimeout(() => {
      if (this.innerRef?.current) {
        this.setState({
          isScroll: this.innerRef.current.scrollHeight > this.innerRef.current.clientHeight ? true : false,
        });
      }
    }, 100);
  }

  get allCards () {
    const { board } = this.props;
    if (!board) return null;
    const cards = [];
    board.lists.forEach(list => list.cards.forEach(card => cards.push(card)));
    return cards;
  }



  render () {
    if (!this.props.match.params) this.props.history.push('/board');
    const { labels } = this.props.board;
    return (
      <section className="dashboard">
        <div
          className={`dashboard-content${ this.state.isScroll ? ' scroll-visible' : ' no-scroll' }`}
          ref={this.innerRef}>
          <DashboardGraph title="Cards per member">
            <CardPerMember cards={this.allCards} />
          </DashboardGraph>
          <DashboardGraph title="Cards per due date">
            <CardStatus cards={this.allCards} />
          </DashboardGraph>
          <DashboardGraph title="Cards per label">
            <CardPerLabel cards={this.allCards} labels={labels} />
          </DashboardGraph>
          <DashboardGraph title="Cards per list">
            <CardPerList board={this.props.board} />
          </DashboardGraph>
        </div>
      </section >
    );
  }
}

const mapDispatchToProps = {};

const mapStateToProps = state => ({
  board: state.boardModule.board,
});

export const Dashboard = connect(mapStateToProps, mapDispatchToProps)(withRouter(_Dashboard));

function DashboardGraph ({ title, children }) {
  return (
    <section className="graph">
      <div>
        <div className="graph-header">
          <span>
            <h4>{title}</h4>
          </span>
        </div>
        <div className="graph-content">{children}</div>
      </div>
    </section>
  );
}
