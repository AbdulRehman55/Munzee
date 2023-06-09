import React from "react";
import "./style.scss";
import { Container, PageTitleSecondary, SocialCard, Loader } from "../../../components";
import { ClientContext } from "../../../context/ClientContext";

type Data = Readonly<{
  code: string;
  friendly_name: string;
  deployed_at: string;
  url: string;
  image: string;
  deployed_at_unix: number;
  number_of_captures: number;
}>;

const SocialOwn = (): JSX.Element => {
  const { client, user } = React.useContext(ClientContext);
  const [data, setData] = React.useState<ReadonlyArray<Data>>([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    if (user?.username) {
      client?.user.getSocialsOwn(user.username).then((result) => {
        console.log(result, "result");
        setData(result);
        setLoading(false);
      });
    }
  }, [client]);
  return (
    <Container>
      <div className="socialOwn-container">
        <PageTitleSecondary
          title="Devzee's Social Munzees"
          subtitle="To see more information click a munzee."
        />
        {loading ? <Loader /> : <SocialCard screenType="ownSocial" data={data} />}
      </div>
    </Container>
  );
};

export default SocialOwn;
