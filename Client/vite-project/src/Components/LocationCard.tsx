import * as React from 'react';
import { useState } from "react";
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import { deleteItem, editItem, getItem } from '../Services/service';
import { endPoint } from '../Services/config';
import { isToken } from '../Services/cookies';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { addLocation } from '../Services/CRUD';
import { useNavigate } from 'react-router-dom';
import { errorAlert, successAlert } from '../Services/alerts';

interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
}

const ExpandMore = styled((props: ExpandMoreProps) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

const LocationCard: React.FC<any> = (props) => {
  console.log(props.location);
  const [expanded, setExpanded] = React.useState(false);
  const [likes, setLikes] = useState(props.location.likes);
  const [isAdmin, setIsAdmin] = useState(false);
  const [shouldReload, setShouldReload] = useState(true);

  const url = props.location.imageUrl;
  const navigate = useNavigate();
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  const propsId = props.location.id;
  getItem(`${endPoint}/location/isAdmin`).then(res => {
    setIsAdmin(res.data);
    console.log("isAdmin? ", res.data);
  });
  const addLike = (id: number) => {
    if (isToken())
      editItem(id, `${endPoint}/location/addLike`)
        .then(response => {
          console.log(response.data);
          setLikes(likes + 1);
        })
        .catch(() => console.log('unAthorize'));
    else
      errorAlert('אינך משתמש רשום');
  }
  const add = () => {
    addLocation(props.location.name, props.location.address, props.location.image, props.location.description, props.location.area, props.location.likes, propsId, props.location.imageUrl);
  }

  const edit = () => {
    console.log(props.location);
    // <Edit />
    navigate('/edit', { state: { isTemp: props.isTemp, location: props.location } });
  }

  const del = () => {
    console.log('isTemp', props.isTemp);
    console.log('del');
    const del = {
      id: propsId,
      isTemp: props.isTemp
    }
    deleteItem(del, `${endPoint}/location/delete`).then(() => {
      console.log('deleted successfully');
      if (shouldReload) {
        window.location.reload();
        successAlert('לוקיישן זה הוסר בהצלחה');
      }
    });
  }

  const open = () => {
    console.log(props.location.imagesList.length);
    if (props.location.imagesList.length > 0) {
      console.log('locationCard', props.location.address);
      props.location.imagesList.map((image: string) => console.log(image));
      navigate('/openLocation', { state: { name: props.location.name, address: props.location.address, area: props.location.area, imagesList: props.location.imagesList } });
    }
  }

  return (
    <Card sx={{ width: 330, margin: 4 }}>
      <CardHeader
        action={
          <>
            {isAdmin && <IconButton id={propsId.toString()} onClick={() => edit()}> <EditIcon /></IconButton> || ''}
            {isAdmin && <IconButton id={propsId.toString()} onClick={() => add()}> <AddIcon /></IconButton> || ''}
            {isAdmin && <IconButton id={propsId.toString()} onClick={() => del()}> <DeleteIcon /></IconButton> || ''}
          </>
        }
        title={props.location.name}
        subheader={props.location.address}
      />
      <div>
        {isToken() && <IconButton onClick={() => { addLike(propsId) }}><ThumbUpOffAltIcon /></IconButton>
          || <IconButton disabled><ThumbUpOffAltIcon /></IconButton>}
        <h5>{likes}</h5>
      </div>
      <CardMedia
        onClick={() => { open() }}
        component="img"
        height="194"
        image={url}
        alt="התמונה לא עלתה"
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {props.location.description}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
        </IconButton>
        <IconButton aria-label="share">
        </IconButton>
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
        </ExpandMore>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
      </Collapse>
    </Card>
  );
}

export default LocationCard