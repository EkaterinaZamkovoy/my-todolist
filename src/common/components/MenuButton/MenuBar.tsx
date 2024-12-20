import { Button } from "../Button/Button";
import { Container } from "../Container/Container";


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
