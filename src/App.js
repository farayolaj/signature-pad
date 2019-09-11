import React, { useRef, useState } from 'react';
import Popup from 'reactjs-popup';
import SignaturePad from 'react-signature-canvas';
import { TwitterPicker } from 'react-color';
import './App.css';
import './sigCanvas.css';

function App() {
  const [ imgURL, setImgURL ] = useState(null);
  const [ penColor, setPenColor ] = useState("black");
  const sigCanvas = useRef({ });
  const clear = () => sigCanvas.current.clear();
  const save = () => {
    const trim = sigCanvas.current.getTrimmedCanvas().toDataURL("image/png");
    setImgURL(trim);
  }
  const onColorChange = color => setPenColor(color.hex);

  return (
    <div className="App">
      <h1>Signature Pad Example</h1>
      <Popup modal trigger={<button>Open Signature Pad</button>} closeOnDocumentClick={false}>
        {close => (
          <>
            <SignaturePad ref={sigCanvas} penColor={penColor} canvasProps={{
              className: "signatureCanvas",
            }}/>
            <button onClick={close}>Close</button>
            <button onClick={clear}>Clear</button>
            <button onClick={save}>Save</button>
            <Popup modal trigger={<button>Colour</button>}>
              <TwitterPicker color={penColor} onChangeComplete={onColorChange} />
            </Popup>
          </>
        )}
      </Popup>
      <br />
      <br />
      {imgURL ? <img src={imgURL} alt="alt" style={{
        display: "block",
        margin: "0 auto",
        border: "1px solid black",
        width : "150px"
      }} /> : null}
    </div>
  );
}

export default App;
