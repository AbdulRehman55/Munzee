import React from "react";
import "./styles.scss";
import {
  Container,
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Link,
} from "@mui/material";
import { PageTitle, Loader } from "../../components";
import { moreLocales } from "./moreLocales";
import Alert from "../../components/alerts";
import { ClientContext } from "../../context/ClientContext";

type BlastInfo = Readonly<{
  blastCaptureUsed: string;
  numberOfCaptures: number;
  numberOfPoints: number;
}>;

const BlastCaptures = (): JSX.Element => {
  const { client } = React.useContext(ClientContext);

  const [blasts, setBlasts] = React.useState<ReadonlyArray<BlastInfo>>([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    client?.user.getBlasts().then((result) => {
      setBlasts(result);
      setLoading(false);
    });
  }, [client]);

  return (
    <Container id="blast-captures-more">
      <PageTitle title={moreLocales.blastCapturesTitle} />
      <TableContainer id="blast-captures-table">
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>{moreLocales.blastCapturesTableCell1}</TableCell>
              <TableCell>{moreLocales.blastCapturesTableCell2}</TableCell>
              <TableCell>{moreLocales.blastCapturesTableCell3}</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loading ? <Loader /> : blasts.map((row, index) => (
              <TableRow
                key={index}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.blastCaptureUsed}
                </TableCell>
                <TableCell align="right">{row.numberOfCaptures}</TableCell>
                <TableCell align="right">{row.numberOfPoints}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Alert type="success" align="left">
        {moreLocales.blastCapturesAlert[0]}
        <Link className="alert-link">{moreLocales.blastCapturesAlert[1]}</Link>
        {moreLocales.blastCapturesAlert[2]}
        <Link className="alert-link">{moreLocales.blastCapturesAlert[3]}</Link>
      </Alert>
    </Container>
  );
};

export default BlastCaptures;
