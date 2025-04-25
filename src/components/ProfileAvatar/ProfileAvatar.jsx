import React from 'react';
import styles from './ProfileAvatar.module.css';

const ProfileAvatar = () => {
  return (
    <div className={styles.ProfileAvatar}>
      <a href="/profile">
        <img
          src="https://placehold.co/150" // Placeholder avatar image
          alt="Profile Avatar"
          className={styles.AvatarImage}
        />
      </a>
    </div>
  );
};

export default ProfileAvatar;
