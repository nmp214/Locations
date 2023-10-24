import { ChangeEvent, useState } from "react";
import ImageUploader from "./ImageUploader";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { Button, TextField } from "@mui/material";
import { isToken } from "../Services/cookies";
import { addLocation } from "../Services/CRUD";
import { Area } from "../Services/location";
import SendIcon from '@mui/icons-material/Send';
import { getItem } from "../Services/service";
import { endPoint } from "../Services/config";

const Add: React.FC = () => {
  const [file, setFile] = useState<Array<File> | null>(null)
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [image, setImage] = useState('')
  const [description, setDescription] = useState('');
  const [area, setArea] = useState('');
  const [likes, setLikes] = useState(1);
  const [date, setDate] = useState(Date.now());
  const [isAdmin, setIsAdmin] = useState(false);

  const keys = Object.keys(Area);
  let values = Object.values(Area);
  values = values.filter(value => value != Area.allEarth);
  getItem(`${endPoint}/location/isAdmin`).then(res => {
    setIsAdmin(res.data);
    console.log("isAdmin? ", res.data);
  });
  const add = (event: React.FormEvent) => {
    event.preventDefault();
    if (isToken()) {
      // addLocation(isAdmin, name, address, image, description, area, likes, 0, '', file!);
      // console.log(file?.name, ' ', image);
      addLocation(isAdmin, name, address, image, description, area, likes, 0, '');
      setName('');
      setAddress('');
      setImage('');
      setDescription('');
      setArea('');
      setLikes(1);
      setDate(Date.now());
    }
  }

  const handleChange = (event: SelectChangeEvent) => {
    setArea(event.target.value as string);
  }

  const handleFile = (files: Array<File>) => {
    console.log('handleFile ', files);
    setFile(file);
    // setImage(file.name);
  }

  const [file2, setfile] = useState('');

  const f=(e: ChangeEvent<HTMLButtonElement>)=>{
    console.log(file2);
    console.log(e);
  }

  return (<>
    <h1>הוספת לוקיישן</h1>
    <form dir="rtl">
      <FormControl fullWidth>
        <TextField
          required
          dir="rtl"
          id="outlined-basic"
          label="שם" variant="outlined"
          onChange={(e) => setName(e.target.value)} />
        <br /> </FormControl>
      <FormControl fullWidth>
        <TextField id="outlined-basic" label="כתובת" variant="outlined" onChange={(e) => setAddress(e.target.value)} required />
        <br /> </FormControl>
      <FormControl fullWidth>
        <TextField id="outlined-basic" label="תאור" variant="outlined" onChange={(e) => setDescription(e.target.value)} />
        <br />  </FormControl>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">אזור</InputLabel>
        <Select
          required
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={area}
          label="area"
          onChange={handleChange}
        >
          {values.map((value, index) => <MenuItem key={index} value={keys[index]}>{value}</MenuItem>)}
        </Select>
      </FormControl>
      <FormControl fullWidth>
        <ImageUploader handleFile={handleFile} required/>
      </FormControl>
      <Button type="submit" variant="contained" endIcon={<SendIcon />}>שליחה</Button>
    </form>
  </>);
}

export default Add;