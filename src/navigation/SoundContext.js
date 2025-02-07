import React, { createContext, useState, useContext } from 'react';
import Video from 'react-native-video';

const SoundContext = createContext(undefined); // No need for interface in JS

const SoundPaths = {
    ui: require('../assets/sfx/ui.mp3'),
    candy_shuffle: require('../assets/sfx/candy_shuffle.mp3'),
    candy_clear: require('../assets/sfx/candy_clear.mp3'),
    bg: require('../assets/sfx/bg.mp3'),
    cheer: require('../assets/sfx/cheer.mp3'),
};

const SoundProvider = ({ children }) => {
    const [sounds, setSounds] = useState([]);

    const playSound = (soundName, repeat) => {
        const soundPath = SoundPaths[soundName];
        if (soundPath) {
            setSounds((prevSounds) => {
                const updatedSounds = prevSounds?.filter((sound) => sound.id !== soundName) || []; // Handle initial undefined
                return [
                    ...updatedSounds,
                    {
                        id: soundName,
                        path: soundPath,
                        repeat,
                    },
                ];
            });
        } else {
            console.error(`Sound ${soundName} not found`);
        }
    };

    const stopSound = (soundName) => {
        setSounds((prevSounds) => prevSounds.filter((sound) => sound.id !== soundName));
    };

    return (
        <SoundContext.Provider value={{ playSound, stopSound }}>
            {children}
            {sounds.map((sound) => (
                <Video
                    key={sound.id}
                    source={sound.path}
                    paused={false}
                    repeat={sound.repeat}
                    volume={0.4}
                    muted={false}
                    resizeMode="cover"
                    style={{ position: "absolute", width: 0, height: 0 }}
                />
            ))}
        </SoundContext.Provider>
    );
};

const useSound = () => {
    const context = useContext(SoundContext);
    if (!context) {
        throw new Error('useSound must be used within the SoundProvider');
    }
    return context;
};

export { SoundProvider, useSound };