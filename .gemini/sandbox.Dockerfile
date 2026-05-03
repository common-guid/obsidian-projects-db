FROM ubuntu:22.04

# Avoid prompts from apt
ENV DEBIAN_FRONTEND=noninteractive

# Install core utilities and dependencies for Obsidian/Electron
RUN apt-get update && apt-get install -y \
    wget \
    curl \
    ca-certificates \
    gnupg \
    libnss3 \
    libgbm1 \
    libasound2 \
    libatk1.0-0 \
    libatk-bridge2.0-0 \
    libcups2 \
    libdrm2 \
    libxkbcommon0 \
    libxcomposite1 \
    libxdamage1 \
    libxrandr2 \
    libxext6 \
    libxfixes3 \
    libxss1 \
    libxtst6 \
    libgtk-3-0 \
    libgl1-mesa-glx \
    libgl1-mesa-dri \
    xvfb \
    scrot \
    wmctrl \
    xdotool \
    git \
    build-essential \
    && rm -rf /var/lib/apt/lists/*

# Install Node.js 22
RUN curl -fsSL https://deb.nodesource.com/setup_22.x | bash - \
    && apt-get install -y nodejs

# Download and install Obsidian 1.12.7
RUN wget https://github.com/obsidianmd/obsidian-releases/releases/download/v1.12.7/obsidian_1.12.7_amd64.deb \
    && apt-get update \
    && apt-get install -y ./obsidian_1.12.7_amd64.deb \
    && rm obsidian_1.12.7_amd64.deb

# Install Gemini CLI for sandbox support
RUN npm install -g @google/gemini-cli

# Set up work directory
WORKDIR /home/guid/projects/obsidian_dev/life_manager

# Set environment variables for display
ENV DISPLAY=:99

# Default command
CMD ["bash"]
