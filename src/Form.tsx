import {
    Button,
    TextField,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    FormControlLabel,
    Checkbox
  } from "@mui/material";
  import { useState, useEffect } from "react";
  import useBooks, { TBook } from "./firebase/useBooks";
  
  interface Props {
    open: boolean;
    handleClose: () => void;
    bookToEdit: (book:TBook | null) => void; 
  }
  
  export default function Form({ open, handleClose, bookToEdit }: Props) {
    const [, addBook, editBook] = useBooks();
    const [formData, setFormData] = useState<TBook | null>({title: '', author: '', pages: 0, read: false});
  
    useEffect(() => {
        if (open&&formData !== null) {
          bookToEdit(formData); 
        }
      }, [open,formData,bookToEdit]);
  
    const handleFormSubmit = () => {
      console.log(formData?.id);
      if (formData?.id) {
        console.log("hello from if", formData);
        (editBook as (formdata: TBook)=>void)(formData);
      } else {
        console.log('hello from else', formData, bookToEdit(formData));
        (addBook as (formdata: TBook)=>void)(formData!);
      }
      setFormData(null); 
      handleClose();
    };
  
    return (
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{formData?.id ? "Edit Book" : "Add Book"}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {formData ? "Edit the book details" : "Add a book to your bookshelf!"}
          </DialogContentText>
          <TextField
            required
            autoFocus
            margin="dense"
            id="title"
            label="Title"
            type="text"
            fullWidth
            variant="standard"
            value={formData ? formData.title : ""}
            onChange={(e) =>
              setFormData((prevData) => ({
                ...prevData!,
                title: e.target.value
              }))
            }
          />
          <TextField
            required
            autoFocus
            margin="dense"
            id="author"
            label="Author"
            type="text"
            fullWidth
            variant="standard"
            value={formData ? formData.author : ""}
            onChange={(e) =>
              setFormData((prevData) => ({
                ...prevData!,
                author: e.target.value
              }))
            }
          />
          <TextField
            required
            autoFocus
            margin="dense"
            id="pages"
            label="Pages"
            type="number"
            fullWidth
            variant="standard"
            value={formData ? formData.pages : ""}
            onChange={(e) =>
              setFormData((prevData) => ({
                ...prevData!,
                pages: Number(e.target.value)
              }))
            }
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={formData ? formData.read : false}
                onChange={(e) =>
                  setFormData((prevData) => ({
                    ...prevData!,
                    read: e.target.checked
                  }))
                }
              />
            }
            label="Read?"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleFormSubmit}>
            {formData ? "Save Changes" : "Add Book"}
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
  