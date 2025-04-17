import { TreeNodeData } from "../common/interfaces";
import styles from "../styles/TreeNode.module.scss";
import { useTree } from "../hooks/TreeProvider.tsx";
import { useEffect, useRef, useState } from "react";

interface TreeNodeProps {
  nodeData: TreeNodeData | null;
}

export default function TreeNode({ nodeData }: TreeNodeProps) {
  const treeContext = useTree();
  const [isEditing, setIsEditing] = useState(false);
  const [isOpened, setIsOpened] = useState(false);
  const nameInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (nameInputRef.current) {
      nameInputRef.current.focus();
    }
  }, [isEditing]);

  if (!nodeData) {
    return null;
  }

  const addNode = () => {
    let newNodeId = "0";

    if (nodeData.children.length > 0)
      newNodeId = (
        parseInt(nodeData.children[nodeData.children.length - 1].id) + 1
      ).toString();

    nodeData.children.push({
      id: newNodeId,
      parent: nodeData,
      children: [],
      text: `New node ${parseInt(newNodeId) + 1}`,
      path: `${nodeData.path}.${newNodeId}`,
    });

    setIsOpened(true);
    treeContext.update();
  };

  const toggleEditingMode = () => {
    if (nameInputRef.current) {
      if (nameInputRef.current.value === "") {
        return;
      }

      nodeData.text = nameInputRef.current?.value;

      if (nodeData.parent === null) treeContext.update();
    }

    setIsEditing(!isEditing);
  };

  const deleteNode = () => {
    nodeData.parent?.children.forEach((node, index) => {
      if (node == nodeData) {
        nodeData.parent!.children.splice(index, 1);
        treeContext.update();
        return;
      }
    });
  };

  return (
    <div
      className={`${styles.TreeNode} ${nodeData.children.length > 0 && isOpened ? styles.opened : null} ${nodeData.parent === null ? styles.rootNode : null}`}
    >
      <div className={styles.header}>
        {nodeData.children.length > 0 ? (
          <button
            className={styles.collapseButton}
            onClick={() => setIsOpened(!isOpened)}
          />
        ) : (
          <div className={styles.dot}></div>
        )}
        {isEditing ? (
          <div className={styles.inputWrapper}>
            <input
              ref={nameInputRef}
              className={styles.input}
              maxLength={50}
              placeholder={"Name of the node"}
              defaultValue={nodeData.text}
              onKeyDown={(event) => {
                if (event.key === "Enter") toggleEditingMode();
              }}
            />
          </div>
        ) : (
          <span className={styles.text}>{nodeData.text}</span>
        )}
        <div className={styles.buttonsWrapper}>
          {isEditing ? (
            <button
              className={`${styles.button} ${styles.doneButton}`}
              onClick={() => toggleEditingMode()}
            />
          ) : (
            <>
              {nodeData.path.split(".").length < 14 ? (
                <button
                  className={`${styles.button} ${styles.addButton}`}
                  onClick={() => addNode()}
                />
              ) : null}
              <button
                className={`${styles.button} ${styles.editButton}`}
                onClick={() => toggleEditingMode()}
              />
              <button
                className={`${styles.button} ${styles.deleteButton}`}
                onClick={() => deleteNode()}
              />
            </>
          )}
        </div>
      </div>
      <div className={`${styles.body} ${isOpened ? styles.opened : null}`}>
        {nodeData.children.map((childNode) => (
          <TreeNode key={nodeData.path} nodeData={childNode} />
        ))}
      </div>
    </div>
  );
}
