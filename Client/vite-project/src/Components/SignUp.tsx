import { useState } from "react";
import { addItem } from "../Services/service";
import { endPoint } from "../Services/config";
import { Box, Card, CardContent, CardHeader, Grid, Paper, TextField } from "@mui/material";
import { ToastContainer } from 'react-toastify';
import { errorAlert, successAlert } from "../Services/alerts";
import 'react-toastify/dist/ReactToastify.css';
import img from '../assets/camera.jpg';

const SignUp: React.FC = () => {
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');

    const signup = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const user = {
            name: name,
            password: password
        }
        addItem(user, `${endPoint}/user`)
            .then(() => successAlert(user.name + ' נוספת בהצלחה לרשימת המשתמשים '))
            .catch(() => errorAlert('המשתמש כבר קיים.'));
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
            <Card sx={{ width: 300, height: 546, direction: 'rtl', padding: 10, backgroundColor: 'rgba(255, 255, 255, 0.9)' }}>
                <CardHeader title="הרשמה" />
                <CardContent>
                    <Box component="form" onSubmit={signup}>
                        <Grid container justifyContent="center" spacing={2}>

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
                                <button>כניסה</button>
                                <ToastContainer />
                            </div>
                        </Grid>
                    </Box>
                </CardContent>
            </Card>
        </>
    );
}

export default SignUp;