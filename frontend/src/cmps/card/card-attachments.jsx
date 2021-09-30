import AttachmentIcon from '@mui/icons-material/AttachFileOutlined';
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

  return (
    <section className="card-section ">
      <div className="section-header">
        <AttachmentIcon />
        <h3 className="section-title">Attachments</h3>
      </div>
      <div className="section-data card-attachments flex column">
        {attachments &&
          attachments.map(attachment => {
            const thumbnailText = getThumbnailText(attachment);
            const elImg = document.createElement('image');
            elImg.setAttribute('src', attachment.url);
            return (
              <a
                href={attachment.url}
                target="_blank"
                rel="noreferrer"
                key={attachment.id}
                className="card-attachment flex">
                <div
                  className="attachment-thumbnail flex align-center justify-center"
                  style={
                    !thumbnailText
                      ? {
                          backgroundImage: `url(${attachment.url})`,
                        }
                      : {}
                  }>
                  <span>{thumbnailText}</span>
                </div>
                <div className="attachment-info">
                  <span className="attachment-name">{attachment.name || 'Untitled'}</span>
                </div>
              </a>
            );
          })}
      </div>
    </section>
  );
};
