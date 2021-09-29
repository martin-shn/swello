import { LoaderPage } from '../cmps/loader/loader-page';
import { AppHeader } from '../cmps/app-header';

export function Test(){
    return <>
    <AppHeader />
    <img src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=http://google.com`}/>
    {/* <LoaderPage /> */}
    </>
}
