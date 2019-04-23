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

function SimpleCardA(props) {
  const { classes } = props;
  const bull = <span className={classes.bullet}>•</span>;

  return (
    <Card className={classes.card}>
      <CardContent>
        <Typography className={classes.title} color="textSecondary" gutterBottom>
        نقدم لك خدمات جيدة!
        </Typography>
        <Typography variant="h5" component="h2">
        {bull}مرحبا{bull}
           
        </Typography>
        <Typography className={classes.pos} color="textSecondary">
        
        </Typography>
        <Typography component="p">
          
          <br />
          {'يرجى اختيار تفضيلاتك من خلال الأزرار التالية'}
        </Typography>
      </CardContent>
      <CardActions>
      <Button variant="contained" color="primary" className={classes.button} onClick={()=>{
        document.location.href = '/loginemployeeA'
      }}>
      تسجيل الدخول كموظف
      </Button>
      <Button variant="contained" color="secondary" className={classes.button} onClick={()=>{
        document.location.href = '/loginemployeeA'
      }}>
      تسجيل الدخول كمستثمر
      </Button>
      <Button variant="contained" color="primary" className={classes.button} onClick={()=>{
        document.location.href = '/signupA'
      }}>
      تسجيل
      </Button>
      <Button variant="contained" color="secondary" className={classes.button} onClick={()=>{
        document.location.href = '/unregisteredUserA'
      }}>
       اظهار جميع الشركات
      </Button>
      </CardActions>
    </Card>
  );
}

SimpleCardA.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SimpleCardA);
