const url = window.location.href;
let timer=null;

export function QrCode(){
    let tmp=false;
    console.log(tmp);
    return <div className="qr-code-container">
        <div>
            <input 
                type="text" 
                autoCorrect="off" 
                autoComplete="off" 
                value={url} 
                readOnly
                onClick={(ev)=>ev.target.setSelectionRange(0, ev.target.value.length)}
                />
            <button onClick={()=>{
                onCopy()
                tmp=true;
                }}>{timer?'Copied':'Copy'}</button>
        </div>
        <div>
            <img alt="QR code" src={`https://api.qrserver.com/v1/create-qr-code/?size=100x100&data=${url}&format=svg`} />
            <div>
                <p>Or let anyone scan this QR code to invite them to this board:</p>
                {/* <a href={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${url}`} 
                download="trello-board-invite-qr-code.png">Download</a> */}
                <button onClick={download}>Download</button>
            </div>
        </div>

    </div>
}

function onCopy(){
    clearTimeout(timer)

    // copy url to clipboard
    navigator.clipboard.writeText(url).then(function() {
        // console.log('Async: Copying to clipboard was successful!');
      }, function(err) {
        console.error('Async: Could not copy text: ', err);
      });

    timer = setTimeout(()=>{
        clearTimeout(timer)
        timer=null
    }, 2000)
}

function toDataURL(downloadURL) {
    return fetch(downloadURL).then((response) => {
            return response.blob();
        }).then(blob => {
            return URL.createObjectURL(blob);
        });
}

async function download() {
    const a = document.createElement("a");
    a.href = await toDataURL(`https://api.qrserver.com/v1/create-qr-code/?size=100x100&data=${url}`);
    a.download = "swello-board-invite-qr-code.png";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
}
