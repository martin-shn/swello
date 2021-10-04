import { PopoverMenu } from './popover-menu';

export const HeaderUser = () => {
  return (
    <PopoverMenu id="notification" header="Notification" classNames="notification-menu header-popper-menu">
      <section className="header-user">
        <div className="popper-header">Hello</div>
      </section>
    </PopoverMenu>
  );
};
