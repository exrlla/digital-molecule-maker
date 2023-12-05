# Instructions on setting up your Raspberry pi
First make sure that 2 monitors are plugged in to your raspberry pi
- Clone this project in the "Downloads/" directory as all the scripts are based on this location..if not re-write the script's paths

## Install all project dependencies
 ```npm -i``` to install all dependencies in the "digital-molecule-maker/"  directory and
the "/window-opener" directory.
- Alternatively, run the "install.sh" script

Next:
Adjust the permissions for every .sh file
```chmod +x startupAct3.sh```
```chmod +x startEscapeRoom.desktop```

```cp startupAct3.sh /etc/```

(For this next command, if the "autostart/" directory doesn't exist, create it)
```cp startEscapeRoom.desktop /etc/xdg/autostart```

Finally, restart the pi, so we can see if it worked!
```sudo reboot```

# Things are not working:
If any of these steps fail, try these things:

* Run commands using sudo priviledges:
ex:
```sudo cp startupAct3.sh /etc/```

* "my code runs but it doesn't run the browsers on the 2 monitors":
RaspberryPi for some reason may treat HDMI inputs as 1 big screen, try:
```sudo raspi-config```
Go to advanced options, wayland, switch from using wayland to x11

* Try running each script/adjust their permissions:
```chmod +x startupAct3.sh```  Do this with all .sh files. You should be able to run them by double clicking them
