import React from 'react';

const onlineIcon = require('../../../../static/images/onlineIcon.png');

import './TextContainer.css';
import { Button } from '@material-ui/core';
import UserAvatar from '../../../common/utils/UserAvatar';

const TextContainer = ({ users }) => (
  <div className="textContainer">
    {users ? (
      <div>
        <h1 className="header">People currently chatting:</h1>
        <div className="activeContainer">
          <h2>
            {users.map(({ name }) => (
              <div key={name} className="activeItem">
                <UserAvatar name={name} isTeam={true} />
                <img alt="Online Icon" src={onlineIcon} />
              </div>
            ))}
          </h2>
        </div>
        <Button color="primary" variant="contained">
          Blog Post
        </Button>
        <Button color="primary" variant="contained">
          Add Member
        </Button>
      </div>
    ) : null}
  </div>
);

export default TextContainer;
