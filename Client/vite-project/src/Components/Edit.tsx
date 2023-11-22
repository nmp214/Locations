import React from 'react';
import { Box, Button, FormControl, Grid, IconButton, ImageList, ImageListItem, InputLabel, MenuItem, Select, SelectChangeEvent, SpeedDial, SpeedDialAction, SpeedDialIcon, TextField } from "@mui/material"
import ImageUploader from "./ImageUploader"
import { useState } from "react";
import AddIcon from '@mui/icons-material/Add';
import { editItem, getItem, updateItem } from "../Services/service";
import { addLocation } from "../Services/CRUD copy";
import SaveAltIcon from '@mui/icons-material/SaveAlt';
import { useLocation } from "react-router-dom";
import { endPoint } from "../Services/config";
import { location, update } from "../Services/location";
import img from '../assets/camera.jpg';
import CardMedia from '@mui/material/CardMedia';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { upload } from '../create-reference/storage';
import { successAlert } from '../Services/alerts';

const Edit: React.FC = () => {
    const location = useLocation();
    const [newLocation, setPropsFromParent] = useState(location.state && location.state.location);
    const isTemp = location.state && location.state.isTemp;
    console.log("***********************", newLocation.imageUrl);
    const [file, setFile] = useState<File | null>(null)
    const [name, setName] = useState(newLocation.name);
    const [address, setAddress] = useState(newLocation.address);
    const [image, setImage] = useState(newLocation.image);
    const [imageUrl, setImageUrl] = useState(newLocation.imageUrl);
    const [imagesList, setImagesList] = useState(newLocation.imagesList);
    const [description, setDescription] = useState(newLocation.description);
    const [area, setArea] = useState(newLocation.area);
    const [likes, setLikes] = useState(1);
    const [date, setDate] = useState(newLocation.date);
    const [pointLat, setPointLat] = useState(newLocation.point.lat);
    const [pointLng, setPointLng] = useState(newLocation.point.lng);
    const [isAdmin, setIsAdmin] = useState(false);

    getItem(`${endPoint}/location/isAdmin`).then(res => {
        setIsAdmin(res.data);
        console.log("isAdmin? ", res.data);
    });

    const handleChange = (event: SelectChangeEvent) => {
        setArea(event.target.value as string);
    }

    const editImage = () => {

    }

    const deleteImage = (index: number) => {
        console.log('index: ', index, ' length: ', imagesList.length);
        console.log(imagesList[index]);
        let tempList = imagesList;
        tempList.splice(index, 1);
        // imagesList.splice(index, 1);
        console.log(tempList);
        setImagesList(tempList);
    }

    const add = () => {
        addLocation(isAdmin, 0, name, address, imageUrl, description, area, likes, imagesList, pointLat, pointLng, file!);
        setName('');
        setAddress('');
        setImage('');
        setDescription('');
        setArea('');
        setLikes(1);
        setDate(Date.now());
    }

    const save = () => {
        const location: location = {
            id: newLocation.id,
            name: name,
            address: address,
            description: description,
            imageUrl: imageUrl,
            area: area,
            likes: likes,
            date: date,
            imagesList: imagesList,
            point: {
                lat: pointLat,
                lng: pointLng
            },
            information: ''
        }
        const update: update = {
            item: location,
            isTemp: isTemp
        }
        updateItem(update, `${endPoint}/location`).then(() => successAlert('השינויים נשמרו בהצלחה'));
    }

    const handleEditClick = () => {
        // Trigger click event on the hidden file input
        if (fileInputRefImage.current) {
            fileInputRefImage.current.click();
        }
    };
    const handleAddClick = () => {
        // Trigger click event on the hidden file input
        if (fileInputRefList.current) {
            fileInputRefList.current.click();
        }
    };

    const fileInputRefImage = React.createRef<HTMLInputElement>();
    const fileInputRefList = React.createRef<HTMLInputElement>();
    // event: React.ChangeEvent<HTMLInputElement>

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>, id: number) => {
        console.log('in handleFileChange ', event);
        const file = event.target.files && event.target.files[0];
        if (file) {
            console.log(file);
            upload(file)
                .then((response) => {
                    console.log('response: ', response);
                    if (id === 1) {
                        setImageUrl(response);
                    }
                    else {
                        const tempList = [...imagesList, response];
                        console.log('tempList: ', tempList);
                        setImagesList(tempList);
                    }
                })
        }
    };

    return (
        <div>
            <br />
            <h3>שינוי לוקיישן</h3>
            <br />
            <Grid sx={{ flexGrow: 1 }} container spacing={4}>
                <Grid>
                    <h5>תמונה בתצוגה</h5>
                    <div>
                        <CardMedia
                            component="img"
                            height="250"
                            image={imageUrl}
                            alt="התמונה לא עלתה"
                        />
                        {/* <IconButton onClick={() => editImage()}> <EditIcon /></IconButton> */}

                        <div>
                            <input
                                id='0'
                                type="file"
                                ref={fileInputRefImage}
                                style={{ display: 'none' }}
                                onChange={(event: React.ChangeEvent<HTMLInputElement>) => handleFileChange(event, 1)}
                            />
                            <div onClick={handleEditClick}>
                                <IconButton> <EditIcon /></IconButton>
                            </div>
                        </div>
                    </div>
                    <br />
                    <h5>רשימת תמונות</h5>
                    <ImageList sx={{ width: 500, height: 580 }} variant="masonry" cols={3} gap={8} >
                        {imagesList.map((item: any, index: number) => (
                            <ImageListItem key={item} sx={{ maxWidth: 400, maxHeight: 500 }}>
                                <img
                                    src={`${item}?w=248&fit=crop&auto=format`}
                                    srcSet={`${item}?w=248&fit=crop&auto=format&dpr=2 2x`}
                                />
                                <IconButton onClick={() => deleteImage(index)}> <DeleteIcon /></IconButton>
                            </ImageListItem>
                        ))}
                        <div>
                            <input
                                type="file"
                                ref={fileInputRefList}
                                style={{ display: 'none' }}
                                onChange={(event: React.ChangeEvent<HTMLInputElement>) => handleFileChange(event, 0)}
                            />
                            <div onClick={handleAddClick}>
                                <IconButton>  <AddIcon /></IconButton>
                            </div>
                        </div>
                    </ImageList>
                </Grid>
                <FormControl sx={{ m: 3, width: 400 }} dir='rtl' >
                    <TextField id="outlined-basic" label="שם" value={name} variant="outlined" onChange={(e) => setName(e.target.value)} required />
                    <br />
                    <TextField id="outlined-basic" label="כתובת" value={address} variant="outlined" onChange={(e) => setAddress(e.target.value)} />
                    <br />
                    <TextField id="outlined-basic" label="תאור" value={description} variant="outlined" multiline onChange={(e) => setDescription(e.target.value)} />
                    <br />
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">אזור</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={area}
                            label="area"
                            onChange={handleChange}
                        >
                            <MenuItem value="north">צפון</MenuItem>
                            <MenuItem value="center">מרכז</MenuItem>
                            <MenuItem value="YehudaAndShomron">יהודה ושומרון</MenuItem>
                            <MenuItem value="Jerusalem">ירושלים והסביבה</MenuItem>
                            <MenuItem value="south">דרום</MenuItem>
                        </Select>
                    </FormControl>
                    <br />
                    <label>מיקום על המפה</label>
                    <br />
                    <div style={{ display: 'flex', padding: 20, justifyContent: 'space-evenly' }}>
                        <FormControl >
                            <TextField id="outlined-basic" value={pointLat} label="lat" placeholder="alt" variant="outlined" onChange={(e) => setPointLat(parseFloat(e.target.value))} />
                        </FormControl>
                        <FormControl >
                            <TextField id="outlined-basic" value={pointLng} label="lng" placeholder="lng" variant="outlined" onChange={(e) => setPointLng(parseFloat(e.target.value))} />
                            <br /> </FormControl>
                    </div>
                    {isTemp && <Button variant="contained" startIcon={<AddIcon />} onClick={() => add()}>הוספה לרשימת הלוקיישנים</Button> || ''}
                  <Button variant="contained" startIcon={<SaveAltIcon />} onClick={() => save()}>שמירה</Button>
                </FormControl>
            </Grid>
        </div>)
}

export default Edit