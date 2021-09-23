import { ListPreview } from './list-preview';

export const ListAll = props => {
  const { isEditingTitle, lists, onEditTitle, togglePopover, isPopoverVisible } = props;
  return (
    <section className="list-all flex">
      {lists.map(list => (
        <ListPreview
          key={list._id}
          list={list}
          isEditingTitle={isEditingTitle === list._id}
          onEditTitle={onEditTitle}
          togglePopover={togglePopover}
          isPopoverVisible={isPopoverVisible}
        />
      ))}
    </section>
  );
};
