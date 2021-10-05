import { Avatar } from '@material-ui/core';

export const AppAvatar = props => {
  const { member } = props;
  let name = member ? member.fullname || member.username : 'Unknown';
  const english = /^[A-Za-z0-9]*$/;
  if (english.test(name[0])) name='Unknown'
  return (
    <div title={name}>
      <Avatar {...props} className={`avatar ${props.className || ''}`} alt={name} src={member?.imgUrl}>
        {name.charAt(0).toUpperCase()}
      </Avatar>
    </div>
  );
};
