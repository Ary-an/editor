import { useEffect, useRef, useState } from "react";
import MDEditor from "@uiw/react-md-editor";
import "./text-editor.css";
import { ICell } from "../state";
import { useActions } from "../hooks/use-actions";

interface ITextEditorProps {
  cell: ICell;
}

const TextEditor: React.FC<ITextEditorProps> = ({ cell }) => {
  const [editing, setEditing] = useState(true);
  const ref = useRef<HTMLDivElement | null>(null);
  const { updateCell } = useActions();

  useEffect(() => {
    const listener = (event: MouseEvent) => {
      if (
        ref.current &&
        event.target &&
        ref.current.contains(event.target as Node)
      )
        return;

      setEditing(false);
    };

    document.addEventListener("click", listener, { capture: true });

    return () => {
      document.removeEventListener("click", listener, { capture: true });
    };
  }, []);

  if (editing) {
    return (
      <div className="text-editor" ref={ref}>
        <MDEditor
          value={cell.content}
          onChange={(val) => updateCell(cell.id, val || "")}
        />
      </div>
    );
  }

  return (
    <div className="text-editor card" onClick={() => setEditing(true)}>
      <div className="card-content">
        <MDEditor.Markdown source={cell.content || "Click to edit"} />
      </div>
    </div>
  );
};

export default TextEditor;
