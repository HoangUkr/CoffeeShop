#!/bin/bash

# Coffee Shop Deployment Script for Oracle ARM Cloud Instance
# This script helps deploy the Coffee Shop application on Oracle Cloud Infrastructure

set -e

echo "🚀 Coffee Shop Cloud Deployment Script"
echo "======================================="

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${GREEN}[INFO]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

print_step() {
    echo -e "${BLUE}[STEP]${NC} $1"
}

# Check if running as root
if [[ $EUID -eq 0 ]]; then
   print_error "This script should not be run as root for security reasons"
   exit 1
fi

print_step "Step 1: System Requirements Check"

# Check if Docker is installed
if ! command -v docker &> /dev/null; then
    print_error "Docker is not installed. Please install Docker first."
    echo "Run: curl -fsSL https://get.docker.com | sh"
    exit 1
fi

# Check if Docker Compose is installed
if ! command -v docker-compose &> /dev/null && ! docker compose version &> /dev/null; then
    print_error "Docker Compose is not installed. Please install Docker Compose first."
    exit 1
fi

print_status "Docker and Docker Compose are installed ✓"

print_step "Step 2: Environment Configuration"

# Check if .env file exists
if [ ! -f ".env" ]; then
    print_error ".env file not found. Please create it first."
    exit 1
fi

# Prompt for domain/IP configuration
read -p "Enter your Oracle Cloud instance public IP or domain: " DOMAIN_OR_IP

if [ -z "$DOMAIN_OR_IP" ]; then
    print_error "Domain or IP is required"
    exit 1
fi

print_status "Configuring environment for: $DOMAIN_OR_IP"

# Update environment variables
sed -i "s/YOUR_DOMAIN_OR_IP/$DOMAIN_OR_IP/g" .env
sed -i "s/YOUR_DOMAIN_OR_IP/$DOMAIN_OR_IP/g" nginx/nginx.conf

print_step "Step 3: Firewall Configuration"
print_warning "Make sure the following ports are open in Oracle Cloud Security Groups:"
echo "  - Port 80 (HTTP)"
echo "  - Port 443 (HTTPS)"
echo "  - Port 22 (SSH)"

print_step "Step 4: Building and Starting Services"

# Stop any existing containers
print_status "Stopping existing containers..."
docker compose down || true

# Build and start services
print_status "Building and starting services..."
docker compose -f docker-compose.yml -f docker-compose.prod.yml up --build -d

print_step "Step 5: Health Check"

# Wait for services to start
print_status "Waiting for services to start..."
sleep 30

# Check if services are running
print_status "Checking service status..."
docker compose ps

print_step "Step 6: Database Initialization"

# Run migrations
print_status "Running database migrations..."
docker compose exec -T backend uv run python manage.py migrate

# Create superuser (optional)
echo
read -p "Do you want to create a Django superuser? (y/n): " CREATE_SUPERUSER
if [ "$CREATE_SUPERUSER" = "y" ]; then
    docker compose exec backend uv run python manage.py createsuperuser
fi

print_step "Step 7: SSL Configuration (Optional)"
print_warning "For production, consider setting up SSL certificates:"
echo "  1. Use Let's Encrypt: https://letsencrypt.org/"
echo "  2. Or use Oracle Cloud Load Balancer with SSL termination"
echo "  3. Update nginx.conf to enable HTTPS block"

print_step "Step 8: Monitoring and Logs"
print_status "Service URLs:"
echo "  🌐 Application: http://$DOMAIN_OR_IP"
echo "  🔧 Django Admin: http://$DOMAIN_OR_IP/admin/"
echo "  📊 Graylog: http://$DOMAIN_OR_IP:9000 (admin/admin)"
echo "  🌺 Flower: http://$DOMAIN_OR_IP:5555"

print_status "Log monitoring commands:"
echo "  📋 All services: docker compose logs -f"
echo "  🐳 Specific service: docker compose logs -f [service_name]"
echo "  📈 Resource usage: docker stats"

echo
print_status "🎉 Deployment completed successfully!"
print_status "Your Coffee Shop application is now running at: http://$DOMAIN_OR_IP"

print_step "Next Steps:"
echo "  1. Test the application"
echo "  2. Set up SSL certificates for HTTPS"
echo "  3. Configure domain DNS (if using domain)"
echo "  4. Set up monitoring and backups"
echo "  5. Configure Oracle Cloud firewall rules"

echo
print_warning "Important Security Notes:"
echo "  - Change default passwords in production"
echo "  - Enable HTTPS with valid SSL certificates"
echo "  - Regularly update Docker images"
echo "  - Monitor application logs"
echo "  - Set up regular database backups"
