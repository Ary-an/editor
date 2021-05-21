import CodeEditor from "./code-editor";
import Preview from "./preview";
import Resizable from "./resizable";
import { ICell } from "../state";
import { useActions } from "../hooks/use-actions";
import { useTypedSelector } from "../hooks/use-types-selector";

interface ICodeCellProps {
  cell: ICell;
}

const CodeCell: React.FC<ICodeCellProps> = ({ cell }) => {
  const { updateCell } = useActions();

  const bundle = useTypedSelector((state) => state.bundles[cell.id]);

  return (
    <Resizable direction="vertical">
      <div style={{ height: "100%", display: "flex", flexDirection: "row" }}>
        <Resizable direction="horizontal">
          <CodeEditor
            initialValue={cell.content}
            onChange={(value) => updateCell(cell.id, value)}
          />
        </Resizable>
        <Preview code={bundle.code} bundlingStatusText={bundle.err} />
      </div>
    </Resizable>
  );
};

export default CodeCell;
