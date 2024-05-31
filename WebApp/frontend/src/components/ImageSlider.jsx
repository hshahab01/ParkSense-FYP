import React, { useState, useEffect, useRef } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { initializeApp } from 'firebase/app';
import { getStorage, ref, getDownloadURL } from 'firebase/storage';
import firebaseConfig from '../constants/firebaseConfig';
import Button from '@mui/material/Button';
import './ImageSlider.css';

const ImageSlider = ({ avatarCount, onImageSelect }) => {
    const app = initializeApp(firebaseConfig);
    const storage = getStorage(app, "gs://parksense-82db2.appspot.com");
    const [avatarUrls, setAvatarUrls] = useState([]);
    const jwtToken = localStorage.getItem("token");
    const [payload] = jwtToken.split('.').slice(1, 2);
    const decodedPayload = JSON.parse(atob(payload.replace(/-/g, '+').replace(/_/g, '/')));
    const gender = decodedPayload.avatar % 2 === 0 ? 2 : 1;
    const [selectedImage, setSelectedImage] = useState(null);
    const [colorMode, setColorMode] = useState(sessionStorage.getItem("colorMode"));
    
    let sliderRef = useRef(null);

    const next = () => {
        sliderRef.slickNext();
    };

    const previous = () => {
        sliderRef.slickPrev();
    };

    const handleSelectImage = (image) => {
        const url = image.substring(image.lastIndexOf('/') + 1);
        const parts = url.split('?');
        const fileNameWithExtension = parts[0].split('%2F')[1];
        const fileNameWithoutExtension = fileNameWithExtension.split('.')[0];
        setSelectedImage(image);
        onImageSelect(fileNameWithoutExtension);
    };


    useEffect(() => {
        const fetchAvatars = async () => {
            const urls = [];
            for (let i = gender; i <= avatarCount; i += 2) {
                const filePath = `avatars/${i}.jpg`;
                const imageRef = ref(storage, filePath);
                try {
                    const url = await getDownloadURL(imageRef);
                    urls.push(url);
                } catch (error) {
                    console.error("Error getting download URL:", error);
                }
            }
            setAvatarUrls(urls);
        };

        fetchAvatars();
    }, [avatarCount, gender, storage]);

    const colorModeFromSessionStorage = sessionStorage.getItem("colorMode");

    useEffect(() => {
        setColorMode(colorModeFromSessionStorage);
    }, [colorModeFromSessionStorage]);


    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        arrows: false,
        slidesToScroll: 1,
        responsive: [
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                },
            },
            {
                breakpoint: 992,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                },
            },
        ],
    };

    return (
        <div className="image-slider-container">
            <div className="image-slider" data-color-mode={colorMode}>
                <Slider ref={slider => { sliderRef = slider; }} {...settings}>
                    {avatarUrls.map((image, index) => (
                        <div key={index} className={`image-slide ${selectedImage === image ? 'selected' : ''}`}>
                            <img src={image} alt={`${index}`} />
                            <button className="select-button" onClick={() => handleSelectImage(image)}>Select</button>
                        </div>
                    ))}
                </Slider>
            </div>
            <div className="button-container">
                <Button onClick={previous} color="primary" variant="outlined">
                    Previous
                </Button>
                <Button onClick={next} color="primary" variant="outlined">
                    Next
                </Button>
            </div>
        </div>
    );
};

export default ImageSlider;