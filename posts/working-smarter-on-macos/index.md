# Working smarter on macOS


Some tricks I use to get things done and stay sane while working with VS Code on macOS.

<!--more-->

## Fix: VS Code Tunnel Can’t Access External SSD on macOS Sonoma

In MacOS 14 Sonoma, if you have a portable SSD connected to your Mac and you want to use VS Code's SSH tunnel feature, you may encounter an issue where the tunnel cannot access the SSD. This is because macOS restricts access to external drives for security reasons.
To resolve this issue, you need to grant permission for VS Code tunnel to access the external SSD. Here are the steps to do so:
1. Open **System Settings** on your Mac.
2. Go to **Privacy & Security**.
3. Scroll down to the **Files and Folders** section.
4. Add the following path to the list of allowed applications:
   ```
   /Applications/Visual Studio Code.app/Contents/Resources/app/bin/code-tunnel
   ```
   make sure to include the full path to the `code-tunnel` executable.
5. Scroll down to the **Full Disk Access** section.
6. Add the same path to the list of applications that have full disk access:
   ```
   /Applications/Visual Studio Code.app/Contents/Resources/app/bin/code-tunnel
   ```
7. Restart VS Code to apply the changes.
This should allow VS Code's SSH tunnel to access the portable SSD without any issues.
