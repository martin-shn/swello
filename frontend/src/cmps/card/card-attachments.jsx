import AttachmentIcon from '@mui/icons-material/AttachFileOutlined';
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
          attachments.map(attachment => (
            <div key={attachment.id} className="card-attachment flex">
              <div
                className="attachment-thumbnail flex align-center justify-center"
                style={{
                  backgroundImage: !getThumbnailText(attachment)
                    ? `url(${attachment.url})`
                    : 'none',
                }}>
                {getThumbnailText(attachment)}
              </div>
            </div>
          ))}
      </div>
    </section>
  );
};
