# SSH Basics

SSH is a protocol that allows you to connect to a remote computer. It is widely used in remote computing, such as connecting to a remote server or running Jupyter Lab in a remote host.
<!--more-->

## 1. SSH Access to Windows

For an in-depth tutorial, refer to [this link](https://learn.microsoft.com/en-us/windows-server/administration/openssh/openssh_overview).

### Creating an SSH Key in Local SSH Client

For a detailed explanation, refer to my [previous post](../github-basics/).

In summary:

1. Generate a key pair in the local SSH client.
2. Activate the `ssh-agent` and link the private key to it.

In Windows, this process can be executed in PowerShell:

```powershell
# Generate a key pair
ssh-keygen -t ed25519

# By default, the ssh-agent service is disabled. Configure it to start automatically. Ensure you're running as an Administrator.
Get-Service ssh-agent | Set-Service -StartupType Automatic

# Activate the service
Start-Service ssh-agent

# This should return a status of Running
Get-Service ssh-agent

# Load your key files into ssh-agent
ssh-add $env:USERPROFILE\.ssh\id_ed25519
```

### Starting SSHD on the Remote Host

```powershell
# Set the sshd service to start automatically
Get-Service -Name sshd | Set-Service -StartupType Automatic

# Activate the sshd service
Start-Service sshd
```

### Deploying the Public Key to the Remote Host

Your public key, `\.ssh\id_ed25519.pub`, should be placed on the server in a text file named `administrators_authorized_keys` located in `C:\ProgramData\ssh\`.

### Using VSCode as an SSH Client

To connect, you need to know the `username` and `hostname` of the remote host.

#### Determining the Username

The `username` typically matches the account name of the remote host, retrievable by:

```powershell
echo $env:USERNAME
```

However, if you're using a Microsoft account to log in, the `username` might be the associated email address.

#### Determining the Hostname

The `hostname`, which is the IP address of the remote host, can be retrieved with:

```powershell
ipconfig
```

## 2. SSH Access to WSL2

For a comprehensive guide, refer [here](<https://jmmv.dev/2022/02/wsl-ssh-access.html>).

Since Windows uses port 22 by default for SSH, consider changing the SSH port in WSL2 to 2222 to prevent conflicts.

### On the Remote Host (WSL2)

```bash
# Install openssh-server
sudo apt install openssh-server

# Modify the SSH configuration to use port 2222
sudo sed -i -E 's,^#?Port.*$,Port 2222,' /etc/ssh/sshd_config
sudo service ssh restart

# Allow passwordless sudo for the current user to start the SSH service
sudo sh -c "echo '${USER} ALL=(root) NOPASSWD: /usr/sbin/service ssh start' >/etc/sudoers.d/service-ssh-start"

# Start the SSH service without requiring a password
sudo /usr/sbin/service ssh start
```

### On the Remote Host (Windows)

#### Unblock Port 2222

```powershell
New-NetFirewallRule -Name sshd -DisplayName 'OpenSSH Server (sshd) for WSL' -Enabled True -Direction Inbound -Protocol TCP -Action Allow -LocalPort 2222
```

#### Automatically Start SSHD Service

Create a CMD script to initiate the SSHD service in WSL2.

```cmd
@echo off
setlocal

C:\Windows\System32\bash.exe -c "sudo /usr/sbin/service ssh start"

C:\Windows\System32\netsh.exe interface portproxy delete v4tov4 listenport=2022 listenaddress=0.0.0.0 protocol=tcp

for /f %%i in ('wsl hostname -I') do set IP=%%i
C:\Windows\System32\netsh.exe interface portproxy add v4tov4 listenport=2022 listenaddress=0.0.0.0 connectport=2022 connectaddress=%IP%

endlocal
```

### Connecting to WSL2

```bash
ssh -p 2222 <username>@<hostname>
```

Note that the `username` here is distinct from the Windows host username; it pertains to the Linux system. Determine it using:

```bash
whoami
```

The `hostname`, however, remains consistent with the Windows host.

#### VSCode Remote - SSH

Edit the `~/.ssh/config` on the local client:

```bash
Host <hostname>
    HostName <nickname_windows>
    User <username_windows>
    Port 22

Host <hostname>
    HostName <nickname_wsl>
    User <username_wsl>
    Port 2222
```

## 3. Running Jupyter Lab on a Remote Host

Use `ssh` to run `jupyter lab` on a remote host and access it from a local browser.

### Redirect Traffic from Remote Port to Local Port

If you designate `<remote_port>` for the remote and `<local_port>` for the local, redirect the traffic as:

```powershell
ssh -L <local_port>:localhost:<remote_port> <username>@<hostname>
```

### Running Jupyter Lab on the Remote Host

```powershell
jupyter lab --no-browser --port=<remote_port>
```

## 4. Using `croc` to Transfer Files

For more details, consult [this link](https://github.com/schollz/croc).

### On the Local Machine

Navigate to the directory you wish to sync:

```bash
croc send --code <code> .
```

### On the Remote Machine

To receive the files:

```bash
croc --yes --overwrite <code>
```

## 5. Avoiding SSH passphrase prompt

To avoid the SSH passphrase prompt, you can use

```bash
ssh-add
```

to add the key to the `ssh-agent` cache.

