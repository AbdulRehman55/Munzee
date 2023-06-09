import "./style.scss";

interface data {
  name: string;
  title: string;
  imgSrc: string;
  deploymentPoints?: number;
  capturePoints?: number;
  ownerPoints?: number;
}
interface Iprops {
  data: data[];
  rotate: boolean;
}
const typesCard = ({ data, rotate }: Iprops): JSX.Element => {
  return (
    <div className="types-card">
      {data.map((item, index) => {
        return (
          <div className={`card ${rotate && "rotate"}`} key={index}>
            <div className="front">
              <img src={item.imgSrc} alt="img" />
              <div className="name">{item.name}</div>
              <div className="title">{item.title}</div>
            </div>
            <div className="back">
              <div className="description">
                <b>Deployment</b>
                <br />
                <span>{item.deploymentPoints} Points</span>
                <hr />
                <b>Capture</b>
                <br />
                <span>{item.capturePoints} Points</span>
                <hr />
                <b>
                  When captured,
                  <br />
                  owner receives{" "}
                </b>
                <br />
                <span>{item.ownerPoints} Points</span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default typesCard;
