# SSH Basics

## Use windows as an ssh remote host

A good tutorial can be found [here](https://learn.microsoft.com/en-us/windows-server/administration/openssh/openssh_overview).


## Create an ssh key in local ssh client

This part can refer to my [previous post](../github-basics/).

Simply speaking, this can be done in two steps:

1. Generate a key pair in local ssh client.
2. Run `ssh-agent` and add the private key to it.

In windows, this can be done in powershell:

```powershell
# Generate a key pair
ssh-keygen -t ed25519

# By default the ssh-agent service is disabled. Configure it to start automatically.
# Make sure you're running as an Administrator.
Get-Service ssh-agent | Set-Service -StartupType Automatic

# Start the service
Start-Service ssh-agent

# This should return a status of Running
Get-Service ssh-agent

# Now load your key files into ssh-agent
ssh-add $env:USERPROFILE\.ssh\id_ed25519
```

## Run sshd in remote host

```powershell
# Set the sshd service to be started automatically
Get-Service -Name sshd | Set-Service -StartupType Automatic

# Now start the sshd service
Start-Service sshd
```

## Deploy the public key to remote host

### As an administrator user

The contents of your public key `\.ssh\id_ed25519.pub` needs to be placed on the server into a text file called `administrators_authorized_keys` in `C:\ProgramData\ssh\`.

## Use VSCode as an ssh client

We need to know the `username` and `hostname` of the remote host.

### Username

`username` is the account name of the remote host, which can be retrieved by executing

```powershell
echo $env:USERNAME
```

But sometimes the `username` is not the same as the `account name`, since windows allows us to login with Microsoft account. In this case, we can use the email address of the Microsoft account as the `username`.

### Hostname

`hostname` is the ip address of the remote host, which can be retrieved by executing

```powershell
ipconfig
```

## Running Jupyter Lab in remote host

We can use `ssh` to run `jupyter lab` in remote host and access it in local browser.

### Redirect traffic from remote port to local port

If we set the remote port to be `<remote_port>` and the local port to be `<local_port>`, then we can redirect the traffic from `<local_port>` to `<remote_port>` by

```powershell
ssh -L <local_port>:localhost:<remote_port> <username>@<hostname>
```

### Run Jupyter Lab in remote host

```powershell
jupyter lab --no-browser --port=<remote_port>
```


jupyter lab --no-browser --port=8080


## Use `croc` to transfer files

The details can be found [here](https://github.com/schollz/croc)

### Local

You can navigate to the directory you want to sync and run the following command:

```bash
croc send --code <code> .
```

### Remote

You can run the following command to receive the files:

```bash
croc --yes --overwrite <code>
```

