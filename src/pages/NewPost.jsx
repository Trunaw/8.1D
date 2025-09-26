import { useState } from "react";
import {Controlled as ControlledEditor} from "react-codemirror2";
import ReactMarkdown from "react-markdown";
import "codemirror/lib/codemirror.css";
import "codemirror/theme/material.css";
import "codemirror/mode/javascript/javascript";

export default function NewPost() {
  const [code, setCode] = useState("// write code here");
  const [markdown, setMarkdown] = useState("# My Post");

  return (
    <div style={{display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20}}>
      <div>
        <h3>Editor</h3>
        <ControlledEditor
          value={code}
          options={{ lineNumbers: true, mode: "javascript", theme: "material" }}
          onBeforeChange={(editor, data, value) => setCode(value)}
        />
        <textarea
          value={markdown}
          onChange={(e) => setMarkdown(e.target.value)}
          style={{width: "100%", height: 150, marginTop: 10}}
        />
      </div>
      <div>
        <h3>Preview</h3>
        <ReactMarkdown>{markdown}</ReactMarkdown>
      </div>
    </div>
  );
}
