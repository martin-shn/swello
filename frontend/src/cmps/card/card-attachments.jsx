import AttachmentIcon from '@mui/icons-material/AttachFileOutlined';
import CoverIcon from '@mui/icons-material/VideoLabel';
import { formatDistance } from 'date-fns';
import React from 'react';
import { constService } from '../../services/const.service';
import { utilService } from '../../services/util.service';

export const CardAttachments = ({
  attachments,
  setCardPopover,
  card,
  updateField,
  closeCardPopover,
}) => {
  const onRemoveAttachment = attachment => {
    const updatedAttachments = attachments.filter(att => att.id !== attachment.id);
    updateField({ attachments: updatedAttachments });
    closeCardPopover();
  };

  const onUpdateAttachment = (attachment, update) => {
    const updatedAttachment = { ...attachment, ...update };
    const updatedAttachments = attachments.map(att =>
      att.id === attachment.id ? updatedAttachment : att
    );
    updateField({ attachments: updatedAttachments });
    closeCardPopover();
  };

  if (!attachments) return <></>;
  return (
    <section className="card-section ">
      <div className="section-header">
        <AttachmentIcon />
        <h3 className="section-title">Attachments</h3>
      </div>
      <CardAttachmentList
        attachments={attachments}
        setCardPopover={setCardPopover}
        onRemoveAttachment={onRemoveAttachment}
        onUpdateAttachment={onUpdateAttachment}
      />
      <div className="section-data">
        <button
          onClick={ev => {
            ev.preventDefault();
            setCardPopover('add-attachment', ev.target, { card, updateField });
          }}>
          Add an attachment
        </button>
      </div>
    </section>
  );
};

//

function CardAttachmentList({
  attachments,
  setCardPopover,
  onRemoveAttachment,
  onUpdateAttachment,
}) {
  const getThumbnailText = attachment => {
    if (!attachment.type) {
      const isValidImage = utilService.isValidImg(attachment.url);
      return isValidImage ? '' : 'Link';
    }
    return attachment.type !== 'image' ? attachment.suffix : '';
  };

  const onRemoveClick = (ev, attachment) => {
    ev.stopPropagation();
    setCardPopover('remove-item', ev.target, {
      item: attachment,
      onRemoveItem: () => onRemoveAttachment(attachment),
      msg: constService.MSG_REMOVE_ATTACHMENT,
      itemType: 'attachment',
    });
  };

  const onEditClick = (ev, attachment) => {
    ev.stopPropagation();
    setCardPopover('edit-attachment', ev.target, {
      attachment,
      onUpdateAttachment,
    });
  };

  if (!attachments) return <></>;
  return (
    <div className="section-data card-attachments flex column">
      {attachments.map(attachment => {
        const thumbnailText = getThumbnailText(attachment);
        return (
          <div
            key={attachment.id}
            className="card-attachment"
            onClick={() => window.open(attachment.url, '_blank')}>
            <div
              className="attachment-thumbnail flex align-center justify-center"
              style={!thumbnailText ? { backgroundImage: `url(${attachment.url})` } : {}}>
              <span>{thumbnailText}</span>
            </div>
            <section className="attachment-info">
              <div className="attachment-basic-info">
                <div className="attachment-name">
                  {attachment.name || 'Untitled'} <span className="icon-open" />
                </div>
                <span>
                  Added {formatDistance(attachment.createdAt, Date.now(), { addSuffix: true })} -{' '}
                  <span className="link" onClick={ev => onEditClick(ev, attachment)}>
                    Edit
                  </span>{' '}
                  -{' '}
                  <span className="link" onClick={ev => onRemoveClick(ev, attachment)}>
                    Delete
                  </span>
                </span>
              </div>
              <div className="attachment-actions flex align-center">
                <CoverIcon /> <span className="link">Make cover</span>
              </div>
            </section>
          </div>
        );
      })}
    </div>
  );
}
