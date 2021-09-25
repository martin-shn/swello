import { ClickAwayListener, Grow, MenuList, Paper, Popper } from '@mui/material';
import React, { Component } from 'react';
import { AddMembers } from './card-popover-pages/add-members';
import { AddLabels } from './card-popover-pages/add-labels';

export class CardPopover extends Component {
  render() {
    const { popoverType, popoverAnchor, onClosePopover } = this.props;
    return (
      <Popper
        className="borads-popper header-popper-menu"
        open={true}
        anchorEl={popoverAnchor}
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
              <ClickAwayListener onClickAway={onClosePopover}>
                <div>
                  {popoverType === 'add-members' && <AddMembers onClosePopover={onClosePopover} />}
                  {popoverType === 'add-labels' && <AddLabels onClosePopover={onClosePopover} />}
                </div>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    );
  }
}
