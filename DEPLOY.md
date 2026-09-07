# Deploying fets.in on the Hostinger VPS

The site is a **fully static build** — no Node.js runtime, no database. Any web
server that can serve files works. Below: Ubuntu + Nginx (the common Hostinger VPS
setup). Run everything over SSH as root (or prefix with `sudo`).

---

## 0. DNS (once)

In Hostinger hPanel → Domains → fets.in → DNS:

```
A     @        <your VPS IP>
A     www      <your VPS IP>
```

Wait for propagation (`dig fets.in` should return the VPS IP) before step 4 (SSL).

---

## 1. Prepare the server

```bash
apt update && apt upgrade -y
apt install -y nginx unzip
```

---

## 2. Get the site onto the server — pick ONE

### Option A — upload the pre-built bundle (fastest, no build tools needed)

From your local machine, upload `fets.in-dist.zip` (the built site), then on the VPS:

```bash
mkdir -p /var/www/fets.in
unzip fets.in-dist.zip -d /var/www/fets.in
# The zip contains index.html at its root — after unzip, /var/www/fets.in/index.html must exist.
ls /var/www/fets.in   # expect: index.html  assets/  images/
```

### Option B — build from the repo on the server

```bash
apt install -y nodejs npm git
npm install -g n && n 20        # Node 20+
git clone https://github.com/hy4k/fets.in-v3.0.git /opt/fets
cd /opt/fets
unzip /path/to/fets.in-v3.0-images.zip -d .    # restores public/images/
npm install
npm run build
mkdir -p /var/www/fets.in
cp -r dist/* /var/www/fets.in/
```

---

## 3. Nginx site config

```bash
cat > /etc/nginx/sites-available/fets.in <<'EOF'
server {
    listen 80;
    server_name fets.in www.fets.in;
    root /var/www/fets.in;
    index index.html;

    # hashed build assets — long cache
    location /assets/ {
        expires 30d;
        add_header Cache-Control "public, immutable";
    }

    # photography — moderate cache
    location /images/ {
        expires 7d;
        add_header Cache-Control "public";
    }

    # single-page fallback
    location / {
        try_files $uri $uri/ /index.html;
    }

    gzip on;
    gzip_types text/css application/javascript image/svg+xml;
}
EOF

ln -s /etc/nginx/sites-available/fets.in /etc/nginx/sites-enabled/
nginx -t && systemctl reload nginx
```

At this point **http://fets.in** should already serve the new site.

---

## 4. HTTPS (free, Let's Encrypt)

```bash
apt install -y certbot python3-certbot-nginx
certbot --nginx -d fets.in -d www.fets.in
```

Certbot rewrites the config to 443 and sets up auto-renewal. Done —
**https://fets.in** live.

---

## Updating the site later

```bash
# Option A: upload new fets.in-dist.zip, unzip over /var/www/fets.in
# Option B:
cd /opt/fets && git pull && npm install && npm run build && cp -r dist/* /var/www/fets.in/
```

No service restart needed — Nginx serves files directly.

---

## Notes

- The old booking system is gone by design; nothing on this site needs PHP/MySQL.
- If hPanel's "website" feature is attached to the VPS, you can also point its
  document root to `/var/www/fets.in` instead of hand-writing the Nginx block —
  same result.
