export const Popover = props => {
  const { isVisible } = props;
  return (
    <section className="popover flex column" style={{ display: isVisible ? 'flex' : 'none' }}>
      {props.children}
    </section>
  );
};
