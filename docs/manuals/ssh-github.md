# SSH Quick Steps for GitHub

> (Windows / macOS / Linux)

---

> **Minimal path that works for most students**
>
> 1. Generate key → 2) Add the **public** key to GitHub → 3) Clone/push via SSH.

---

## 1) Check for an existing key

**Windows (PowerShell)**

```powershell
ls ~/.ssh/*.pub
```

**macOS / Linux (Bash)**

```bash
ls ~/.ssh/*.pub
```

If you see `id_ed25519.pub` (or `id_rsa.pub`), you already have a public key.

---

## 2) Generate a new key (ED25519)

**Windows (PowerShell)**

```powershell
ssh-keygen -t ed25519 -C "your_email@example.com"
# Press Enter for the default path: C:\Users\<you>\.ssh\id_ed25519
# Set a passphrase (recommended)
```

**macOS / Linux (Bash)**

```bash
ssh-keygen -t ed25519 -C "your_email@example.com"
# Accept defaults; set a passphrase (recommended)
```

> If ED25519 isn’t available: `ssh-keygen -t rsa -b 4096 -C "your_email@example.com"`

---

## 3) Add your **public** key to GitHub (one-time)

**Copy the public key to the clipboard**

* **Windows (PowerShell)**

  ```powershell
  Get-Content ~/.ssh/id_ed25519.pub | Set-Clipboard
  ```
* **macOS**

  ```bash
  pbcopy < ~/.ssh/id_ed25519.pub
  ```
* **Linux (xclip)**

  ```bash
  xclip -sel clip < ~/.ssh/id_ed25519.pub
  ```
* **Simplier (cat)**
  ```bash
  cat ~/.ssh/id_ed25519.pub
  ```
  ctrl + c (copy the content)


**GitHub → Settings → SSH and GPG keys → New SSH key** → Paste → Save. If your org uses SSO, enable it for the key.

---

## 4) Clone or switch your repo to SSH

**Clone with SSH**

> **Note:** On your **first** SSH connection, Git may prompt to confirm GitHub's host. Verify the fingerprint using the official page: https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/githubs-ssh-key-fingerprints


```bash
git clone [email protected]:OWNER/REPO.git
cd REPO
```

**Switch an existing remote to SSH**

```bash
git remote -v
git remote set-url origin [email protected]:OWNER/REPO.git
git remote -v
```

---

## Optional (use only if needed)

### A) Cache your passphrase with ssh-agent

* Needed **only** if your key has a passphrase and you want to avoid retyping it.

**Windows (PowerShell)**

```powershell
Get-Service ssh-agent | Set-Service -StartupType Automatic
Start-Service ssh-agent
ssh-add ~\.ssh\id_ed25519
```

**macOS / Linux**

```bash
eval "$(ssh-agent -s)"
ssh-add ~/.ssh/id_ed25519
```

### B) Test the SSH connection (sanity check)

```bash
ssh -T git@github.com
```

!!! warning "Verify GitHub host fingerprint"
    Compare the fingerprint shown in your terminal with the official list. Type `yes` only if it matches.

    **Ed25519 (current):** `SHA256:+DiY3wvvV6TuJJhbpZisF/zLDA0zPMSvHdkr4UvCOqU`  
    **Source:** https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/githubs-ssh-key-fingerprints


On first use, confirm the GitHub host fingerprint matches the official page, then type `yes`.

### C) Multiple accounts/keys (advanced)

Create/edit `~/.ssh/config` only if you juggle more than one identity:

```sshconfig
Host github.com
  HostName github.com
  User git
  IdentityFile ~/.ssh/id_ed25519

Host github-work
  HostName github.com
  User git
  IdentityFile ~/.ssh/id_ed25519_work
```

Use the alias in your remote: `git remote set-url origin [email protected]:OWNER/REPO.git`.

---

## Troubleshooting (quick)

* **Permission denied (publickey)**: ensure your **public** key is added to GitHub, the agent (if used) knows your key (`ssh-add -l`), and you’re using the SSH URL.
* **Host authenticity prompt**: compare fingerprint with GitHub’s page; type `yes` only if it matches.
* **Windows: `ssh` not found**: install/enable **OpenSSH Client** in Optional Features and retry.
