import { ChangeEvent, useState, KeyboardEvent } from "react";
import { Button } from "./Button";
import { Container } from "./Container";

type AddItemFormPropsType = {
  addItem: (title: string) => void;
};

export const AddItemForm = ({ addItem }: AddItemFormPropsType) => {
  //------

  const [title, setTitle] = useState("");

  //---

  const [error, setError] = useState<string | null>(null);

  //---

  const addItemHandler = () => {
    if (title.trim() !== "") {
      addItem(title.trim());
      setTitle("");
    } else {
      setError("Title is required");
    }
  };

  //---

  const onChangeItemHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setTitle(event.currentTarget.value);
  };

  //---

  const onKeyUpItemHandler = (event: KeyboardEvent<HTMLInputElement>) => {
    setError(null);
    if (event.key === "Enter") {
      addItemHandler();
    }
  };

  return (
    <Container className="add-box-container">
      <Container className="add-box">
        <input
          className={error ? "error" : "input-task"}
          type="text"
          value={title}
          onChange={onChangeItemHandler}
          onKeyUp={onKeyUpItemHandler}
        />
        <Button className="add-btn" title={"+"} onClick={addItemHandler} />
      </Container>
      {error && <div className={"error-message"}>{error}</div>}
    </Container>
  );
};
