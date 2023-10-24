import { errorAlert, successAlert } from "./alerts";
import { endPoint } from "./config";
import { addItem, deleteItem } from "./service";
import { uploadFile } from "./upload";

export const addLocation = (isAdmin: boolean, name: string, address: string, image: string, description: string, area: string, likes: number, id: number, imageUrl?: string, file?: File) => {
    console.log("name: ", name, "image: ", file?.name);
    if (!isAdmin) {
        console.log('!isAdmin');
        if (file) {
            uploadFile(file)
                .then((response) => {
                    console.log('response: ', response);
                    const imageUrl = response!;
                    return imageUrl;
                })
                .then((data) => {
                    const location2 = {
                        name: name,
                        address: address,
                        image: image,
                        imageUrl: data,
                        description: description,
                        area: area,
                        likes: likes,
                        date: Date.now()
                    }
                    // setLocation({ name, address, image, imageUrl, description, area, likes,date: Date.now() });
                    return location2;
                })
                .then((data) => {
                    console.log('data: ', data);
                    console.log('אני נמצא עכשיו לפני הפונקציה שמכניסה את הלוקיישן');
                    addItem(data, `${endPoint}/location`)
                        .then(() => {
                            console.log('---------');
                            uploadFile(file);
                        })
                        .then(() => console.log('location added successfully'))
                        .catch(() => console.log('error!!!!!!'));
                });
        }
        else {
            console.log('!file');
            const location = {
                name: name,
                address: address,
                image: image,
                imageUrl: imageUrl,
                description: description,
                area: area,
                likes: likes,
                date: Date.now(),
                // imagesList: imagesList
            };
            console.log('addItem', location);
            addItem(location, `${endPoint}/location`).then(() => {
                successAlert('הלוקיישן נוסף בהצלחה');
            });
        }

    } else {
        const location = {
            name: name,
            address: address,
            image: image,
            imageUrl: imageUrl,
            description: description,
            area: area,
            likes: likes,
            date: Date.now(),
            // imagesList: imagesList
        };
        const del = {
            id: id,
            isTemp: true
        }
        console.log('addItem', location);
        addItem(location, `${endPoint}/location`).then(() => {
            successAlert('הלוקיישן נוסף בהצלחה');
            deleteItem(del, `${endPoint}/location/delete`).then(() => { successAlert('הלוקיישן נמחק בהצלחה'); });
        })
            .catch(() => { errorAlert('ארעה שגיאה. נסה שנית') })
    }
}

