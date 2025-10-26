# Docker Deployment Guide

This guide will help you deploy the Joshua Gulizia Portfolio website on your VM using Docker.

## Prerequisites

- Docker installed on your VM
- Docker Compose installed on your VM
- Git installed on your VM

## Quick Start

### 1. Clone the Repository

```bash
git clone https://github.com/jguliz/GitHub-Page-Fork.git
cd GitHub-Page-Fork
```

### 2. Build and Run with Docker Compose

The easiest way to deploy is using Docker Compose:

```bash
docker-compose up -d
```

This will:
- Build the Docker image
- Start the container
- Expose the website on port 80
- Run the container in detached mode (background)

### 3. Access Your Website

Open your browser and navigate to:
- `http://YOUR_VM_IP_ADDRESS`
- Or `http://localhost` if accessing from the VM itself

## Manual Docker Build (Alternative)

If you prefer to use Docker commands directly:

### Build the Image

```bash
docker build -t joshua-gulizia-portfolio .
```

### Run the Container

```bash
docker run -d \
  --name portfolio \
  -p 80:80 \
  --restart unless-stopped \
  joshua-gulizia-portfolio
```

## Useful Commands

### View Running Containers

```bash
docker ps
```

### View Container Logs

```bash
docker-compose logs -f
# or
docker logs -f joshua-gulizia-portfolio
```

### Stop the Container

```bash
docker-compose down
# or
docker stop joshua-gulizia-portfolio
```

### Restart the Container

```bash
docker-compose restart
# or
docker restart joshua-gulizia-portfolio
```

### Update the Website

When you make changes to the code:

```bash
# Pull latest changes
git pull origin master

# Rebuild and restart
docker-compose up -d --build
```

### Remove Everything

```bash
docker-compose down
docker rmi joshua-gulizia-portfolio
```

## Port Configuration

By default, the website runs on port 80. To change this:

Edit `docker-compose.yml` and change the ports mapping:

```yaml
ports:
  - "8080:80"  # Change 8080 to your desired port
```

Then restart:

```bash
docker-compose up -d
```

## Using a Custom Domain

If you have a domain name:

1. Point your domain's A record to your VM's IP address
2. Update the nginx configuration if needed
3. Consider setting up SSL/TLS with Let's Encrypt

### SSL/TLS with Let's Encrypt (Optional)

For HTTPS support, you can use Certbot with nginx. This requires additional configuration not covered in this basic setup.

## Troubleshooting

### Container won't start

Check logs:
```bash
docker-compose logs
```

### Port 80 already in use

Either:
- Stop the service using port 80
- Change the port in docker-compose.yml

### Website not accessible

1. Check if container is running: `docker ps`
2. Check firewall rules on your VM
3. Verify the VM's IP address is correct
4. Check nginx logs: `docker-compose logs`

## Architecture

This deployment uses:
- **Node.js 20 Alpine** for building the React application
- **Nginx Alpine** for serving the static files
- Multi-stage build for optimized image size
- Gzip compression enabled
- React Router support with proper fallback

## Performance Optimizations

The configuration includes:
- Gzip compression for all text assets
- 1-year cache for static assets
- Optimized nginx configuration
- Lightweight Alpine Linux base images
- Multi-stage build (final image ~50MB)

## Security Features

- Security headers (X-Frame-Options, X-Content-Type-Options, X-XSS-Protection)
- No unnecessary packages in production image
- Container runs as non-root user (nginx default)
- Restart policy to ensure uptime

## Monitoring

To monitor resource usage:

```bash
docker stats joshua-gulizia-portfolio
```

## Support

For issues or questions, contact Josh Gulizia at jgulizia1205@gmail.com
