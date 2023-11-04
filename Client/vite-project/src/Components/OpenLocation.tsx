import * as React from 'react';
import Card from '@mui/material/Card';
import { CardContent, CardHeader, Grid, ImageList, ImageListItem } from '@mui/material';
// import { useState } from 'react';
import { useLocation } from 'react-router-dom';

const OpenLocation: React.FC = () => {
    console.log('Open Location');
    const location = useLocation();
    const description = location.state && location.state.description;
    const address = location.state && location.state.address;
    const area = location.state && location.state.area;
    const name = location.state && location.state.name;
    const imagesList = location.state && location.state.imagesList;
    console.log(name + ' ' + area + ' ' + address);
    // const [images, setImages] = useState(props.imagesList);
    return (
        <Card sx={{ width: 1000, height: 600, margin: 10 }}>
            <Grid container direction={'row-reverse'}>
                <Grid>
                    <CardHeader
                        title={name}
                        subheader={address + ' ' + area}>
                    </CardHeader>
                    <CardContent>
                    </CardContent>
                </Grid>
                <Grid>
                    <ImageList sx={{ width: 600, height: 580 }} variant="masonry" cols={3} gap={8} >
                        {/* sx={{ width: 500, height: 450 }} cols={3} rowHeight={164} */}
                        {imagesList.map((item: any) => (
                            <ImageListItem key={item} sx={{ maxWidth: 400, maxHeight: 500 }}>
                                <img
                                    src={`${item}?w=248&fit=crop&auto=format`}
                                    srcSet={`${item}?w=248&fit=crop&auto=format&dpr=2 2x`}
                                    loading="lazy"
                                />
                            </ImageListItem>
                        ))}
                    </ImageList>
                </Grid>
            </Grid>
        </Card>
    );
}

const itemData = [
    {
        img: 'https://firebasestorage.googleapis.com/v0/b/imglocations.appspot.com/o/images%2F%D7%A4%D7%90%D7%A8%D7%A7%20%D7%94%D7%96%D7%94%D7%91.jpg?alt=media&token=866a5cc8-74b3-41a7-92e1-70433c3a0afa',
        title: 'Bed',
    },
    {
        img: 'https://firebasestorage.googleapis.com/v0/b/imglocations.appspot.com/o/images%2F%D7%A4%D7%90%D7%A8%D7%A7%20%D7%94%D7%99%D7%A8%D7%93%D7%9F.jpg?alt=media&token=383d9b34-fe3a-4b7e-916b-f055c21aabf4',
        title: 'Books',
    },
    {
        img: 'https://firebasestorage.googleapis.com/v0/b/imglocations.appspot.com/o/images%2F%D7%A2%D7%99%D7%9F%20%D7%97%D7%9E%D7%93.jpg?alt=media&token=7f852698-b46f-46f3-b53b-2fbb332e5ea5',
        title: 'Sink',
    },
    {
        img: 'https://firebasestorage.googleapis.com/v0/b/imglocations.appspot.com/o/images%2FIMG_8563.JPG?alt=media&token=fa6a2c64-5ed8-4fd7-b71d-c88e69b19b84',
        title: 'Kitchen',
    },
];
export default OpenLocation