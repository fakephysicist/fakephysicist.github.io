# 折腾 OnePlus 5T

我不想让我的 OnePlus 5T 变成一个摆设, 所以我想折腾一下. 让他发挥余力.
<!--more-->

The phone was running on Android 10, and I would like to upgrade it to Android 13. Luckily, there is a project called [Project Elixir](https://projectelixiros.com/home) that provides Android 13 ROM for OnePlus 5T.

## Project Elixir

[XDA](https://forum.xda-developers.com/t/rom-oss-13-september-oneplus-5t-dumpling-project-elixir-beta-official-gapps.4487743/).

Dumpling is the codename for the OnePlus 5T.

Download the ROM from here: [ProjectElixir Downloads](https://downloads.projectelixiros.com/thirteen/dumpling/)

## Recovery

[OrangeFox Recovery Project](https://forum.xda-developers.com/t/recovery-unofficial-r11-1_2-a12-orangefox-recovery-project-cheeseburger-dumpling-2022-10-18.4472209/)

## Recovery Flashing

Follow the installation instructions on the lineageOS wiki: [Install LineageOS on dumpling](https://wiki.lineageos.org/devices/dumpling/install)

In the fastboot mode, you can use the following command to check if your device is connected:

```bash
fastboot devices
```

If nothing shows up, follow the instructions from [XDA](https://forum.xda-developers.com/t/guide-fix-device-not-showing-up-in-fastboot-mode-windows-10-11.4194491/) to fix the issue.

## Magisk

[Magisk](https://github.com/topjohnwu/Magisk)

## LSPosed

[LSPosed](https://github.com/LSPosed/LSPosed)

## Google Camera

The built-in google camera app is not working.

Use [NGCam_8.2.300-v1.8_snap.apk](https://www.celsoazevedo.com/files/android/google-camera/dev-Nikita/f/dl13/) instead.

To load XML configs, see [this](https://www.celsoazevedo.com/files/android/google-camera/f/settings09/).

You will also need to install [OnePlus 5/5T Front Camera Fix (V6.3)](https://www.celsoazevedo.com/files/android/google-camera/op5fix/#options).




