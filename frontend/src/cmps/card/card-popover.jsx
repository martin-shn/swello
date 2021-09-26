import { ClickAwayListener, Grow, MenuList, Paper, Popper } from '@mui/material';
import React, { Component } from 'react';
import { AddMembers } from './card-popover-pages/add-members';
import { AddLabels } from './card-popover-pages/add-labels/add-labels';

export class CardPopover extends Component {
  render() {
    const { popoverType, popoverAnchor, card, onTogglePopover, updateField } = this.props;
    return (
      <Popper
        className="cards-popper header-popper-menu"
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
              <ClickAwayListener onClickAway={() => onTogglePopover(null, null)}>
                <div>
                  {popoverType === 'add-members' && <AddMembers onTogglePopover={() => onTogglePopover(null, null)} />}
                  {popoverType === 'add-labels' && <AddLabels card={card} onTogglePopover={() => onTogglePopover(null, null)} updateField={updateField} />}
                </div>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    );
  }
}
