# SSH Basics


SSH is a protocol that allows you to connect to a remote computer. It is widely used in remote computing, such as connecting to a remote server or running Jupyter Lab in a remote host.

<!--more-->

## Create an SSH key pair

The following steps are adapted from the [Generating a new SSH key and adding it to the ssh-agent](https://docs.github.com/en/authentication/connecting-to-github-with-ssh/generating-a-new-ssh-key-and-adding-it-to-the-ssh-agent). The procedure has been tested on macOS Sequoia.

### Check for existing SSH keys

First check for existing SSH keys on your computer by running:

```bash
ls -al ~/.ssh
# Lists the files in your .ssh directory, if they exist
```

Check the directory listing to see if you have files named either `id_ed25519.pub` or `id_ed25519.pub`. If you don't have either of those files then read on, otherwise skip the next section.

### Generate a new SSH key

Open Terminal. Paste the text below, substituting in your GitHub email address. This creates a new ssh key, using the provided email as a label.

   ```bash
   ssh-keygen -t ed25519 -C "your_email@example.com"
   ```

### Add your SSH key to the ssh-agent

Use `ssh-agent` and `ssh-add` to manage your SSH keys. 

The `ssh-agent` is a program that runs in the background and stores your SSH keys. This allows you to use your SSH keys without having to enter your passphrase every time.

`ssh-add` is a command that adds your SSH private key to the running ssh-agent. 

1. Start the ssh-agent in the background.


2. Add your SSH private key to the ssh-agent.

Add your SSH private key to the ssh-agent. If you created your key with a different name, or if you are adding an existing key that has a different name, replace id_ed25519 in the command with the name of your private key file.

```bash
ssh-add --apple-use-keychain ~/.ssh/id_ed25519
```

3. To automatically load your keys into the ssh-agent on login, add the following lines to your `~/.ssh/config` file:

```bash
Host *
    AddKeysToAgent yes
    UseKeychain yes
    IdentityFile ~/.ssh/id_ed25519
```

To open your `~/.ssh/config` file with `vscode`, use the command:

```bash
code ~/.ssh/config
```

## One-Time Setup for Passwordless SSH

The high level idea is to generate a key pair on your local machine, copy the public key to the remote host (Adding it to the `~/.ssh/authorized_keys` file), and then test the connection. This allows you to connect to the remote host without entering a password each time.

1. On local machine, generate a key pair using `ssh-keygen`.
2. Copy the public key to the remote host's `~/.ssh/authorized_keys` file.

```bash
ssh-copy-id <username>@<hostname>
```

Or manually copy the public key to the remote host, appending it to the `~/.ssh/authorized_keys` file, and set the appropriate permissions:

```bash
cat ~/.ssh/id_ed25519.pub | ssh <username>@<hostname> 'mkdir -p ~/.ssh && cat >> ~/.ssh/authorized_keys && chmod 700 ~/.ssh && chmod 600 ~/.ssh/authorized_keys'
```

3. Test the SSH connection to the remote host.

```bash
ssh <username>@<hostname>
```

If no password is required, the setup is successful.


## SSH Access to Windows

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

### Configuring the default shell for OpenSSH in Windows

For example, to use PowerShell as the default shell:

```powershell
New-ItemProperty -Path "HKLM:\SOFTWARE\OpenSSH" -Name DefaultShell -Value "C:\Windows\System32\WindowsPowerShell\v1.0\powershell.exe" -PropertyType String -Force
```

### Windows Configurations

In Windows, sshd reads configuration data from `%programdata%\ssh\sshd_config`` by default.

You can modify the configuration file to change the default port, for example:

```powershell
# Port 22 is the default port for SSH
Port 22
```

You can also disable password authentication to prevent brute-force attacks:

```powershell
# Disable password authentication
PasswordAuthentication no
```

You can enable public key authentication:

```powershell
# Enable public key authentication
PubkeyAuthentication yes
```

### Connecting to Windows in terminal

```bash
ssh <username>@<hostname>
```

### Connecting to Windows in VS Code

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

#### If it doesn't work

Try enable `Port 22`

```powershell
netsh advfirewall firewall add rule name="Open SSH Port 22" dir=in action=allow protocol=TCP localport=22 remoteip=any
```

Try enabling `Remote server listen on socket` in VS Code.

## SSH Access to WSL2

For a comprehensive guide, refer [here](https://jmmv.dev/2022/02/wsl-ssh-access.html).

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

#### VS Code Remote - SSH

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

## Running Jupyter Lab on a Remote Host

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

## Using `croc` to Transfer Files

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

