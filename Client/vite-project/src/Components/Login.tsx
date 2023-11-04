import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { addItem, response } from "../Services/service";
import { endPoint } from "../Services/config";
import { setCookie } from "../Services/cookies";
import { Box, Card, CardContent, CardHeader, Grid, Paper, TextField } from "@mui/material";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { infoAlert, successAlert } from "../Services/alerts";
import img from '../assets/camera.jpg';

const Login: React.FC = () => {
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const [shouldReload, setShouldReload] = useState(true);

    const login = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const user = {
            name: name,
            password: password
        }
        addItem(user, `${endPoint}/auth`).then(res => {
            if (shouldReload) {
                successAlert(`שלום ${name} שמחים שנכנסת ללוקיישן`); // Show the alert before the page reloads
                setTimeout(() => {
                    window.location.reload(); // Reload the page after 10 seconds
                }, 3000);
            }
            setCookie("token", res.data.access_token, 14);
        })
            .catch(() => {
                console.log('catch');
                infoAlert('גם אנחנו היינו רוצים שתכנס, אך נראה !שעוד לא נרשמת. מוזמן לעשות זאת');
            });
    }

    useEffect(() => {
        // function initMap() {
        //     console.log('initMap');
        //     const { Map } = window.google.maps.importLibrary("maps") as window.google.maps.MapsLibrary;
        //     // map = new Map(document.getElementById("map") as HTMLElement, {
        //     const mapElement = document.getElementById("map")!;
        //     const map = new window.google.maps.Map(mapElement, {
        //         center: { lat: -34.397, lng: 150.644 },
        //         zoom: 8,
        //     });
        // }
        // if (window.google && window.google.maps) {
        //   initMap();
        // }
        // else {
        //   const script = document.createElement('script');
        //   script.src = 'https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&callback=initMap';
        //   script.async = true;
        //   document.body.appendChild(script);
        // }
    }, []);


    // new
    const [query, setQuery] = useState('');
    const [results, setResults] = useState<{ document: string }[]>([]);

    const handleSearch = () => {
        response(query, `${endPoint}/location/find-similar`)
            .then(res => {
                console.log(res);
                if (res.status === 200) {
                    setResults(res.data.similarDocuments);
                    console.log(res.data.similarDocuments);
                } else {
                    console.error('Request failed');
                }
            })
            .catch(error => console.error('Error:', error));
    }

    return (
        <>
            <Paper
                sx={{
                    // backgroundImage: `url(https://firebasestorage.googleapis.com/v0/b/imglocations.appspot.com/o/images%2F%D7%9E%D7%A6%D7%9C%D7%9E%D7%94.jpg?alt=media&token=6e560377-d581-435e-84ab-881d352e91d2)`,
                    backgroundImage: `url(${img})`,
                    backgroundSize: 'cover',
                    backgroundRepeat: 'no-repeat',
                    width: '100%',
                    height: '100%',
                    position: 'absolute',
                    top: 30,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    zIndex: -1,
                }}
            >
            </Paper>

            <Card sx={{ width: 300, height: 546, marginTop: 4.5, direction: 'rtl', padding: 10, backgroundColor: 'rgba(255, 255, 255, 0.9)' }}>
                <CardHeader title='כניסה' />
                <CardContent>
                    <Box dir='rtl' component="form" onSubmit={login}>
                        <Grid container justifyContent="center" spacing={2}>
                            {/* <Grid sx={{ flexGrow: 1 }} container spacing={2}> */}
                            <Grid item xs={20}>
                                {/* </Grid>  */}
                                <TextField
                                    dir="rtl"
                                    required
                                    id="outlined-required"
                                    label="שם"
                                    onChange={e => setName(e.target.value)}
                                />
                                <br /><br />
                                <TextField
                                    dir="rtl"
                                    type="password"
                                    required
                                    id="outlined-required"
                                    label="סיסמה"
                                    onChange={e => setPassword(e.target.value)}
                                />
                            </Grid>
                            <br />
                            <div>
                                <button>אישור</button>
                                <ToastContainer />
                            </div>
                        </Grid>
                    </Box>
                </CardContent>
                <button onClick={() => navigate('/signup')}>חדש?<br />
                    הרשם כאן!
                </button>
            </Card>
            <div>
                <input
                    type="text"
                    placeholder="Search..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                />
                <button onClick={handleSearch}>Search</button>

                <ul>
                    {results.map((result, index) => (
                        <li key={index}>{result.document}</li>
                    ))}
                </ul>
            </div>
            <div id='map' style={{ height: '400px' }}></div>

            {/* <ImageDownloader /> */}
        </>
    );
}

export default Login;