import templates from '../../data/template.json';
import FileCopyIcon from '@mui/icons-material/FileCopy';

export function TemplateList() {
  const onTemplateClick = template => {};

  return (
    <div className="template-list-main" style={{ flexGrow: 1, padding: '20px' }}>
      <h3 className="flex align-center" style={{ gap: '10px' }}>
        <FileCopyIcon style={{ width: '19px' }} />
        Templates
      </h3>
      <section className="template-list flex" style={{ gap: '15px' }}>
        {templates?.length > 0 &&
          templates.map(template => (
            <div
              className="board-preview"
              onClick={() => onTemplateClick(template)}
              style={{
                backgroundImage: `url(${template.style.imgUrl || ''})`,
                backgroundColor: template.style.bgColor || '#fefefe',
                width: '200px',
              }}>
              <span></span>
              <div>{template.title}</div>
            </div>
          ))}
      </section>
    </div>
  );
}
