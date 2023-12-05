
# Instructions on setting up your Raspberry pi
First make sure that 2 monitors are plugged in to your raspberry pi
- Clone this project in the "Downloads/" directory as all the scripts are based on this location..if not re-write the script's paths

## Install all project dependencies
Install all dependencies for all the components of our project.  The directories for these are "/window-opener" and the outer "digital-molecule-maker/" directory. Run the "install.sh" script:
_1. enable run privileges:_

```chmod +x install.sh```

_2. Run the .sh file by double clicking it or:_

```sudo ./install.sh``` 

_3. Check project can run: Check Project README.md_

## Setup plug-and-play
In this section we will setup the scripts so when the pi starts, the project starts automatically.
__MAKE SURE YOUR PROJECT HAS ALL DEPENDENCIES INSTALLED and can be run manually (see above)__
_1. Adjust the permissions for every .sh file:_

```
chmod +x startupAct3.sh
chmod +x startEscapeRoom.desktop`
```

_2. Copy the files into your pi where the scripts expect them to be:_

```cp startupAct3.sh /etc/```

(For this next command, if the "autostart/" directory doesn't exist, create it)

```cp startEscapeRoom.desktop /etc/xdg/autostart```

_3. Finally, restart the pi, so we can see if it worked!_

```sudo reboot```

_note: The .desktop (autostart) file cannot be placed in a different spot, but if you want the .sh (script) file to be anywhere else, update the paths in the .desktop file to reflect this_

# Things are not working:
If any of these steps fail, try these things:

* "Commands are not working" 
Run commands using sudo privileges ex:

```sudo cp startupAct3.sh /etc/```

* "My code runs but it doesn't run the browsers on the 2 monitors":
RaspberryPi for some reason may treat HDMI inputs as 1 big screen, try:

```sudo raspi-config```

Go to advanced options, wayland, switch from using wayland to x11. Also, make sure those two monitors are plugged in.

* "Scripts are not running when I double click them" or "rebooting pi does nothing"
Make sure all your files have run permissions. Check the files in their respective places ("etc/...") have their run permissions, and not just the ones in the cloned repo. ex:

```chmod +x startupAct3.sh``` 

(note: you might need to run this with sudo privileges)
Check running the scripts by double clicking it works before rebooting.
