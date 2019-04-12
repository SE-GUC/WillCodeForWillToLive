import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import classnames from 'classnames';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import red from '@material-ui/core/colors/red';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Button from '@material-ui/core/Button';
import axios from 'axios';

const styles = theme => ({
  card: {
    maxWidth: 400,
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  actions: {
    display: 'flex',
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: red[500],
  },
});

class RecipeReviewCard extends React.Component {
  state = { 
    forms: [],  
    expanded: false };

handle=(id)=>{
    console.log(id)
    axios.get(`http://localhost:3002/api/form/calculateFees/${id}`).then(res => alert("Total Fees: "+Object.values(Object.values(res)[0])[0]))
}

componentDidMount(){
    axios.get('http://localhost:3002/api/form').then(res => Object(res)).then(element => this.setState({forms:element.data}))
   }

  handleExpandClick = () => {
    this.setState(state => ({ expanded: !state.expanded }));
  };

  render() {
    const { classes } = this.props;

    return (
        <div>
            {
            this.state.forms.map((forms)=>{
                return(<div>
                    <Card className={classes.card}>
                      <CardHeader
                        avatar={
                          <Avatar aria-label="Form" className={classes.avatar}>
                            F
                          </Avatar>
                        }
                        action={
                          <IconButton>
                            <MoreVertIcon />
                          </IconButton>
                        }
                        title= {'Form' }   
                      />
                      <CardContent>
                        <Typography component="p">
                        {"Company Name : " + forms.companyName.arabic}
                        < br/>
                          {"Investor: " + forms.investorInfo.name}
                        </Typography>
                      </CardContent>
                      <CardActions className={classes.actions} disableActionSpacing>
                        <Button onClick={() =>this.handle(forms._id)}> Calculate Fees</Button>
                        <Button onClick={this.handleExpandClick} aria-expanded={this.state.expanded}>Details</Button>
                      </CardActions>
                      <Collapse in={this.state.expanded} timeout="auto" unmountOnExit>
          <CardContent>
            <Typography paragraph>
            <h3>Company Name</h3>
            {"Company Name: " + forms.companyName.arabic}
            < br/>
            {"Company Name (English): " + forms.companyName.english}
            < br/>
            <h3>Company Legal Info</h3>
            {"Regualting Law: " + forms.companyLegalInfo.regulatingLaw}
            < br/>
            {"Company Type: " + forms.companyLegalInfo.companyType}
            < br/>
            <h3>HQ Info</h3>
            {"Governorate: " + forms.hqInfo.governorate}
            < br/>
            {"City: " + forms.hqInfo.city}
            < br/>
            {"Telephone: " + forms.hqInfo.telephone}
            < br/>
            {"Fax: " + forms.hqInfo.fax}
            < br/>
            <h3>Investor Info</h3>
            {"Capital Currency: " + forms.investorInfo.capitalCurrency}
            < br/>
            {"Capital: " + forms.investorInfo.capital}
            < br/>
            {"Investor: " + forms.investorInfo.name}
            < br/>
            {"Type: " + forms.investorInfo.type}
            < br/>
            {"Gender: " + forms.investorInfo.gender}
            < br/>
            {"Nationality: " + forms.investorInfo.nationality}
            < br/>
            {"ID Type: " + forms.investorInfo.idType}
            < br/>
            {"ID Number: " + forms.investorInfo.idNumber}
            < br/>
            {"Birth Date: " + forms.investorInfo.birthdate}
            < br/>
            {"Telephone: " + forms.investorInfo.telephone}
            < br/>
            {"Fax: " + forms.investorInfo.fax}
            < br/>
            {"Email: " + forms.investorInfo.email}
            < br/>
            {"Address: " + forms.investorInfo.address}
            </Typography>
          </CardContent>
        </Collapse>
                    </Card>
                    </div>)
            })
            }
        
      {/* <div>
      <Card className={classes.card}>
        <CardHeader
          avatar={
            <Avatar aria-label="Recipe" className={classes.avatar}>
              F
            </Avatar>
          }
          action={
            <IconButton>
              <MoreVertIcon />
            </IconButton>
          }
          title="Shrimp and Chorizo Paella"
          subheader="September 14, 2016"
        />
        <CardContent>
          <Typography component="p">
            This impressive paella is a perfect party dish and a fun meal to cook together with your
            guests. Add 1 cup of frozen peas along with the mussels, if you like.
          </Typography>
        </CardContent>
        <CardActions className={classes.actions} disableActionSpacing>
          <Button onClick={this.handle}> Calculate Fees</Button>
        </CardActions>
        <Collapse in={this.state.expanded} timeout="auto" unmountOnExit>
          <CardContent>
            <Typography paragraph>Method:</Typography>
            <Typography paragraph>
              Heat 1/2 cup of the broth in a pot until simmering, add saffron and set aside for 10
              minutes.
            </Typography>
            <Typography paragraph>
              Heat oil in a (14- to 16-inch) paella pan or a large, deep skillet over medium-high
              heat. Add chicken, shrimp and chorizo, and cook, stirring occasionally until lightly
              browned, 6 to 8 minutes. Transfer shrimp to a large plate and set aside, leaving
              chicken and chorizo in the pan. Add pimentón, bay leaves, garlic, tomatoes, onion,
              salt and pepper, and cook, stirring often until thickened and fragrant, about 10
              minutes. Add saffron broth and remaining 4 1/2 cups chicken broth; bring to a boil.
            </Typography>
            <Typography paragraph>
              Add rice and stir very gently to distribute. Top with artichokes and peppers, and cook
              without stirring, until most of the liquid is absorbed, 15 to 18 minutes. Reduce heat
              to medium-low, add reserved shrimp and mussels, tucking them down into the rice, and
              cook again without stirring, until mussels have opened and rice is just tender, 5 to 7
              minutes more. (Discard any mussels that don’t open.)
            </Typography>
            <Typography>
              Set aside off of the heat to let rest for 10 minutes, and then serve.
            </Typography>
          </CardContent>
        </Collapse>
      </Card>
      </div> */}
    
      </div>
    );
  }
}

RecipeReviewCard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(RecipeReviewCard);