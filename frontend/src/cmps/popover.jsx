export const Popover = props => {
  const { isVisible } = props;
  return (
    <section className="popover" style={{ display: isVisible ? 'flex' : 'none' }}>
      {props.children}
    </section>
  );
};
