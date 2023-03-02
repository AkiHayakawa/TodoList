import TextField from "@mui/material/TextField";
import AddToPhotosIcon from "@mui/icons-material/AddToPhotos";
interface NewTodoFormProps {
  value: string;
  updateText: (str: string) => void;
  handleAction: () => void;
}

const NewTodoForm: React.FC<NewTodoFormProps> = ({
  value,
  updateText,
  handleAction,
}) => {
  return (
    <>
      {" "}
      <h1>GreeNotes</h1>
      <div className="addTodoBlock">
        <TextField
          id="outlined-basic"
          label="New Todo"
          variant="outlined"
          value={value}
          onChange={(e) => updateText(e.target.value)}
        />

        <AddToPhotosIcon onClick={handleAction} className="AddToPhotosIcon" />
      </div>
    </>
  );
};

export default NewTodoForm;
