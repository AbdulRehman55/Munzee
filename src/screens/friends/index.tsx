import React from "react";
import { Button, Container, PageTitle, Loader } from "../../components";
import { ClientContext } from "../../context/ClientContext";
import "./style.scss";

type Friend = Readonly<{
  name: string;
  level: string;
  captures: string;
  deploys: string;
  points: string;
  avatar: string;
}>;

const Friends = () => {
  const { client } = React.useContext(ClientContext);

  const [add, setAdd] = React.useState("");
  const [lastChanged, setLastChanged] = React.useState(0);
  const [friends, setFriends] = React.useState<ReadonlyArray<Friend>>([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    client?.friends.getFriends().then((result) => {
      setFriends(result);
      setLoading(false);
    });
  }, [client, lastChanged]);

  return (
    <Container>
      <div className="friends-screen-container">
        <PageTitle title="Your Friends" />
        <div className="friends-table-area">
          <table>
            <thead>
              <tr>
                <th>Friend</th>
                <th />
                <th className="hidden-xs">Level</th>
                <th className="hidden-xs">Captures</th>
                <th className="hidden-xs">Deploys</th>
                <th>Points</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {loading ? <Loader /> : friends.map((f) => (
                <>
                  <tr>
                    <td>
                      <a href={`/m/${f.name}/`}>
                        <img className="user-photo" src={f.avatar} alt="" />
                      </a>
                    </td>
                    <td className="clan-member">
                      <a href={`/m/${f.name}/`}>{f.name}</a>
                    </td>
                    <td className="hidden-xs">{f.level}</td>
                    <td className="hidden-xs">{f.captures}</td>
                    <td className="hidden-xs">{f.deploys}</td>
                    <td>{f.points}</td>
                    <td>
                      <Button
                        className="btn primaryButton"
                        onClick={() => {
                          client?.friends
                            .removeFriend(f.name)
                            .then((result) => {
                              setLastChanged(Date.now());
                              alert(result.message);
                            });
                        }}
                      >
                        DEL
                      </Button>
                    </td>
                  </tr>
                </>
              ))}
            </tbody>
          </table>
        </div>
        <hr />
        <div className="friends-form-area">
          <div className="form-group">
            <label>Add Friend</label>
            <input
              placeholder="username goes here..."
              value={add}
              onChange={(e) => setAdd(e.target.value)}
            />
          </div>
          <div className="submit-btn">
            <Button
              className="btn primaryButton"
              onClick={() => {
                client?.friends.addFriend(add).then((result) => {
                  setLastChanged(Date.now());
                  setAdd("");
                  alert(result.message);
                });
              }}
            >
              add
            </Button>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default Friends;
