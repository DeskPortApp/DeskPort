<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossorigin="anonymous">

<p align="center">
  <a href="#">
  <img src="https://ik.imagekit.io/kummiktgaiq/Deskport/svgviewer-png-output%20(1)_slKZSMfER.png?updatedAt=1691489089637" alt="Deskport Logo">
  </a>
</p>

<h3 align="center">DeskPort</h3>

<p align="center">
  Convert your Web Apps and WebGL Games to cross-platform desktop with Python
  <br>
  <a href="#docs"><strong>Explore Deskport docs »</strong></a>
  <br>
</p>

## Table of contents

- [About DeskPort](#about-deskport)
- [Status](#status)
- [Getting started](#getting-started)
- [Common issues](#common-issues)
- [Team](#team)
- [Copyright and license](#copyright-and-license)

## About DeskPort

**DeskPort** is a revolutionary development environment built in Python and powered by [PPG](https://github.com/runesc/ppg). Anchored in the ability to seamlessly transform diverse web applications into cross-platform desktop applications, it offers a comfortable and user-friendly interface that simplifies the conversion process.

Additionally, DeskPort provides an IDE that allows to developers create their own desktop applications using familiar web technologies, such as HTML, CSS, and JavaScript. DeskPort is also compatible with the most popular front-end frameworks like React, Vue, and Angular, giving developers the flexibility to work with tools they feel comfortable and skilled with.

A standout feature of DeskPort is its rendering engine, built on Chromium. This engine ensures broad compatibility with a variety of JavaScript libraries and frameworks, allowing seamless integration of any desired JavaScript tools and fostering a smooth and efficient development workflow.

DeskPort's IDE allows the creation of web applications using cutting-edge technologies like WebAssembly and WebGL. This empowers developers to design and develop high-performance 3D applications, such as interactive games, using libraries like Three.js or other WebGL frameworks of their choice.
## Status

![issues](https://img.shields.io/github/issues/DeskPortApp/DeskPort)
![GitHub forks](https://img.shields.io/github/forks/DeskPortApp/DeskPort)
![GitHub stars](https://img.shields.io/github/stars/DeskPortApp/DeskPort)
![Downloads](https://img.shields.io/github/downloads/DeskPortApp/DeskPort/total)
![GitHub releases](https://img.shields.io/github/v/release/DeskPortApp/DeskPort)
![GitHub licence](	https://img.shields.io/github/license/DeskPortApp/DeskPort)

## Getting started
Here are the tools you will need to run DeskPort on your computer depending on the operating system you use.

### You will need

- Python 3.8.x
- Pyinstaller v5.13.0
- PPG v1.0.3
- [Visual C++ Redistributable for Visual Studio 2012 Update 4](https://www.microsoft.com/en-us/download/details.aspx?id=30679) (Windows only)
- gcc (Linux and macOS only)

### Installation

#### Windows
1. Install Python 3.8.x from [here](https://www.python.org/downloads/release/python-3810/).
2. Install Pyinstaller v5.13.0 by running the following command in your terminal:
```bash
pip install pyinstaller==5.13.0
```
3. Install PPG v1.0.3 by running the following command in your terminal:
```bash
pip install ppg==1.0.3
```
4. Install [Visual C++ Redistributable for Visual Studio 2012 Update 4](https://www.microsoft.com/en-us/download/details.aspx?id=30679) from [here](https://www.microsoft.com/en-us/download/details.aspx?id=30679). *This is required for the execution of DeskPort applications on Windows.

#### Linux
1. Install Python 3.8.x by running the following command in your terminal:
```bash
sudo apt-get install python3.8 python3.8-dev
```
2. Install Pyinstaller v5.13.0 by running the following command in your terminal:
```bash
pip install pyinstaller==5.13.0
```
3. Install PPG v1.0.3 by running the following command in your terminal:
```bash
pip install ppg==1.0.3
```

#### macOS
1. Install Python 3.8.x From [here](https://www.python.org/downloads/release/python-3810/).
2. Install Pyinstaller v5.13.0 by running the following command in your terminal:
```bash
pip install pyinstaller==5.13.0
```
3. Install PPG v1.0.3 by running the following command in your terminal:
```bash
pip install ppg==1.0.3
```

### Install the bindings

Deskport requires the installation of the bindings for the desired framework. The following are the available bindings:

- [PySide6 v6.4](https://pypi.org/project/PySide6/6.4.0/) **(Recommended)**
- [PySide2 v5.15.2](https://pypi.org/project/PySide2/5.15.2/)
- [PyQt5 v5.15.4](https://pypi.org/project/PyQt5/5.15.4/)
- [PyQt6 v6.1.0](https://pypi.org/project/PyQt6/6.1.0/)

## Common issues
Here are some common issues that you may encounter when using DeskPort.

### Windows

#### FileNotFoundError: Could not find msvcr110.dll on your PATH
This error occurs when the Visual C++ Redistributable for Visual Studio 2012 Update 4 is not installed. To fix this issue, install the Visual C++ Redistributable for Visual Studio 2012 Update 4 from [here](https://www.microsoft.com/en-us/download/details.aspx?id=30679).

**still not working?** try this:
1. Go to system32 folder
2. Search for msvcr*.dll
3. Sometimes msvcr110.dll is there but with some other name like msvcr110d.dll or msvcr110_clr0400.dll try copying it and renaming it to msvcr110.dll

#### FileNotFoundError: Could not find api-ms-win-crt-multibyte-l1-1-0.dll on your PATH.
This error occurs when the Windows 10 SDK is not installed. To fix this issue, install the Visual Studio Community from [here](https://visualstudio.microsoft.com/es/) and use Visual Studio Installer to download and install Windows 10 SDK.

**still not working?** try this:
Add downlevel folder to path before using pyinstaller or adding the downlevel folders to path in env variables

```bash
set PATH=%PATH%;C:\Windows\System32\downlevel; 
```

#### ModuleNotFoundError: No module named < binding >
This error occurs when the bindings for the desired framework are not installed. To fix this issue, install the bindings for the desired framework. For more information, see [Install the bindings](#install-the-bindings).


## Team

- [Luis Alfredo Reyes](https://github.com/runesc)
- [JT20003](https://github.com/JT20003)
- [Jose Paz](https://github.com/Ty6Way)

## Copyright and license
Code and documentation copyright 2023–2022 the DeskPort Code released under the MIT License. Docs released under Creative Commons.
