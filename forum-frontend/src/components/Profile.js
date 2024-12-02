import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Profile = () => {
    const [profile, setProfile] = useState(null);
    const [socialMedia, setSocialMedia] = useState({ Twitter: '', LinkedIn: '' });
    const [skills, setSkills] = useState('');
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        // Hämta profilinformation från API
        axios.get('/api/profiles/')
            .then(response => {
                const data = response.data[0]; // Om en användare har en profil
                setProfile(data);
                setSocialMedia(data.social_media || { Twitter: '', LinkedIn: '' });
                setSkills(data.skills || '');
            })
            .catch(error => console.error('Error fetching profile:', error));
    }, []);

    const handleSave = () => {
        axios.put(`/api/profiles/${profile.id}/`, {
            social_media: socialMedia,
            skills
        })
            .then(response => {
                setProfile(response.data);
                setIsEditing(false);
            })
            .catch(error => console.error('Error updating profile:', error));
    };

    return (
        <div className="container mt-5">
            <h1>Your Profile</h1>
            {profile ? (
                <div className="card p-4">
                    <div className="mb-3">
                        <h5>Social Media</h5>
                        {isEditing ? (
                            <>
                                <div className="form-group mb-2">
                                    <label>Twitter</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        value={socialMedia.Twitter}
                                        onChange={(e) => setSocialMedia({ ...socialMedia, Twitter: e.target.value })}
                                    />
                                </div>
                                <div className="form-group mb-2">
                                    <label>LinkedIn</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        value={socialMedia.LinkedIn}
                                        onChange={(e) => setSocialMedia({ ...socialMedia, LinkedIn: e.target.value })}
                                    />
                                </div>
                            </>
                        ) : (
                            <>
                                <p><strong>Twitter:</strong> {socialMedia.Twitter}</p>
                                <p><strong>LinkedIn:</strong> {socialMedia.LinkedIn}</p>
                            </>
                        )}
                    </div>
                    <div className="mb-3">
                        <h5>Programming Skills</h5>
                        {isEditing ? (
                            <textarea
                                className="form-control"
                                rows="3"
                                value={skills}
                                onChange={(e) => setSkills(e.target.value)}
                            />
                        ) : (
                            <p>{skills}</p>
                        )}
                    </div>
                    {isEditing ? (
                        <button className="btn btn-success" onClick={handleSave}>Save</button>
                    ) : (
                        <button className="btn btn-primary" onClick={() => setIsEditing(true)}>Edit Profile</button>
                    )}
                </div>
            ) : (
                <p>Loading profile...</p>
            )}
        </div>
    );
};

export default Profile;
