import { memo, Fragment } from "react";
import Card from "react-bootstrap/Card";
import { useHistory } from "react-router-dom";

const CustomHeaderCard = memo((props) => {
  const history = useHistory();

  return (
    <Fragment>
      <Card
        onClick={() => {
          if (props.link) {
            history.push(props.link);
          }
          else {
            props?.action(true);
          }
        }}
        className="shadow-lg"
        style={{ cursor: "pointer", background: `${props.background}` }}
      >
        <Card.Body>
          <div className="d-flex align-items-center gap-3">
            <div
              className={`bg-white d-flex justify-content-center align-items-center`}
              style={{ height: "50px", width: "50px", borderRadius: "90px" }}
            >
              <span>{props.svg}</span>
            </div>
            <div>
              <h4 className="counter text-white">{props.content}</h4>
            </div>
          </div>
        </Card.Body>
      </Card>
    </Fragment>
  );
});

CustomHeaderCard.displayName = "CustomHeaderCard";
export default CustomHeaderCard;
