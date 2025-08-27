from loguru import logger
import logging
# from pygelf import GelfUdpHandler  # Commented out for Render deployment
import sys
import os

# Remove default logger handlers
logger.remove()

# Configure the logger to output to console
logger.add(sys.stdout, format="{time} {level} {message}", level="INFO")

# Configure the logger to output to a file
os.makedirs("backend/coffee_api/logs", exist_ok=True)
logger.add(
    "backend/coffee_api/logs/coffee_api.log", 
    format="{time} {level} {message}", 
    level="DEBUG", 
    rotation="10 MB", 
    retention="10 days"
)

# Configure the logger to output to a Graylog server (COMMENTED OUT FOR RENDER)
# Uncomment these lines if you want to use external Graylog service
# graylog_host = os.getenv("GRAYLOG_HOST")  # Use 'graylog' service name
# graylog_port = int(os.getenv("GRAYLOG_PORT", 12201))
# 
# if graylog_host and graylog_port:
#     try:
#         graylog_handler = GelfUdpHandler(
#             host=graylog_host, 
#             port=graylog_port,
#             debug=True,
#             version='1.1'
#         )
#         logger.info(f"Graylog handler configured for {graylog_host}:{graylog_port}")
#     except Exception as e:
#         logger.warning(f"Failed to configure Graylog handler: {e}")
#         graylog_handler = None
# else:
#     graylog_handler = None

# Intercept logging and redirect to loguru
class InterceptHandler(logging.Handler):
    def emit(self, record):
        try:
            level = logger.level(record.levelname).name
        except ValueError:
            level = record.levelno

        frame, depth = logging.currentframe(), 2
        while frame.f_code.co_filename == logging.__file__:
            frame = frame.f_back
            depth += 1

        logger.opt(depth=depth, exception=record.exc_info).log(level, record.getMessage())
        
# Apply logging configuration
def setup_logging():
    # Configure standard logging to use our interceptor
    logging.basicConfig(handlers=[InterceptHandler()], level=logging.DEBUG, force=True)
    logger.info("Console and file logging enabled")
    
    # Add Graylog handler to standard logging if available (COMMENTED OUT FOR RENDER)
    # if graylog_handler:
    #     logging.getLogger().addHandler(graylog_handler)
    #     logger.info("Graylog logging enabled")
    # else:
    #     logger.warning("Graylog logging disabled - handler not available")

# Custom loguru sink for Graylog (COMMENTED OUT FOR RENDER)
# def graylog_sink(message):
#     if graylog_handler:
#         try:
#             record = logging.LogRecord(
#                 name="loguru",
#                 level=getattr(logging, message.record["level"].name),
#                 pathname="",
#                 lineno=0,
#                 msg=message,
#                 args=(),
#                 exc_info=None
#             )
#             graylog_handler.emit(record)
#         except Exception as e:
#             # Silently fail if Graylog is not available
#             pass
        
# Add Graylog sink to loguru (COMMENTED OUT FOR RENDER)
# if graylog_handler:
#     logger.add(graylog_sink, format="{message}")

# Test Graylog connection with retry logic (COMMENTED OUT FOR RENDER)
# def test_graylog_connection():
#     import time
#     max_retries = 3
#     retry_delay = 2
#     
#     for attempt in range(max_retries):
#         try:
#             import socket
#             sock = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
#             sock.settimeout(5)
#             
#             # Test connection to Graylog
#             result = sock.connect_ex(('graylog', 12201))
#             sock.close()
#             
#             if result == 0:
#                 logger.info("✅ Graylog connection successful")
#                 return True
#             else:
#                 if attempt < max_retries - 1:
#                     logger.warning(f"❌ Cannot connect to Graylog (attempt {attempt + 1}/{max_retries}), retrying in {retry_delay}s...")
#                     time.sleep(retry_delay)
#                 else:
#                     logger.warning("❌ Cannot connect to Graylog after all retries, continuing without Graylog")
#                     return False
#         except Exception as e:
#             if attempt < max_retries - 1:
#                 logger.warning(f"❌ Graylog connection error (attempt {attempt + 1}/{max_retries}): {e}, retrying in {retry_delay}s...")
#                 time.sleep(retry_delay)
#             else:
#                 logger.warning(f"❌ Graylog connection failed after all retries: {e}, continuing without Graylog")
#                 return False
#     
#     return False

# Call this in your Django startup (non-blocking) (COMMENTED OUT FOR RENDER)
# try:
#     test_graylog_connection()
# except Exception as e:
#     logger.warning(f"Graylog test failed, continuing without Graylog: {e}")

# Test logging
logger.info("🚀 Django application started")
logger.debug("Debug message test")
logger.warning("Warning message test")
logger.error("Error message test")
