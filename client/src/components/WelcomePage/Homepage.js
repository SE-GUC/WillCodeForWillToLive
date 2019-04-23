import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const styles = {
  card: {
    minWidth: 275,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
};

function SimpleCard(props) {
  const { classes } = props;
  const bull = <span className={classes.bullet}>•</span>;

  return (
    <div>
    <Card className={classes.card}>
      <CardContent>
        <Typography className={classes.title} color="textSecondary" gutterBottom>
          Providing you fine services!
        </Typography>
        <Typography variant="h5" component="h2">
        {bull}WELCOME{bull}
           
        </Typography>
        <Typography className={classes.pos} color="textSecondary">
        
        </Typography>
        <Typography component="p">
          
          <br />
          {'kindly pick your prefrences through the following buttons'}
        </Typography>
      </CardContent>
      </Card>
      <Card>
      <CardActions>
      <CardContent>
      <Typography variant="h5" component="h2">Log in as an employee </Typography>
      <br />
      <Button variant="contained" color="primary" className={classes.button} onClick={()=>{
        document.location.href = '/loginemployee'
      }}>
        Click Here
      </Button>
      </CardContent>
      </CardActions>
      </Card>
      <Card>
      <CardActions>
      <CardContent>
      <Typography variant="h5" component="h2">Log in as investor </Typography>
      <br />
      <Button variant="contained" color="secondary" className={classes.button} onClick={()=>{
        document.location.href = '/loginemployee'
      }}>
        Click Here
      </Button>
      </CardContent>
      </CardActions>
      </Card>
      <Card>
      <CardActions>
      <CardContent>
      <Typography variant="h5" component="h2">SIGN UP </Typography>
      <br />
      <Button variant="contained" color="primary" className={classes.button} onClick={()=>{
        document.location.href = '/signup'
      }}>
      Click Here
      </Button>
      </CardContent>
      </CardActions>
      </Card>
      <Card>
      <CardActions>
      <CardContent>
      <Typography variant="h5" component="h2">Show all Companies </Typography>
      <br />
      <Button variant="contained" color="secondary" className={classes.button} onClick={()=>{
        document.location.href = '/unregisteredUser'
      }}>
       Click Here
      </Button>
      </CardContent>
      </CardActions>
      </Card>
      </div>
  );
}

SimpleCard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SimpleCard);
