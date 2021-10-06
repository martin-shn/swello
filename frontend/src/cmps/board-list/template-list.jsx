import FileCopyIcon from '@mui/icons-material/FileCopy';
import { LoaderPage } from '../loader/loader-page';

export function TemplateList ({ templates, createBoard, history }) {
//   const onTemplateClick = async template => {
//     const newBoard = await createBoard(template);
//     history.push(`/board/${ newBoard._id }`);
//   };

  if (!templates) return <LoaderPage />;
  return (
    <div className="template-list-main">
      <h3 className="flex align-center">
        <FileCopyIcon />
        Templates
      </h3>
      <section className="template-list flex wrap">
        {templates?.length > 0 &&
          templates.map(template => (
            <div
              key={template._id}
              className="board-preview"
              // onClick={() => onTemplateClick(template)}
              onClick={()=>{history.push(`/templates/${template._id}`)}}
              style={{
                backgroundImage: `url(${ template.style.imgUrl || '' })`,
                backgroundColor: template.style.bgColor || '#fefefe',
              }}>
              <span></span>
              <div>{template.title}</div>
            </div>
          ))}
        {templates.length === 0 && <div>No templates found</div>}
      </section>
    </div>
  );
}
