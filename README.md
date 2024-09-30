# CommandManager App

#### Control your ssh remote server using graphical user interface, run commands and read results. Create, edit, delete gui component ( as your command ), create profiles to manage multiple ssh hosts in the same gui

##### Download Windows Desktop App
- [Google-Drive-Folder](https://drive.google.com/drive/folders/1Fw_sANe6mx-e9P2E3e_leCb6ssTtbbGt?usp=drive_link)

- [Github repo](https://github.com/eaeoz/command-manager-windows)



---

- Or run on docker host

##### docker-compose.yml

```
version: "3"
services:
  app:
    image: eaeoz/command-manager-docker:latest # Or you can build directly using build context
    ports:
      - "3000:3000" # Map port 3000 of the container to port 3000 of the host
    volumes:
      - ./config:/app/config
    restart: unless-stopped # Automatically restart the container unless manually stopped
```

- To run and deploy container:
`docker compose up -d`

- Access from url:
`http://<your-host-ip>:3000`

##### config/profiles.json example ( you have to edit manually using correct values for your servers )

```
[
    {
        "title": "Profile 1",
        "username": "user1",
        "password": "password1",
        "host": "192.168.10.1",
        "port": 22
    },
    {
        "title": "Profile 2",
        "username": "user2",
        "password": "password2",
        "host": "192.168.10.2",
        "port": 22
    }
]
```

- You can change setting using config/.env file (this hidden file includes, port, timeout, and custom env file paths), then restart container for this
