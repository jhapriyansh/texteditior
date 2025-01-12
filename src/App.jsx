import React, { useState } from "react";
import "./App.css";

const App = () => {
  const [txtData, setTxtData] = useState([]);
  const [txtData2, setTxtData2] = useState([]);
  const [fontSize, setFontSize] = useState("18px");
  const [viewHam, setViewHam] = useState(true);
  let viewData;
  if (txtData.length === 0) {
    viewData = "";
  } else {
    viewData = Array.from(txtData)[txtData.length - 1];
  }
  return (
    <div className="App flex flex-col items-center justify-center relative w-[100vw] h-[100vh]">
      {viewHam ? (
        <svg
          className="svgImg"
          width="4vw"
          onClick={() => setViewHam(false)}
          height="auto"
          viewBox="0 0 48 48"
          xmlns="http://www.w3.org/2000/svg"
        >
          <title>70 Basic icons by Xicons.co</title>
          <path d="M41,14H7a2,2,0,0,1,0-4H41A2,2,0,0,1,41,14Z" fill="#6f7380" />
          <path d="M41,26H7a2,2,0,0,1,0-4H41A2,2,0,0,1,41,26Z" fill="#6f7380" />
          <path d="M41,38H7a2,2,0,0,1,0-4H41A2,2,0,0,1,41,38Z" fill="#6f7380" />
        </svg>
      ) : (
        <svg
          className="svgImg"
          onClick={() => setViewHam(!false)}
          fill="#6f7380"
          width="4vw"
          height="auto"
          viewBox="0 0 24.00 24.00"
          xmlns="http://www.w3.org/2000/svg"
          stroke="#6f7380"
          stroke-width="0.00024000000000000003"
        >
          <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
          <g
            id="SVGRepo_tracerCarrier"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke="#CCCCCC"
            stroke-width="0.288"
          ></g>
          <g id="SVGRepo_iconCarrier">
            <path d="M12.707 17.293 8.414 13H18v-2H8.414l4.293-4.293-1.414-1.414L4.586 12l6.707 6.707z"></path>
          </g>
        </svg>
      )}

      <div
        className={`menuBar ${
          !viewHam ? "w-[15vw]" : "w-0"
        } lg:w-screen  h-[7vh]  bg-[#b0b0b0] flex flex-row gap-[2vw] pl-[2vw] items-center relative`}
      >
        <button
          className="new actionBtn"
          onClick={() => {
            setTxtData([]);
            setTxtData2([]);
          }}
        >
          New
        </button>
        <button
          className="save actionBtn"
          onClick={() => {
            // chatgpt code begin
            const blob = new Blob([txtData], { type: "text/plain" });
            const link = document.createElement("a");
            link.href = URL.createObjectURL(blob);
            link.download = "component.txt";
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            // chatgpt code end
          }}
        >
          Save
        </button>
        <button
          className="print actionBtn"
          onClick={() => {
            window.print();
          }}
        >
          Print
        </button>
        <button
          className="cut actionBtn "
          onClick={() => {
            navigator?.clipboard
              .writeText(txtData[txtData.length - 1])
              .then(console.log("Cut"));
            const newData = Array.from(txtData);
            newData.push("");
            setTxtData(newData);
            setTxtData2(newData);
          }}
        >
          Cut
        </button>
        <button
          className="copy actionBtn"
          onClick={() => {
            navigator?.clipboard
              .writeText(txtData[txtData.length - 1])
              .then(console.log("Copied"));
          }}
        >
          Copy
        </button>
        <button
          className="paste actionBtn"
          onClick={async () => {
            const newData = Array.from(txtData);
            let res = await navigator.clipboard?.readText();
            newData.push(newData[newData.length - 1] + res);
            setTxtData(newData);
            setTxtData2(newData);
            console.log(newData[newData.length - 1]);
          }}
        >
          Paste
        </button>
        <button
          onClick={() => {
            setTxtData(txtData.slice(0, -1));
          }}
          className="undo actionBtn"
        >
          Undo
        </button>
        <button
          className="redo actionBtn"
          onClick={() => {
            setTxtData(txtData2.slice(0, txtData.length + 1));
          }}
        >
          Redo
        </button>
        <div className="sizeselect absolute right-[4vw] text-[2vh]">
          Size:
          <select
            className="bg-inherit sizeSelector"
            name="size"
            id="size"
            value={fontSize}
            onChange={(e) => {
              setFontSize(e.target.value);
            }}
          >
            <option value="18px">18</option>
            <option value="20px">20</option>
            <option value="22px">22</option>
            <option value="26px">26</option>
            <option value="28px">28</option>
            <option value="32px">32</option>
            <option value="36px">36</option>
            <option value="40px">40</option>
          </select>
        </div>
      </div>

      <textarea
        id="hehe"
        className="w-[90vw] h-[90vh] bg-[#b6b6b6] mt-[2vh] rounded-[15px] p-[10px]"
        name="textInput"
        value={viewData}
        style={{ fontSize: fontSize }}
        onChange={(e) => {
          const newData = Array.from(txtData);
          newData.push(e.target.value);
          setTxtData(newData);
          setTxtData2(newData);
        }}
      ></textarea>
    </div>
  );
};

export default App;
