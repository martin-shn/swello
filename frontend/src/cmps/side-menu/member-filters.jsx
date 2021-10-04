import { AppAvatar } from '../general/app-avatar';

export const MemberFilters = ({ filterMemberIds, boardMembers, updateFilter }) => {
  const toggleMember = memberId => {
    let memberIds = filterMemberIds.filter(id => id !== 'NO-MEMBERS'); // first remove no-members option
    if (memberIds.includes(memberId)) memberIds = memberIds.filter(id => id !== memberId);
    else memberIds = [...memberIds, memberId];
    updateFilter({ memberIds });
  };

  const toggleNoMembers = () => {
    const updatedMemberIds = filterMemberIds[0] === 'NO-MEMBERS' ? [] : ['NO-MEMBERS'];
    updateFilter({ memberIds: updatedMemberIds });
  };

  if (!boardMembers)
    // shouldn't happen but anyways
    return (
      <ul className="member-list">
        <li>No board members</li>
      </ul>
    );

  return (
    <ul className="member-list">
      {/* map all members */}
      <li onClick={toggleNoMembers}>
        <button>
          <span>?</span>
          <span>No members</span>
          {filterMemberIds.includes('NO-MEMBERS') && <span className="checkmark"></span>}
        </button>
      </li>
      {boardMembers.map(member => (
        <li key={member._id} onClick={() => toggleMember(member._id)}>
          <button>
            <span>
              <AppAvatar member={member} />
            </span>
            <span>Guest</span>
            {filterMemberIds.includes(member._id) && <span className="checkmark"></span>}
          </button>
        </li>
      ))}
    </ul>
  );
};
