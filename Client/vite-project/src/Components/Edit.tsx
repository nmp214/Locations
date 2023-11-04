import { Button, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, TextField } from "@mui/material"
import ImageUploader from "./ImageUploader"
import { useState } from "react";
import AddIcon from '@mui/icons-material/Add';
import { editItem, getItem, updateItem } from "../Services/service";
import { addLocation } from "../Services/CRUD copy";
import SaveAltIcon from '@mui/icons-material/SaveAlt';
import { useLocation } from "react-router-dom";
import { endPoint } from "../Services/config";
import { location } from "../Services/location";

const Edit: React.FC = () => {
    const location = useLocation();
    const [newLocation, setPropsFromParent] = useState(location.state && location.state.location);
    const isTemp = location.state && location.state.isTemp;
    console.log("*****************************************", newLocation.name);
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
    const [isAdmin, setIsAdmin] = useState(false);

    getItem(`${endPoint}/location/isAdmin`).then(res => {
        setIsAdmin(res.data);
        console.log("isAdmin? ", res.data);
      });
    // console.log(props);
    // const { propName, propAddress, propImage, propImageUrl, propDescription, propArea, propLikes} = props.location.state;


    // const [imageUrl, setImageUrl] = useState('');
    // const [location, setLocation] = useState({ name: '', address: '', image: image, description: '', imageUrl: '', area: '', likes: 0, date: Date.now() });

    const handleChange = (event: SelectChangeEvent) => {
        setArea(event.target.value as string);
    }

    const handleFile = (file: File) => {
        console.log('handleFile ', file);
        setFile(file);
        setImage(file.name);
    }

    const add = () => {
        addLocation(isAdmin, 0, name, address, image, description, area, likes, [], file!);
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
            // image: image,
            imageUrl: imageUrl,
            area: area,
            likes: likes,
            date: date,
            imagesList: imagesList,
            information: ''
        }
        updateItem(location, `${endPoint}/location`);
    }

    return (<>
        <FormControl fullWidth sx={{ m: 3 }} dir='rtl' >
            שינוי לוקיישן
            <TextField id="outlined-basic" label="שם" value={name} variant="outlined" onChange={(e) => setName(e.target.value)} required />
            <br />
            <TextField id="outlined-basic" label="כתובת" value={address} variant="outlined" onChange={(e) => setAddress(e.target.value)} />
            <br />
            <TextField id="outlined-basic" label="תאור" value={description} variant="outlined" onChange={(e) => setDescription(e.target.value)} />
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
            <ImageUploader handleFile={handleFile} />
            {isTemp && <Button variant="contained" startIcon={<AddIcon />} onClick={() => add()}>הוספה לרשימת הלוקיישנים</Button> || ''}
            {!isTemp && <Button variant="contained" startIcon={<SaveAltIcon />} onClick={() => save()}>שמירה</Button> || ''}
        </FormControl>
    </>)
}

export default Edit