// hooks/methods
import { FormInputReturnType } from "hooks/useFormInput";

// styles
import "quill/dist/quill.snow.css";
import { SDescription } from "./style";

type QuillModules = {
  toolbar:
    | (string | { size: (string | boolean)[] })[]
    | (
        | { list: string; indent?: undefined; align?: undefined }
        | { indent: string; list?: undefined; align?: undefined }
        | {}
      )[]
    | {}[];
};

const Description = ({ state }: { state: FormInputReturnType }) => {
  const modules: QuillModules = {
    toolbar: [
      [{ size: ["small", false, "large", "huge"] }],
      ["bold", "italic", "underline", "strike"],
      [{ list: "ordered" }, { list: "bullet" }, { align: [] }],
    ],
  };

  const formats = [
    "header",
    "height",
    "bold",
    "italic",
    "underline",
    "strike",
    "list",
    "bullet",
    "align",
    "size",
  ];

  return (
    <SDescription
      theme="snow"
      modules={modules}
      formats={formats}
      value={state.value}
      onChange={(val: string) => {
        state.setValue(val);
      }}
      onBlur={state.onBlur}
      isFocused={state.isTouched}
    />
  );
};

export default Description;
