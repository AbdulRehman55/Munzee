import React, { useEffect, useState } from "react";
import { Button, Container, PageTitle, Alert } from "../../components";
import "./style.scss";
import { ClientContext } from "../../context/ClientContext";
import { Link, useNavigate } from "react-router-dom";

const Create = () => {
  const navigate = useNavigate();
  const { backend, user } = React.useContext(ClientContext);
  const [friendlyName, setFriendlyName] = useState<any>('');
  const [notes, setNotes] = useState<any>('');
  const [amount, setAmount] = useState<any>('');

  const [isLoading, setIsLoading] = useState<any>(false);
  const [munzeesCreated, setMunzeesCreated] = useState<any>(0);
  const [maxLimit, setMaxLimit] = useState<any>(0);
  const [monthlyLimit, setMonthlyLimit] = useState<any>(0);
  const [monthlyLimitToUse, setMonthlyLimitToUse] = useState<any>(0);  

  const handleCreate = async () => {
      const username = user?.username;

      const userMunzeesCreated = await backend?.user.userMunzeesCreated({});

      var $already_created = 0;
      if ( userMunzeesCreated ){
        $already_created = userMunzeesCreated.created;
      }

      var $max_limit = 100;
      var $monthly_limit = 100;
      var numberOfUndeployments = user!!.numberOfUndeployments;
      
      if ( new Date() < new Date('2018-10-10T00:00:00-05:00') ){ 
        $max_limit = 50;
      }

      if ( user?.premium  == 1 ){
        $max_limit = 250;
        $monthly_limit = 250;
      }

      // you shouldn't be able to get here
      if ( numberOfUndeployments > $max_limit )
      {
        setFriendlyName('');
        setAmount('');
        setNotes('');
        navigate( '/create' );
        return;
      }

      if ( new Date() > new Date( '2018-10-10T00:00:00-05:00' ) && $already_created >= $monthly_limit  )
      {
        setFriendlyName('');
        setAmount('');
        setNotes('');
        navigate( '/create' );
        return;
      }

      var $max_can_do = Math.max( 0, $max_limit - numberOfUndeployments );
      var $amount = Math.min( amount, 25 );
      if ( new Date() > new Date( '2018-10-10T00:00:00-05:00' ) )
      {
        $max_can_do = Math.min( $max_can_do, $monthly_limit - $already_created );
        $amount = Math.min( $amount, $max_can_do );
      }

      var $friendly_name = friendlyName;

      let munzeeArr : any[] = [];

      for (var $i = 1; $i <= $amount; $i++ )
      {
        if ( $amount > 1 )
        {
          $friendly_name = friendlyName + ' ' + $i;
        }
        munzeeArr.push(new Promise((resolve, reject) => {
            backend?.munzee.create({ username: username, latitude: 0, longitude: 0, group_id: 0, accuracy: 0, notes: notes, friendly_name: friendlyName, }).then(() => {
              console.log( 'success', $friendly_name );
              resolve($friendly_name);
            }).catch((error) => {
              reject(error);
            })
          })
        );        
      }


      Promise.all(munzeeArr).then((values) => {
        setFriendlyName('');
        setAmount('');
        setNotes('');
        setMunzeesCreated(1);
        setMonthlyLimitToUse($monthly_limit);
      }).catch((err) => {
        console.log(err);
      });
  }

  useEffect(() => {
    
    if ( user && !isLoading ) {
      setIsLoading(true);

      backend?.user.userMunzeesCreated({}).then((userMunzeesCreated) => {
        var $already_created = 0;
        if ( userMunzeesCreated ){
          $already_created = userMunzeesCreated.created;
        }

        var $max_limit = 25;
        var $monthly_limit = 50;
        if ( new Date() > new Date( '2018-10-10T00:00:00-05:00' ) ){ 
          $max_limit = 50;
        }

        if ( user.premium == 1 )
        {
          $max_limit = 250;
          $monthly_limit = 100;
        }

        if ( user?.numberOfUndeployments > $max_limit )
        {
          // $content['max_limit'] = 1;
          setMaxLimit(1)
        }

        if ( new Date() > new Date( '2018-10-10T00:00:00-05:00' ) )
        {
          if ( $already_created >= $monthly_limit ){ 
            // $content['monthly_limit'] = 1;
            setMonthlyLimit(1);
          }
        }

        setMonthlyLimitToUse($monthly_limit);
        setIsLoading(false);

      });
    }

  }, [user])

  return (
    <Container>
      <div className="create-screen-container">
        <PageTitle title="Create Munzee" />
        <div className="form-area">

          { munzeesCreated == 1 ? (
            <Alert
            type="info"
            align="left"
            ><b>Munzees Created!</b> Go see them on your <Link to={"/m/" + user?.username + "/undeploys/"}>undeployed munzees page</Link>. </Alert>
          ) : (
            <Alert
              type="info"
              align="left"
            >If you don't want to print your own, you can always buy high-quality stickers from our store, <b>store.freezetag.com.</b></Alert>
          )}

          { (maxLimit == 1) ? (
            <Alert
            type="error"
            align="left"
            ><b>Oh no!</b> You have reached your max number of undeployments. Start deploying so you can create more!</Alert>
          ) :
          ( monthlyLimit == 1 ) ? ( 
            <Alert
            type="error"
            align="left"
            ><b>Oh no!</b> You have reached your monthly limit of { monthlyLimitToUse } created munzees. You can create more munzees next month.</Alert>
          ) : (
            <div className="form">
              <div className="form-group">
                <label>Munzee Name:</label>
                <input value={friendlyName} onChange={e => setFriendlyName(e.target.value)} placeholder="Donut Place" />
              </div>
              <div className="form-group">
                <label>Number:</label>
                <select name="amount" value={amount} onChange={e => setAmount(e.target.value)}>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                  <option value="6">6</option>
                  <option value="7">7</option>
                  <option value="8">8</option>
                  <option value="9">9</option>
                  <option value="10">10</option>
                  <option value="11">11</option>
                  <option value="12">12</option>
                  <option value="13">13</option>
                  <option value="14">14</option>
                  <option value="15">15</option>
                  <option value="16">16</option>
                  <option value="17">17</option>
                  <option value="18">18</option>
                  <option value="19">19</option>
                  <option value="20">20</option>
                  <option value="21">21</option>
                  <option value="22">22</option>
                  <option value="23">23</option>
                  <option value="24">24</option>
                  <option value="25">25</option>
                </select>
              </div>
              <div className="form-group">
                <label>Notes:</label>
                <textarea
                  name="notes"
                  placeholder="Enter in a good description of where the munzee is located."
                  cols={40}
                  rows={10}
                  value={notes} onChange={e => setNotes(e.target.value)}
                />
              </div>
              <div className="submit-btn">
                <Button onClick={() => handleCreate()} className="btn primaryButton">Add Munzee(s)</Button>
              </div>
            </div> 
          )}       
        </div>
      </div>
    </Container>
  );
};

export default Create;
