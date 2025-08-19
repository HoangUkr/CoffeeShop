# ====================================================================
# ENVIRONMENT VARIABLES SECURITY GUIDE
# ====================================================================

This guide helps you manage sensitive information securely in your Coffee Shop project.

## 🔒 What's Protected by .gitignore

Your `.gitignore` file now protects:

### Critical Secrets
- ✅ `.env` files (all variations)
- ✅ Database credentials
- ✅ API keys and tokens
- ✅ SSL certificates and private keys
- ✅ SSH keys
- ✅ Cloud provider credentials

### Development Files
- ✅ Database files (`*.sqlite3`)
- ✅ Log files
- ✅ Cache and temporary files
- ✅ IDE configuration files
- ✅ Virtual environments

## 📝 How to Set Up Environment Variables Safely

### 1. Copy the Template
```bash
# Copy the template to create your actual .env file
cp .env.production.template .env

# For backend-specific variables
cp backend/.env.example backend/.env  # (create this template if needed)
```

### 2. Update Variables with Real Values
Edit `.env` and replace placeholder values:

```bash
# ❌ DON'T use placeholder values in production
POSTGRES_PASSWORD=CHANGE_THIS_STRONG_PASSWORD

# ✅ DO use strong, unique passwords
POSTGRES_PASSWORD=MyStr0ng!Pa55w0rd#2025
```

### 3. Generate Strong Secrets
Use these commands to generate secure values:

```bash
# Generate Django secret key (50 characters)
python -c "from django.core.management.utils import get_random_secret_key; print(get_random_secret_key())"

# Generate random password (32 characters)
openssl rand -base64 32

# Generate Graylog password secret (32 characters)
openssl rand -base64 32

# Generate SHA2 hash for Graylog root password
echo -n "your_password" | shasum -a 256
```

## 🛡️ Security Best Practices

### ✅ DO:
- Use different passwords for each service
- Use strong, randomly generated passwords
- Keep `.env` files out of version control
- Use environment-specific `.env` files
- Regularly rotate passwords and API keys
- Use dedicated secret management tools in production

### ❌ DON'T:
- Commit `.env` files to Git
- Use default or weak passwords
- Share passwords in chat/email
- Hardcode secrets in source code
- Use the same password for multiple services

## 🔄 Environment Files Structure

```
.env                           # Main environment file (NEVER commit)
.env.production.template       # Template for production (safe to commit)
.env.example                   # Example file (safe to commit)
backend/.env                   # Backend-specific secrets (NEVER commit)
frontend/coffee_shop/.env      # Frontend environment (NEVER commit)
```

## 🚀 Deployment Security

### For Local Development:
1. Copy `.env.production.template` to `.env`
2. Replace `YOUR_ORACLE_CLOUD_IP` with `localhost`
3. Generate strong passwords for all services

### For Oracle Cloud Production:
1. Copy `.env.production.template` to `.env`
2. Replace `YOUR_ORACLE_CLOUD_IP` with your actual IP/domain
3. Generate production-grade secrets
4. Set `DJANGO_DEBUG=False`
5. Use HTTPS in production

## 📋 Environment Variables Checklist

### Database Security:
- [ ] Strong PostgreSQL password (16+ characters)
- [ ] Unique Redis password
- [ ] Database host set correctly

### Django Security:
- [ ] Django secret key (50 characters)
- [ ] DEBUG set to False in production
- [ ] ALLOWED_HOSTS configured correctly
- [ ] HTTPS settings enabled for production

### External Services:
- [ ] Graylog passwords configured
- [ ] Cloudinary credentials (if used)
- [ ] Email service credentials (if used)

### Infrastructure:
- [ ] SSL certificates in place
- [ ] Firewall rules configured
- [ ] Backup strategy implemented

## 🆘 If Secrets Are Accidentally Committed

If you accidentally commit sensitive information:

1. **Immediately change all compromised passwords/keys**
2. **Remove the file from Git history:**
   ```bash
   git filter-branch --force --index-filter \
   'git rm --cached --ignore-unmatch .env' \
   --prune-empty --tag-name-filter cat -- --all
   ```
3. **Force push to remote (if you have permission):**
   ```bash
   git push origin --force --all
   ```
4. **Notify your team about the security incident**

## 📞 Additional Security Resources

- [OWASP Security Guidelines](https://owasp.org/)
- [Django Security Best Practices](https://docs.djangoproject.com/en/stable/topics/security/)
- [Docker Security Best Practices](https://docs.docker.com/engine/security/)
- [Oracle Cloud Security](https://docs.oracle.com/en-us/iaas/Content/Security/Concepts/security.htm)

## 🔧 Useful Commands

```bash
# Check what files are ignored
git status --ignored

# Check if .env is properly ignored
git check-ignore .env

# List all environment variables in container
docker compose exec backend printenv | grep -E "(PASSWORD|SECRET|KEY)"

# Generate secure backup of environment
cp .env .env.backup.$(date +%Y%m%d)
```

Remember: Security is not optional - it's essential! 🔐
