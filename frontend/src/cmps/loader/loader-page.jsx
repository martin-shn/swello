
import movingIcon from '../../assets/img/moving-icon.gif';

export function LoaderPage(){
    return <div className="loader-page">
        <div className="loader-container">
            <img src={movingIcon} className="moving-icon" alt="Loading icon"/>
        </div>
    </div>
}
