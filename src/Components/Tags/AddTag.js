import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import DeleteIcon from "@mui/icons-material/Delete";
import { TransitionGroup } from "react-transition-group";
import { useEffect, useState } from "react";
import { Form, Row, Col ,Button} from 'react-bootstrap';
import { Autocomplete, TextField } from "@mui/material";
import api from '../../API/ApiLink'

export default function AddTag({TagsInBasket,setTagsInBasket}) {
  const [tag, setTag] = useState('');
  const [allTags, setAllTags] = useState([]);

     // API for get AllTags
     useEffect(() => {
      const fetchCategory = async () => {
        try {
          const response = await api.get("/getAllTags");
          setAllTags(response.data.data);
        } catch (error) {
          console.log(error);
        }
      };
      fetchCategory();
    }, []);

  const handleAddTag = () => {
    if (tag.trim() !== "") {
      setTagsInBasket((prev) => [tag, ...prev]);
      setTag("");
    }
  };

  const handleOptionSelect = (value) => {
      setTagsInBasket((prev) => [value, ...prev]);
  };



  const handleRemoveTag = (item) => {
    setTagsInBasket((prev) => [...prev.filter((i) => i !== item)]);
  };

  const renderItem = ({ item }) => (
    <ListItem
      secondaryAction={
        <IconButton
          edge="end"
          aria-label="delete"
          title="Delete"
          onClick={() => handleRemoveTag(item)}
        >
          <DeleteIcon color="error" />
        </IconButton >
      }
    >
      <ListItemText primary={item} />
    </ListItem>
  );

  return (
    <div>
      <Row className="mt-3">
        <Form.Group as={Col} xs={8} md={6} controlId="formGridTitle">
          <Form.Control
            type="text"
            placeholder="ادخل تاج جديدة"
            value={tag}
            onChange={(e) => setTag(e.target.value)}
          />
        </Form.Group>
        <Button as={Col} xs={4} md={4} lg={2} variant="primary" onClick={handleAddTag}>
          اضافه التاج
        </Button>
      </Row>

      <Row className="mt-3">
        <Autocomplete
        as={Col} xs={12} md={6}
          disablePortal
          onChange={(event, newValue) => {
            handleOptionSelect(newValue ? newValue : "");
          }}
          options={allTags}
          getOptionLabel={(option) => option}
          renderInput={(params) => (
            <TextField {...params} label="اختر تاج" />
          )}
        />
      </Row>

      <List sx={{ mt: 1 }}>
        <TransitionGroup style={{ display: "flex", flexWrap: "wrap" }}>
          {TagsInBasket.map((item) => (
            <Collapse key={item}>{renderItem({ item })}</Collapse>
          ))}
        </TransitionGroup>
      </List>
    </div>
  );
}
