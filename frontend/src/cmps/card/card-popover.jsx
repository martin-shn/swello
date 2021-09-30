import { ClickAwayListener, Grow, Paper, Popper } from '@mui/material';
import React, { Component } from 'react';
import { AddMembers } from './card-popover-pages/add-members';
import { AddLabels } from './card-popover-pages/add-labels/add-labels';
import { AddChecklist } from './card-popover-pages/add-checklist';
import { AddCheckitemDueDate } from './card-popover-pages/add-checkitem-due-date';
import { AddDueDate } from './card-popover-pages/add-due-date';
import { AddLocation } from './card-popover-pages/add-location/add-location';
import { AddCover } from './card-popover-pages/add-cover';
import { setCardPopover, closeCardPopover } from '../../store/actions/system.actions';
import { connect } from 'react-redux';
import { InviteMain } from '../invite/invite-main';
import { AddAttachment } from './card-popover-pages/add-attachment';
import { AddCheckItemMember } from './card-popover-pages/add-checkitem-member';

const PopoverCmp = ({ name, props, closeCardPopover }) => {
  switch (name) {
    case 'add-members':
      return <AddMembers closeCardPopover={closeCardPopover} {...props} />;
    case 'add-labels':
      return <AddLabels closeCardPopover={closeCardPopover} {...props} />;
    case 'add-checklist':
      return <AddChecklist closeCardPopover={closeCardPopover} {...props} />;
    case 'add-due-date':
      return <AddDueDate closeCardPopover={closeCardPopover} {...props} />;
    case 'add-checkitem-due-date':
      return <AddCheckitemDueDate closeCardPopover={closeCardPopover} {...props} />;
    case 'add-checkitem-member':
      return <AddCheckItemMember closeCardPopover={closeCardPopover} {...props} />;
    case 'add-location':
      return <AddLocation closeCardPopover={closeCardPopover} {...props} />;
    case 'invite-main':
      return <InviteMain closeCardPopover={closeCardPopover} {...props} />;
    case 'add-cover':
      return <AddCover closeCardPopover={closeCardPopover} {...props} />;
    case 'add-attachment':
      return <AddAttachment closeCardPopover={closeCardPopover} {...props} />;
    default:
      return <div></div>;
  }
};

class _CardPopover extends Component {
  state = {};
  render() {
    const { cardPopover, closeCardPopover } = this.props;
    return (
      <Popper
        className="cards-popper header-popper-menu"
        open={true}
        anchorEl={cardPopover.anchorEl}
        placement="bottom-start"
        transition
        disablePortal>
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{
              transformOrigin: placement === 'bottom-start' ? 'left top' : 'left bottom',
            }}>
            <Paper>
              <ClickAwayListener onClickAway={() => this.props.setCardPopover(null, null, null)}>
                <div>
                  <PopoverCmp
                    name={cardPopover.name}
                    props={cardPopover.props}
                    closeCardPopover={closeCardPopover}
                  />
                </div>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    );
  }
}

const mapDispatchToProps = {
  setCardPopover,
  closeCardPopover,
};

const mapStateToProps = state => ({
  cardPopover: state.systemModule.cardPopover,
});

export const CardPopover = connect(mapStateToProps, mapDispatchToProps)(_CardPopover);
