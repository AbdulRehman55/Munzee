import React from "react";
import { Container, PageTitleSecondary, SocialCard, Loader } from "../../components";
import { ClientContext } from "../../context/ClientContext";
import "./style.scss";

type Data = Readonly<{
  code: string;
  creator_username: string;
  avatar: string;
  deployed_at: string;
  friendly_name: string;
  image: string;
  url: string;
}>;

const Social = () => {
  const { client, user } = React.useContext(ClientContext);
  const [data, setData] = React.useState<ReadonlyArray<Data>>([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    if (user?.username) {
      client?.user.getSocials(user.username).then((result) => {
        console.log(result, "result");
        setData(result);
        setLoading(false);
      });
    }
  }, [client, user]);
  return (
    <Container>
      <div className="social-container">
        <PageTitleSecondary
          title="Social Munzees"
          subtitle="To see more information click a munzee."
        />
        {loading ? <Loader /> : <SocialCard screenType="social" data={data} />}
      </div>
    </Container>
  );
};

export default Social;
