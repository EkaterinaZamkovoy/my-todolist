import { Button } from "./Button";
import { Container } from "./Container";

export const MenuBar = () => {
  return (
    <>
      <Container className={"menu-bar"}>
        <div className="menu-icon">
          <span className="icon"></span>
          <span className="icon"></span>
          <span className="icon"></span>
        </div>
        <Button title="Login" onClick={() => {}} className="loginBtn" />
      </Container>
    </>
  );
};
