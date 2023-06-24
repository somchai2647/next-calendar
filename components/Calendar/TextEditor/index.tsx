import React, { Component } from "react";
import { EditorState, Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import draftToHtml from "draftjs-to-html";
import { convertToRaw, RichUtils } from "draft-js";

interface MyEditorState {
  editorLoaded: boolean;
  editorState: EditorState | null;
}

class MyEditor extends Component<{}, MyEditorState> {
  Editor: typeof Editor | null = null;

  state: MyEditorState = {
    editorLoaded: false,
    editorState: EditorState?.createEmpty(),
  };

  async componentDidMount() {
    const { Editor } = await import("react-draft-wysiwyg");
    this.Editor = Editor;
    this.setState({ editorLoaded: true });
  }

  handleEditorChange = (editorState: EditorState) => {
    this.setState({ editorState });
  };

  convertToHtml = () => {
    const { editorState } = this.state;
    const contentState = editorState.getCurrentContent();
    const rawContentState = convertToRaw(contentState);
    const html = draftToHtml(rawContentState);
    console.log({ html, text: contentState.getPlainText() });
  };

  //   handleAddLink = () => {
  //     const { editorState } = this.state;
  //     const selection = editorState.getSelection();
  //     const link = window.prompt("Enter the link URL:");
  //     if (!link) {
  //       this.handleRemoveLink();
  //       return;
  //     }
  //     const contentState = editorState.getCurrentContent();
  //     const contentStateWithLink = contentState.createEntity("LINK", "MUTABLE", {
  //       url: link,
  //     });
  //     const newEditorState = EditorState.push(
  //       editorState,
  //       contentStateWithLink,
  //       // @ts-ignore
  //       "create-entity"
  //     );
  //     const entityKey = contentStateWithLink.getLastCreatedEntityKey();
  //     const newEditorStateWithLink = RichUtils.toggleLink(
  //       newEditorState,
  //       selection,
  //       entityKey
  //     );
  //     this.setState({ editorState: newEditorStateWithLink });
  //   };

  //   handleRemoveLink = () => {
  //     const { editorState } = this.state;
  //     const selection = editorState.getSelection();
  //     const newEditorState = RichUtils.toggleLink(editorState, selection, null);
  //     this.setState({ editorState: newEditorState });
  //   };

  render() {
    const { editorLoaded, editorState } = this.state;

    if (!editorLoaded || !this.Editor) {
      return <div>Loading editor...</div>;
    }

    const { Editor } = this;

    const toolbarOptions = {
      options: ["inline", "list", "history"],
      link: {
        className: "custom-option",
        // onClick: this.handleAddLink,
      },
    };

    return (
      <div>
        <div style={{
            border: "1px solid black",
        }}>
          <Editor
            editorState={editorState}
            onEditorStateChange={this.handleEditorChange}
            toolbar={toolbarOptions}
            placeholder="Write something..."
          />
        </div>

        <button onClick={this.convertToHtml}>Convert to HTML</button>
      </div>
    );
  }
}

export default MyEditor;
