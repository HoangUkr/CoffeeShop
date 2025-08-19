# ☁️ Oracle Cloud ARM Deployment Guide

This guide will help you deploy the Coffee Shop application on Oracle Cloud Infrastructure (OCI) ARM compute instance.

## 🏗️ Oracle Cloud Setup

### 1. Create ARM Compute Instance

1. **Login to Oracle Cloud Console**: https://cloud.oracle.com/
2. **Navigate**: Compute → Instances → Create Instance

3. **Instance Configuration**:
   - **Name**: `coffee-shop-app`
   - **Compartment**: Choose your compartment
   - **Placement**: Choose availability domain
   
4. **Image and Shape**:
   - **Image**: Ubuntu 22.04 Minimal (ARM64)
   - **Shape**: VM.Standard.A1.Flex
   - **OCPUs**: 2-4 (depending on your free tier limits)
   - **Memory**: 8-24 GB

5. **Networking**:
   - **VCN**: Create new or use existing
   - **Subnet**: Public subnet
   - **Assign public IP**: ✅ Yes

6. **SSH Keys**:
   - Upload your public SSH key or generate new one

### 2. Configure Security Groups (Firewall)

1. **Navigate**: Networking → Virtual Cloud Networks → Your VCN → Security Lists
2. **Add Ingress Rules**:

```
Source: 0.0.0.0/0
Protocol: TCP
Port: 22 (SSH)

Source: 0.0.0.0/0
Protocol: TCP
Port: 80 (HTTP)

Source: 0.0.0.0/0
Protocol: TCP
Port: 443 (HTTPS)

Source: 0.0.0.0/0
Protocol: TCP
Port: 9000 (Graylog - Optional)

Source: 0.0.0.0/0
Protocol: TCP
Port: 5555 (Flower - Optional, for monitoring)
```

## 🚀 Application Deployment

### 1. Connect to Your Instance

```bash
ssh -i your-private-key.pem ubuntu@YOUR_PUBLIC_IP
```

### 2. Install Dependencies

```bash
# Update system
sudo apt update && sudo apt upgrade -y

# Install Docker
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh
sudo usermod -aG docker ubuntu

# Install Docker Compose
sudo apt install docker-compose-plugin -y

# Install Git
sudo apt install git -y

# Logout and login again to apply docker group
logout
```

### 3. Clone and Deploy Application

```bash
# Clone your repository
git clone https://github.com/HoangUkr/CoffeeShop.git
cd CoffeeShop

# Make deployment script executable
chmod +x deploy.sh

# Run deployment
./deploy.sh
```

### 4. Configure Environment

When prompted by the deployment script:
- Enter your Oracle Cloud instance public IP
- Create Django superuser (recommended)

## 🌐 Access Your Application

After successful deployment:

- **Main Application**: `http://YOUR_PUBLIC_IP`
- **Admin Panel**: `http://YOUR_PUBLIC_IP/admin/`
- **API Documentation**: `http://YOUR_PUBLIC_IP/api/`
- **Monitoring (Graylog)**: `http://YOUR_PUBLIC_IP:9000`
- **Celery Monitoring**: `http://YOUR_PUBLIC_IP:5555`

## 🔒 Security Considerations

### 1. Enable HTTPS (Recommended)

```bash
# Install Certbot for Let's Encrypt
sudo apt install certbot python3-certbot-nginx -y

# Get SSL certificate (replace YOUR_DOMAIN with actual domain)
sudo certbot --nginx -d YOUR_DOMAIN

# Update nginx configuration to enable HTTPS block
sudo nano nginx/nginx.conf
```

### 2. Change Default Passwords

```bash
# Update .env file with strong passwords
nano .env

# Restart services
docker compose -f docker-compose.yml -f docker-compose.prod.yml restart
```

### 3. Set Up Domain (Optional)

If you have a domain:
1. Point A record to your Oracle Cloud public IP
2. Update environment variables with your domain
3. Get SSL certificate for your domain

## 📊 Monitoring and Maintenance

### Check Application Status
```bash
# View all services
docker compose ps

# View logs
docker compose logs -f

# Monitor resource usage
docker stats
```

### Backup Database
```bash
# Create database backup
docker compose exec db pg_dump -U coffee_user coffee_db > backup_$(date +%Y%m%d_%H%M%S).sql
```

### Update Application
```bash
# Pull latest changes
git pull

# Rebuild and restart
docker compose -f docker-compose.yml -f docker-compose.prod.yml up --build -d
```

## 🎯 Oracle Cloud Free Tier Limits

Oracle Cloud Always Free includes:
- **2 AMD-based Compute VMs**: 1/8 OCPU and 1 GB RAM each
- **4 ARM-based Ampere A1 cores**: 24 GB RAM
- **200 GB Block Storage**: Always Free
- **10 GB Object Storage**: Always Free

**Recommended for Coffee Shop**: 
- Use ARM-based instance (better value)
- 2-4 OCPUs, 8-16 GB RAM
- Adjust resource limits in `docker-compose.prod.yml` if needed

## 🏆 Performance Optimization

### For ARM Instances

1. **Resource Allocation**: ARM instances are very efficient
2. **Docker Images**: Use multi-platform builds (already configured)
3. **Database**: PostgreSQL works excellently on ARM
4. **Caching**: Redis provides great performance

### Resource Monitoring

```bash
# Check resource usage
htop

# Monitor Docker containers
docker stats

# Check disk usage
df -h
```

## 🆘 Troubleshooting

### Common Issues

1. **Port Access Issues**:
   - Check Oracle Cloud Security Groups
   - Verify iptables: `sudo iptables -L`

2. **Docker Permission Issues**:
   - Add user to docker group: `sudo usermod -aG docker $USER`
   - Logout and login again

3. **Memory Issues**:
   - Adjust resource limits in `docker-compose.prod.yml`
   - Use `docker system prune` to clean up

4. **SSL Certificate Issues**:
   - Ensure domain points to correct IP
   - Check certificate renewal: `sudo certbot renew --dry-run`

### Getting Help

- **Oracle Cloud Docs**: https://docs.oracle.com/en-us/iaas/
- **Docker Docs**: https://docs.docker.com/
- **Application Logs**: `docker compose logs [service_name]`

## ✅ Success Checklist

- [ ] Oracle Cloud instance created and accessible
- [ ] Security groups configured correctly
- [ ] Docker and Docker Compose installed
- [ ] Application deployed successfully
- [ ] All services running (docker compose ps)
- [ ] Application accessible via public IP
- [ ] HTTPS configured (recommended)
- [ ] Monitoring set up
- [ ] Backups configured

Your Coffee Shop application is now running in the cloud! 🎉
