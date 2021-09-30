import AttachmentIcon from '@mui/icons-material/AttachFileOutlined';
import CoverIcon from '@mui/icons-material/VideoLabel';
import LaunchIcon from '@mui/icons-material/Launch';
import { formatDistance } from 'date-fns';
import React from 'react';
import { utilService } from '../../services/util.service';

export const CardAttachments = ({ attachments }) => {
  const getThumbnailText = attachment => {
    if (!attachment.type) {
      const isValidImage = utilService.isValidImg(attachment.url);
      return isValidImage ? '' : 'Link';
    }
    return attachment.type !== 'image' ? attachment.suffix : '';
  };

  if (!attachments) return <></>;
  return (
    <section className="card-section ">
      <div className="section-header">
        <AttachmentIcon />
        <h3 className="section-title">Attachments</h3>
      </div>
      <div className="section-data card-attachments flex column">
        {attachments.map(attachment => {
          const thumbnailText = getThumbnailText(attachment);
          return (
            <a
              href={attachment.url}
              target="_blank"
              rel="noreferrer"
              key={attachment.id}
              className="card-attachment flex">
              <div
                className="attachment-thumbnail flex align-center justify-center"
                style={!thumbnailText ? { backgroundImage: `url(${attachment.url})` } : {}}>
                <span>{thumbnailText}</span>
              </div>
              <section className="attachment-info">
                <div className="attachment-basic-info">
                  <div className="attachment-name flex align-center">
                    {attachment.name || 'Untitled'} <span className="icon-open" />
                  </div>
                  <span>
                    Added {formatDistance(attachment.createdAt, Date.now(), { addSuffix: true })} -{' '}
                    <span className="link">Edit</span> - <span className="link">Delete</span>
                  </span>
                </div>
                <div className="attachment-actions flex align-center">
                  <CoverIcon /> <span className="link">Make cover</span>
                </div>
              </section>
            </a>
          );
        })}
      </div>
      <div className="section-data">
        <button>Add an attachment</button>
      </div>
    </section>
  );
};
